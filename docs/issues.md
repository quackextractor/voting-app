1)

Ahoj,

v rámci testování projektů jsem procházel tvou anketní aplikaci na adrese https://voting-app-lg18.onrender.com a narazil jsem na menší vizuální (UI) nedostatek, který by stálo za to opravit pro lepší uživatelský zážitek.

Popis problému (formát 3RS): Jako uživatel webu chci, aby navigační menu (výběr záložek) zůstalo na stejném místě i po přechodu na jinou podstránku, aby aplikace působila konzistentně a nemusel jsem po každém kliknutí hledat, kam se ovládací prvky přesunuly.

Detail chyby: Na úvodní stránce a ostatních částech webu máš hlavní navigaci umístěnou na levé straně. Jakmile ale uživatel klikne na záložku "docs" (https://voting-app-lg18.onrender.com/docs), celé navigační menu nečekaně uskočí na pravou stranu obrazovky.

Návrh řešení: Jde sice jen o vizuální detail, ale sjednocení layoutu webu hodně pomůže. Doporučuji zkontrolovat CSS třídy nebo HTML šablonu specificky pro stránku "docs" a upravit zarovnání položek v hlavičce tak, aby odpovídalo hlavní stránce (zarovnání doleva).


2) 

Na strance https://voting-app-lg18.onrender.com/ neni "How to contact" nebo jsem ho nenasel.
Bylo by to uzitecne pro nahlaseni feedbacku.

- create a contact page email: slezak@spsejecna.cz and report issues to https://github.com/quackextractor/voting-app/issues

3)

Na strance https://voting-app-lg18.onrender.com/ se muj hlas zobrazi s chybovou hlaskou az po opakovanem odkliknuti na "hlasovat".
Jako uzivatel bych radsi rovnou videl, pro co jsem hlasoval; chybove hlasky me rozesmutnuji.