# MŽP.CZ Redesign – Referenční příručka

Obsahuje Specifikace, Pokyny pro implementaci a přehled Prvků pro editory.

Součást projektu [MŽP.CZ Redesign](http://f000.github.io/mzp-cz-redesign/).

## Specifikace

### Kompatibilita

Projekt využívá pokročilé technologie s ohledem na UX, přístupnost a datovou náročnost. Maximální funkcionalita byla testována v aktuálních verzích prohlížečů Internet Explorer, Firefox, Chrome a Safari, na různých systémech vč mobilních zařízení. 

Zastaralé prohlížeče nebo prohlížeče s omezenou funkcionalitou jsou podporovány pomocí graceful degradation tak, aby byl web použitelný na většině možných zařízení s degradací co nejmenšího množství designu a funkcionalit.

### Responsivní varianty

Jsou vytvořeny varianty pro velmi malé obrazovky (mobily), malé obrazovky (tablety a mobily) a dvě varianty šířky  monitory. Na základě statistik návštěvnosti by v Q2 2014 využívalo nejširší variantu cca 70% návštěvníků.

### Přístupnost

Šablony splňují pravidla přístupnost dle WCAG 2.0 a Pravidla přístupného webu dle Zákona č. 365/2000 Sb.  

Stránky obsahují množství neviditelných prvků navigace a obsahu, sloužících čtečkám obrazovek a jiným speciálním zařízení, pomocí nichž jsou stránky snadno ovladatelné a navigovatelné i bez vizuálního vjemu.

### Mikrodata

Mikrodata splňují normu [http://www.w3.org/TR/microdata/](http://www.w3.org/TR/microdata/)

* Element `#footer-contact` obsahuje mikrodata typu [Organisation](http://schema.org/Organization) 
* Element `.event-list` obsahuji mikrodata typu [Event](http://schema.org/Event)

Editaci těchto elementů nebude pravděpodobně přes CMS možná.

### Tisk

Projekt obsahuje stylesheet `print.css` pro automatickou změnu layoutu stránky při tisku. 

Pro explicitní definice byla zavedena CSS třída `.print-only` (viditelnost pouze při tisku) a  `.no-print` (skrytí prvku při tisku).

## Pokyny pro implementaci

### Externí odkazy

Pro kompatibilitu a přístupnost je používán parametr odkazu `target="_blank"`. Pro maximální přístupnost je třeba do těchto odkazů doplňovat upozornění na otevření nového okna
  
    `<a href="http://facebook.com" target="_blank">MŽP na Facebooku<span class="sr-only"> (otevře nové okno)</span></a>`

### Sprites

Elementy `.mzp-topics` a `.mzp-organizations` používají pro optimalizaci rychlosti techniku image sprites.

Sprites se generují pomocí Compass z podadresářů `src/img/`. Pro změnu obrázků stačí přepsat tyto soubory. Pro přidání dalších dalších organizací do `.mzp-organizations` je nutno navíc modifikovat stylesheet `_layout.scss`.

### SVG

Preferovaný formát vektorových obrázků (loga,ikony...) je SVG, pro ktere je implementován automatický fallback do 1:1 PNG ve stejném adresáři na základě analýzy koncovky souboru (nazev.svg => nazev.png).

### Styly

Pořadí načítání musí být zachováno.

### Javascript

Pořadí načítání musí být zachováno.

V prostoru `<head>` by se měly nacházet pouze skripty:

  - Typekit
  - Modernizr (minifikovaný custom build pro zajištění kompatibility s různými prohlížeči a zařízeními.
  – Shiv.js a Respond.js pro IE < 9

Ostatní skripty se musí nacházet těsně před `</body>`:

  - JQuery v2.1.x Načítání z Google CND s fallback na lokální verzi
  - Ostatní skripty, sloučené a minifikované do jednoho souboru
  – Google Analytics Universal

## Prvky pro editory


### Oblíbené odkazy

Tagcloud obsahuje 16 odkazů s přiřazenou prioritou 1-5. Redakční systém by měl umožnit změnu pořadí, nebo alespoň při ukládání tohoto prvku vygenerovat náhodné pořadí, které zůstane až do další editace.

### Bannery

Bannery pro levou a pravou sekci stránky se zobrazují v orámovaných boxech o vnitřním rozměru 261x96px. Pokud vložíte obrázek s menším rozměrem, bude vertikálně i horizontálne vycentrován uvnitř tohoto boxu. Lze vkládat obrázky s průhledností a využít tak defaulního designu podkladu boxu.

### List novinek

Úvodní fotografie by měla mít poměr stran 4:3 a systém by ji měl generovat pro tento prvek v rozměru 263x197.

Úryvek textu nesmí obsahovat žádné HTML značky a by měl by být systémem zkracován na cca 300 znaků a doplněn znakem trojtečky. Titulek zkracovat na maximálně cca 60 znaků.

### Kalendář akcí

Tento prvek obsahuje mikrodata, která budou automaticky generována redakčním systémem.

Titulek akce by neměl být delší než cca 60 znaků. Kategorie akce max. 20 znaků.

### Rezortní organizace

TODO Dodat finální stav, kvůli optimalizaci a použití Sprites nebude zřejmě možná úprava přes redakční systém.

### Navigace v patičce

Maximálně 7 odkazů v každém ze 2 sloupců.

### Běžný obsah stránky

---

## Kontakt

Autor: [Lukáš Vorlíček](mailto:lukas.vorlicek@codeart.cz)

Copyright (c) 2014 [Ministerstvo životního prostředí](http://www.mzp.cz/)

Licence [CC BY-NC-ND 3.0 CZ](http://creativecommons.org/licenses/by-nc-nd/3.0/cz/)
