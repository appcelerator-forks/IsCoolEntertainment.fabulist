bin := ./node_modules/.bin

dist:
	@mkdir -p dist 2>/dev/null
	@${bin}/tetanize
	@mv fabulist.js dist/fabulist.js

test:
	@${bin}/mocha -R spec

.PHONY: test dist