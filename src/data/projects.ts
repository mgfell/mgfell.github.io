export type ProjectStatus = 'released' | 'future' | 'in-development' | 'soon';

export interface Project {
  slug: string;
  name: string;
  short: string;
  description: string;
  status: ProjectStatus;
  stack?: string[];
  links?: {
    live?: string;
    github?: string;
    author?: string;
    docs?: string;
  };
  screenshots?: string[];
  year?: string;
}

export const projects: Project[] = [
  {
    slug: 'card-website',
    name: 'Card Website',
    short: 'This web site profile',
    description: `This website functions as the official digital platform for the project's public representation and operational transparency.

The activity feed serves as the primary mechanism for disseminating updates, milestones, and deliverables to stakeholders.

All content within the feed is published in strict accordance with the project's communication policy and editorial guidelines.

The platform is designed to provide a chronologically ordered, searchable, and verifiable record of the project's progression.

Each entry in the feed undergoes a formal review process to ensure accuracy, compliance, and alignment with strategic objectives.

Access to the platform is granted exclusively for informational purposes and does not imply any binding obligations or commitments.

Data integrity and information security are maintained through established technical and administrative control measures.

Regular audits are conducted to verify the consistency, completeness, and timeliness of published updates.

The website's architecture supports traceability of changes, version control, and audit logging for accountability purposes.

All materials published on this platform are the intellectual property of the project and are protected under applicable legal frameworks.`,
    status: 'released',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP', 'Canvas'],
    links: {
      github: 'https://github.com/mgfell/mgfell.github.io',
      author: 'https://github.com/mgfell',
    },
    screenshots: [],
    year: '2026 / September 14',
  },
  {
    slug: 'project-two',
    name: 'Project Two',
    short: 'Short description of what this project does and why it exists.',
    description: `
      Long detailed description of the second project.
    `,
    status: 'released',
    stack: ['Vite', 'Three.js'],
    links: {
      live: '#',
      github: '#',
    },
    screenshots: [],
    year: '2026',
  },
  {
    slug: 'project-three',
    name: 'Project Three',
    short: 'Short description of what this project does and why it exists.',
    description: `
      Long detailed description of the third project.
    `,
    status: 'released',
    stack: ['Canvas', 'GSAP'],
    links: {
      live: '#',
    },
    screenshots: [],
    year: '2026',
  },
  {
    slug: 'project-x',
    name: 'Project X',
    short: 'Something big and experimental. Details coming later.',
    description: `
      A future project in active development.
    `,
    status: 'in-development',
    year: '2026',
  },
  {
    slug: 'project-y',
    name: 'Project Y',
    short: 'An idea in the works. Maybe it will see the light.',
    description: `
      Just an idea for now.
    `,
    status: 'future',
    year: '2026',
  },
  {
    slug: 'project-z',
    name: 'Project Z',
    short: 'Almost ready. Just a few finishing touches.',
    description: `
      Almost ready to ship.
    `,
    status: 'soon',
    year: '2026',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const releasedProjects = projects.filter((p) => p.status === 'released');
export const futureProjects = projects.filter((p) => p.status !== 'released');