'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  LogIn,
  ArrowRight,
  PenTool,
  Users,
  Search,
  Clock,
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

// Mock recently active rooms for demo
const recentRooms = [
  { name: 'Design Review', members: 4, lastActive: '2 min ago' },
  { name: 'Sprint Planning', members: 6, lastActive: '1 hour ago' },
  { name: 'Architecture Sketch', members: 3, lastActive: 'Yesterday' },
];

export default function JoinRoomPage() {
  const [roomName, setRoomName] = useState('');
  const [search, setSearch] = useState('');

  const filteredRecent = recentRooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only — no backend logic
    console.log('Join room:', roomName);
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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <LogIn className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Join a Room
            </h1>
            <p className="mt-2 text-muted-foreground">
              Enter a room name to jump into a collaborative canvas.
            </p>
          </div>

          <Card className="mb-6 border-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Enter Room Name</CardTitle>
              <CardDescription>
                Type the name of the room you want to join.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                </div>

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
                    Join Room
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Recently active rooms */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                Recently Active Rooms
              </h3>
              <div className="relative w-full max-w-[180px]">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Filter..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-9 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              {filteredRecent.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No rooms match your search.
                </p>
              ) : (
                filteredRecent.map((room) => (
                  <button
                    key={room.name}
                    onClick={() => setRoomName(room.name)}
                    className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <PenTool className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {room.name}
                      </p>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {room.members}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {room.lastActive}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
