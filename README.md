# TideSafe.net

A one-page lead site for TideSafe, which does king tide flood risk assessments for Newport Harbor homes.
It's built with Next.js 15 and Tailwind CSS 4 and runs on Vercel.

## Edit content
Almost everything lives in **`lib/site.ts`**:
- phone, email, YouTube video ID, countdown date
- tide predictions, the two services and their prices, the photo slider steps, FAQ, sources

Photos are in `public/photos/`. The social share image is `public/og.jpg`.

## Before launch (TODO)
1. **Phone and email:** update `phoneDisplay`, `phoneHref` and `email` in `lib/site.ts`.
2. **Form:** create a free form at https://formspree.io and point it at the email that should get leads.
   Copy the form ID (the part after `/f/`) into the Vercel environment variable
   `NEXT_PUBLIC_FORMSPREE_ID`. Until you do, the form shows a "call or email us" message instead of sending.

## Run locally
```bash
npm install
cp .env.example .env.local   # add your Formspree ID
npm run dev                  # http://localhost:3000
```

## Deploy (GitHub → Vercel)
1. Create a new GitHub repo (e.g. `tidesafe`) and push this folder:
   ```bash
   git init && git add . && git commit -m "TideSafe site"
   git branch -M main
   git remote add origin https://github.com/<you>/tidesafe.git
   git push -u origin main
   ```
2. In Vercel: **Add New → Project → Import** the repo. The framework is detected as Next.js, so there's nothing else to configure.
3. **Settings → Environment Variables:** add `NEXT_PUBLIC_FORMSPREE_ID`, then redeploy.
4. **Settings → Domains:** add `tidesafe.net` and `www.tidesafe.net`, and follow the DNS instructions.
5. **Analytics:** enable Web Analytics in the Vercel project. Form submissions are tracked as the `assessment_request` event.
