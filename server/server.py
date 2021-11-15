import re
from typing import Optional, List
from datetime import datetime

from mem import db, cmd, cli_args, util
from mem.cmd import review, study, create_card, update_card, delete_card, list_decks
from mem.arg_types import Mode

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import sqlalchemy as sa
import pypandoc as pp
import subprocess as subp
from serverconfig import CROSS_ORIGIN_WHITELIST

# app variables
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=CROSS_ORIGIN_WHITELIST,
    allow_credentials=True,
    allow_methods=["*", "POST"],
    allow_headers=["*"],
)

pandoc_filters = [
    './pandoc-filters/pandoc-katex/pandoc-katex.js'
]

# other variables
db.init()

def exec_cmd(cmd):
    commands = cmd.get_all_commands()
    parser = cli_args.create_arg_parser(
    commands, "Spaced repetition flashcard program for learning anything."
    )
    args = cli_args.parse_args(parser, cmd.split(' '))
    cli_args.execute_command_with_args(args.command_cls, args)


def parse_html(card):
    def repl(g, d=''):
        s = '<span style="color:blue">{}</span>'
        def wrapped(m):
            if g == 2:
                return s.format(m.group(g))
            elif g == 3:
                if m.group(g):
                    return s.format('['+m.group(g)+']')
                return s.format(d)
        return wrapped

    def conversion_wrapper(content, extra_args=None, filters=None):
        if extra_args is None: extra_args = []
        if filters is None: filters = []

        cmd = ['pandoc', '--from', 'markdown', '--to', 'html5']
        cmd += extra_args
        cmd += [e for f in filters for e in ['-F', f]]

        c = subp.check_output(cmd, text=True, input=content, stderr=subp.DEVNULL)
        return c

    def md(x):
        ctxt = conversion_wrapper(x, filters=pandoc_filters)
        return re.sub(
            pattern=r'^<p>(.*)</p>$',
            repl=lambda m: m.group(1),
            string=ctxt
        )
    
    cloze = False
    parsed = {
        'question': card['question'],
        'answers':  card['answers'],
    }
    if not card['answers']:
        cloze = True
        q = card['question']
        parsed['question'] = create_card.CLOZE_REGEX.sub(
            repl=repl(3, '???'),
            string=q
        )
        parsed['answers'] = [create_card.CLOZE_REGEX.sub(
            repl=repl(2),
            string=q
        )]
    return {
        'question': md(parsed['question']),
        'answers': md(', '.join(parsed['answers'])),
        'cloze': cloze,
    }

def full_card(card, html=False):
    if card is None: return None
    dcard = {
        **vars(card),
        'deck': {**vars(card.deck)},
    }
    dcard['percent_correct'] = round(100*card.correct_answer_count/max(card.total_answer_count,1),2)

    timedelta = card.due_date - datetime.now()
    dcard['time_remaining'] = timedelta.total_seconds()
    if timedelta.total_seconds() > 0:
        dcard['remaining_str'] = util.format_timedelta(timedelta)
    else:
        dcard['remaining_str'] = 'past due'

    if html:
        dcard['html'] = parse_html(dcard)

    return dcard


class StudyCard(BaseModel):
    card_id: int


class Feedback(BaseModel):
    card_id: int
    q: int
    text: Optional[str] = ''


class NewCard(BaseModel):
    question: str
    answers: Optional[List[str]] = None
    deck: str
    tags: Optional[List[str]] = None

class UpdateCard(BaseModel):
    card_id: int
    question: Optional[str] = None
    answers: Optional[List[str]] = None
    tags: Optional[List[str]] = None


@app.get("/review")
def http_review():
    '''
    Select a random card among those up for review, handle cloze replacement, convert to
    HTML, and return JSONified output
    '''
    with db.session_scope() as session:
        out = review.review_any_card(session, Mode.direct)
        out['card'] = full_card(out['card'], html=True)
        return out

@app.get("/review/{deck_name}")
def http_review_deck(deck_name: str):
    '''
    Deck specific review. Returns single card similar to `/review` but pulls from the deck
    with queried name
    '''
    with db.session_scope() as session:
        deck = db.get_deck_by_name(session, deck_name)
        return review.review_deck(session, deck)

@app.post("/post_feedback")
def http_post_feedback(fb: Feedback):
    '''
    General card feedback POST endpoint. POST data must follow Feedback object.
    h
    '''
    with db.session_scope() as session:
        ua = review.post_feedback(session, fb.card_id, fb.q, fb.text) 
        return vars(ua)

@app.get("/study")
def http_study():
    with db.session_scope() as session:
        #out = study.study_core(session, deck)
        out = study.study_any(session)
        out['card'] = full_card(out['card'], html=True)
        return out

@app.get("/study/{deck_name}")
def http_study_deck(deck_name: str):
    with db.session_scope() as session:
        out = study.study_core(session, deck)
        return out

@app.post("/post_study")
def http_post_study(sc: StudyCard):
    with db.session_scope() as session:
        card = study.post_study(session, sc.card_id)
        return {**vars(card)}

# DECK MANAGEMENT
@app.get("/list_decks")
def http_list_decks():
    with db.session_scope() as session:
        return list_decks.list_decks(session) 

@app.get("/list_deck/{deck_name}")
def http_list_deck(deck_name: str):
    with db.session_scope() as session:
        deck = db.get_deck_by_name(session, deck_name)
        cards = (
            session.query(db.Card)
            .filter(db.Card.deck_id == deck.id)
            .order_by(db.Card.due_date.asc())
            .options(sa.orm.subqueryload("user_answers"))
        )
        return [full_card(card) for card in cards]


# CARD MANAGEMENT
@app.post("/create_card")
def http_create_card(card: NewCard):
    with db.session_scope() as session:
        deck = db.get_deck_by_name(session, card.deck)
        created_cards = create_card.create_card(
            session,
            deck,
            card.question,
            card.answers,
            card.tags
        )
        return [full_card(card) for card in created_cards]

@app.post("/update_card")
def http_update_card(card: UpdateCard):
    with db.session_scope() as session:
        updated_card = update_card.update_card(
            session,
            card.card_id,
            card.question,
            card.answers,
            card.tags,
        )
        return full_card(updated_card)

@app.delete("/delete_card/{id}")
def http_delete_card(id: int):
    with db.session_scope() as session:
        card = db.get_card_by_id(session, id)
        delete_card.delete_card(session, card)


@app.get("/get_card/{id}")
def http_get_card(id: int):
    with db.session_scope() as session:
        card = db.get_card_by_id(session, id)
        return full_card(card, html=True)

