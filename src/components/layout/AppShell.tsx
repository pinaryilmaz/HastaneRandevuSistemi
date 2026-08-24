import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useRealtimeStream } from '@/features/system/hooks/useRealtimeStream';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
export function AppShell() { const [menu, setMenu] = useState(false); useRealtimeStream(); return <div className="min-h-screen bg-slate-50"><Sidebar open={menu} onClose={() => setMenu(false)} /><div className="lg:pl-72"><Header onMenu={() => setMenu(true)} /><main className="mx-auto max-w-[1600px] p-4 sm:p-7 lg:p-8"><Outlet /></main></div></div>; }
