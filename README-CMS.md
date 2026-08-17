# NavPioneers CMS and hosting

## What the admin can edit

Sanity Studio manages homepage copy, contact details, every navigation SKU, CarPlay product, list image, detail image, fitment, specifications, and configurations.

## One-time setup

1. Create a Sanity project and dataset named `production` at sanity.io.
2. Copy `.env.example` to `.env` and replace the project ID.
3. Install dependencies with `npm install` from this folder.
4. Run `npm run studio`, sign in, and create content in the NavPioneers Studio.
5. Deploy the Studio with `npm run studio:deploy` and choose an admin-only URL such as `navpioneers.sanity.studio`.
6. Import this repository into Vercel. Set the Vercel project root to this folder and add `SANITY_PROJECT_ID` and `SANITY_DATASET` under Environment Variables.
7. Connect `navpioneers.com` in Vercel, then update the DNS records in GoDaddy exactly as Vercel provides.

The public website reads content through `/api/site-content`. The Sanity Studio remains the protected management interface, not a public page.
