make:
	coffee -o lib -c src/*.coffee

test:: make
	coffee test/test.coffee