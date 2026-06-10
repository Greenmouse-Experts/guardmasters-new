const navLinks = ["Home", "About", "Programs", "Accreditations", "Contact"];

export default function HomeNav() {
  return (
    <div
      data-theme="guard"
      className="navbar absolute top-0 z-50 w-full gap-4 bg-transparent px-4 py-5 md:px-10"
    >
      <div className="container mx-auto navbar">
        <div className="navbar-start">
          <a className="shrink-0 cursor-pointer">
            <img
              src="/logo.png"
              alt="Guardmaster Institute"
              className="h-10 w-auto shrink-0 object-contain md:h-18"
            />
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            {navLinks.map((link) => (
              <li key={link}>
                <a className="text-lg font-medium text-white/60 transition-colors hover:bg-transparent hover:text-white">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-4">
          <label className="hidden h-11 w-64 items-center gap-2 rounded-full bg-white/10 px-5 text-white/50 backdrop-blur-sm md:flex ring">
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </label>
          <button className="btn btn-primary hidden rounded-md px-6 font-semibold text-primary-content shadow-md lg:inline-flex">
            Enroll Now
          </button>
          <label
            htmlFor="home-drawer"
            aria-label="open sidebar"
            className="btn btn-ghost text-white/70 lg:hidden"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
}
