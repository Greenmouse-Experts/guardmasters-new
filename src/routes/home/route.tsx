import { createFileRoute, Outlet } from "@tanstack/react-router";

const navLinks = ["Home", "About", "Programs", "Accreditations", "Contact"];

export const Route = createFileRoute("/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div data-theme="guard" className="drawer">
      <input id="home-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <Outlet />
      </div>

      <div className="drawer-side z-100">
        <label
          htmlFor="home-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full w-72 flex-col bg-secondary p-6 text-secondary-content">
          <div className="mb-10 flex items-center justify-between">
            <img
              src="/logo.png"
              alt="Guardmaster Institute"
              className="h-14 w-auto object-contain"
            />
            <label
              htmlFor="home-drawer"
              aria-label="close sidebar"
              className="btn btn-circle btn-ghost btn-sm"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>

          <ul className="menu flex-1 gap-1 p-0">
            {navLinks.map((link) => (
              <li key={link}>
                <a className="text-base font-medium text-secondary-content/80 hover:bg-white/10 hover:text-white">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <button className="btn btn-primary mt-6 rounded-md font-semibold text-primary-content">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
