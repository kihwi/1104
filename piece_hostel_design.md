# PIECE HOSTEL SANJO – Design Breakdown

## Layout & Composition
- Fixed header and slide-in side navigation keep the chrome lightweight while reserving canvas space for photography-driven storytelling.
- Hero block uses table-cell centering inside `.main__container--top` so the welcome copy, CTA, and news feed stay vertically centered across viewport heights.
- Background slideshow supplied by `backstretch` cycles full-bleed images under a translucent overlay, maintaining legibility without hiding photography.
- Footer mirrors the header with a compressed, centered stack of contact details, reinforcing the minimal navigation affordances.

## Typography
- Primary face is Typekit’s `futura-pt`, delivering geometric, uppercase-heavy headings and navigation for a modern hostel tone (`body`, `.side`, `.main__h`).
- Hero paragraph swaps to `adobe-garamond-pro` for a serif counterpoint, conveying warmth and boutique positioning (`.main__hTxt--home`).
- Supporting accents (e.g., English labels in the access section and room descriptors) lean on Georgia/Times italics to introduce a travel-journal feel.

## Color System
- **Base**: `#111` anchors header/footer chrome, while the body copy rests on `#333` for strong readability (`body`, `.header`, `.footer`).
- **Primary Text on Imagery**: `#fff` is applied to hero headlines, news list, and CTA borders to stand out against the darkened slideshow (`.main--top`, `.home__news`).
- **Navigation Highlight**: `#fff100` (vibrant canary) flags the current menu item, pairing with `#333` text to maintain contrast on the dark sidebar (`.current--nav`).
- **Warm Accent**: Golden `#B38E00`/`#b38e00` underscores access subtitles and room labels, injecting a premium tone without overpowering the grayscale foundation.
- **Neutral Dividers**: `#aaa`, `#bbb`, and `#ddd` dotted/solid rules articulate content groupings while keeping the palette subdued (`.home__newsList`, `.hr-a`).
- **Interaction States**: Link hovers briefly flash a high-energy `#FFEF00` background against black text, reinforcing the brand yellow used in navigation highlights (`a:hover`).
- **Map Legend Palette**: Access walk-map badges introduce categorical colors (`#fff000`, `#b7e972`, `#f4ac64`, `#72d8f7`, `#ff86b4`, `#f95928`) to differentiate routes while staying within flat, saturated tones for clarity.

## Visual Motifs & Texture
- Layered textures—`bg3.png` (page), `bg_debut_dark.png` (side nav), and `bg-dots.png` with an `rgba(0,0,0,0.45)` wash over the hero—combine analog grain with modern transparency.
- A fixed `clouds-1.png` overlay floats above the layout for subtle motion and a travel cue without impacting usability.
- Dotted underlines and dashed horizontal rules echo Kyoto textile patterns, adding tactile nuance to the monochrome scheme.

## Interaction & Mood
- CTA buttons invert on hover (white background, charcoal text) to signal action while respecting the minimalist palette.
- Mobile-first navigation relies on off-canvas transitions (`menu-open` translate) with a fade layer to focus attention, aligning with hostel guests’ quick, task-oriented browsing.
- Overall tone couples affordable traveler energy with boutique refinement through high-contrast monochrome, measured serif accents, and restrained warm highlights.
