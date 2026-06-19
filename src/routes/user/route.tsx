import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import {
  LayoutGrid,
  Users,
  Bell,
  ShoppingCart,
  Headphones,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  Menu,
  type LucideIcon,
} from "lucide-react";
import { clear_user, useProfile } from "#/store/authStore.ts";

export const Route = createFileRoute("/user")({
  component: RouteComponent,
});

interface NavLink {
  label: string;
  icon: LucideIcon;
  to?: string;
}

const mainLinks: NavLink[] = [
  { label: "Dashboard", icon: LayoutGrid, to: "/user" },
  { label: "My Courses", icon: Users, to: "/user/courses" },
  { label: "Notifications", icon: Bell, to: "/user/notifications" },
  {
    label: "Purchase History",
    icon: ShoppingCart,
    to: "/user/purchase-history",
  },
  { label: "Support", icon: Headphones, to: "/user/support" },
];

function RouteComponent() {
  const navigate = useNavigate();
  const [profile] = useProfile();

  const name =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "Guest User";
  const initials =
    `${profile?.firstName?.[0] ?? ""}${profile?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "GU";
  const picture = profile?.picture;

  function handleLogout() {
    clear_user();
    navigate({ to: "/home/auth/login" });
  }

  const closeDrawer = () => {
    const drawer = document.getElementById(
      "user-drawer",
    ) as HTMLInputElement | null;
    if (drawer) drawer.checked = false;
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="user-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main */}
      <div className="drawer-content flex min-h-screen flex-col bg-base-200 text-base-content">
        <header className="flex h-20 items-center justify-between gap-3 px-6 md:px-10 lg:justify-end">
          <label
            htmlFor="user-drawer"
            aria-label="Open menu"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-base-300 bg-base-100 text-accent lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </label>

          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="flex cursor-pointer items-center gap-3"
            >
              {picture ? (
                <img
                  src={picture}
                  alt={name}
                  className="h-9 w-9 rounded-full border border-base-300 object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-base-300 bg-base-100 text-xs font-semibold text-accent">
                  {initials}
                </div>
              )}
              <span className="hidden text-sm font-semibold tracking-wide text-accent uppercase sm:inline">
                {name}
              </span>
              <ChevronDown className="h-4 w-4 text-base-content/50" />
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content menu z-50 mt-2 w-44 rounded-lg border border-base-300 bg-base-100 p-1 shadow-lg"
            >
              <li>
                <Link
                  to="/home"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-base-content hover:bg-base-200"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/user/settings"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-base-content hover:bg-base-200"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-error hover:bg-error/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </header>

        <main className="flex-1 px-6 pb-12 md:px-10">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label
          htmlFor="user-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="flex min-h-full w-64 flex-col bg-accent text-accent-content">
          <SidebarNav onLogout={handleLogout} onNavigate={closeDrawer} />
        </aside>
      </div>
    </div>
  );
}

function SidebarNav({
  onLogout,
  onNavigate,
}: {
  onLogout: () => void;
  onNavigate?: () => void;
}) {
  return (
    <>
      <Link to="/" onClick={onNavigate} className="flex h-20 items-center px-6">
        <img
          src="/logo.png"
          alt="Guardmaster Institute"
          className="h-10 w-auto object-contain"
        />
      </Link>

      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        {mainLinks.map((link) => (
          <SidebarItem key={link.label} link={link} onNavigate={onNavigate} />
        ))}

        <div className="my-4 border-t border-white/10" />

        <SidebarItem
          link={{ label: "Settings", icon: Settings, to: "/user/settings" }}
          onNavigate={onNavigate}
        />
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm text-accent-content/70 transition-colors hover:bg-white/10 hover:text-accent-content"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </nav>
    </>
  );
}

function SidebarItem({
  link,
  onNavigate,
}: {
  link: NavLink;
  onNavigate?: () => void;
}) {
  const { icon: Icon, label, to } = link;
  const base =
    "flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/10";

  if (!to) {
    return (
      <button
        type="button"
        className={`${base} text-accent-content/70 hover:text-accent-content`}
      >
        <Icon className="h-5 w-5" />
        {label}
      </button>
    );
  }

  return (
    <Link
      to={to}
      onClick={onNavigate}
      activeOptions={{ exact: true }}
      activeProps={{
        className: `${base} bg-base-100 font-medium text-accent`,
      }}
      inactiveProps={{
        className: `${base} text-accent-content/70 hover:text-accent-content`,
      }}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}
