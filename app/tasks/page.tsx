'use client';

import { useState } from 'react';

const tasks = [
  { id: 'task_01J8', queue: 'notifications', state: 'completed', attempts: 1 },
  { id: 'task_01J7', queue: 'billing', state: 'retrying', attempts: 2 },
  { id: 'task_01J6', queue: 'exports', state: 'running', attempts: 1 },
];

export default function Tasks() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.id.toLowerCase().includes(normalizedQuery) || task.queue.toLowerCase().includes(normalizedQuery),
  );

  return (
    <main>
      <p className="eyebrow">TASKS</p>
      <h1>Tasks</h1>
      <p className="lede">Recent task attempts across your workspace.</p>
      <section className="panel">
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
