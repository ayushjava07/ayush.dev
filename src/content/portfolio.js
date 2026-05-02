export const SITE = {
  name: "Ayush Kumar Jha",
  domain: "ayush.dev",
  role: "Full Stack Dev • Solana • UI",
  intro:
    "Building fast products with clean UI and real impact.",
  location: "India",
  email: "ayushjhasahab07@gmail.com",
  github: "ayushjava07",
  links: {
    github: "https://github.com/ayushjava07",
    linkedin: "https://www.linkedin.com/in/ayush-kumar-jha-09257b2b2/",
    x: "https://x.com/Ayushdev_01",
    portfolio: "https://ayush.dev",
  },
};

export const IMPACT = [
  { label: "PRs merged", value: "4+", hint: "OSS work" },
  { label: "Sites led", value: "5+", hint: "Frontend + deploy" },
  { label: "Users served", value: "1000+", hint: "Campus platforms" },
  { label: "Years", value: "2+", hint: "React + Web3" },
];

export const JOURNEY = [
  {
    title: "Non-CS to builder",
    period: "2024–now",
    description: "Learned by shipping in public.",
  },
  {
    title: "Frontend + performance",
    period: "2025",
    description: "Led 5+ client builds with fast UI.",
  },
  {
    title: "Web3 dApps",
    period: "2025–now",
    description: "Wallet flows, txs, and developer tools.",
  },
];

export const EXPERIENCES = [
  {
    company: "Palisade Research Foundation (GSoC org)",
    role: "Open Source Contributor",
    period: "Oct 2025 – Jan 2026",
    type: "Remote",
    logo: "PR",
    gradient: "from-violet-500 to-fuchsia-500",
    bullets: [
      "Merged 4+ PRs.",
      "Cut CI time by ~10 minutes.",
      "Raised test coverage by ~15%.",
    ],
    tech: ["Flutter", "Dart", "Git", "GitHub Actions", "Testing"],
  },
  {
    company: "VR Stores (Web Development Agency)",
    role: "Tech Lead",
    period: "May 2025 – Aug 2025",
    type: "Remote",
    logo: "VR",
    gradient: "from-orange-500 to-amber-500",
    bullets: [
      "Led frontend on 5+ client sites.",
      "Improved load speed by ~25%.",
      "Shipped ahead of deadlines.",
    ],
    tech: ["React", "Tailwind", "Node.js", "GSAP", "Git"],
  },
  {
    company: "NIT Agartala (Clubs & Core Teams)",
    role: "Web Developer & GitHub Mentor",
    period: "Sept 2025 – Present",
    type: "On-Campus",
    logo: "NIT",
    gradient: "from-indigo-500 to-cyan-500",
    bullets: [
      "Mentored 10+ juniors on Git/PR flow.",
      "Ran React + version control workshops.",
      "Maintained sites at 90+ Lighthouse.",
    ],
    tech: ["React", "Tailwind", "Node.js", "Express", "Git", "Vercel"],
  },
];

export const PROJECTS = [
  {
    title: "DripX V2",
    subtitle: "Solana Wallet Interaction dApp",
    problem: "Solana wallet UX is often clunky.",
    solution: "Built smooth wallet, airdrop, and tx flow.",
    impact: "50+ users; ~20% faster confirmations.",
    tech: ["React", "Tailwind", "@solana/web3.js", "Wallet Adapter", "Phantom"],
    gradient: "from-orange-500 via-fuchsia-500 to-violet-500",
    links: { live: null, github: null },
  },
  {
    title: "Wallify.io",
    subtitle: "Solana Wallet Generator",
    problem: "Need secure local wallet generation.",
    solution: "Client-side keypair + seed generation.",
    impact: "Used by 200+ developers for testing workflows.",
    tech: ["React", "Node.js", "tweetnacl", "bs58", "@solana/web3.js"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    links: { live: null, github: null },
  },
  {
    title: "AAYAM (NIT Agartala Gymkhana)",
    subtitle: "Official cultural fest website",
    problem: "Event sites fail on mobile under load.",
    solution: "Built reliable responsive event platform.",
    impact: "Served 1000+ students; achieved 99.9% uptime; ~40% faster loads via lazy loading.",
    tech: ["HTML", "CSS", "JavaScript", "Performance", "Lazy loading"],
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    links: { live: null, github: null },
  },
];

