# MŽP.CZ Redesign – Pokyny k sestavení

Součást projektu [MŽP.CZ Redesign](http://f000.github.io/mzp-cz-redesign/).

Můžete modifikovat zdrojové soubory tohoto projektu, umístěné v adresáři `src/`. Pomocí jednoduchého build systému pak lze provést rekompilaci a aktualizaci *distribuční verze* v adresáři `dist/` .

## Instalace

Je nutno mít nainstalovaný Git a [Node.js ~0.10.0](http://nodejs.org/download/)

1. Nainstalujte Bower a Grunt-cli pomocí Node.js Package Manager jako globální balíky:

        npm install -g bower grunt-cli

2. Změnte aktuální adresář na root tohoto projektu pomocí `cd mzp-cz-redesign`
3. Nainstalujte lokální závislosti Node.js:

        npm install

4. Nainstalujte lokální css/js frameworky a knihovny pomocí Bower 

        bower install

_Je možné, že provedení kroku 1 a 3 bude vyžadovat sudo (pro OSX, *nix, BSD...) nebo spuštění command shellu s pravomocemi administrátora (pro Windows)._

##  Update

Update systém zaktualizuje všechny moduly a komponenty na nejnovější kompatibilní verze. 

* Updatujte Node.js moduly pomocí `npm update`

* Updatujte css/js komponenty pomocí `bower update`

_Je možné, že provedení těchto příkazů bude vyžadovat sudo (pro OSX, *nix, BSD...) nebo spuštění command shellu s pravomocemi administrátora (pro Windows)._

##   Build

Jednoduchý build systém (Grunt Task Runner) má nastaveny následující úlohy:

- validuje HTML5 šablony `dist/*.html`
– zkopíruje  `dist/*.html` do `src/*.html`
- pomocí Compass zkompiluje SAAS skripty z `src/sass/` do `dist/css/` vč. minifikace a 
– vygeneruje nové sprites z podadresářů `src/img/` do `dist/img/`
- validuje, sloučí a zkompresuje skripty z `src/js/` do `dist/js/` (pomocí UglifyJS)

Spusťte kompletní task set:

    grunt

nebo nechte kompilaci změněných souborů provádět kontinuálně:

    grunt watch
        
## Jednoduchý webserver

Pro preview a vývoj lze spustit web server na [http://localhost:8088](http://localhost:8088) pomocí:

    node start

Jako www root je použit adresář `dist/`.

---

## Kontakt

Autor: [Lukáš Vorlíček](mailto:lukas.vorlicek@codeart.cz)

Copyright (c) 2014 [Ministerstvo životního prostředí](http://www.mzp.cz/)

Licence [CC BY-NC-ND 3.0 CZ](http://creativecommons.org/licenses/by-nc-nd/3.0/cz/)
