import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What is this website?',
    answer: 'A personal portfolio showcasing my projects, skills, and ongoing work. Built with React, TypeScript, Vite, and Tailwind CSS.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'React, TypeScript, Vite, Tailwind CSS, GSAP, HTML5 Canvas, and more. I focus on modern, performant frontend.',
  },
  {
    question: 'Are you open to collaboration?',
    answer: 'Yes. I am open to interesting projects, freelance work, and collaboration. Feel free to reach out via email.',
  },
  {
    question: 'How can I contact you?',
    answer: 'The fastest way is email — hello@mgfell.dev. You can also find me on GitHub.',
  },
  {
    question: 'Can I use your code?',
    answer: 'The code is proprietary. If you want to use something specific — reach out and we can discuss it.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="mb-24 animate-[fadeUp_0.9s_ease_both_0.3s]">
      <div className="
        font-['JetBrains_Mono',monospace] text-[0.7rem]
        tracking-[0.2em] uppercase text-[var(--muted)] mb-3
        text-center
      ">
        // faq
      </div>

      <h2 className="
        text-3xl sm:text-4xl font-bold tracking-tight
        text-[var(--text)]
        text-center
        mb-12
      ">
        Common Questions
      </h2>

      <div className="max-w-[720px] mx-auto flex flex-col gap-3">
        {faqData.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className="
                bg-white/[0.02] backdrop-blur-xl
                border border-white/[0.06]
                rounded-2xl
                overflow-hidden
                transition-all duration-300
                hover:border-white/[0.12]
              "
            >
              <button
                onClick={() => toggle(i)}
                className="
                  w-full
                  flex items-center justify-between gap-4
                  px-6 py-5
                  text-left
                  text-[var(--text)] text-sm sm:text-base font-medium
                  transition-colors duration-300
                  hover:text-white
                  cursor-pointer
                "
              >
                <span>{item.question}</span>

                <span className={`
                  shrink-0
                  text-[var(--muted)]
                  transition-transform duration-300
                  ${isOpen ? 'rotate-180' : 'rotate-0'}
                `}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`
                  grid transition-all duration-300 ease-out
                  ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                `}
              >
                <div className="overflow-hidden">
                  <p className="
                    px-6 pb-5
                    text-[var(--muted)] text-sm leading-[1.7]
                  ">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}