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
  "03-mini-mba-business-interruption-and-emergency-management": {
    number: "03/ Mini-MBA",
    fullTitle: "Mini-MBA (Business Interruption and Emergency Management)",
    description:
      "Lead through crisis. Master business interruption response, emergency preparedness, incident command, and corporate crisis communications.",
    formattedPrice: "CA$595",
    priceNote: "One-time tuition",
    image: "/programs/business.png",
    imageAlt: "Mini-MBA (Business Interruption and Emergency Management)",
    stats: [
      { icon: Clock, label: "Duration", value: "50 hrs" },
      { icon: GraduationCap, label: "Level", value: "Advanced" },
      { icon: Award, label: "CPE Credits", value: "40" },
    ],
    includes: [],
    outcomes: [],
    modules: [
      {
        title: "Module 1 — Foundations of Business & Management",
        description:
          "This module equips corporate security managers with essential business and management fundamentals required to operate effectively within modern organizations.",
        topics: [
          "Understanding business fundamentals",
          "Principles of management and leadership",
          "Organizational behaviour & corporate culture",
          "Business environment and corporate governance",
          "Financial and management accounting essentials",
        ],
      },
      {
        title: "Module 2 — Introduction to Business Disruptions and Emergencies",
        description:
          "Gain a foundational understanding of business disruptions, emergencies, and organizational vulnerabilities. Learn how leaders assess threats, manage disruptions, and protect operational continuity during crisis situations.",
      },
      {
        title: "Module 3 — Emergency Preparedness Planning",
        description:
          "Explore the principles and frameworks used to prepare organizations for emergencies. Learn how to identify risks, develop response plans, and coordinate preparedness activities effectively.",
      },
      {
        title: "Module 4 — Incident Management Systems",
        description:
          "Understand the structure and operation of modern incident management systems. Learn how organizations coordinate response efforts, maintain situational awareness, and transition from response to recovery.",
      },
      {
        title: "Module 5 — Business Continuity ISO 22301 and Recovery Planning",
        description:
          "Develop a practical understanding of Business Continuity Management and the ISO 22301 framework. Learn how to design, implement, test, and improve continuity and recovery strategies for critical business functions.",
      },
      {
        title:
          "Module 6 — Introduction to Financial and Management Accounting for Security Managers",
        description:
          "Build financial literacy skills essential for security leaders and decision-makers. Learn how to interpret financial statements, manage budgets, and demonstrate the value of security investments.",
      },
      {
        title: "Module 7 — Security Management and Delivering Value",
        description:
          "Examine how security functions contribute to organizational success and business objectives. Learn to measure performance, communicate value, and align security strategies with corporate goals.",
      },
      {
        title:
          "Module 8 — Security Leadership, Culture, and Workforce Engagement",
        description:
          "Discover the leadership principles that foster strong security cultures and engaged workforces. Learn how communication, accountability, and employee participation strengthen organizational resilience.",
      },
      {
        title:
          "Module 9 — Emergency Risk Communication and Media Management",
        description:
          "Learn how to communicate effectively during emergencies and crises while maintaining stakeholder trust. Explore media relations, executive communication, reputation management, and post-crisis recovery strategies.",
      },
      {
        title: "Module 10 — Legal, Regulatory, and Ethical Considerations",
        description:
          "Examine the legal, regulatory, and ethical responsibilities associated with crisis and continuity management. Learn how governance, compliance, and ethical decision-making support organizational integrity.",
      },
      {
        title: "Module 11 — Technology in Emergency and Crisis Management",
        description:
          "Explore the role of technology in enhancing emergency preparedness, crisis response, and operational resilience. Learn how data analytics, cyber resilience, and decision-support systems improve crisis management outcomes.",
      },
      {
        title:
          "Module 12 — Business Emergency Management Capstone Case Study",
        description:
          "Apply the concepts and frameworks learned throughout the program to a comprehensive real-world case study. Develop practical solutions, strategic recommendations, and leadership approaches for managing complex emergency scenarios.",
      },
    ],
    relatedCourses: [],
  },
  "05-mini-mba-private-security-business-management": {
    number: "05/ Mini-MBA",
    fullTitle: "Mini-MBA (Private Security Business Management)",
    description:
      "Build and scale a private security business that wins contracts and retains clients. Master licensing, operations, business development, and financial management for the private security sector.",
    formattedPrice: "CA$595",
    priceNote: "One-time tuition",
    image: "/programs/private-business.png",
    imageAlt: "Mini-MBA (Private Security Business Management)",
    stats: [
      { icon: Clock, label: "Duration", value: "40 hrs" },
      { icon: GraduationCap, label: "Level", value: "Intermediate" },
      { icon: Award, label: "CPE Credits", value: "40" },
    ],
    includes: [
      "40 hrs of immersive content",
      "40 ASIS CPE credits",
      "Lifetime access to materials",
      "Certificate on successful completion",
      "Practitioner-led faculty",
    ],
    outcomes: [
      "Launch and structure a compliant private security business from the ground up.",
      "Up to 40 ASIS-International CPE credits toward your recertification.",
      "Develop pricing, bidding, and contract strategies that win and retain clients.",
      "Build operational systems for scheduling, deployment, and quality assurance.",
      "Apply sound financial management practices to grow a sustainable security firm.",
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
        title:
          "Module 2 — Introduction to Private Security Business Management",
        description:
          "Explore the structure, regulatory landscape, and business models that define the private security industry, from contract guarding to specialized protective services.",
      },
      {
        title: "Module 3 — Business Planning and Market Positioning",
        description:
          "Develop a business plan, identify target markets, and position your security firm against local and national competitors.",
      },
      {
        title:
          "Module 4 — Licensing, Regulatory Compliance, and Risk Management",
        description:
          "Navigate licensing requirements, insurance, bonding, and liability considerations specific to operating a private security company.",
      },
      {
        title: "Module 5 — Service Design and Operational Planning",
        description:
          "Design guarding, patrol, and protective service offerings, and build the operational plans needed to deliver them reliably.",
      },
      {
        title:
          "Module 6 — Introduction to Financial and Management Accounting for Security Managers",
        description:
          "Build financial literacy skills essential for security leaders and decision-makers. Learn how to interpret financial statements, manage budgets, and price services profitably.",
      },
      {
        title: "Module 7 — Security Management and Delivering Value",
        description:
          "Examine how security functions contribute to client outcomes. Learn to measure performance, communicate value, and align services with client objectives.",
      },
      {
        title:
          "Module 8 — Security Leadership, Culture, and Workforce Engagement",
        description:
          "Discover the leadership principles that foster strong security cultures and engaged frontline teams across multiple client sites.",
      },
      {
        title: "Module 9 — Sales, Marketing, and Client Acquisition",
        description:
          "Develop a sales and marketing strategy for winning new contracts, building referral networks, and growing your client base.",
      },
      {
        title:
          "Module 10 — Contract Management and Service Level Agreements",
        description:
          "Negotiate, structure, and manage client contracts and SLAs that protect your business while meeting client expectations.",
      },
      {
        title:
          "Module 11 — Human Resources, Recruitment, and Workforce Scheduling",
        description:
          "Recruit, train, and schedule security personnel across multiple sites while maintaining compliance and service quality.",
      },
      {
        title: "Module 12 — Capstone: Business Growth Strategy",
        description:
          "Apply the concepts and frameworks learned throughout the program to develop a growth strategy for a private security business.",
      },
    ],
    relatedCourses: [
      {
        id: "security-project-management",
        category: "Mini-MBA",
        level: "Advanced",
        title: "Mini-MBA Security Project Management",
        price: "CA$595",
      },
      {
        id: "loss-prevention-management",
        category: "Mini-MBA",
        level: "Intermediate",
        title: "Mini-MBA Loss Prevention Management",
        price: "CA$595",
      },
      {
        id: "security-supervision-management",
        category: "Mini-MBA",
        level: "Intermediate",
        title: "Mini-MBA Security Supervision & Management",
        price: "CA$595",
      },
    ],
  },
};

export const defaultProgramId = "01-mini-mba-security-project-management";
