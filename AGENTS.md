<!-- intent-skills:start -->
## Skill Loading

Before substantial work:
- Skill check: run `bunx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `bunx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

## Conventions

### API & Data Fetching
- Use **@tanstack/react-query** (`useQuery` / `useMutation`) for all API calls.
- Surface errors and success feedback with **sonner** toasts.

### Forms
- Use **react-hook-form** (`useForm`, `register`, `handleSubmit`, `formState`) for all forms — no `useState`-based controlled inputs.

### Payments
- Checkout posts to `orders/create` with `{ courses: [{ id, price }], amount, callback_url }` (callback_url = `${window.location.origin}/payment/callback`) via a react-query `useMutation` on `apiClient` (it attaches the bearer token); surface failures with sonner.
- The server initializes the transaction and returns `data.authorization_url` / `data.access_code`. Resume it **inline with the Paystack popup** (`@paystack/inline-js` → `new PaystackPop().resumeTransaction(accessCode, { onSuccess, onCancel, onError })`); the access code is `data.access_code` or the last path segment of `authorization_url`.
- On `onSuccess`: **clear the cart** and send the user to `/payment/callback?reference=…`.

### Tooling
- Typecheck with `npx tsgo --noEmit` (not `tsc`).
