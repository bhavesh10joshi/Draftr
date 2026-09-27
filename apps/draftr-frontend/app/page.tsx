'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Square, 
  Circle, 
  ArrowUpRight, 
  Users, 
  Zap, 
  Share2, 
  MousePointer2, 
  Pencil, 
  Type, 
  Sparkles,
  Plus,
  DoorOpen
} from 'lucide-react';

export default function LandingPage() {
  const [roomCode, setRoomCode] = useState('');

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    window.location.href = `/room/${roomCode.trim()}`;
  };

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 9);
    window.location.href = `/room/${newRoomId}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 -z-10" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Pencil className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Draftr</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors hover:bg-muted text-foreground"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 sm:px-8">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center pt-20 pb-16 text-center lg:pt-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground mb-6 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Instant real-time whiteboard collaboration</span>
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Sketch ideas together, in real-time with{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Draftr
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A minimalist, low-latency collaborative canvas. Spin up an instant room, invite teammates, and turn chaotic brainstorming into clear visual architecture.
          </p>
        </section>

        {/* Interactive Simulated Canvas Workspace */}
        <section className="relative mx-auto max-w-5xl rounded-2xl border border-border bg-card p-4 shadow-2xl overflow-hidden mb-24">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background p-1 shadow-sm">
              <button className="rounded p-1.5 hover:bg-muted text-muted-foreground"><Pencil className="h-4 w-4" /></button>
              <button className="rounded p-1.5 bg-primary/10 text-primary"><Square className="h-4 w-4" /></button>
              <button className="rounded p-1.5 hover:bg-muted text-muted-foreground"><Circle className="h-4 w-4" /></button>
              <button className="rounded p-1.5 hover:bg-muted text-muted-foreground"><ArrowUpRight className="h-4 w-4" /></button>
              <button className="rounded p-1.5 hover:bg-muted text-muted-foreground"><Type className="h-4 w-4" /></button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white ring-2 ring-card">JD</div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white ring-2 ring-card">AK</div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white ring-2 ring-card">BJ</div>
              </div>
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>
          </div>

          <div className="relative h-80 sm:h-96 w-full rounded-xl bg-background border border-dashed border-border/80 flex items-center justify-center overflow-hidden">
            <div className="absolute top-12 left-16 border-2 border-primary rounded-lg p-4 bg-primary/5 shadow-sm transform -rotate-1">
              <p className="font-mono text-sm font-semibold text-primary">Frontend (Next.js)</p>
            </div>

            <div className="absolute top-16 left-80 hidden sm:block border-t-2 border-dashed border-muted-foreground w-28" />

            <div className="absolute top-12 left-1/2 border-2 border-accent rounded-lg p-4 bg-accent/5 shadow-sm transform rotate-2">
              <p className="font-mono text-sm font-semibold text-accent">WS Gateway :8080</p>
            </div>

            <div className="absolute bottom-16 right-24 border-2 border-emerald-500 rounded-lg p-4 bg-emerald-50 shadow-sm">
              <p className="font-mono text-sm font-semibold text-emerald-600">Collaborative Canvas DB</p>
            </div>

            {/* Live Cursor 1 */}
            <div className="absolute top-28 left-48 flex items-center gap-1 pointer-events-none animate-float">
              <MousePointer2 className="h-5 w-5 text-blue-500 fill-blue-500" />
              <span className="rounded bg-blue-500 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm">
                Alex
              </span>
            </div>

            {/* Live Cursor 2 */}
            <div className="absolute bottom-28 left-1/3 flex items-center gap-1 pointer-events-none animate-float-delayed">
              <MousePointer2 className="h-5 w-5 text-amber-500 fill-amber-500" />
              <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm">
                Bhavesh
              </span>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-16 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to think visually</h2>
            <p className="mt-3 text-muted-foreground">Built for engineering teams, product designers, and visual thinkers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Room Collaboration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Create independent rooms with distinct invite codes. Teammates can jump in simultaneously without setup overhead.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Zero-Latency Sync</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Powered by native WebSockets. Strokes, vector paths, and shapes stream instantly across all connected screens.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 mb-6">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Canvas Sharing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Share full canvas snapshots or invite teammates with read-write permissions right from your browser URL.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="my-20 rounded-3xl border border-border bg-gradient-to-b from-card to-secondary/30 p-10 sm:p-16 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to turn thoughts into drawings?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Get started in seconds. No credit card required. Create an account to persist and export your boards.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 font-semibold text-primary-foreground shadow hover:bg-primary/90 transition"
            >
              Get Started for Free
            </Link>
            <Link
              href="/signin"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-8 font-semibold text-foreground hover:bg-muted transition"
            >
              Log In
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Draftr. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition">Terms</Link>
            <Link href="https://github.com" target="_blank" className="hover:text-foreground transition">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}