import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/home/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div data-theme="guard" className="min-h-screen bg-base-100">
      {/* Hero */}
      <section className="bg-black px-6 pt-20 pb-16 md:px-16">
        <div className="container mx-auto">
          <span className="mb-6 inline-block rounded-md bg-white/15 px-3 py-1 text-xs font-medium tracking-[0.18em] text-white/80 uppercase">
            Sign up
          </span>
          <h1 className="text-4xl leading-tight font-light text-white md:text-6xl">
            Create your <span className="text-primary">account.</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-white/50">
            Join professionals advancing their careers in corporate security,
            loss prevention, and risk management.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-2xl border border-base-300 bg-base-200 p-8 md:p-14">
          <div className="mb-12 flex flex-col items-center">
            <div className="flex items-center justify-center bg-accent px-8 py-5">
              <img
                src="/logo.png"
                alt="Guardmaster Institute"
                className="h-12 w-auto object-contain"
              />
            </div>
            <h2 className="mt-8 text-2xl font-medium text-accent md:text-3xl">
              Begin Your Learning{" "}
              <span className="text-secondary">Journey</span>
            </h2>
          </div>

          <form
            className="space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="First name"
                name="firstName"
                placeholder="Enter First name"
              />
              <Field
                label="Last name"
                name="lastName"
                placeholder="Enter Last name"
              />
            </div>

            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
            />

            <div>
              <Label htmlFor="phone">Phone number</Label>
              <div className="flex items-stretch border border-base-300 bg-base-100 focus-within:border-secondary">
                <select
                  aria-label="Country code"
                  className="border-r border-base-300 bg-transparent px-3 text-base-content focus:outline-none"
                >
                  <option value="+1-us">🇺🇸 +1</option>
                  <option value="+1-ca">🇨🇦 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+234">🇳🇬 +234</option>
                </select>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full bg-transparent px-4 py-3 text-base-content focus:outline-none"
                />
              </div>
            </div>

            <Field
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
            />
            <Field
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />

            <label className="flex items-start gap-3 text-sm text-base-content/70">
              <input
                type="checkbox"
                name="agree"
                className="checkbox checkbox-sm mt-0.5 rounded-none"
              />
              <span>
                I have read and agreed to GuardMaster Institute Privacy Policy
                and Terms of Use
              </span>
            </label>

            <button
              type="submit"
              className="btn btn-block h-auto rounded-none border-none bg-secondary py-4 font-medium text-secondary-content hover:bg-secondary/90"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-base-content/60">
            Already have an account?{" "}
            <Link
              to="/home/auth/login"
              className="font-medium text-secondary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-xs font-medium tracking-[0.15em] text-base-content/50 uppercase"
    >
      {children}
    </label>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

function Field({ label, name, type = "text", placeholder }: FieldProps) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
      />
    </div>
  );
}
