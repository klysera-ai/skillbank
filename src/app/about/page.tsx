import Link from 'next/link'
import { PageContainer } from '@/components/layout/PageContainer'

export const metadata = {
  title: 'About | Klysera Skill Bank',
  description:
    'Plain-language overview of the Skill Bank: what it is, why it matters, and how it helps teams work faster.',
}

const roleCards = [
  {
    title: 'Design Engineer',
    description:
      'Lives at the boundary of design and engineering, turning visual systems into working interfaces.',
  },
  {
    title: 'Product Engineer (Frontend)',
    description:
      'Builds the user-facing experience: navigation, dashboards, and UI that feels fast and reliable.',
  },
  {
    title: 'Product Engineer (Backend)',
    description:
      'Builds the systems users never see: logic, data, and services that power the product.',
  },
  {
    title: 'Senior Backend Engineer (Python)',
    description:
      'Creates durable foundations in Python for data-intensive, AI-adjacent products.',
  },
  {
    title: 'MLOps Engineer',
    description:
      'Keeps models reliable in production: infrastructure, monitoring, and scaling.',
  },
  {
    title: 'AI Agent Engineer',
    description:
      'Designs autonomous workflows where AI systems can decide and act across steps.',
  },
  {
    title: 'Generative AI Engineer',
    description:
      'Connects model capabilities to real products: chat, retrieval, and synthesis.',
  },
  {
    title: 'Senior Cloud FinOps Engineer',
    description:
      'Optimizes cloud spend without compromising performance or reliability.',
  },
  {
    title: 'Senior Cloud Security Architect',
    description:
      'Designs defenses and guardrails to keep cloud systems secure under pressure.',
  },
  {
    title: 'Senior Cloud DevOps Engineer',
    description:
      'Builds deployment pipelines, observability, and reliable production operations.',
  },
]

const faqs = [
  {
    question: 'Is a skill the same as a chatbot?',
    answer:
      'No. A chatbot answers whatever you ask next. A skill is a purpose-built, reusable workflow for a specific job.',
  },
  {
    question: 'Why not just write better prompts?',
    answer:
      'Prompts help one person in one moment. Skills capture that knowledge once and make it consistent for the whole team.',
  },
  {
    question: 'What makes a skill “production-ready”?',
    answer:
      'Clear steps, known inputs and outputs, examples, and checks for quality and edge cases.',
  },
  {
    question: 'Do skills replace engineers?',
    answer:
      'No. Skills remove repetitive effort so engineers can focus on judgment, design, and decision-making.',
  },
  {
    question: 'Can skills be customized for a company?',
    answer:
      'Yes. Skills are files, so they can be tailored to a team’s tools, tone, and standards.',
  },
]

export default function AboutPage() {
  return (
    <PageContainer>
      <section className="relative overflow-hidden rounded-2xl border border-navy-muted bg-navy-light/40 p-10">
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),rgba(0,0,0,0))]" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.25),rgba(0,0,0,0))]" />

        <p className="text-xs uppercase tracking-[0.3em] text-body-muted">
          Klysera Skill Bank
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-offwhite md:text-5xl">
          The Skill Bank turns AI know-how into a reusable, team-wide operating system.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-body-muted leading-relaxed">
          Most people use AI like search: ask a question, get an answer. The Skill
          Bank focuses on what happens next — building durable, role-specific
          workflows that can be invoked in seconds, run consistently, and improve
          over time.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/skills"
            className="rounded-full border border-accent px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/10"
          >
            Browse Skills
          </Link>
          <Link
            href="/taxonomy"
            className="rounded-full border border-navy-muted px-4 py-2 text-xs uppercase tracking-[0.2em] text-offwhite transition-colors hover:border-body-muted/60"
          >
            Explore Taxonomy
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-navy-muted bg-navy-light p-8">
          <h2 className="font-display text-2xl text-offwhite">
            What is AI doing in the workplace?
          </h2>
          <p className="mt-4 text-sm text-body-muted leading-relaxed">
            AI is moving from occasional Q&amp;A to embedded workflows. Instead of
            “search and answer,” it’s acting like a capable assistant: reading
            project context, following steps, and helping teams move faster on
            specific tasks.
          </p>
          <p className="mt-4 text-sm text-body-muted leading-relaxed">
            The real question is not whether AI is useful. It’s which tasks are
            worth handing to it — and how to package those tasks so quality is
            consistent.
          </p>
        </div>
        <div className="rounded-xl border border-navy-muted bg-navy-light/70 p-8">
          <h2 className="font-display text-2xl text-offwhite">
            What is a skill?
          </h2>
          <p className="mt-4 text-sm text-body-muted leading-relaxed">
            A skill is a saved briefing: the exact instructions, tone, and
            steps an AI should follow for a specific job. It is reusable,
            consistent, and improves over time.
          </p>
          <div className="mt-6 rounded-lg border border-navy-muted/70 bg-navy/40 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-body-muted">
              Quick analogy
            </p>
            <p className="mt-2 text-sm text-offwhite leading-relaxed">
              A prompt is a chef improvising. A skill is the written recipe that
              anyone can reproduce.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-offwhite">Prompts vs. Skills</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-navy-muted bg-navy-light p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-body-muted">
              Prompt
            </p>
            <p className="mt-3 text-sm text-body-muted leading-relaxed">
              One-time conversation. Knowledge stays in a person’s head. Results
              vary each time.
            </p>
            <p className="mt-4 text-sm text-body-muted leading-relaxed">
              Useful for exploration, but hard to scale across a team.
            </p>
          </div>
          <div className="rounded-xl border border-accent/50 bg-navy-light p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Skill
            </p>
            <p className="mt-3 text-sm text-offwhite leading-relaxed">
              Saved instructions and workflow. Consistent outputs across users
              and time.
            </p>
            <p className="mt-4 text-sm text-offwhite/90 leading-relaxed">
              Auditable, shareable, and designed for repeatable quality.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-offwhite">
            Roles we focus on
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-body-muted">
            Engineering spectrum
          </span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roleCards.map((role) => (
            <div
              key={role.title}
              className="rounded-xl border border-navy-muted bg-navy-light/60 p-5"
            >
              <h3 className="font-display text-lg text-offwhite">{role.title}</h3>
              <p className="mt-2 text-sm text-body-muted leading-relaxed">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-xl border border-navy-muted bg-navy-light p-8">
          <h2 className="font-display text-2xl text-offwhite">
            How the Skill Bank works
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                title: 'Discover',
                body:
                  'Catalog the best public skills and workflows across platforms and communities.',
              },
              {
                title: 'Package',
                body:
                  'Convert proven prompts into structured, reusable skill files with clear inputs and outputs.',
              },
              {
                title: 'Validate',
                body:
                  'Test for consistency, quality, and edge cases before they are shared team-wide.',
              },
              {
                title: 'Deploy',
                body:
                  'Ship skills to teams so the right workflow is one command away.',
              },
            ].map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-muted bg-navy text-xs font-medium text-offwhite">
                  0{index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-offwhite">{step.title}</p>
                  <p className="mt-1 text-sm text-body-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-navy-muted bg-gradient-to-br from-navy-light via-navy to-navy p-8">
          <h2 className="font-display text-2xl text-offwhite">
            Why this matters for Klysera
          </h2>
          <p className="mt-4 text-sm text-body-muted leading-relaxed">
            Klysera places engineers into high-impact roles. When those engineers
            start with a skill bank tuned to their role, they ramp faster and
            perform more consistently. That is a measurable advantage for the
            teams we support.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              'Faster day-one productivity',
              'Shared team standards',
              'Reusable institutional knowledge',
              'Operational, not theoretical',
            ].map((point) => (
              <div
                key={point}
                className="rounded-lg border border-navy-muted/70 bg-navy-light/60 px-4 py-3 text-sm text-offwhite/90"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-offwhite">FAQ</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="rounded-xl border border-navy-muted bg-navy-light/70 p-6"
            >
              <p className="text-sm font-medium text-offwhite">{item.question}</p>
              <p className="mt-2 text-sm text-body-muted leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  )
}
