# Introduction
HTTP API for interacting with `mem` and basic web UI.

- The UI is written in Vue.js, located in the `ui/` directory. Install with Node:

  ```bash
  cd ui/
  npm install
  ```
- The HTTP API is written in Python using FastAPI. This is a simple HTTP interface to the
  underlying `mem` library, which ultimately just interacts with a local SQLite database
  file. Running this requires the `mem` package to be installed, along with the other
  libraries in `server/requirements.txt`. Consider installing with a `venv`:

  ```bash
  cd server/
  python3 -m venv env
  source env/bin/activate
  pip3 install -r requirements.txt

  git clone https://github.com/samgriesemer/mem.git
  pip3 install -e mem
  ```

  The server setup can be configured via limited option set as seen in the example config.
  Name the desired config file `serverconfig.py`. The server can then be run with `make
  serve`, or `make reload` for development. Any Pandoc filters must be installed in
  `server/pandoc-filters`.
