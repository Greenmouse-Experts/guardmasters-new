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

### Tooling
- Typecheck with `npx tsgo --noEmit` (not `tsc`).
