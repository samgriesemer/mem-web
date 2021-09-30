import re
from typing import Optional, List

from mem import db, cmd, cli_args
from mem.cmd import review, study, create_card
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

    if not card['answers']:
        q = card['question']
        card['question'] = create_card.CLOZE_REGEX.sub(
            repl=repl(3, '???'),
            string=q
        )
        card['answers'] = [create_card.CLOZE_REGEX.sub(
            repl=repl(2),
            string=q
        )]
    return {
        'question': md(card['question']),
        'answers': md(', '.join(card['answers']))
    }


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



@app.get("/review")
def http_review():
    with db.session_scope() as session:
        #out = review.review_any_deck(session, Mode.direct)
        out = review.review_any(session, Mode.direct)
        if out['card'] is not None:
            out['card']['html'] = parse_html(out['card'])
        return out

@app.get("/review/{deck_name}")
def http_review_deck(deck_name: str):
    with db.session_scope() as session:
        deck = db.get_deck_by_name(session, deck_name)
        return review.review_core(session, deck)

@app.get("/list_decks")
def list_decks():
    with db.session_scope() as session:
        return cmd.list_decks.list_decks(session) 

@app.get("/list_deck/{deck_name}")
def list_deck(deck_name: str):
    with db.session_scope() as session:
        deck = db.get_deck_by_name(session, deck_name)
        cards = (
            session.query(db.Card)
            .filter(db.Card.deck_id == deck.id)
            .options(sa.orm.subqueryload("user_answers"))
        )
    return [vars(card) for card in cards]

@app.get("/study")
def http_study():
    with db.session_scope() as session:
        #out = study.study_core(session, deck)
        out = study.study_any(session)
        if out['card'] is not None:
            out['card']['html'] = parse_html(out['card'])
        return out

@app.get("/study/{deck_name}")
def http_study_deck(deck_name: str):
    with db.session_scope() as session:
        out = study.study_core(session, deck)
        return out

@app.post("/post_feedback")
def http_post_feedback(fb: Feedback):
    with db.session_scope() as session:
        ua = review.post_feedback(session, fb.card_id, fb.q, fb.text) 
        return {**vars(ua)}

@app.post("/post_study")
def http_post_study(sc: StudyCard):
    with db.session_scope() as session:
        card = study.post_study(session, sc.card_id)
        return {**vars(card)}

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
        return [{**vars(card)} for card in created_cards]
