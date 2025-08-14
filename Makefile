dev:
	npm run dev

build:
	npm run build

preview: build
	npm run preview

deploy: build
	wrangler pages deploy ./dist --commit-dirty=true