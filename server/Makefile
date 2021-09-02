HOST?=localhost
PORT?=6366

serve:
	env/bin/python -m uvicorn server:app --host $(HOST) --port=$(PORT)

reload:
	env/bin/python -m uvicorn server:app --reload --host $(HOST) --port=$(PORT)


.PHONY: serve reload
.SILENT: server reload
