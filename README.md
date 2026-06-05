# Thunder POS

Thunder POS is a multi-tenant SaaS platform with a Next.js web app, NestJS API, Prisma/PostgreSQL data layer, and Vercel deployment configuration.

## Workspace

- `apps/web`: Next.js application and registration proxy.
- `apps/api`: NestJS API used by `/api/v1/*`.
- `packages/shared`: shared domain helpers and types.
- `prisma`: database schema and migrations.

## Deployment

See `DEPLOY.md` for Vercel environment variables, API health checks, and database migration steps.
