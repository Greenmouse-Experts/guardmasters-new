import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import Footer from "./-components/Footer";
import HomeNav from "./-components/HomeNav";

const navLinks = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/home/about" },
  { name: "Programs", path: "/home/programs" },
  { name: "Accreditations", path: "/home/accreditations" },
  { name: "Contact", path: "/home/contact" },
] as const;

export const Route = createFileRoute("/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div data-theme="guard" className="drawer">
      <input id="home-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <HomeNav />
        <main className="min-h-120">
          <Outlet />
        </main>
        <Footer />
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
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-base font-medium text-secondary-content/80 hover:bg-white/10 hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/home/auth/signup"
            className="btn btn-primary mt-6 rounded-md font-semibold text-primary-content"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}
