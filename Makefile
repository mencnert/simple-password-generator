init:
	npm install

bundle: init
	mkdir -p docs
	npm run build

build: bundle