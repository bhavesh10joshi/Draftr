'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { 
  Pencil, 
  Plus, 
  DoorOpen, 
  Clock, 
  Layers, 
  LogOut,
  Hash,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Room {
  id: string | number;
  slug: string;
  lastActive?: string;
}

async function GetRooms(): Promise<Room[]> {
  try {
    const response = await axios.get(`${BACKEND_URL}/rooms/all`);
    return response.data?.Rooms || response.data || [];
  } catch (e) {
    console.error("Error fetching rooms:", e);
    return [];
  }
}

export default function DashboardPage() {
  const router = useRouter();
  const [newRoomName, setNewRoomName] = useState('');
  const [joinRoomCode, setJoinRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [recentRooms, setRecentRooms] = useState<Room[]>([]);

  useEffect(() => {
    async function fetchAllRooms() {
      const rooms = await GetRooms();
      setRecentRooms(Array.isArray(rooms) ? rooms : []);
    }
    fetchAllRooms();
  }, []);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const token = localStorage.getItem("token");
      const payload = { RoomName: newRoomName };   
      const response = await axios.post(`${BACKEND_URL}/app/createRooms`, payload, {
        headers: {
          'authorization': token || ''
        }
      });
      setIsCreating(false);
      
      const targetRoom = response.data?.room?.slug || newRoomName;
      router.push(`/canvas/${targetRoom}`);
    } catch (e) {
      alert("Problem Encountered! " + e);
      setIsCreating(false);
    }
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinRoomCode.trim()) return;
    setIsJoining(true);
    router.push(`/canvas/${joinRoomCode.trim()}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Subtle Grid Backdrop */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 -z-10" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Pencil className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold tracking-tight">Draftr</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-semibold text-xs">
                BJ
              </div>
              <span className="hidden sm:inline-block text-sm font-medium text-foreground">
                My Workspace
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Sign Out"
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/");
                return;
              }}
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto max-w-6xl px-4 py-10 sm:px-8">
        {/* Welcome Banner */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create an interactive whiteboard or jump straight into a teammate's session.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl bg-secondary/60 border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Zero-latency WebSockets enabled</span>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Card 1: Create a Room */}
          <div className="relative rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Create a Room</h2>
                <p className="text-xs text-muted-foreground">Spin up a brand new real-time canvas</p>
              </div>
            </div>

            <form onSubmit={handleCreateRoom} className="mt-6 space-y-4">
              <div>
                <label htmlFor="room-name" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Room Name
                </label>
                <input
                  id="room-name"
                  type="text"
                  placeholder="e.g. Brainstorming session"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full h-11 rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                />
              </div>

              <button
                type="submit"
                disabled={isCreating}
                className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 font-semibold text-sm text-primary-foreground shadow transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99] disabled:opacity-70 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>{isCreating ? 'Generating Board...' : 'Create & Enter Room'}</span>
              </button>
            </form>
          </div>

          {/* Card 2: Join an Existing Room */}
          <div className="relative rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <DoorOpen className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Join a Room</h2>
                <p className="text-xs text-muted-foreground">Enter with a code or invitation link</p>
              </div>
            </div>

            <form onSubmit={handleJoinRoom} className="mt-6 space-y-4">
              <div>
                <label htmlFor="room-code" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Room Code or URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Hash className="h-4 w-4" />
                  </div>
                  <input
                    id="room-code"
                    type="text"
                    required
                    placeholder="e.g. 7fd92a or room-name"
                    value={joinRoomCode}
                    onChange={(e) => setJoinRoomCode(e.target.value)}
                    className="w-full h-11 rounded-xl border border-input bg-background pl-9 pr-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isJoining || !joinRoomCode.trim()}
                className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 font-semibold text-sm text-foreground shadow-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                <span>{isJoining ? 'Connecting...' : 'Join Board'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Recent Active Canvases Section */}
        <div>
          {recentRooms.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    Recent Whiteboards
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground">{recentRooms.length} boards available</span>
              </div>

              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="divide-y divide-border">
                  {recentRooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => router.push(`/canvas/${room.slug}`)}
                      className="flex items-center justify-between p-4 sm:px-6 hover:bg-secondary/40 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                          <Pencil className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {room.slug}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                            <span className="font-mono">#{room.id}</span>
                            {room.lastActive && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {room.lastActive}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground text-sm border border-dashed border-border rounded-2xl">
              No recent whiteboards found. Create or join a room to get started!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}