'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  LogIn,
  Search,
  Users,
  Clock,
  MoreVertical,
  PenTool,
  LogOut,
  Settings,
} from 'lucide-react';
import { Logo } from '../Components/logo';
import { ThemeToggle } from '../Components/theme-toggle';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Card, CardContent } from '../Components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../Components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../Components/ui/avatar';

// Mock data for demo purposes — frontend only
const mockRooms = [
  { id: '1', name: 'Design Review', members: 4, lastActive: '2 min ago' },
  { id: '2', name: 'Sprint Planning', members: 6, lastActive: '1 hour ago' },
  { id: '3', name: 'Architecture Sketch', members: 3, lastActive: 'Yesterday' },
  { id: '4', name: 'User Flow Wireframe', members: 2, lastActive: '3 days ago' },
];

export default function DashboardPage() {
  const [search, setSearch] = useState('');

  const filteredRooms = mockRooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-secondary">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium sm:inline">
                    Jane Doe
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">jane@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, Jane
          </h1>
          <p className="mt-1 text-muted-foreground">
            Pick up where you left off or start something new.
          </p>
        </div>

        {/* Quick actions */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Link href="/create-room">
            <Card className="group cursor-pointer border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Plus className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Create Room
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Start a new collaborative canvas
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/join-room">
            <Card className="group cursor-pointer border-border bg-card transition-all hover:border-accent/40 hover:shadow-lg">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <LogIn className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Join Room
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Enter a room name to join
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Rooms section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Your Rooms
            </h2>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredRooms.length === 0 ? (
            <Card className="border-border border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
                  <PenTool className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {search ? 'No rooms found' : 'No rooms yet'}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {search
                    ? `No rooms match "${search}".`
                    : 'Create your first room to start drawing with your team.'}
                </p>
                {!search && (
                  <Button asChild className="mt-4">
                    <Link href="/create-room">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Room
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRooms.map((room) => (
                <Card
                  key={room.id}
                  className="group cursor-pointer border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                        <PenTool className="h-5 w-5" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-secondary group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h3 className="mt-3 font-semibold text-foreground">
                      {room.name}
                    </h3>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {room.members} members
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {room.lastActive}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
