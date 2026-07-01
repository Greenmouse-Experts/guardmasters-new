import type { ComponentType, SVGProps } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

interface FooterLink {
  name: string;
  path?: string;
}

const exploreLinks: FooterLink[] = [
  { name: "Home", path: "/home" },
  { name: "About Us", path: "/home/about" },
  { name: "Training Programs", path: "/home/programs" },
  { name: "News & Insights", path: "/home/blog" },
];

const resourceLinks: FooterLink[] = [
  { name: "Our Accreditations", path: "/home/accreditations" },
  { name: "Terms & Condition", path: "/home/terms" },
  { name: "Privacy Policy", path: "/home/privacy" },
  { name: "Cookie Policy", path: "/home/cookies" },
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

const accreditationLogos = [
  { src: "/accredition/asis.png", alt: "ASIS Preferred CPE Provider" },
  { src: "/accredition/chlps.png", alt: "CHLPS" },
  { src: "/accredition/actd.png", alt: "ACTD" },
  { src: "/accredition/csi.png", alt: "CSI Institute" },
  { src: "/accredition/iso.png", alt: "SBP" },
  { src: "/accredition/ifpo.png", alt: "IFPO Accredited Training Center" },
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
      <h3 className="mb-5 text-lg font-bold text-white">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            {link.path ? (
              <Link
                to={link.path}
                className="text-[15px] text-white/75 transition-colors hover:text-primary"
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
    <footer
      className="text-secondary-content"
      style={{
        backgroundImage: "url(/FOOTER.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
        <div className="container mx-auto px-6 py-16 md:px-12">
          {/* Main grid */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <img
                src="/logo.png"
                alt="Guardmaster Institute"
                className="mb-6 h-16 w-auto"
              />
              <p className="mb-8 max-w-xs text-[14px] leading-relaxed text-white/70">
                Guardmaster Institute Canada is an accredited professional
                security certifications training institution. Accredited by the
                American Council of Training &amp; Development. Guardmaster
                Institute is an ASIS International Preferred CPE Provider
              </p>
            </div>

            <FooterColumn title="Explore" links={exploreLinks} />
            <FooterColumn title="Resources" links={resourceLinks} />

            {/* Contact Info */}
            <div>
              <h3 className="mb-5 text-lg font-bold text-white">
                Contact Info
              </h3>
              <ul className="space-y-4">
                {contacts.map(({ Icon, content }) => (
                  <li key={content} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="whitespace-pre-line text-[15px] text-white/75">
                      {content}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-2">
                {socials.map(({ Icon, label }) => (
                  <a
                    key={label}
                    aria-label={label}
                    className="grid h-10 w-10 cursor-pointer place-items-center border border-primary text-primary transition-colors hover:bg-primary hover:text-primary-content"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 h-px w-full bg-white/10" />

          {/* Bottom bar */}
          <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-center text-sm text-white/60 md:text-left">
              © 2026 Guardmaster Institute of Corporate Security Management™
              <br />
              All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
              {accreditationLogos.map(({ src, alt }) => (
                <img
                  key={src}
                  src={src}
                  alt={alt}
                  className="h-14 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>
    </footer>
  );
}
