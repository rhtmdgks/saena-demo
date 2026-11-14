# Rapid Seven UI bridge: local development contract

Owner explicitly authorized connecting saena-demo to Rapid Seven: preserve original
UI, ChatGPT Search only, server session/tenant validation, aggregate/transform real
data, never show unmeasured values as measured performance. This unit owns
`lib/rapid7/**`, `app/api/rapid7/**`, `tests/rapid7/**`, this note and environment
example additions. No Rapid7 contract weakening, SQLite use, deployment, customer
outreach, real credential issuance or external observations.

## Implemented server boundaries

`GET /api/rapid7/dashboard` verifies the caller's RS256 bearer or secure session
cookie against a pinned public RSA key, exact issuer/audience, short lifetime,
server-defined subject membership and a single tenant. It selects only a configured
report ID and calls the existing Rapid7 read-only report API with that user's
bearer. No service account masquerading, user-selected origin or tenant, redirects,
raw file access or mutation. Upstream JSON is capped at 8 MiB and time-limited.
The approved Rapid7 API remains responsible for artifact integrity/read grants.
Failures are sanitized; responses are no-store. No tokens are logged.

`POST /api/rapid7/session` requires a valid bearer plus exact configured Origin.
It stores the existing short-lived bearer in an HttpOnly Secure SameSite=Strict
`__Host-` cookie, never issues a credential. DELETE clears it with the same origin
check. Requires HTTPS even for the local application; plain localhost HTTP cookie
fallback is intentionally absent. Token expiry is respected, and logout only clears
the browser cookie: upstream token revocation is not implemented by this bridge.
There is no IdP/login UI, renewal, account provisioning or production rate limiter.
The existing demo admin cookie does not grant access to this API.

## Data contract

Envelope: `schemaVersion:1`, `provider:'chatgpt-search'`, `sections`, `htmlAudit`,
`limitations`. Sections are brandVisibility, citationAnalysis, topicVisibility,
homeContent, marketingStrategy, stp, shoppingContent, modelContent, industryContent.
Every section currently returns `status:'unmeasured'` with an explanation, not zero
or placeholder performance. The actual validated upstream report appears under
`htmlAudit:{reportId,report}`. HTML diagnosis is NOT brand visibility, AI citation,
ROI or revenue observation. No registered measurement adapter is invented here.

## Verification and remaining gates

`node --test tests/rapid7/bridge.test.mjs`: 27 synthetic tests passed. Coverage:
issuer/audience/signature/expiry/subject, cross-tenant config, fake demo/duplicate
cookie refusal, origin check, pinned transport, report authorization, output scope,
upstream size/type/errors. Fetch is injected; this is not a live Rapid7/IdP test.
Parent integrator owns final TypeScript/build/UI regression and independent review.
Production requirements: real trusted issuer and membership lifecycle, registration
of authorized reports, rate limiting/deployment review, live integration verification.
No deployment or production-readiness claim. SQLite security review was not touched.

Follow-up boundary review: duplicate reportId and duplicate JSON keys (including escaped JWT claim keys), noncanonical signatures, and report top-level scope/tenant/count contract are rejected. The backend still owns nested artifact schema/hash and per-actor read-grant enforcement; the BFF does not weaken or replace it.

Independent-review fixes: session creation rejects tokens over 3500 bytes before
returning success or setting a cookie. DELETE only requires a valid configured
HTTPS application origin and same-origin request; missing upstream/key/membership
configuration cannot prevent clearing the browser cookie. Added actual POST/DELETE
route test via `tsx --test tests/rapid7/session-route.test.ts`: 1 test passed with
normal cookie, oversized rejection, missing unrelated settings, cross-origin denial
and missing application-origin denial. Core bridge regression remains 27/27 passed.

## Optional observation adapter (contract implemented, backend blocked)

Membership may additionally configure `observationIds` (maximum 100). An authorized
caller may select exactly one `observationId`; collection IDs are not URLs, file
paths or tenant selectors. With no HTML report grant, an observation-only user is
supported. Requests go only to `/v1/ui-observations/{collection_id}` on the same
pinned upstream. No client may register observations or collections.

Supplemental `observations` envelope contains `status`, `collectionId`, and `data`
from the validated contract: schema_version 1, collection_id, tenant_id, engine_id
`chatgpt-search`, status, sample_count, total_citations, unique_domains, by_day
(date/sample_count/citation_count), domain_counts (domain/count), evidence_ids,
coverage (expected_samples/measured_samples/missing_samples), provenance
(observation_id/artifact_hash/captured_at), and limitations. Counts and unique IDs,
coverage sums, daily sums, domain sums, source hash shape and tenant/engine binding
are checked. Expected cohort is operator input, never equated to observed count.
A valid nonempty observation with zero citations is measured; an empty collection
is unmeasured. Neither can fill unsupported brand/ROI/attribution dashboard metrics.

**Blocker:** Rapid7's new observation endpoint has NOT been implemented. Its
mandatory Ponytail workflow requires a signed `.saena/action-contract.json` not
present in the backend checkout. This bridge is an isolated adapter plus synthetic
contract tests, not a bypass or substitute backend implementation. Do not enable
observationIds operationally until that gate is legitimately satisfied and the
endpoint exists. Configuring an unavailable endpoint returns sanitized 503, not
fabricated measurements. The existing approved HTML API remains independently usable.

Validation after extension: core bridge 42/42 synthetic tests pass, session route
1/1 passes. Observation tests use injected fetch responses, not actual collected
AI evidence or a live Rapid7 endpoint. No actual citation uplift claim.

Final config hardening rejects private-key PEM in the public-key setting, even
though Node createPublicKey could derive a public key from it. Core 43/43 pass.

## Integrator checkpoint

Server core 43 tests, actual session-route 1 test, frontend adapter/regression 19 tests passed independently in the integration checkout. TypeScript noEmit passed. Next production compilation and static generation (45 routes) completed, but the pre-existing ESLint 9 / eslint-config-next 16 versus Next 15 legacy configuration reports a circular-config error. This is NOT a clean full quality-gate pass; lint is unresolved. Existing build configuration skips type checks, so TypeScript was run separately. No live IdP, signed customer observation collection, browser screenshot QA, or deployment performed. The original missing dirname import in scripts/optimize-images.ts was corrected to restore standalone type checking.
