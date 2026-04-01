# Vercel Deployment Checklist

This project is now configured for deployment on Vercel. Follow these steps to deploy:

## Pre-Deployment Checklist

- [ ] Ensure all environment variables are set up in Vercel dashboard
- [ ] Update `NEXT_PUBLIC_APP_URL` to your production domain
- [ ] Verify database migrations are up-to-date locally
- [ ] Test production build locally: `npm run build && npm start`
- [ ] Ensure no uncommitted changes: `git status`

## Environment Variables Required in Vercel

Add these variables in your Vercel project settings:

### Required
- `DATABASE_URL` - Your Neon PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `DISCORD_BOT_TOKEN` - Discord bot token
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_APP_URL` - Your production domain (e.g., https://yourdomain.com)

### Optional
- `DISCORD_APPLICATION_ID` - Discord application ID

## Deployment Steps

### Option 1: Deploy via Git Push (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure the build
3. Push to main branch: `git push origin main`
4. Monitor deployment in Vercel dashboard

### Option 2: Deploy via CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### Option 3: Manual Upload
1. Go to https://vercel.com and create a new project
2. Select your repository
3. Add environment variables
4. Click Deploy

## Database Migration

Vercel will run builds without automatic database migrations. You have two options:

### Option A: Manual Migration (Recommended)
1. Deploy to Vercel
2. Run migrations locally or via a separate database management tool
3. Or execute: `prisma db push` locally after deployment

### Option B: Automatic Migration Hook (For future deployments)
Create a script in `/prisma` folder or use Vercel's deployment hooks:
1. In Vercel dashboard: Settings → Git → Deploy Hooks
2. Create hook to run database migrations

## Post-Deployment

- [ ] Verify site is accessible at production domain
- [ ] Test authentication (Clerk sign-in/up)
- [ ] Test API endpoints
- [ ] Test Stripe integration
- [ ] Check Discord bot integration
- [ ] Monitor performance in Vercel Analytics
- [ ] Enable automatic deployments for main branch

## Troubleshooting

### Build fails with Prisma errors
- Ensure `postinstall` script runs: `prisma generate`
- Check that `DATABASE_URL` is set in Vercel environment

### Runtime errors with database
- Verify `DATABASE_URL` in Vercel matches production database
- Check Prisma adapter settings in `src/db.ts`
- Ensure migrations are applied with `prisma migrate deploy`

### Edge Function issues
- Current API uses Vercel Edge Runtime (serverless)
- File: `src/app/api/[[...route]]/route.ts` (marked with `runtime = "edge"`)
- Ensure all dependencies are compatible with Edge Runtime

### Large dependency warnings
- `wrangler` is included for Cloudflare deployment - not needed for Vercel
- Can be removed from production: keep in devDependencies for future Cloudflare use

## Monitoring

- Use Vercel Analytics to monitor performance
- Check Vercel Logs for errors
- Monitor Neon database performance
- Review Clerk authentication logs
- Track Stripe webhook events

## Documentation Links

- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/orm/prisma-client/deployment/deployment-guide)
- [Clerk Deployment Docs](https://clerk.com/docs/deployment/overview)
- [Neon Database Docs](https://neon.tech/docs)

---

**Created:** 2024
**Project Type:** Next.js 14 + TypeScript + Prisma + Clerk + Stripe
