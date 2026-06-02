# Thunder POS - Master Development Deliverables

Project: Thunder POS
Slogan: Sell at the Speed of Thunder
Target: Enterprise-grade, multi-tenant, web-based POS SaaS for retail, supermarket, restaurant, pharmacy, electronics, wholesale, service, and multi-branch businesses.

This document follows the requested final deliverable order exactly.

---

## 1. Software Requirements Specification (SRS)

### 1.1 Purpose

Thunder POS is a commercial SaaS platform for sales, inventory, customers, suppliers, accounting, employees, reporting, and administrative control. It must isolate each business tenant, protect user data, support trial onboarding, and scale to thousands of businesses.

### 1.2 User Roles

- Visitor: views landing page, pricing, FAQ, screenshots, WhatsApp contact.
- Business Owner: registers business, manages subscription, branches, users, settings.
- Manager: operates POS, inventory, purchases, reports, employees based on permissions.
- Cashier: performs billing, returns, refunds, customer lookup, receipts.
- Accountant: manages ledgers, journals, statements, cash flow, tax reports.
- Inventory Staff: manages stock, transfers, adjustments, batches, expiry, serials.
- Super Admin: manages platform tenants, subscriptions, fraud, support, impersonation.
- Support Agent: assists tenants through support mode with logged access.

### 1.3 Core Functional Requirements

- Display premium landing page with hero, features, screenshots, benefits, pricing, testimonials, FAQ, contact, WhatsApp support, and footer.
- Register new businesses with 7-day trial, automatic workspace creation, business ID generation, and default settings.
- Enforce email verification, phone verification, terms acceptance, and privacy acceptance.
- Request consented location verification and store security metadata.
- Detect duplicate trials and suspicious account creation by device, IP, phone, WhatsApp, and location patterns.
- Enforce tenant isolation through middleware, authorization, database policies, and `tenant_id` on tenant-owned records.
- Authenticate with JWT access tokens, refresh tokens, MFA, device verification, session management, login alerts, and login history.
- Provide POS billing with barcode, QR scanner, product search, quick sale, customer selection, cart, tax, discounts, coupons, promotions, split payments, holds, returns, refunds, exchanges, and receipts.
- Manage products, categories, brands, variants, warehouses, stock movements, serials, batches, and expiry dates.
- Manage customers, loyalty, membership, ledgers, purchase history, notes, and credit accounts.
- Manage suppliers, supplier ledgers, purchase orders, purchase returns, payments, and cost tracking.
- Provide double-entry accounting with chart of accounts, journals, general ledger, trial balance, balance sheet, profit and loss, and cash flow.
- Manage employees, attendance, shifts, salaries, permissions, and activity logs.
- Generate sales, profit, inventory, customer, supplier, tax, and employee reports with PDF, Excel, and CSV export.
- Support offline sales and inventory updates using IndexedDB with background synchronization and conflict resolution.
- Provide AI assistant capabilities for forecasting, low-stock prediction, fraud detection, and business insights.
- Provide a Super Admin dashboard for platform metrics, business management, subscription management, fraud tools, support mode, and impersonation logs.

### 1.4 Non-Functional Requirements

- Security: OWASP-aligned controls, secure cookies, rate limiting, input validation, audit logs, encryption, MFA, device verification, and least privilege.
- Privacy: tenant data isolation, explicit location consent, auditability, secure retention, and data export/delete workflows.
- Performance: POS checkout under 300 ms for local interactions and under 1 second for normal API responses.
- Scalability: horizontal API scaling, Redis caching, database pooling, stateless services, and Kubernetes readiness.
- Reliability: graceful offline mode, background sync, backups, monitoring, health checks, and disaster recovery.
- Compatibility: desktop, tablet, and mobile-friendly web UI; touch-friendly POS.
- Testability: minimum 90% coverage target across core domain, security, and high-risk workflows.

### 1.5 Trial Rules

- New business receives 7 days full feature access.
- Business ID format: `TP-000001`.
- Trial expiry automatically disables login and suspends workspace while preserving data.
- Expired trial screen displays WhatsApp activation CTA with business ID.

---

## 2. User Flow Diagrams

### 2.1 Visitor to Trial

```mermaid
flowchart TD
  A[Visitor opens landing page] --> B[Clicks Start Free Trial]
  B --> C[Registration form]
  C --> D[Accept terms and privacy]
  D --> E[Email verification]
  E --> F[Phone verification]
  F --> G[Location consent request]
  G --> H[Risk evaluation]
  H -->|Low/Medium| I[Create business workspace]
  H -->|High| J[Manual review]
  I --> K[Trial dashboard]
```

### 2.2 POS Sale

```mermaid
flowchart TD
  A[Cashier opens POS] --> B[Search/scan product]
  B --> C[Add item to cart]
  C --> D[Apply tax/discount/coupon]
  D --> E[Select customer]
  E --> F[Choose payment method]
  F --> G[Complete sale]
  G --> H[Update stock and ledger]
  H --> I[Issue receipt]
```

### 2.3 Trial Expiry

```mermaid
flowchart TD
  A[Trial scheduler runs] --> B[Find expired trials]
  B --> C[Suspend workspace]
  C --> D[Disable tenant login]
  D --> E[Preserve data]
  E --> F[Show activation message]
  F --> G[Open WhatsApp activation]
```

### 2.4 Super Admin Support

```mermaid
flowchart TD
  A[Super Admin searches business] --> B[Open business profile]
  B --> C[Review status, devices, login history]
  C --> D[Start support mode]
  D --> E[Impersonation token issued]
  E --> F[Action logged permanently]
  F --> G[Support session expires]
```

---

## 3. System Architecture Diagram

```mermaid
flowchart LR
  Web[Next.js Web App] --> CDN[CDN / Edge]
  CDN --> Nginx[Nginx Ingress]
  Nginx --> API[NestJS API]
  API --> Auth[Auth Module]
  API --> POS[POS Module]
  API --> Inventory[Inventory Module]
  API --> Accounting[Accounting Module]
  API --> Reports[Reporting Module]
  API --> AI[AI Module]
  API --> Redis[(Redis)]
  API --> DB[(PostgreSQL)]
  API --> S3[(S3 Compatible Storage)]
  API --> WS[WebSocket Gateway]
  API --> Queue[Background Jobs]
  Queue --> Redis
  Prom[Prometheus] --> API
  Graf[Grafana] --> Prom
```

### Architecture Notes

- Frontend: Next.js, TypeScript, Tailwind CSS, ShadCN UI, React Query, Zustand.
- Backend: NestJS with Clean Architecture, DDD modules, CQRS handlers, repositories, and domain services.
- Database: PostgreSQL via Prisma ORM.
- Cache and jobs: Redis.
- Realtime: NestJS WebSocket gateway.
- Storage: S3-compatible object storage for exports, invoices, attachments, and backups.
- Infrastructure: Docker, Docker Compose for local development, Kubernetes-ready manifests for production.
- Monitoring: Prometheus metrics and Grafana dashboards.

---

## 4. Complete PostgreSQL Database Design

### 4.1 Tenant and Identity

- `tenants`: business workspace root.
- `business_profiles`: legal and contact metadata.
- `users`: platform users scoped by tenant when applicable.
- `roles`: tenant and platform roles.
- `permissions`: atomic permission keys.
- `role_permissions`: role to permission mapping.
- `user_roles`: user to role mapping.
- `sessions`: refresh-token sessions and device bindings.
- `devices`: trusted and untrusted devices.
- `login_history`: login attempt records.
- `mfa_factors`: MFA secrets and status.
- `email_verifications`: email verification tokens.
- `phone_verifications`: phone verification attempts.

### 4.2 Trial, Subscription, and Risk

- `trial_accounts`: trial start, expiry, status.
- `subscriptions`: plan, billing status, activation dates.
- `plans`: Starter, Business, Enterprise.
- `risk_events`: device/IP/location/phone/WhatsApp risk signals.
- `location_verifications`: consented geolocation and browser metadata.

### 4.3 Business Operations

- `branches`: business locations.
- `warehouses`: stock storage locations.
- `settings`: tenant defaults and feature flags.
- `tax_rates`: sales and purchase tax rules.
- `payment_methods`: cash, card, bank transfer, mobile wallet.

### 4.4 Products and Inventory

- `categories`
- `brands`
- `products`
- `product_variants`
- `barcodes`
- `stock_items`
- `stock_movements`
- `stock_transfers`
- `stock_adjustments`
- `serial_numbers`
- `batches`
- `expiry_tracking`

### 4.5 Sales and POS

- `customers`
- `customer_ledger_entries`
- `loyalty_accounts`
- `loyalty_transactions`
- `sales`
- `sale_items`
- `sale_payments`
- `sale_discounts`
- `sale_taxes`
- `sale_returns`
- `sale_return_items`
- `held_sales`
- `receipts`

### 4.6 Suppliers and Purchases

- `suppliers`
- `supplier_ledger_entries`
- `purchase_orders`
- `purchase_order_items`
- `goods_receipts`
- `goods_receipt_items`
- `purchase_returns`
- `purchase_return_items`
- `vendor_payments`

### 4.7 Accounting

- `accounts`
- `journal_entries`
- `journal_lines`
- `fiscal_periods`
- `accounting_locks`
- `cash_drawers`
- `cash_movements`

### 4.8 Employees

- `employees`
- `attendance_entries`
- `shifts`
- `salary_runs`
- `salary_items`
- `employee_activity_logs`

### 4.9 Reporting, Audit, and AI

- `report_exports`
- `audit_logs`
- `impersonation_logs`
- `ai_predictions`
- `ai_insights`
- `offline_sync_batches`
- `offline_sync_conflicts`

### 4.10 Mandatory Database Rules

- Every tenant-owned table includes `tenant_id UUID NOT NULL`.
- Foreign keys must include tenant consistency checks at service/repository level.
- Enable PostgreSQL Row-Level Security for tenant-owned tables.
- Use composite indexes on `(tenant_id, id)` and workflow-specific keys.
- Use immutable audit rows for security-relevant events.

---

## 5. ER Diagram

```mermaid
erDiagram
  TENANTS ||--|| BUSINESS_PROFILES : owns
  TENANTS ||--o{ USERS : has
  TENANTS ||--o{ BRANCHES : has
  TENANTS ||--o{ WAREHOUSES : has
  TENANTS ||--o{ PRODUCTS : owns
  PRODUCTS ||--o{ PRODUCT_VARIANTS : has
  PRODUCT_VARIANTS ||--o{ STOCK_ITEMS : tracked_as
  WAREHOUSES ||--o{ STOCK_ITEMS : stores
  TENANTS ||--o{ CUSTOMERS : has
  TENANTS ||--o{ SUPPLIERS : has
  CUSTOMERS ||--o{ SALES : places
  SALES ||--o{ SALE_ITEMS : includes
  SALES ||--o{ SALE_PAYMENTS : paid_by
  SUPPLIERS ||--o{ PURCHASE_ORDERS : receives
  PURCHASE_ORDERS ||--o{ PURCHASE_ORDER_ITEMS : includes
  TENANTS ||--o{ ACCOUNTS : owns
  JOURNAL_ENTRIES ||--o{ JOURNAL_LINES : contains
  ACCOUNTS ||--o{ JOURNAL_LINES : posted_to
  USERS ||--o{ AUDIT_LOGS : triggers
  USERS ||--o{ SESSIONS : owns
```

---

## 6. API Specifications

### 6.1 API Standards

- Base path: `/api/v1`.
- Authentication: Bearer JWT access token.
- Refresh: secure HTTP-only refresh cookie or refresh token endpoint.
- Tenant context: derived from authenticated user and active workspace; never trusted from client body.
- Validation: DTO validation at controller boundary.
- Errors: structured JSON with `code`, `message`, `details`, and `requestId`.
- Pagination: cursor-based for large tables, page-based allowed for admin views.

### 6.2 Public API

- `POST /auth/register-business`
- `POST /auth/verify-email`
- `POST /auth/verify-phone`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/mfa/setup`
- `POST /auth/mfa/verify`
- `POST /security/location-verification`
- `GET /public/pricing`
- `POST /public/contact`

### 6.3 Tenant API

- `GET /me`
- `GET /dashboard/summary`
- `CRUD /branches`
- `CRUD /warehouses`
- `CRUD /categories`
- `CRUD /brands`
- `CRUD /products`
- `CRUD /product-variants`
- `POST /inventory/stock-in`
- `POST /inventory/stock-out`
- `POST /inventory/transfers`
- `POST /inventory/adjustments`
- `CRUD /customers`
- `GET /customers/:id/ledger`
- `CRUD /suppliers`
- `GET /suppliers/:id/ledger`
- `POST /pos/sales`
- `POST /pos/sales/:id/return`
- `POST /pos/sales/:id/refund`
- `POST /pos/held-sales`
- `POST /pos/held-sales/:id/resume`
- `GET /receipts/:id`
- `POST /receipts/:id/email`
- `POST /receipts/:id/whatsapp`
- `CRUD /purchase-orders`
- `POST /purchase-orders/:id/receive`
- `POST /purchase-returns`
- `CRUD /accounting/accounts`
- `POST /accounting/journals`
- `GET /accounting/general-ledger`
- `GET /accounting/trial-balance`
- `GET /accounting/balance-sheet`
- `GET /accounting/profit-loss`
- `GET /accounting/cash-flow`
- `CRUD /employees`
- `POST /attendance/check-in`
- `POST /attendance/check-out`
- `CRUD /shifts`
- `GET /reports/sales`
- `GET /reports/profit`
- `GET /reports/inventory`
- `GET /reports/customer`
- `GET /reports/supplier`
- `GET /reports/tax`
- `GET /reports/employee`
- `POST /reports/export`
- `POST /offline/sync`
- `GET /ai/insights`
- `GET /ai/forecast/sales`
- `GET /ai/forecast/inventory`

### 6.4 Super Admin API

- `GET /admin/dashboard`
- `GET /admin/businesses`
- `GET /admin/businesses/:id`
- `POST /admin/businesses/:id/suspend`
- `POST /admin/businesses/:id/activate`
- `POST /admin/businesses/:id/delete-request`
- `POST /admin/businesses/:id/extend-trial`
- `POST /admin/businesses/:id/change-plan`
- `POST /admin/businesses/:id/reset-password`
- `POST /admin/businesses/:id/change-email`
- `POST /admin/businesses/:id/change-phone`
- `POST /admin/businesses/:id/force-logout`
- `GET /admin/businesses/:id/devices`
- `GET /admin/businesses/:id/login-history`
- `GET /admin/fraud/risk-events`
- `GET /admin/subscriptions`
- `POST /admin/support/impersonate`
- `POST /admin/support/end-impersonation`
- `GET /admin/audit-logs`

---

## 7. Folder Structure

```text
thunder-pos/
  apps/
    web/
      app/
      components/
      features/
      lib/
      stores/
      styles/
      tests/
    api/
      src/
        main.ts
        app.module.ts
        common/
        config/
        database/
        modules/
          auth/
          tenant/
          security/
          super-admin/
          pos/
          inventory/
          customers/
          suppliers/
          purchases/
          accounting/
          employees/
          reports/
          offline-sync/
          ai/
        jobs/
        websocket/
      test/
  packages/
    shared/
    ui/
  prisma/
    schema.prisma
    migrations/
    seed.ts
  infra/
    docker/
    k8s/
    nginx/
    monitoring/
  docs/
  .github/
    workflows/
```

---

## 8. Backend Development

### 8.1 NestJS Modules

- `AuthModule`: registration, login, MFA, refresh tokens, verification.
- `TenantModule`: workspace context, tenant guard, tenant policies.
- `SecurityModule`: device verification, login alerts, rate limits, risk scoring.
- `SuperAdminModule`: platform dashboard, business control, support mode.
- `PosModule`: sales, returns, refunds, held sales, receipts.
- `InventoryModule`: products, stock movements, warehouses, transfers.
- `AccountingModule`: journals, ledgers, financial statements.
- `ReportsModule`: report queries and export jobs.
- `OfflineSyncModule`: sync batches and conflict resolution.
- `AiModule`: forecasting, insights, fraud signals.

### 8.2 Backend Rules

- Controllers receive DTOs only.
- Application services orchestrate use cases.
- Domain services enforce business invariants.
- Repositories isolate Prisma queries.
- All writes emit audit events.
- All tenant queries require active tenant context.
- Super Admin actions use platform permissions and permanent audit logs.

---

## 9. Frontend Development

### 9.1 Next.js App Areas

- `/`: landing page.
- `/register`: trial registration.
- `/verify`: email/phone verification.
- `/login`: login and MFA.
- `/trial-expired`: activation screen.
- `/app`: tenant dashboard shell.
- `/app/pos`: touch-friendly POS.
- `/app/inventory`: products, warehouses, stock.
- `/app/customers`: customers and loyalty.
- `/app/suppliers`: suppliers and purchases.
- `/app/accounting`: accounting module.
- `/app/employees`: employees and shifts.
- `/app/reports`: report center.
- `/app/settings`: business settings.
- `/admin`: Super Admin dashboard.

### 9.2 Frontend Rules

- Use server-rendered landing and authenticated app shell.
- Use React Query for API data and mutations.
- Use Zustand for POS cart and local UI state.
- Persist offline POS queue in IndexedDB.
- Make POS controls large, keyboard-friendly, and touch-friendly.
- Use role and permission checks before rendering restricted actions.

---

## 10. Authentication System

### 10.1 Registration

- Validate business name, owner name, email, mobile, WhatsApp, country, password, terms, and privacy.
- Create tenant in pending verification state.
- Generate `business_id`.
- Create owner user with Argon2 password hash.
- Send email and phone verification.
- Request consented location verification.
- Run risk scoring before activating trial.

### 10.2 Login

- Verify credentials.
- Check tenant status and trial/subscription state.
- Enforce MFA when configured or risk requires it.
- Verify device or trigger device challenge.
- Issue short-lived JWT and refresh token.
- Record login history and alert on suspicious login.

### 10.3 Expiry

- Scheduled job checks expired trials.
- Set tenant status to `SUSPENDED_TRIAL_EXPIRED`.
- Revoke active sessions.
- Preserve all tenant data.

---

## 11. Security Layer

### 11.1 Controls

- Argon2 password hashing.
- Access tokens with short expiry.
- Rotating refresh tokens.
- MFA with TOTP and backup codes.
- Device fingerprinting with user consent boundaries.
- Rate limiting per IP, account, and tenant.
- CSRF protection for cookie-authenticated routes.
- XSS protection through escaping, CSP, and safe rendering.
- SQL injection protection through Prisma and validation.
- Security headers through Helmet/Nginx.
- TLS 1.3 at ingress/load balancer.
- AES-256 encryption for sensitive fields.
- Key rotation through managed secrets.

### 11.2 Tenant Protection

- Tenant context guard on every tenant route.
- Repository-level tenant scoping.
- PostgreSQL RLS policies.
- Tests proving cross-tenant access is rejected.

### 11.3 Audit

- Log actor, tenant, action, entity, entity ID, IP, device, timestamp, request ID, and before/after metadata where appropriate.
- Make audit logs append-only.
- Log Super Admin support and impersonation activity separately.

---

## 12. Super Admin Panel

### 12.1 Dashboard

- Total businesses.
- Active businesses.
- Trial businesses.
- Expired businesses.
- Revenue statistics.
- Subscription statistics.
- Risk queue.
- Recent support sessions.

### 12.2 Business Management

- View, search, filter, suspend, activate, extend trial, change plan, reset password, change email, change phone, force logout, view devices, and view login history.
- Deletion must be a controlled request flow with retention checks.
- Every action writes an audit log.

### 12.3 Support Mode

- Super Admin can impersonate a tenant user with explicit reason.
- Support session is time-limited.
- UI displays support mode state.
- All actions are logged with original admin actor.

---

## 13. POS Module

### 13.1 Sale Workflow

- Start cart.
- Add product by search, barcode, QR, or quick sale.
- Apply tax, discount, coupon, and promotion rules.
- Attach customer.
- Accept one or more payments.
- Commit sale transaction.
- Update stock.
- Post accounting entries.
- Generate receipt.

### 13.2 Return and Refund

- Validate original sale.
- Calculate refundable items and taxes.
- Reverse stock and accounting entries.
- Record refund payment.
- Generate return receipt.

### 13.3 Offline POS

- Store cart, sale, and payment queue in IndexedDB.
- Use idempotency keys for sync.
- Resolve conflicts by version and timestamp.

---

## 14. Inventory Module

### 14.1 Product Model

- Product has category, brand, tax settings, unit, active status.
- Variant has SKU, barcode, price, cost, attributes.
- Stock item tracks warehouse, branch, quantity, reserved quantity, batch, serial, and expiry.

### 14.2 Stock Movement

- Each inventory mutation creates a stock movement.
- Movement types: sale, return, purchase, transfer, adjustment, stock in, stock out.
- Stock cannot go negative unless tenant setting permits it.

### 14.3 Expiry and Batch

- Batch-managed products require batch number.
- Expiry-managed products require expiry date.
- Reports flag expired and near-expiry stock.

---

## 15. Accounting Module

### 15.1 Double-Entry Rules

- Every posted transaction must balance debits and credits.
- Sales post revenue, tax payable, cash/accounts receivable, COGS, and inventory reduction.
- Purchases post inventory/assets, tax receivable if applicable, and accounts payable/cash.
- Returns and refunds post reversing entries.

### 15.2 Statements

- General Ledger from journal lines.
- Trial Balance from account balances.
- Profit and Loss from income and expense accounts.
- Balance Sheet from assets, liabilities, and equity.
- Cash Flow from cash account movements.

---

## 16. Reporting Module

### 16.1 Reports

- Sales by date, branch, cashier, product, category, customer, payment method.
- Profit by product, category, branch, period.
- Inventory valuation, movement, audit, low stock, expiry.
- Customer ledger, purchase history, loyalty.
- Supplier ledger and purchase analysis.
- Tax summary and detail.
- Employee attendance, activity, salary.

### 16.2 Exports

- PDF for printable statements.
- Excel for spreadsheet analysis.
- CSV for integrations.
- Exports run as background jobs for large data.

---

## 17. AI Module

### 17.1 Capabilities

- Sales forecasting by product, category, branch, and period.
- Inventory forecasting for reorder suggestions.
- Demand prediction using seasonal and historical sales signals.
- Low stock prediction using velocity and lead time.
- Fraud detection using duplicate trials, payment anomalies, return abuse, and suspicious login patterns.
- Smart insights for business owners.

### 17.2 AI Guardrails

- AI output is advisory, not authoritative.
- Never expose one tenant's data to another tenant.
- Keep prediction input scoped by tenant.
- Log AI-generated recommendations and user actions taken from them.

---

## 18. Docker Setup

### 18.1 Local Services

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: thunder
      POSTGRES_PASSWORD: thunder_dev
      POSTGRES_DB: thunder_pos
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  api:
    build: ./apps/api
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql://thunder:thunder_dev@postgres:5432/thunder_pos
      REDIS_URL: redis://redis:6379
    ports:
      - "3001:3001"

  web:
    build: ./apps/web
    depends_on:
      - api
    ports:
      - "3000:3000"

volumes:
  postgres_data:
```

---

## 19. CI/CD Pipeline

### 19.1 Pipeline Stages

- Install dependencies.
- Run lint.
- Run type checks.
- Run unit tests.
- Run integration tests.
- Run security tests.
- Run Prisma migration validation.
- Build API and web images.
- Run container vulnerability scan.
- Deploy to staging.
- Run E2E tests.
- Require approval for production.
- Deploy production.
- Run smoke tests.

### 19.2 GitHub Actions Outline

```yaml
name: ci
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
      - run: corepack enable
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
```

---

## 20. Deployment Guide

### 20.1 Environments

- Development: Docker Compose, local PostgreSQL, local Redis.
- Staging: Kubernetes namespace, managed PostgreSQL, managed Redis, staging S3, test email/SMS.
- Production: Kubernetes cluster, managed PostgreSQL HA, managed Redis HA, S3 storage, CDN, WAF, observability stack.

### 20.2 Deployment Steps

1. Provision DNS, TLS certificates, WAF, and CDN.
2. Provision PostgreSQL, Redis, S3-compatible storage, and secrets manager.
3. Apply Kubernetes namespaces, config maps, secrets, deployments, services, ingress, and autoscaling.
4. Run Prisma migrations.
5. Deploy API and web images.
6. Configure Prometheus scraping and Grafana dashboards.
7. Run smoke tests.
8. Enable backups and retention.
9. Enable alerting for API errors, database health, queue lag, payment failures, and trial-expiry jobs.

---

## 21. Production Checklist

- Landing page complete and responsive.
- Registration validates all required fields.
- Email and phone verification enabled.
- Location consent text shown before collecting geolocation.
- Trial creation, expiry, suspension, and activation tested.
- Tenant middleware active on all tenant routes.
- PostgreSQL RLS enabled for tenant-owned tables.
- Cross-tenant access tests passing.
- JWT, refresh token rotation, MFA, and device verification tested.
- Passwords hashed with Argon2.
- Security headers, CSRF protection, rate limiting, and API throttling enabled.
- Audit logs append-only and searchable.
- Super Admin actions fully logged.
- POS sale, return, refund, exchange, hold, resume, and receipt workflows tested.
- Inventory stock movements are transactionally consistent.
- Accounting entries balance for every financial transaction.
- Reports export to PDF, Excel, and CSV.
- Offline queue sync and conflict resolution tested.
- AI recommendations scoped to tenant data only.
- Docker Compose works locally.
- Kubernetes manifests reviewed.
- CI/CD pipeline passes lint, typecheck, tests, build, and security checks.
- Database backups enabled and restore tested.
- Monitoring dashboards and alerts enabled.
- Privacy policy and terms acceptance stored.
- Support impersonation is time-limited and fully audited.
- Production secrets are managed outside source code.
- Performance tests meet checkout and API latency targets.
- 90% coverage target met for core modules.

