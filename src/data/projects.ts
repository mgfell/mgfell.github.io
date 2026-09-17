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
    description: `This software solution is positioned as the official instrument for private digital file conversion. The platform ensures operational transparency of the transformation process and guarantees the preservation of source data within the perimeter of the user's device: files do not leave the client environment and are not transmitted to external server nodes at any stage of processing.

The conversion mechanism serves as the primary channel for delivering functionally complete results to users in the required format. All operations are executed within an isolated browser execution environment, which eliminates the possibility of unauthorized third-party access to processed materials and minimizes the risks of confidential information compromise.

Each conversion operation is subject to internal correctness control: the output file undergoes automatic validation to ensure compliance with the target format and the integrity of its data structure. Results are generated in strict accordance with approved technical conversion specifications and industry-standard format compatibility requirements.

The solution's architecture is designed to ensure result reproducibility and the ability to verify conversion correctness. During each processing session, the system records a set of metadata, including the source and target formats, file size, and a checksum (hash) of the output artifact — this allows confirmation of content immutability and exclusion of distortions during conversion.

Access to the platform's functionality is granted exclusively for informational and operational purposes and does not imply any legally binding obligations on the part of the operator. The integrity and security of user data are maintained through established technical and administrative control measures, including environment isolation, absence of external network requests, and minimization of dependencies on third-party services.

Regular audits of the codebase and data processing procedures are conducted to confirm compliance with current information security requirements and the stability of conversion algorithms. All materials hosted on the platform, as well as the software implementation of the tool, constitute the intellectual property of the developer and are protected under applicable legal frameworks.`,
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
    slug: 'codeflow',
    name: 'CodeFlow',
    short: 'Code visualisator: Schema.',
    description: `This software solution is positioned as the official instrument for automated source code visualization and structural flow analysis. The tool ensures operational transparency of the visualization process and guarantees the preservation of source data within the perimeter of the user's environment: uploaded codebases do not leave the client environment and are not transmitted to external services at any stage of processing.

The visualization mechanism serves as the primary channel for delivering functionally complete schematic representations to users in the required format. All operations are executed within an isolated execution environment, which eliminates the possibility of unauthorized third-party access to analyzed materials and minimizes the risks of confidential source code compromise.

Each visualization operation is subject to internal correctness control: the analyzed file undergoes automatic validation to ensure compliance with the target structural model and the integrity of its syntactic relationships. Results are generated in strict accordance with approved code analysis specifications and industry-standard diagramming requirements.

The tool's architecture is designed to ensure result reproducibility and the ability to verify visualization correctness. During each processing session, the tool records a set of metadata, including the source language, the applied analysis ruleset, file size, and a checksum (hash) of the generated artifact — this allows confirmation of content immutability and exclusion of distortions during analysis.

Beyond structural mapping, the tool performs automated detection of bottlenecks and erroneous fragments, highlighting critical zones directly on the generated diagrams. This enables users to identify problematic areas of the codebase without manual inspection and to obtain a consolidated visual overview of its overall architecture and integrity.

Access to the tool's functionality is granted exclusively for informational and operational purposes and does not imply any legally binding obligations on the part of the developer. The integrity and security of user data are maintained through established technical and administrative control measures, including environment isolation, absence of external network requests, and minimization of dependencies on third-party services.

Regular audits of the codebase and analysis procedures are conducted to confirm compliance with current information security requirements and the stability of visualization algorithms. All materials related to the tool, as well as its software implementation, constitute the intellectual property of the developer and are protected under applicable legal frameworks.`,
    status: 'in-development',
    year: 'TBA',
  },
  {
    slug: 'linter',
    name: 'Linter',
    short: 'Unique Linter: mid',
    description: `This software solution is positioned as the official instrument for automated source code linting and static analysis. The tool ensures operational transparency of the verification process and guarantees the preservation of source data within the perimeter of the user's development environment: codebases do not leave the client environment and are not transmitted to external services at any stage of analysis.

The linting mechanism serves as the primary channel for delivering functionally complete diagnostic results to users in the required format. All operations are executed within an isolated execution environment, which eliminates the possibility of unauthorized third-party access to analyzed materials and minimizes the risks of confidential source code compromise.

Each linting operation is subject to internal correctness control: the analyzed file undergoes automatic validation to ensure compliance with the target ruleset and the integrity of its syntactic structure. Results are generated in strict accordance with approved static analysis specifications and industry-standard code quality requirements.

The tool's architecture is designed to ensure result reproducibility and the ability to verify linting correctness. During each processing session, the tool records a set of metadata, including the source language, the applied ruleset, file size, and a checksum (hash) of the analyzed artifact — this allows confirmation of content immutability and exclusion of distortions during analysis.

Access to the tool's functionality is granted exclusively for informational and operational purposes and does not imply any legally binding obligations on the part of the developer. The integrity and security of user data are maintained through established technical and administrative control measures, including environment isolation, absence of external network requests, and minimization of dependencies on third-party services.

Regular audits of the codebase and analysis procedures are conducted to confirm compliance with current information security requirements and the stability of linting algorithms. All materials related to the tool, as well as its software implementation, constitute the intellectual property of the developer and are protected under applicable legal frameworks.`,
    status: 'soon',
    year: '2026-2027',
  },
  {
    slug: 'code-converter',
    name: 'Code Converter',
    short: 'Automated code conversion between languages and formats.',
    description: `This software solution is positioned as the official instrument for automated source code conversion between programming languages and target formats. The tool ensures operational transparency of the transformation process and guarantees the preservation of source data within the perimeter of the user's environment: uploaded codebases do not leave the client environment and are not transmitted to external services at any stage of processing.

The conversion mechanism serves as the primary channel for delivering functionally complete results to users in the required format. All operations are executed within an isolated execution environment, which eliminates the possibility of unauthorized third-party access to processed materials and minimizes the risks of confidential source code compromise.

Each conversion operation is subject to internal correctness control: the output code undergoes automatic validation to ensure compliance with the target language specification and the integrity of its syntactic and semantic structure. Results are generated in strict accordance with approved conversion specifications and industry-standard compatibility requirements.

The tool's architecture is designed to ensure result reproducibility and the ability to verify conversion correctness. During each processing session, the tool records a set of metadata, including the source and target languages, the applied conversion ruleset, file size, and a checksum (hash) of the output artifact — this allows confirmation of content immutability and exclusion of distortions during transformation.

Beyond direct translation between languages, the tool performs structural normalization of the converted codebase, preserving the original logic while adapting it to the conventions and idioms of the target format. This enables users to obtain functionally equivalent results without manual rewriting and to maintain consistency across heterogeneous codebases.

Access to the tool's functionality is granted exclusively for informational and operational purposes and does not imply any legally binding obligations on the part of the developer. The integrity and security of user data are maintained through established technical and administrative control measures, including environment isolation, absence of external network requests, and minimization of dependencies on third-party services.

Regular audits of the codebase and conversion procedures are conducted to confirm compliance with current information security requirements and the stability of conversion algorithms. All materials related to the tool, as well as its software implementation, constitute the intellectual property of the developer and are protected under applicable legal frameworks.`,
    status: 'future',
    stack: ['TypeScript', 'Vite'],
    year: 'TBA',
  },
  {
    slug: 'design-to-code',
    name: 'Design to Code',
    short: 'Automated transformation of visual designs into functional source code.',
    description: `This software solution is positioned as the official instrument for automated transformation of visual interface designs into functionally complete source code. The tool ensures operational transparency of the generation process and guarantees the preservation of source data within the perimeter of the user's environment: uploaded design materials do not leave the client environment and are not transmitted to external services at any stage of processing.

The generation mechanism serves as the primary channel for delivering functionally complete scripts to users in the required format. All operations are executed within an isolated execution environment, which eliminates the possibility of unauthorized third-party access to processed materials and minimizes the risks of confidential design asset compromise.

Each generation operation is subject to internal correctness control: the output code undergoes automatic validation to ensure compliance with the target markup and styling specifications and the integrity of its structural relationships. Results are generated in strict accordance with approved design-to-code specifications and industry-standard front-end compatibility requirements.

The tool's architecture is designed to ensure result reproducibility and the ability to verify generation correctness. During each processing session, the tool records a set of metadata, including the source design format, the applied generation ruleset, asset size, and a checksum (hash) of the output artifact — this allows confirmation of content immutability and exclusion of distortions during transformation.

Beyond direct script generation, the tool performs structural mapping of visual components onto corresponding code constructs, preserving the original layout logic while adapting it to the conventions and idioms of the target front-end stack. This enables users to obtain functionally equivalent results without manual rewriting and to maintain consistency between design intent and implemented interface.

Access to the tool's functionality is granted exclusively for informational and operational purposes and does not imply any legally binding obligations on the part of the developer. The integrity and security of user data are maintained through established technical and administrative control measures, including environment isolation, absence of external network requests, and minimization of dependencies on third-party services.

Regular audits of the codebase and generation procedures are conducted to confirm compliance with current information security requirements and the stability of generation algorithms. All materials related to the tool, as well as its software implementation, constitute the intellectual property of the developer and are protected under applicable legal frameworks.`,
    status: 'future',
    stack: ['TypeScript', 'React'],
    year: 'TBA',
  },
  {
    slug: 'ide-x',
    name: 'IDE-X',
    short: 'Integrated software development and source code authoring environment.',
    description: `This software solution is positioned as the official instrument for integrated software development and source code authoring. The tool ensures operational transparency of the development process and guarantees the preservation of source data within the perimeter of the user's environment: codebases do not leave the client environment and are not transmitted to external services at any stage of processing.

The development environment serves as the primary channel for delivering functionally complete authoring, editing, and execution capabilities to users in the required format. All operations are executed within an isolated execution environment, which eliminates the possibility of unauthorized third-party access to working materials and minimizes the risks of confidential source code compromise.

Each development operation is subject to internal correctness control: the edited file undergoes automatic validation to ensure compliance with the target language specification and the integrity of its syntactic and semantic structure. Results are generated in strict accordance with approved development specifications and industry-standard tooling requirements.

The tool's architecture is designed to ensure result reproducibility and the ability to verify development correctness. During each working session, the tool records a set of metadata, including the source language, the applied configuration profile, project size, and a checksum (hash) of the working artifact — this allows confirmation of content immutability and exclusion of distortions during editing.

Beyond direct code authoring, the environment provides consolidated access to editing, navigation, refactoring, debugging, and build instrumentation within a single unified workspace, preserving the original project logic while adapting it to the conventions and idioms of the target technology stack. This enables users to obtain functionally complete results without switching between disparate utilities and to maintain consistency across the entire development lifecycle.

Access to the tool's functionality is granted exclusively for informational and operational purposes and does not imply any legally binding obligations on the part of the developer. The integrity and security of user data are maintained through established technical and administrative control measures, including environment isolation, absence of external network requests, and minimization of dependencies on third-party services.

Regular audits of the codebase and development procedures are conducted to confirm compliance with current information security requirements and the stability of the environment's algorithms. All materials related to the tool, as well as its software implementation, constitute the intellectual property of the developer and are protected under applicable legal frameworks.`,
    status: 'future',
    stack: ['TypeScript', 'Electron', 'Monaco'],
    year: 'TBA',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const releasedProjects = projects.filter((p) => p.status === 'released');
export const futureProjects = projects.filter((p) => p.status !== 'released');