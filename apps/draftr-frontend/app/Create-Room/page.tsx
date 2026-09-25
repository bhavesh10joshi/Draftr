'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  ArrowRight,
  PenTool,
  Users,
  Globe,
  Lock,
} from 'lucide-react';
import { Logo } from '../Components/logo';
import { ThemeToggle } from '../Components/theme-toggle';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Label } from '../Components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../Components/ui/card';

export default function CreateRoomPage() {
  const [roomName, setRoomName] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('private');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only — no backend logic
    console.log('Create room:', { roomName, visibility });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Logo showText={false} />
          <ThemeToggle />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg animate-scale-in">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Plus className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Create a New Room
            </h1>
            <p className="mt-2 text-muted-foreground">
              Set up a collaborative canvas and invite your team to join.
            </p>
          </div>

          <Card className="border-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Room Details</CardTitle>
              <CardDescription>
                Give your room a name so your team can find it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room name */}
                <div className="space-y-2">
                  <Label htmlFor="roomName">Room Name</Label>
                  <div className="relative">
                    <PenTool className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="roomName"
                      type="text"
                      placeholder="e.g. Design Review"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is the name others will use to join your room.
                  </p>
                </div>

                {/* Visibility */}
                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setVisibility('private')}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                        visibility === 'private'
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          visibility === 'private'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        <Lock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Private
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Only people with the room name
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisibility('public')}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                        visibility === 'public'
                          ? 'border-accent bg-accent/5 ring-1 ring-accent'
                          : 'border-border hover:border-accent/30'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          visibility === 'public'
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Public
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Anyone can discover and join
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Info card */}
                <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-4">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">
                      How rooms work
                    </p>
                    <p className="mt-1">
                      After creating a room, share the room name with your team.
                      They can join from the dashboard using the Join Room
                      option.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="flex-1"
                  >
                    <Link href="/dashboard">Cancel</Link>
                  </Button>
                  <Button type="submit" className="flex-1" size="lg">
                    Create & Enter Room
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
