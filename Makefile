default: help

help:
	@echo "Comandos disponíveis:"
	@echo "test\t\t Roda os testes"
	@echo "jslint\t\t Confere a qualidade do código"
	@echo "browserify\t Junta os scrips em um arquivo só"

test:
	npm test

jslint:
	jslint src/*.js spec/*.js

browserify:
	browserify src/script.js -o src/encaixote-me.js
