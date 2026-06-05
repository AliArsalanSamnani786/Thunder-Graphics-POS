# Deployment Instructions for Thunder POS

## Vercel

Deploy the repository root to Vercel. Do not set the Vercel root directory to `apps/web`; the root `vercel.json` deploys both the Next.js app and `/api/v1/*` serverless API routes.

Required environment variables:

- `DATABASE_URL`: production PostgreSQL connection string.
- `JWT_ACCESS_SECRET`: strong random secret.
- `JWT_REFRESH_SECRET`: strong random secret.
- `APP_URL`: your deployed app URL, for example `https://thunder-graphics-pos.vercel.app`.
- `API_URL`: same deployed app URL unless the API is deployed separately.
- `NEXT_PUBLIC_API_URL`: same deployed app URL unless the API is deployed separately.

## Database

Run migrations against the production database before testing registration:

```bash
pnpm prisma:deploy
```

If the database schema is missing, the registration button can route correctly but still fail when the API tries to create the tenant and owner user.

## Health Check

After deploy, verify the API route before testing registration:

```bash
curl https://your-vercel-domain.vercel.app/api/v1/health
```

Expected response:

```json
{"status":"ok","service":"thunder-pos-api","checkedAt":"..."}
```
