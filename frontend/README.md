# Super 60 Community — Frontend Clone

A React (Vite) frontend recreation of the homepage and About page, built from your
screenshots, plus starter Community and Events pages.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## What's done vs. placeholder

- **Home** (`src/pages/Home.jsx`) — hero, scrolling photo strip, achievements/stats,
  about preview — built to match your screenshots, using your real copy.
- **About** (`src/pages/About.jsx`) — built from your "About Our Community" screenshot.
- **Community** and **Events** pages exist and match the visual style, but use
  placeholder copy since I didn't have screenshots or content for those pages yet.
  Swap in your real text/images and they'll look native.

## Images

The photo strip on the homepage uses styled placeholder tiles instead of your actual
event photos (I don't have access to the original image files). Drop your images into
`src/assets/` and swap the tiles in `src/components/ImageMarquee.jsx` for `<img>` tags
to finish that section.

## Structure

```
src/
  components/   Navbar, Footer, Hero, ImageMarquee, Achievements, AboutPreview
  pages/        Home, About, Community, Events
  index.css     design tokens (colors, type) + shared base styles
```
