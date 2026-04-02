# Portfolio Site — Guida & Metodo

## Struttura Cartelle
```
portfolio-site/
├── index.html              ← Homepage
├── pages/
│   ├── portfolio.html      ← Griglia progetti con filtri
│   ├── profilo.html        ← About / Chi sono
│   └── contatti.html       ← Form contatti
├── css/
│   ├── variables.css       ← ⭐ DESIGN SYSTEM: colori, font, spacing
│   ├── reset.css           ← Reset browser
│   ├── typography.css      ← Titoli, testi
│   ├── layout.css          ← Header, sezioni, griglie
│   ├── components.css      ← Elementi UI riutilizzabili
│   ├── animations.css      ← Transizioni e animazioni
│   └── responsive.css      ← Mobile/tablet
├── img/
│   ├── foto-profilo.jpg    ← La tua foto (rinomina così)
│   ├── cv.pdf              ← Il tuo CV (rinomina così)
│   └── progetto-1.jpg      ← Immagini progetti
└── js/
    ├── main.js             ← Script globale (header, reveal)
    └── portfolio.js        ← Filtri portfolio
```

---

## Come personalizzare

### 1. Cambia nome e testi
Apri ogni file HTML e cerca "Il Tuo Nome" → sostituisci col tuo nome.

### 2. Cambia i colori
Apri `css/variables.css` e modifica le variabili:
```css
--accent: #c8b89a;   /* colore oro/sabbia → cambia qui */
--bg: #0a0a09;       /* sfondo scuro → cambia qui */
```

### 3. Aggiungi la tua foto
Salva la tua foto come `img/foto-profilo.jpg` — viene caricata automaticamente.

### 4. Aggiungi un progetto
In `pages/portfolio.html`, copia questo blocco e incollalo nella griglia:
```html
<div class="project-card" data-category="branding">
  <div class="project-img"><img src="../img/nome-immagine.jpg" alt="Nome Progetto"></div>
  <div class="project-info">
    <span class="project-tag">Strategic Branding</span>
    <h3>Nome Progetto</h3>
    <p>Descrizione breve.</p>
  </div>
</div>
```
Le categorie disponibili sono: `branding` | `institutional` | `creative`

---

## 🎯 PROMPT TEMPLATE per Claude

Usa questo schema ogni volta che vuoi costruire o modificare il sito:

```
CONTESTO:
Sto sviluppando il mio portfolio HTML strutturato in cartelle:
- index.html (home)
- pages/ (portfolio, profilo, contatti)
- css/ (variables, reset, typography, layout, components, animations, responsive)
- js/ (main, portfolio)
- img/ (foto, cv, immagini progetti)

DESIGN SYSTEM:
- Font: Cormorant Garamond (display) + DM Mono (mono) + Outfit (body)
- Palette dark: bg #0a0a09, accent #c8b89a, text #e8e6df
- Stile: minimal scandinaviano dark, tipografia-centrico

RICHIESTA:
[DESCRIVI COSA VUOI] 

CONTENUTI DA INSERIRE:
[INCOLLA TESTI, DATI, LISTA PROGETTI, ECC.]

TEMPLATE DI RIFERIMENTO VISIVO:
[LINK O DESCRIZIONE DEL LOOK CHE VUOI]

OUTPUT ATTESO:
- File/i specifici da creare o modificare
- Mantieni la struttura a cartelle esistente
- Usa le variabili CSS già definite
```

---

## Esempi di prompt che funzionano bene

**Aggiungere una pagina case study:**
> "Aggiungi una pagina `pages/case-study.html` per un progetto chiamato 'Rebrand Fondazione X'. Contenuto: [testo]. Stile: dark minimal come il resto del sito. Deve avere: hero con titolo, galleria immagini, testo descrittivo, link al progetto live."

**Cambiare sezione:**
> "Modifica la sezione pillars in `index.html`. Voglio 4 pilastri invece di 3, aggiungi: 'Motion & Video Direction' con filtro 'motion'."

**Aggiungere funzionalità:**
> "Aggiungi in `js/portfolio.js` una funzione che quando clicco su un project-card apre un modal con l'immagine grande e la descrizione completa."
