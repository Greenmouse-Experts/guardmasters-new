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
export const default_stats: ProgramStat[] = [
  { icon: Clock, label: "Duration", value: "60 hrs" },
  { icon: GraduationCap, label: "Level", value: "Advanced" },
  { icon: Award, label: "CPE Credits", value: "40" },
];
export const default_outcomes: string[] = [
  "Plan, budget, and deliver complex security projects on time and on scope.",
  "Up to 40 ASIS-International CPE credits toward your recertification.",
  "Apply modern project-management frameworks aligned to global best practice.",
  "Build the strategic vocabulary expected by executives and boards.",
  "Translate theory into real-world organizational outcomes.",
  "Join a global cohort of practitioner-led peers.",
];

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
  "02-certified-protection-officer-cpo": {
    image: "/programs/cpo.png",
    imageAlt: "",
    number: "",
    fullTitle: "Certified Protection Officer (CPO)",
    description:
      "Become a Certified Protection Officer with IFPO-accredited training. Master asset protection, emergency response, security operations, and professional ethics — the global gold standard for protection professionals",
    formattedPrice: "",
    priceNote: "",
    stats: [],
    includes: [],
    outcomes: [],
    modules: [
      {
        title: "Module 1 — Foundations of Asset and Protection Principles",
        description:
          "Business fundamentals, principles of management and leadership, organizational behaviour, and financial literacy for security managers.",
        topics: [
          "Asset Protection Concepts and Evolution",
          "The Protection Officer as a Leader",
          "The Role of the Professional Protection Officer",
          "Career Planning for Protection Officers",
          "The Security Officer of the 21st Century",
          "Professional Ethics and Conduct in Security Operations",
        ],
      },
      {
        title: "Module 2 — Communications",
        description:
          "This module focuses on effective communication as a critical operational skill for Protection Officers. It covers verbal and non-verbal communication, report writing, radio procedures, incident briefings, and professional interaction with clients, colleagues",
      },
      {
        title: "Module 3 — Protection Officer Functions",
        description:
          "This module examines the core duties and responsibilities of the Protection Officer in operational environments.",
      },
      {
        title: "Module 4 — Crime Prevention and Physical Security",
        description:
          "This module introduces crime prevention principles and practical physical security measures used to deter, detect, and respond to threats.",
      },
      {
        title: "Module 5 — Safety and Fire Protection",
        description:
          "This module addresses workplace safety responsibilities and fire protection fundamentals relevant to Protection Officers.",
      },
      {
        title: "Module 6 — Information Protection",
        description:
          "This module introduces the fundamentals of protecting sensitive information in operational settings.",
      },
      {
        title: "Module 7 — Deviance Crime and Violence",
        description:
          "This module examines deviant behaviour, criminal activity, and workplace violence from a security operations perspective.",
      },
      {
        title: "Module 8 — Risk and Threat Management",
        description:
          "This module introduces the principles of risk and threat management within security operations.",
      },
      {
        title: "Module 9 — Investigation Concepts and Practices",
        description:
          "This module introduces the investigative role of the Protection Officer within organizational and legal boundaries.",
      },
      {
        title: "Module 10 — Legal Aspects of Security",
        description:
          "This module examines the legal framework governing security operations.",
      },
      {
        title: "Module 11 — Officer Safety and Use of Force",
        description:
          "This module focuses on personal safety and lawful use of force in security operations.",
      },
      {
        title: "Module 12 — Contraband Detection Technology",
        description:
          "This module introduces modern technologies used in contraband detection and aerial surveillance.",
      },
      {
        title: "Module 13 — Relations with Others",
        description:
          "This module emphasizes professional relationships as a cornerstone of effective security work.",
      },
      {
        title: "Module 14 — Your Career As A Security/Protection Officer",
        description:
          "This module focuses on professional growth and long term career development in the security industry.",
      },
      {
        title: "Module 15 — CPO Final Mock Test",
        description:
          "This module prepares candidates for the Certified Protection Officer examination through a structured mock assessment.",
      },
    ],
    relatedCourses: [],
  },
};

export const defaultProgramId = "01-mini-mba-security-project-management";
