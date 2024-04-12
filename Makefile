SRV         = /srv/http
PREFIX      = /usr/local
DESK_PREFIX = $(PREFIX)/share/applications
ICON_PREFIX = $(PREFIX)/share/pixmaps

install_icon: extra/dice.bmp
	mkdir -p $(ICON_PREFIX)
	convert extra/dice.bmp  -scale '256x256!' $(ICON_PREFIX)/dice.png
	convert extra/dice2.bmp -scale '256x256!' $(ICON_PREFIX)/dice2.png

install_desktop: install_icon extra/dice.desktop
	cp extra/dice.desktop $(DESK_PREFIX)/

install: install_desktop
	mkdir -p $(SRV)/dice
	cp dice.js index.html $(ICON_PREFIX)/dice*.png sw.js manifest.json $(SRV)/dice/
	printf '#!/bin/sh\nexec node $(SRV)/dice/dice.js' > $(PREFIX)/bin/dice
	chmod +x $(PREFIX)/bin/dice

uninstall:
	rm -f $(PREFIX)/bin/dice
	rm -fr $(SRV)/dice

.PHONY: install uninstall
