import type { Metadata } from 'next';
import Link from 'next/link';
import './style.css';

export const metadata: Metadata = { title: 'Quill Dashboard', description: 'Task and queue operations for Quill Cloud' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header><Link className="brand" href="/">Quill Dashboard</Link><nav><Link href="/tasks">Tasks</Link><Link href="/queues">Queues</Link><Link href="/schedules">Schedules</Link></nav></header>{children}</body></html>;
}
