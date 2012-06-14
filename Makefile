default: help

help:
	@echo "Comandos disponíveis:"
	@echo "test\t\t Roda os testes"

test:
	phantomjs lib/run_jasmine_test.coffee SpecRunner.html
