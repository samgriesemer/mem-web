import re
from typing import Optional

from mem import db, cmd, cli_args
from mem.cmd import review, study
from mem.arg_types import Mode


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import sqlalchemy as sa
import pypandoc as pp

from serverconfig import CROSS_ORIGIN_WHITELIST, DB_PATH

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
db.init(DB_PATH)

def md(x):
    ctxt = pp.convert_text(x,
                    to='html5',
                    format='md',
                    filters=pandoc_filters)
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
