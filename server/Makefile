HOST?=localhost
PORT?=6366

serve:
	uvicorn server:app --host $(HOST) --port=$(PORT)

reload:
	uvicorn server:app --reload --host $(HOST) --port=$(PORT)


.PHONY: serve reload
.SILENT: server reload
