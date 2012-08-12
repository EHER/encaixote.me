default: help

help:
	@echo "Comandos disponíveis:"
	@echo "test\t\t Roda os testes"
	@echo "jslint\t\t Confera a qualidade do código"

test: jslint
	phantomjs lib/run_jasmine_test.coffee SpecRunner.html

jslint:
	jslint src/*.js spec/*.js
