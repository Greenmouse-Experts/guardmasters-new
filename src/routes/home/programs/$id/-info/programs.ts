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
        title: "Module 1 — Introduction to the Private Security Industry",
        description:
          "Gain a comprehensive understanding of the private security industry, its evolution, market structure, regulatory framework, and growing role in public safety.",
        topics: [
          "Introduction to the Private Security Industry",
          "Ethics, and the Future of the Private Security Industry",
          "The Evolution, Significance of the Private Security Industry",
          "Public-Private Security Relationships",
          "Private Security Industry Oversight in Canada",
        ],
      },
      {
        title: "Module 2 — Foundations of Business and Management",
        description:
          "Develop essential business and management knowledge required for effective security leadership.",
      },
      {
        title:
          "Module 3 — Private Security Business Planning and Corporate Structuring",
        description:
          "Learn how to establish, structure, and manage a successful private security business.",
      },
      {
        title:
          "Module 4 — Security Service Design and Operational Excellence",
        description:
          "Discover how to design and deliver effective security services that meet client needs and industry standards.",
      },
      {
        title:
          "Module 5 — Accounting and Financial Management for Security Companies",
        description:
          "Build the financial management skills necessary to operate profitable and sustainable security organizations.",
      },
      {
        title:
          "Module 6 — Introduction to Financial and Management Accounting for Security Managers",
        description:
          "Develop financial fluency and decision-making skills that enable security leaders to communicate effectively with executives and stakeholders.",
      },
      {
        title:
          "Module 7 — Security Leadership, Culture, and Workforce Engagement",
        description:
          "Explore leadership principles that foster accountability, trust, and a strong security culture.",
      },
      {
        title:
          "Module 8 — Human Capital Management and Workforce Development",
        description:
          "Examine strategies for attracting, developing, and retaining high-performing security professionals.",
      },
      {
        title: "Module 9 — Sales, Marketing, and Client Relations",
        description:
          "Learn how to position security services competitively in the marketplace and build lasting client relationships.",
      },
      {
        title: "Module 10 — Legal, Ethical, and Regulatory Compliance",
        description:
          "Gain a practical understanding of the legal and regulatory responsibilities governing private security operations.",
      },
      {
        title: "Module 11 — Capstone Project and Business Case Study",
        description:
          "Apply the knowledge and skills gained throughout the program to a comprehensive business case study.",
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
  "07-professional-security-officer-certification-masterclass": {
    number: "07/ Masterclass",
    fullTitle: "Professional Security Officer Program (PSOP)",
    description:
      "An advanced IFPO certification that sharpens the core competencies of working security officers — communications, patrol, access control, emergency response, and the legal authority that governs the job.",
    formattedPrice: "CA$125",
    priceNote: "One-time tuition",
    image: "/programs/security-officer.png",
    imageAlt: "Professional Security Officer Program (PSOP)",
    stats: [
      { icon: Clock, label: "Duration", value: "60 hrs" },
      { icon: GraduationCap, label: "Level", value: "Advanced" },
      { icon: Award, label: "CPE Credits", value: "40" },
    ],
    includes: [
      "60 hrs of immersive content",
      "IFPO-accredited certification",
      "Lifetime access to materials",
      "Certificate on successful completion",
      "Practitioner-led faculty",
    ],
    outcomes: [
      "Demonstrate professional, ethical conduct as a security officer.",
      "Apply effective communication and report-writing skills on the job.",
      "Execute patrol, access control, and emergency response procedures with confidence.",
      "Understand legal authority, use-of-force, and liability considerations.",
      "Earn an IFPO-recognized credential respected by employers worldwide.",
      "Join a global cohort of practitioner-led peers.",
    ],
    modules: [
      {
        title:
          "Module 1 — General Overview and Introduction to the Security Industry",
        description:
          "Gain a foundational understanding of the security industry, its history, evolution, and significance in modern society.",
        topics: [
          "Introduction to Security Roles and Responsibilities",
          "Duties And Responsibilities of Security Officers",
          "Key Terminology in the Security Industry",
          "The Evolution of Security Practices",
        ],
      },
      {
        title:
          "Module 2 — Private Security Legislation, Regulation, and Code of Conduct",
        description:
          "Explore the legal and regulatory framework governing private security operations.",
      },
      {
        title: "Module 3 — Basic Security Operations and Procedures",
        description:
          "Develop practical skills in patrol operations, access control, crowd management, incident reporting, and emergency response.",
      },
      {
        title: "Module 4 — Evidence Collection, Note Taking, and Report Writing",
        description:
          "Learn how to accurately document incidents, collect and preserve evidence, and prepare professional reports.",
      },
      {
        title: "Module 5 — Health and Safety",
        description:
          "Understand the principles of workplace health and safety, risk management, and hazard identification.",
      },
      {
        title: "Module 6 — Fire, Emergency Preparedness, and Response",
        description:
          "Gain practical knowledge of fire safety, emergency preparedness, and incident response procedures.",
      },
      {
        title: "Module 7 — Physical and Preventive Security",
        description:
          "Explore the principles, systems, and practices used to protect people, property, and assets.",
      },
      {
        title: "Module 8 — Legal and Regulatory Authorities",
        description:
          "Develop an understanding of the legal authorities and limitations applicable to security officers.",
      },
      {
        title:
          "Module 9 — Effective Communication Skills for Security Officers",
        description:
          "Build strong verbal, non-verbal, and interpersonal communication skills essential for security professionals.",
      },
      {
        title: "Module 10 — Sensitivity Training for Security Officers",
        description:
          "Examine the importance of cultural awareness, professionalism, and respectful engagement in diverse environments.",
      },
      {
        title: "Module 11 — Use of Force Theory and the Security Officer",
        description:
          "Understand the principles, legal considerations, and decision-making processes surrounding the use of force.",
      },
      {
        title: "Module 12 — Emergency First Aid and Response Procedures",
        description:
          "Learn how to recognize medical emergencies and provide basic first aid assistance.",
      },
    ],
    relatedCourses: [
      {
        id: "certified-protection-officer-cpo",
        category: "Masterclass",
        level: "Advanced",
        title: "Certified Protection Officer (CPO)",
        price: "CA$125",
      },
      {
        id: "initial-security-officer-certification-masterclass",
        category: "Masterclass",
        level: "Beginner",
        title: "Initial Security Officer Certification - Masterclass",
        price: "CA$125",
      },
      {
        id: "certified-in-security-supervision-and-management-cssm-masterclass",
        category: "Masterclass",
        level: "Advanced",
        title: "Certified in Security Supervision and Management (CSSM)",
        price: "CA$125",
      },
    ],
  },
};

export const defaultProgramId = "01-mini-mba-security-project-management";
