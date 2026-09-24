import Link from 'next/link';

export default function Home() {
  return <main><p className="eyebrow">QUILL CLOUD</p><h1>Operations overview</h1><p className="lede">Inspect task state, queue health and upcoming schedules.</p><section className="stats"><article><span>Queued tasks</span><strong>128</strong></article><article><span>Running tasks</span><strong>14</strong></article><article><span>Queues</span><strong>6</strong></article></section><section className="panel"><h2>Recent activity</h2><p>task_01J8 · notifications · completed</p><p>task_01J7 · billing · retry scheduled</p><p>task_01J6 · exports · running</p><Link href="/tasks">View all tasks →</Link></section></main>;
}
