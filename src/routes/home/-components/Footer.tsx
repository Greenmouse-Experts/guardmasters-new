import type { ComponentType, SVGProps } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";

interface FooterLink {
  name: string;
  path?: string;
}

const exploreLinks: FooterLink[] = [
  { name: "Home", path: "/home" },
  { name: "About Us", path: "/home/about" },
  { name: "Training Programs", path: "/home/programs" },
  { name: "News & Insights" },
];
const resourceLinks: FooterLink[] = [
  { name: "Accreditations", path: "/home/accreditations" },
  { name: "Faculty", path: "/home/about" },
  { name: "Contact", path: "/home/contact" },
  { name: "Sign in", path: "/home/auth/login" },
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

const contacts = [
  { Icon: Phone, content: "+1 437-545-1684" },
  { Icon: Mail, content: "info@guardmasterinstitute.ca" },
  {
    Icon: MapPin,
    content: "405 Victoria Avenue, Windsor,\nOntario N9A 4N1, Canada",
  },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            {link.path ? (
              <Link
                to={link.path}
                className="text-[15px] text-white/85 transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ) : (
              <span className="text-[15px] text-white/40">{link.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-accent text-secondary-content">
      <div className="container mx-auto px-6 py-16 md:px-12">
        {/* Top CTA */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="max-w-2xl text-4xl leading-[1.1] font-light text-white md:text-6xl">
            Step into the next class of{" "}
            <em className="text-primary not-italic italic">
              corporate security leaders.
            </em>
          </h2>

          <div className="max-w-md lg:pt-2">
            <p className="mb-6 text-[15px] leading-relaxed text-white/60">
              Join 250+ professionals advancing their careers through globally
              accredited certifications and Mini-MBA programs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="btn rounded-none border-none bg-white px-6 font-semibold text-accent gap-2 hover:bg-white/90"
                to="/home/programs"
              >
                Explore Programs
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <button className="btn rounded-none border border-white/40 bg-transparent px-6 font-semibold text-white hover:bg-white/10">
                Talk to Admissions
              </button>
            </div>
          </div>
        </div>

        <div className="my-12 h-px w-full bg-white/10" />

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <img
              src="/logo.png"
              alt="Guardmaster Institute"
              className="mb-6 h-16 w-auto "
            />
            <p className="mb-8 max-w-xs text-[15px] leading-relaxed text-white/55">
              An accredited professional certification training and consulting
              organization. ASIS International Preferred CPE Provider, IFPO
              Approved Training Centre, and ACTD Accredited.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  aria-label={label}
                  className="grid h-11 w-11 cursor-pointer place-items-center border border-white/20 text-white/80 transition-colors hover:border-primary hover:bg-primary hover:text-primary-content"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">
              Contact
            </h3>
            <ul className="space-y-4">
              {contacts.map(({ Icon, content }) => (
                <li key={content} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="whitespace-pre-line text-[15px] text-white/85">
                    {content}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 pt-8 text-xs tracking-wider text-white/50 uppercase md:flex-row md:items-center md:justify-between">
          <span>© 2026 Guardmaster Institute. All Rights Reserved</span>
          <div className="flex gap-8">
            <a className="cursor-pointer transition-colors hover:text-white">
              Terms
            </a>
            <a className="cursor-pointer transition-colors hover:text-white">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
