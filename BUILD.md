<img src="http://f000.github.io/mzp-cz-redesign/dist/img/logo-mzp-cs.svg" alt="Logo MŽP"/>
# MŽP.CZ Redesign – Pokyny k sestavení

Součást projektu [MŽP.CZ Redesign](http://f000.github.io/mzp-cz-redesign/).

Můžete modifikovat zdrojové soubory tohoto projektu, umístěné v adresáři `src/`. Pomocí jednoduchého build systému pak lze provést rekompilaci a aktualizaci *distribuční verze* v adresáři `dist/` .

## Instalace

Je nutno mít nainstalovaný Git a [Node.js ~0.10.0](http://nodejs.org/download/)

1. Naklonujte si repozitář projektu

        git clone git@github.com:f000/mzp-cz-redesign.git

2. Nainstalujte Bower a Grunt-cli pomocí Node.js Package Manager jako globální balíky:

        npm install -g bower grunt-cli

3. Změnte aktuální adresář na root tohoto projektu pomocí `cd mzp-cz-redesign`
4. Nainstalujte lokální závislosti Node.js:

        npm install

5. Nainstalujte lokální css/js frameworky a knihovny pomocí Bower 

        bower install

_Je možné, že provedení kroku 1 a 3 bude vyžadovat sudo (pro OSX, *nix, BSD...) nebo spuštění command shellu s pravomocemi administrátora (pro Windows)._

##  Update

1. Updatujte si zdrojové kódy projektu::

        git pull

2. Zaktualizuje všechny moduly a komponenty na nejnovější kompatibilní verze:

* Updatujte Node.js moduly pomocí `npm update`

* Updatujte css/js komponenty pomocí `bower update`

_Je možné, že provedení těchto 2 příkazů bude vyžadovat sudo (pro OSX, *nix, BSD...) nebo spuštění command shellu s pravomocemi administrátora (pro Windows)._

##   Build

Jednoduchý build systém (Grunt Task Runner) má nastaveny následující úlohy:

1. validuje HTML5 šablony `dist/*.html` (pomcí htmlhint)
2. zkopíruje `dist/*.html` do `src/*.html`
3. zkopíruje nejnovější veze jQuery, html5shiv a respond.js z `bower_components/` do `dist/js/`
4. zkopíruje fonty `src/fonts/icomoon/fonts/*` do `dist/fonts/`
5. vytvoří optimalizované dočasné verze obrázků `src/img/organizations/*.svg` (pomocí svgmin/SVGO)
6. z optimalizovaných SVG vygeneruje datové a fallback styly `dist/css/organizations/` a fallback PNG obrázky `dist/img/organizations/` 
7. pomocí Compass zkompiluje SAAS skripty z `src/sass/*.scss` do `dist/css/` vč. minifikace a vygeneruje nové sprites z podadresářů `src/img/` do `dist/img/`
8. validuje skripty `dist/js/*.js` (pomcí jshint)
9. sloučí JS skripty `bower_components/` Colorbox, qTip2, OwlCarousel2 a `dist/js/*.js` do souboru `tmp/final.js`
10. validuje `tmp/final.js` (pomcí jshint)
11. provede minifikaci a kompresi `tmp/final.js` do `dist/js/site.min.js` pomocí (pomocí UglifyJS)
12. provede nahrazení značek NCMARK[0-9]{0,12} v souborech `dist/*.html` a `dist/css/*` za aktuální časovou značkou
13. vymaže dočasné soubory z `tmp/`

### Postup

1. Updatujte si zdrojové kódy projektu:

        git pull

2. Po provedení úprav spusťte kompletní task set:

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

[<img src="http://f000.github.io/mzp-cz-redesign/dist/img/licence.svg" alt="Licence CC BY-NC-ND 3.0 CZ" />](http://creativecommons.org/licenses/by-nc-nd/3.0/cz/)