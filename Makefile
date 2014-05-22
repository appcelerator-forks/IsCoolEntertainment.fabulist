bin := ./node_modules/.bin

test:
	@${bin}/mocha -R spec

.PHONY: test