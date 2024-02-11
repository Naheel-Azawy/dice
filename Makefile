SRV = /srv/http
PREFIX = /usr/local

install:
	mkdir -p $(SRV)/dice
	cp dice.js index.html $(SRV)/dice/
	printf '#!/bin/sh\nexec node $(SRV)/dice/dice.js' > $(PREFIX)/bin/dice
	chmod +x $(PREFIX)/bin/dice

uninstall:
	rm -f $(PREFIX)/bin/dice
	rm -fr $(SRV)/dice

.PHONY: install uninstall
