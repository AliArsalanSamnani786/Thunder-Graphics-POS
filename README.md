# Thunder POS

This workspace was generated from `C:\Users\CZ\Desktop\Master Prompt.txt`.

Current artifact:

- `Thunder-POS-Master-Deliverables.md`: ordered master deliverables following the prompt exactly from SRS through production checklist.

Recommended next build order:

1. Scaffold the monorepo with `apps/web`, `apps/api`, `prisma`, `infra`, and `docs`.
2. Implement authentication, tenant isolation, trial lifecycle, and audit logging first.
3. Implement POS, inventory, and accounting transaction flows together because they must stay financially consistent.
4. Add reporting, offline sync, AI insights, monitoring, and CI/CD after the core domain is stable.

