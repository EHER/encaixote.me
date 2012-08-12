default: help

help:
	@echo "Comandos disponíveis:"
	@echo "test\t\t Roda os testes"
	@echo "jslint\t\t Confere a qualidade do código"

test:
	phantomjs lib/run_jasmine_test.coffee SpecRunner.html

jslint:
	jslint src/*.js spec/*.js
