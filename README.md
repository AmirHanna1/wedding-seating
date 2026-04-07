# Wedding Seating Chart

A digital seating chart for weddings — because printed seating boards are a pain.

## Why this exists

Anyone who's planned a wedding knows the seating chart is one of the most tedious parts. You spend hours arranging tables, then someone cancels the week before, a couple RSVPs last minute, and suddenly your beautifully printed seating board is wrong. Reprinting isn't cheap, and hand-correcting it looks terrible.

This project replaces all of that with a simple search. Upload a CSV of guest names and table assignments, deploy to Vercel, and you're done. Guests pull up the site on their phone (or scan a QR code at the entrance) and search their name to find their table. If assignments change, you update the CSV, redeploy in seconds, and the live site is always up to date.

It's also useful for ushers — instead of flipping through a printed list, they can just type a guest's name and direct them to the right table. Think about it: if an usher spends even one minute scanning a list per guest, that's over 300 minutes of cumulative lookup time at a 300-person wedding. It's a bottleneck that creates lines at the door and a frustrating first impression for guests. A search bar makes it instant.

## How it works

- Guest data lives in `app/guests.ts` as a static array (parsed from a CSV)
- Search is case-insensitive and partial — typing "mar" finds Maria, Mariam, Mark, etc.
- No database, no backend, no auth. It's a single static page that deploys anywhere

## Stack

- **Next.js** (App Router) with static export
- **Tailwind CSS** for styling
- **Google Fonts** — Playfair Display + Cormorant Garamond
- Deployed on **Vercel**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Updating guest data

1. Prepare a CSV with three columns: `FirstName,LastName,Table` (no header row)
2. Replace `app/guests.ts` by running:

```bash
node -e "
const fs = require('fs');
const csv = fs.readFileSync('your-guests.csv', 'utf8');
const lines = csv.trim().split('\n');
const guests = [];
for (const line of lines) {
  const [first, last, table] = line.split(',').map(s => (s || '').trim());
  if (table && (table.startsWith('Table') || table.toLowerCase().includes('table')))
    guests.push({ firstName: first, lastName: last, table });
}
let out = 'export const guests = [\n';
for (const g of guests)
  out += '  { firstName: \"' + g.firstName + '\", lastName: \"' + g.lastName + '\", table: \"' + g.table + '\" },\n';
out += '] as const;\n\nexport type Guest = (typeof guests)[number];\n';
fs.writeFileSync('app/guests.ts', out);
console.log('Generated ' + guests.length + ' guests');
"
```

3. Deploy: `npx vercel --prod --yes`

## Deploy

```bash
npx vercel --prod --yes
```

Or connect the repo to the [Vercel dashboard](https://vercel.com) for automatic deploys on push.

## License

MIT
