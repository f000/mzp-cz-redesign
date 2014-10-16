<img src="http://f000.github.io/mzp-cz-redesign/dist/img/logo-mzp-cs.svg" alt="Logo MŽP"/>
# MŽP.CZ Redesign – Referenční příručka

Obsahuje Specifikace, Pokyny pro implementaci a přehled Prvků pro editory.

Součást projektu [MŽP.CZ Redesign](http://f000.github.io/mzp-cz-redesign/).

## Specifikace

### Kompatibilita

Projekt využívá pokročilé technologie s ohledem na UX, přístupnost a datovou náročnost. Maximální funkcionalita byla testována v aktuálních verzích prohlížečů Internet Explorer, Firefox, Chrome a Safari, na různých systémech vč mobilních zařízení. 

Zastaralé prohlížeče nebo prohlížeče s omezenou funkcionalitou jsou podporovány pomocí graceful degradation tak, aby byl web použitelný na většině možných zařízení s degradací co nejmenšího množství designu a funkcionalit.

### Responsivní varianty

Jsou vytvořeny varianty pro velmi malé obrazovky (mobily), malé obrazovky (tablety a mobily) a dvě varianty šířky pro klasické monitory. Na základě statistik návštěvnosti by v Q2 2014 využívalo nejširší variantu cca 70% návštěvníků.

### Přístupnost

Šablony splňují pravidla přístupnost dle WCAG 2.0 a Pravidla přístupného webu dle Zákona č. 365/2000 Sb.  

Stránky obsahují množství neviditelných prvků navigace a obsahu, sloužících čtečkám obrazovek a jiným speciálním zařízení, pomocí nichž jsou stránky snadno ovladatelné a navigovatelné i bez vizuálního vjemu.

### Mikrodata

Mikrodata splňují normu [http://www.w3.org/TR/microdata/](http://www.w3.org/TR/microdata/)

* Element `#footer-contact` obsahuje mikrodata typu [Organisation](http://schema.org/Organization) 
* Element `.event-list` obsahuji mikrodata typu [Event](http://schema.org/Event)

Editaci těchto elementů nebude pravděpodobně přes CMS MŽP možná.

### Tisk

Projekt obsahuje stylesheet pro automatickou změnu layoutu stránky při tisku. 

Pro možnost explicitní definice byla zavedena CSS třída `.print-only` (viditelnost pouze při tisku) a  `.no-print` (skrytí prvku při tisku). 

## Pokyny pro implementaci

### Nastavení serveru

Pro HTML soubory je nutno posílat HTTP hlavičku `X-UA-Compatible` s hodnotou `IE=edge,chrome=1`. 

Doporučujeme zavést kompresi HTTP spojení pro nekomprimované formáty (HTML, Javascript, CSS, SVG...) `gzip`/`deflate`. V případě možnosti negativních dopadů na rychlost serveru bude doplněn Grunt task na vygenerovaní gzipovaných produkčních souborů. Možné řešení pro Apache naleznete v souboru [.htaccess](https://github.com/f000/mzp-cz-redesign/blob/master/dist/.htaccess).

### Bezpečnost (doporučení)

Doporučujeme zprovoznit možnost šifrovaného připojení přes SSL – možnosti:

1. vlastní SSL certifikát vydaný certifikační autoritou MŽP
2. [certifikát od autority akreditované MVČR pro Elektronický podpis](http://www.mvcr.cz/clanek/prehled-udelenych-akreditaci.aspx)
3. [běžný komerční SSL certifikát](https://www.ssls.cz)

V produkční verzi doporučujeme nepoužívat externí zdroje skriptů, jako např. jQuery z Google CND a Google Analytics. Vhodná náhrada za Analytics je např. provozování lokální instalace [Piwik](http://piwik.org).

### Externí odkazy

Pro kompatibilitu a přístupnost je používán parametr odkazu `target="_blank"`. Pro maximální přístupnost je třeba do těchto odkazů přidávat upozornění na otevření nového okna
  
    `<a href="http://facebook.com" target="_blank">MŽP na Facebooku<span class="sr-only"> (otevře nové okno)</span></a>`

### Sprites

Elementy `.mzp-topics` a `.mzp-organizations` používají pro optimalizaci rychlosti načítání techniku image sprites.

Obrázkové Sprites se generují pomocí Compass z podadresářů `src/img/`. Pro změnu obrázků stačí přepsat tyto soubory a spustit `grunt compass:dist`. Pro přidání dalších dalších organizací do `.mzp-organizations` je nutno navíc modifikovat stylesheet `_layout.scss`.

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

### Oblíbené odkazy (tag cloud)

Tagcloud obsahuje 16 odkazů s přiřazenou prioritou 1-5. Redakční systém by měl umožnit nastavení priority a generovat `<ol>` list sestupně dle priority. Pseudonáhodné promíchání pro tagcloud je zajištěno JavaScriptem.
  
### Box Ministr

Fotka ministra musí mít rozměr 203×174 a formát PNG 24-bit + 8-bit alpha.  

### Bannery

Bannery pro levou a pravou sekci stránky se zobrazují v orámovaných boxech o vnitřním rozměru 261×96px. 

Optimální rozměr vkládaných bannerů je 261×96px, případně 261×192px pro velmi důležité akce. 

Lze vkládat obrázky s průhledností a využít tak připravený design podkladu boxu. Ve Firefoxu budou bannery roztaženy vždy na celou šířku boxu (neopravený bug Firefoxu).

### List aktualit

Úvodní fotografie musí mít poměr stran 4:3, systém ji bude zmenšovat na velikost 263×197px.

Pokyny pro rozměry a vzhled fotek jsou stejné, jako v sekci "Fotogalerie a element s obrázkem v textu vlevo nebo vpravo".

Úryvek textu nesmí obsahovat žádné HTML značky a by měl by být systémem zkracován na cca 300 znaků a doplněn znakem trojtečky. Titulek zkracovat na maximálně cca 60 znaků.

### Kalendář akcí

Tento prvek obsahuje mikrodata, která budou automaticky generována redakčním systémem.

Titulek akce by neměl být delší než cca 60 znaků. Kategorie akce max. 20 znaků.

### Rezortní organizace

Loga organizací jsou implementována jako Data URLs v souboru `css/organizations/icons.data.svg.css` (async) s fallbackem pro prohlížeče bez SVG (`css/organizations/icons.data.png.css`) a Javascriptu (`css/organizations/icons.fallback.css`). Vkládaná loga musí být vč. pozadí vycentrovaná ve čtverci 100×100px.

### Hlavní menu

Menu je připraveno na 3 úrovně zanoření, ostatní úrovně budou dostupné buď z levého menu, nebo přímo z obsahu stránek. Vizuální orientace je zajištěna pomocí CSS třídy `.highlight` pro stránky v cestě k aktuální stránce a CSS třídou `.current` pro aktuální aktivní stránku.

### Menu vlevo

Levé menu je připraveno na 4 úrovně zanoření. 5 úroveň by se na webu neměla vyskytovat, jinak bude dostupná pouze z obsahu stránky. Vizuální orientace je zajištěna pomocí CSS třídy `.active` pro aktuální aktivní stránku.

### Navigace v patičce

Maximálně 7 odkazů v každém ze 2 sloupců.

### Fotogalerie a element s obrázkem v textu vlevo nebo vpravo

Minimální šířka vkládaného obrázku je 263px. 

Nejen pro funkci rozkliknutí do modálního okna je doporučeno vkládat co největší fotky (z důvodu možného využití většího rozlišení v blízké budoucnosti – obrazovky s vysokým rozlišením). 

Systém by měl zachovat originály pro budoucí použití a vygenerovat 2 veze pro současný web – automaticky zmenšit na šířku 263px pro náhled a maximálně 800×600px pro fotku, rozkliknutou do modálního okna.

Systém by měl automaticky zajistit možnost rozkliknutí – zvětšení do modálního okna, pokud má originál šířku větší než 263px.

Fotografie by neměla obsahovat žádný text a pokud je to nezbytně nutné, vzhled textu by měl odpovídat design manuálu a současnému vzhledu webu. Použitý font musí být Myriad, případně Myriad Narrow, v řezu Regular nebo Bold.

Popisek u fotky, zvetšené do modálního okna, se čerpá z první nalezené hodnoty v pořadí: Popisek fotky, Atribut title odkazu, Atribut title obrázku, Atribut alt obrázku.

### Nadpisy

V obsahu je nutno dodržovat hierarchii významnosti nadpisů úrovně 1 až 6 (HTML značky `<h1>` až `<h6>`) – sémanticky a neorientovat se podle designu jednotlivých úrovní nadpisu. Žádný nadpis nesmí obsahovat tučný text, nebo kurzívu.

Příklad pro stránku Ministr (nevychází z reálného obsahu):

```
<h1>Ministr Mgr. Richard Brabec</h1>
  <h2>Životopis<h2>
    <h3>Dosažené vzdělání</h3>
    <h3>Cizí jazyky</h3>
    <h3>Pracovní praxe</h3>
    <h3>Znalosti a dovednosti</h3>
  <h2>Ministr v médiích<h2>
    <h3>Rozhovory</h3>
      <h4>Televize</h4>
        <h5>Česká televize</h5>
        <h5>TV Nova</h5>
      <h4>Rozhlas</h4>
      <h4>Internet</h4>
    <h3>Eseje a fejetony</h3>
    <h3>Expertízy a odborné články</h3>
  <h2>Fotogalerie</h2>
  <h2>Ke stažení</h2>
```  
### Formátování textu

Je zakázáno formátovat obsah pomocí prázdných řádků – prázdné řádky by se neměly nikde vyskytovat. V případě potřeby je možno vložit mezinadpis, horizonální linku, nebo jiný obsahový element pro vizuální odlišení od zbytku obsahu.

Pokud je to možné, je doporučeno maximálně využívat speciální prvky obsahu, například element "Stáhněte si...".

Je zakázáno používat jiné fonty, barvy textu a odkazů, než je automaticky předvoleno. Pro zvýraznění běžného textu je možno použít pouze tučné písmo nebo kurzívu.

---

## Kontakt

Autor: [Lukáš Vorlíček](mailto:lukas.vorlicek@codeart.cz)

Copyright (c) 2014 [Ministerstvo životního prostředí](http://www.mzp.cz/)

[<img src="http://f000.github.io/mzp-cz-redesign/dist/img/licence.svg" alt="Licence CC BY-NC-ND 3.0 CZ" />](http://creativecommons.org/licenses/by-nc-nd/3.0/cz/)
