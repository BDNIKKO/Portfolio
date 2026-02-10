# Portfolio

[Live Site](https://bdnikko.github.io/portfolio/) | [GitHub](https://github.com/BDNIKKO/Portfolio)

## What This Is

My personal portfolio site — actively maintained and updated. This is what I actually link people to.

Dark theme, gold accents, frosted cards, and the GitHub section pulls repos live from the API. Resume downloads straight from the page.

## How It's Built

HTML, CSS, JavaScript, jQuery. No frameworks. The layout uses Flexbox, the cards use `backdrop-filter: blur()` for the frosted look, and the background has three floating gradient shapes that move on scroll. The GitHub section hits the API for up to 100 repos, filters to the pinned ones, and renders them as cards.

Montserrat for the name and section headings, Inter for body text. Font Awesome for icons.

## Design Notes

The name at the top went through a lot of iterations. It's Montserrat 700, all caps, tracked out, with layered text-shadows for a 3D effect. The font itself isn't special — it's the treatment that makes it work. Uppercase, letter-spacing, and shadow stacking turn a regular heading into something that reads more like a logo.

Gold accents come from my military background. Gold means something to me, and it pairs well against the dark palette.

The cards are `backdrop-filter` with semi-transparent borders. The resume button has sparkle animations on load, then converts to a floating sticky button when you scroll past the header. That was actually annoying to build — `backdrop-filter` creates a containing block that breaks `position: fixed`, so I had to move the button element to the body on scroll to escape it.

No Bootstrap, no Tailwind. Wrote all the CSS by hand because I wanted to actually understand how layout works instead of leaning on a framework.

## Running It

Easiest way is the [live site](https://bdnikko.github.io/portfolio/). Local:

```bash
npx http-server -p 8000
```

Then open `http://localhost:8000`

## Files

```
index.html
styles.css
script.js
Nicholas_Moppert_PDF_Resume.pdf
README.md
```

## Contact

**Nicholas David Moppert**
moppertn@gmail.com
[LinkedIn](https://www.linkedin.com/in/nicholasmoppert/) | [GitHub](https://github.com/BDNIKKO)
Wilmington, NC — open to remote and in-person
