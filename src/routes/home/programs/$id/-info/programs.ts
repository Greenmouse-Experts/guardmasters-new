import { Award, Clock, GraduationCap, type LucideIcon } from "lucide-react";

export interface ProgramStat {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface ProgramModule {
  title: string;
  description: string;
  topics?: string[];
}

export interface RelatedCourse {
  id: string;
  category: string;
  level: string;
  title: string;
  price: string;
}

export interface Program {
  number: string;
  fullTitle: string;
  description: string;
  formattedPrice: string;
  priceNote: string;
  image: string;
  imageAlt: string;
  stats: ProgramStat[];
  includes: string[];
  outcomes: string[];
  modules: ProgramModule[];
  relatedCourses: RelatedCourse[];
}

/**
 * Builds a stable, URL-safe program id from its number + title, e.g.
 * ("01", "Mini-MBA (Security Project Management)")
 *   -> "01-mini-mba-security-project-management".
 * Used by both the program cards (to link) and this record (as keys) so
 * navigation always maps to the right program.
 */
export function toProgramSlug(number: string, title: string): string {
  const name = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${number}-${name}`;
}

export const programs: Record<string, Program> = {
  "01-mini-mba-security-project-management": {
    number: "01/ Mini-MBA",
    fullTitle: "Mini-MBA (Security Project Management)",
    description:
      "Plan, budget, and deliver complex security projects on time and on scope. Learn modern PM frameworks, risk control, and stakeholder leadership for security environments.",
    formattedPrice: "CA$595",
    priceNote: "One-time tuition",
    image: "/programs/mini-mba.png",
    imageAlt: "Mini-MBA (Security Project Management)",
    stats: [
      { icon: Clock, label: "Duration", value: "60 hrs" },
      { icon: GraduationCap, label: "Level", value: "Advanced" },
      { icon: Award, label: "CPE Credits", value: "40" },
    ],
    includes: [
      "60 hrs of immersive content",
      "40 ASIS CPE credits",
      "Lifetime access to materials",
      "Certificate on successful completion",
      "Practitioner-led faculty",
    ],
    outcomes: [
      "Plan, budget, and deliver complex security projects on time and on scope.",
      "Up to 40 ASIS-International CPE credits toward your recertification.",
      "Apply modern project-management frameworks aligned to global best practice.",
      "Build the strategic vocabulary expected by executives and boards.",
      "Translate theory into real-world organizational outcomes.",
      "Join a global cohort of practitioner-led peers.",
    ],
    modules: [
      {
        title: "Module 1 — Foundations of Business & Management",
        description:
          "Business fundamentals, principles of management and leadership, organizational behaviour, and financial literacy for security managers.",
        topics: [
          "Understanding business fundamentals",
          "Principles of management and leadership",
          "Organizational behaviour & corporate culture",
          "Business environment and corporate governance",
          "Financial and management accounting essentials",
        ],
      },
      {
        title: "Module 2 — Introduction to Security Project Management",
        description:
          "Deep-dive into the program's core domain — governance, risk, operations, and the strategic decisions that define the function.",
      },
      {
        title: "Module 3 — Project Initiation and Strategic Alignment",
        description:
          "Design, implementation, and management of physical security from a manager's perspective — access control, surveillance, and systems integration.",
      },
      {
        title: "Module 4 — Planning Security Projects",
        description:
          "Deliver security initiatives on time, within scope, and aligned with organizational objectives.",
      },
      {
        title:
          "Module 5 — Security Project Risk, Compliance, and Quality Management",
        description:
          "Translate the program into a real-world capstone aligned with your organization's objectives.",
      },
      {
        title:
          "Module 6 — Introduction to Financial and Management Accounting for Security Managers",
        description:
          "Deep-dive into the program's core domain — governance, risk, operations, and the strategic decisions that define the function.",
      },
      {
        title: "Module 7 — Security Management and Delivering Value",
        description:
          "Design, implementation, and management of physical security from a manager's perspective — access control, surveillance, and systems integration.",
      },
      {
        title:
          "Module 8 — Security Leadership, Culture, and Workforce Engagement",
        description:
          "Design, implementation, and management of physical security from a manager's perspective — access control, surveillance, and systems integration.",
      },
      {
        title: "Module 9 — Project Execution and Control",
        description:
          "Deliver security initiatives on time, within scope, and aligned with organizational objectives.",
      },
      {
        title: "Module 10 — Security Technology and Infrastructure Deployment",
        description:
          "Translate the program into a real-world capstone aligned with your organization's objectives.",
      },
      {
        title: "Module 11 — Project Closeout, Handover, and Evaluation",
        description:
          "Translate the program into a real-world capstone aligned with your organization's objectives.",
      },
      {
        title: "Module 12 — Capstone Project and Leadership Development",
        description:
          "Translate the program into a real-world capstone aligned with your organization's objectives.",
      },
    ],
    relatedCourses: [
      {
        id: "security-supervision-management",
        category: "Mini-MBA",
        level: "Intermediate",
        title: "Mini-MBA Security Supervision & Management",
        price: "CA$595",
      },
      {
        id: "security-project-management",
        category: "Mini-MBA",
        level: "Advanced",
        title: "Mini-MBA Security Project Management",
        price: "CA$595",
      },
      {
        id: "security-guard-force-management",
        category: "Mini-MBA",
        level: "Intermediate",
        title: "Mini-MBA Security Guard Force Management",
        price: "CA$595",
      },
    ],
  },
};

export const defaultProgramId = "01-mini-mba-security-project-management";
