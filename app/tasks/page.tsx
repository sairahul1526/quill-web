'use client';

import { useState } from 'react';

const tasks = [
  { id: 'task_01J8', queue: 'notifications', state: 'completed', attempts: 1, priority: 'normal', created_at: '2026-09-26T08:15:00Z' },
  { id: 'task_01J7', queue: 'billing', state: 'retrying', attempts: 2, priority: 'high', created_at: '2026-09-26T08:12:00Z' },
  { id: 'task_01J6', queue: 'exports', state: 'running', attempts: 1, priority: 'low', created_at: '2026-09-26T08:05:00Z' },
];

export default function Tasks() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.id.toLowerCase().includes(normalizedQuery) || task.queue.toLowerCase().includes(normalizedQuery),
  );

  function exportTasks() {
    const rows = [
      ['id', 'queue', 'state', 'priority', 'created_at'],
      ...filteredTasks.map((task) => [task.id, task.queue, task.state, task.priority, task.created_at]),
    ];
    const csv = rows
      .map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tasks.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return (
    <main>
      <p className="eyebrow">TASKS</p>
      <h1>Tasks</h1>
      <p className="lede">Recent task attempts across your workspace.</p>
      <section className="panel">
        <div className="task-toolbar">
          <div className="task-search">
            <label htmlFor="task-search">Search tasks by ID or queue</label>
            <input
              id="task-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. task_01J8 or billing"
            />
          </div>
          <button className="export-button" type="button" onClick={exportTasks} disabled={filteredTasks.length === 0}>
            Export CSV
          </button>
        </div>
        <p className="task-search-count" aria-live="polite">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
        </p>
        {filteredTasks.length > 0 ? (
          <table>
            <thead><tr><th>Task</th><th>Queue</th><th>State</th><th>Attempts</th></tr></thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td><td>{task.queue}</td><td>{task.state}</td><td>{task.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p role="status">No tasks match “{query}”.</p>
        )}
      </section>
    </main>
  );
}
