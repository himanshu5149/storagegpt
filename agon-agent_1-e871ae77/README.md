# Console Storage Planner

A fan-made, entirely client-side storage calculator for PS5 and Xbox. No backend, accounts, runtime network requests, or analytics. The 212 GB GTA 6 value is an **unconfirmed, editable planning estimate**, not an official installation size. All quick-add game sizes are clearly marked approximate examples.

## Run locally

Requires Node.js 22.12+ (the test runner uses built-in TypeScript stripping).

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For production verification:

```bash
npm test
npm run lint
npm run build
npm run preview
```

## Deploy

1. Push this folder to a Git repository.
2. Import it in Vercel and choose the Vite framework preset. Vercel automatically runs `npm run build` and serves `dist`. No environment variables or backend are required.
3. Alternatively, drag the built `dist` folder to a static host such as Netlify.
4. If you use a custom domain, update the absolute URLs in `public/sitemap.xml` and `public/robots.txt` to that domain before building.

## How plans are calculated

The amount to clear is `max(0, target game size + safety buffer − available free space)`. Games marked Keep are excluded. The descending-size prefix guarantees the fewest possible deletions. For libraries of 24 games or fewer, Fewest games also searches for a same-count subset that wastes less space; on larger libraries it uses the descending prefix for predictable performance. Largest first always uses that prefix. Impossible plans are clearly indicated. Bars use advertised capacity as a *reference*, not an assertion of usable space.

## Browser data and JSON

Settings and games save to localStorage when available. The app continues working if it is unavailable. Export downloads a local JSON file with `{ "version": 1, "games": [...] }`. Import validates up to 500 entries and replaces the existing game list; it does not change console settings. Reset requires confirmation.

## Test report

Verified with Node.js 24.19: `npm test` passed 5/5 algorithm tests; `npm run lint` passed without errors; `npm run build` passed. Production JavaScript is 43,245 bytes, below the 200 KB limit.

Browser QA with Chromium at desktop (1440 × 900) and mobile (390 × 844) passed: no horizontal overflow, quick-add, instant calculation, Keep protection, editing, localStorage persistence after reload, JSON export, clipboard sharing, no JavaScript errors, and no external runtime requests. Additional mobile checks passed for negative/oversized/blank input, JSON import replacing the list, reset confirmation (cancel and accept), keyboard console selection, and keyboard FAQ expansion.

Not tested: Safari, Firefox, a physical PS5/Xbox, external storage hardware compatibility, automated WCAG auditing, and clipboard behavior on insecure HTTP hosts. The sizes in examples are not verified installation sizes.

## License and disclaimer

Fan-made. Not affiliated with Rockstar Games, Sony or Microsoft. No third-party logos or artwork.
