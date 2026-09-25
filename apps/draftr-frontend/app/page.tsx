'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Users,
  Zap,
  Share2,
  PenTool,
  MousePointer2,
  Layers,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Navbar } from "./Components/navbar";
import { Button } from './Components/ui/button';
import { Card, CardContent } from './Components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Components/ui/accordion';

const features = [
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description:
      'See your teammates draw in real time. Everyone sees the same canvas, synced instantly.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Buttery-smooth drawing experience with zero lag, even with a room full of collaborators.',
  },
  {
    icon: Share2,
    title: 'Easy Room Sharing',
    description:
      'Create a room and share the link. Anyone with the room name can join and start drawing.',
  },
  {
    icon: Layers,
    title: 'Infinite Canvas',
    description:
      'Never run out of space. Pan, zoom, and draw across an unlimited canvas area.',
  },
  {
    icon: ShieldCheck,
    title: 'Private Rooms',
    description:
      'Your rooms are yours. Only people with the room name can find and join your session.',
  },
  {
    icon: MousePointer2,
    title: 'Live Cursors',
    description:
      'See where everyone is looking with live cursor tracking and presence indicators.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Create an account',
    description: 'Sign up for free and set up your profile in seconds.',
  },
  {
    number: '02',
    title: 'Create or join a room',
    description: 'Start a new room or join an existing one with a room name.',
  },
  {
    number: '03',
    title: 'Start drawing together',
    description:
      'Invite your team, grab a tool, and start sketching ideas on a shared canvas.',
  },
];

const faqs = [
  {
    question: 'What is Draftr?',
    answer:
      'Draftr is a collaborative whiteboard tool that lets teams draw, sketch, and brainstorm together in real time. Think of it as a shared digital canvas where everyone can contribute.',
  },
  {
    question: 'How do I create a room?',
    answer:
      'After signing in, go to your dashboard and click "Create Room." Give your room a name, and it will be ready to share with your team instantly.',
  },
  {
    question: 'Can other people join my room?',
    answer:
      'Yes. Share the room name with anyone, and they can join through the "Join Room" option. Only people with the room name can find your room.',
  },
  {
    question: 'Is Draftr free to use?',
    answer:
      'Draftr is free during the beta period. We will introduce premium plans with advanced features in the future.',
  },
  {
    question: 'Do I need to install anything?',
    answer:
      'No. Draftr runs entirely in your browser. Just sign in, create a room, and start drawing.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-dots-pattern opacity-40" />
        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-40 -z-10 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-success" />
              Now in beta — free for everyone
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Draw together.
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Think together.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Draftr is a real-time collaborative whiteboard. Create a room,
              invite your team, and sketch ideas on a shared canvas — no setup
              required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/signup">
                  Start drawing for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/signin">Sign in</Link>
              </Button>
            </div>
          </div>

          {/* Canvas Preview */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/70" />
                  <div className="h-3 w-3 rounded-full bg-warning/70" />
                  <div className="h-3 w-3 rounded-full bg-success/70" />
                </div>
                <div className="ml-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <PenTool className="h-3.5 w-3.5" />
                  Design Review — Room
                </div>
              </div>
              <div className="relative aspect-[16/9] bg-grid-pattern bg-surface">
                <svg
                  viewBox="0 0 800 450"
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Sketch lines */}
                  <path
                    d="M 80 120 Q 150 60, 220 120 T 360 120"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-draw-line"
                  />
                  <rect
                    x="80"
                    y="200"
                    width="160"
                    height="100"
                    rx="12"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="3"
                    className="animate-draw-line"
                  />
                  <path
                    d="M 300 220 L 420 220 M 300 250 L 380 250 M 300 280 L 400 280"
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-draw-line"
                  />
                  <circle
                    cx="560"
                    cy="150"
                    r="60"
                    fill="none"
                    stroke="hsl(var(--warning))"
                    strokeWidth="3"
                    className="animate-draw-line"
                  />
                  <path
                    d="M 520 280 L 600 280 M 500 310 L 620 310"
                    fill="none"
                    stroke="hsl(var(--success))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-draw-line"
                  />
                  <path
                    d="M 240 100 L 520 160"
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                  <path
                    d="M 240 260 L 500 280"
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />

                  {/* Live cursors */}
                  <g className="animate-float">
                    <path
                      d="M 350 160 L 356 176 L 358 170 L 364 172 Z"
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--background))"
                      strokeWidth="1.5"
                    />
                    <rect x="366" y="170" width="52" height="18" rx="4" fill="hsl(var(--primary))" />
                    <text x="392" y="183" fontSize="10" fill="white" textAnchor="middle" fontFamily="Inter, sans-serif">
                      Alex
                    </text>
                  </g>
                  <g className="animate-float-delayed">
                    <path
                      d="M 580 200 L 586 216 L 588 210 L 594 212 Z"
                      fill="hsl(var(--accent))"
                      stroke="hsl(var(--background))"
                      strokeWidth="1.5"
                    />
                    <rect x="596" y="210" width="48" height="18" rx="4" fill="hsl(var(--accent))" />
                    <text x="620" y="223" fontSize="10" fill="white" textAnchor="middle" fontFamily="Inter, sans-serif">
                      Sam
                    </text>
                  </g>
                </svg>

                {/* Floating tool palette */}
                <div className="absolute left-4 top-4 flex flex-col gap-1 rounded-xl border border-border bg-card p-1.5 shadow-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <PenTool className="h-4 w-4" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary">
                    <MousePointer2 className="h-4 w-4" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary">
                    <Share2 className="h-4 w-4" />
                  </div>
                </div>

                {/* Presence avatars */}
                <div className="absolute right-4 top-4 flex -space-x-2">
                  {['A', 'S', 'J'].map((initial, i) => (
                    <div
                      key={initial}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-xs font-semibold text-white"
                      style={{
                        backgroundColor: ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))'][i],
                      }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to draw together
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful tools for brainstorming, wireframing, and visual thinking
              with your team.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-border bg-card transition-all hover:shadow-lg hover:border-primary/30"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-border bg-secondary/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Get started in three steps
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No downloads, no setup. Just sign up and start drawing.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about Draftr.
            </p>
          </div>

          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent px-6 py-16 text-center shadow-2xl sm:px-16">
            <div className="absolute inset-0 bg-dots-pattern opacity-20" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to start drawing?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
                Join Draftr today and bring your team&apos;s ideas to life on a
                shared canvas.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link href="/signup">
                    Create free account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80">
                {['No credit card required', 'Free during beta', 'Works in any browser'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <PenTool className="h-4 w-4" />
              </div>
              Draftr
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/#features" className="hover:text-foreground">Features</Link>
              <Link href="/#how-it-works" className="hover:text-foreground">How it works</Link>
              <Link href="/#faq" className="hover:text-foreground">FAQ</Link>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            &copy; 2026 Draftr. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
