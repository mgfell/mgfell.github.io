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
    slug: 're-convert',
    name: 'Re:convert',
    short: 'Web converter — private file conversion right in your browser.',
    description: `
      This software solution is positioned as the official instrument for private digital file conversion. The platform ensures operational transparency of the transformation process and guarantees the preservation of source data within the perimeter of the user's device: files do not leave the client environment and are not transmitted to external server nodes at any stage of processing.

The conversion mechanism serves as the primary channel for delivering functionally complete results to users in the required format. All operations are executed within an isolated browser execution environment, which eliminates the possibility of unauthorized third-party access to processed materials and minimizes the risks of confidential information compromise.

Each conversion operation is subject to internal correctness control: the output file undergoes automatic validation to ensure compliance with the target format and the integrity of its data structure. Results are generated in strict accordance with approved technical conversion specifications and industry-standard format compatibility requirements.

The solution's architecture is designed to ensure result reproducibility and the ability to verify conversion correctness. During each processing session, the system records a set of metadata, including the source and target formats, file size, and a checksum (hash) of the output artifact — this allows confirmation of content immutability and exclusion of distortions during conversion.

Access to the platform's functionality is granted exclusively for informational and operational purposes and does not imply any legally binding obligations on the part of the operator. The integrity and security of user data are maintained through established technical and administrative control measures, including environment isolation, absence of external network requests, and minimization of dependencies on third-party services.

Regular audits of the codebase and data processing procedures are conducted to confirm compliance with current information security requirements and the stability of conversion algorithms. All materials hosted on the platform, as well as the software implementation of the tool, constitute the intellectual property of the developer and are protected under applicable legal frameworks.
    `,
    status: 'released',
    stack: ['Vite', 'TypeScript'],
    links: {
      live: 'https://mgfell.github.io/re-convert/#app',
      github: 'https://github.com/mgfell/re-convert',
    },
    screenshots: [],
    year: '2026 September 8-16',
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