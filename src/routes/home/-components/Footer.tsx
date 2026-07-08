import type { ComponentType, SVGProps } from "react";
import { Link } from "@tanstack/react-router";

interface FooterLink {
  name: string;
  path?: string;
  search?: Record<string, string>;
  external?: string;
}

const quickLinks: FooterLink[] = [
  { name: "Home", path: "/home" },
  { name: "About Us", path: "/home/about" },
  { name: "Training Programs", path: "/home/programs" },
  { name: "News & Blogs", path: "/home/blog" },
  { name: "Contact Us", path: "/home/contact" },
];

const resourceLinks: FooterLink[] = [
  { name: "Our Accreditations", path: "/home/accreditations" },
  { name: "Terms & Conditions", path: "/home/terms", search: { tab: "terms" } },
  { name: "Privacy Policy", path: "/home/terms", search: { tab: "privacy" } },
  { name: "Cookie Policy", path: "/home/terms", search: { tab: "cookie" } },
  { name: "Student Login", path: "/home/auth/login" },
];

type IconProps = SVGProps<SVGSVGElement>;

const LinkedinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const FacebookIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
  </svg>
);

const TwitterIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3L17.61 20.65z" />
  </svg>
);

const YoutubeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z" />
  </svg>
);

const socials: { Icon: ComponentType<IconProps>; label: string }[] = [
  { Icon: LinkedinIcon, label: "LinkedIn" },
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: TwitterIcon, label: "Twitter" },
  { Icon: YoutubeIcon, label: "YouTube" },
];

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-6 text-lg font-bold uppercase tracking-[0.18em] text-primary">
      {children}
    </h3>
  );
}

function NavLink({ link }: { link: FooterLink }) {
  const cls =
    "group flex items-center gap-2 text-lg text-white/60 transition-colors hover:text-white";

  const inner = (
    <>
      <span className="text-primary transition-transform group-hover:translate-x-0.5">
        ›
      </span>
      {link.name}
    </>
  );

  if (link.path) {
    return (
      <Link to={link.path} search={link.search} className={cls}>
        {inner}
      </Link>
    );
  }
  return <span className={cls}>{inner}</span>;
}

export default function Footer() {
  return (
    <footer className="bg-accent text-white">
      <div className="container mx-auto px-6 py-16 md:px-12">
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            {/* GI badge */}
            <img src={"/logo.png"} className="mb-4 h-12" />

            <p className="text-lg leading-relaxed text-white/55">
              Guardmaster Institute Canada is an accredited professional
              security certifications training institution. Accredited by the
              American Council of Training & Development. Guardmaster Institute
              is an ASIS International Preferred CPE Provider
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <ColHeading>Quick Links</ColHeading>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <ColHeading>Resources</ColHeading>
            <ul className="space-y-3.5">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <NavLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <ColHeading>Contact Info</ColHeading>
            <ul className="space-y-4 text-lg text-white/60">
              <li>+1 437-545-1684</li>
              <li>info@guardmasterinstitute.ca</li>
              <li className="leading-relaxed">
                405 Victoria Avenue, Windsor, <br className="hidden sm:block" />
                Ontario N9A 4N1, Canada
              </li>
            </ul>

            {/* Social icons — outlined squares */}
            <div className="mt-8 flex gap-3">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  aria-label={label}
                  className="btn-primary btn-circle btn text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-primary/50" />

        {/* Bottom bar */}
        <p className="pt-8 text-center text-lg text-white/50">
          © 2026 Guardmaster Institute Canada. <br /> All rights reserved.
        </p>
      </div>
    </footer>
  );
}
