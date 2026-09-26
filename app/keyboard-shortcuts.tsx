'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KeyboardShortcuts() {
  const router = useRouter();
  const [helpOpen, setHelpOpen] = useState(false);
  const pendingG = useRef(false);
  const sequenceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && helpOpen) {
        setHelpOpen(false);
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;

      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) {
        return;
      }

      if (event.key === '?') {
        event.preventDefault();
        setHelpOpen(true);
        return;
      }
      if (helpOpen) return;

      const key = event.key.toLowerCase();
      if (key === 'g') {
        pendingG.current = true;
        clearTimeout(sequenceTimer.current);
        sequenceTimer.current = setTimeout(() => {
          pendingG.current = false;
        }, 1000);
        return;
      }

      if (pendingG.current) {
        pendingG.current = false;
        clearTimeout(sequenceTimer.current);
        if (key === 't') {
          event.preventDefault();
          router.push('/tasks');
        } else if (key === 'q') {
          event.preventDefault();
          router.push('/queues');
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(sequenceTimer.current);
    };
  }, [helpOpen, router]);

  return (
    <>
      <button className="theme-toggle" type="button" onClick={() => setHelpOpen(true)}>
        Shortcuts ?
      </button>
      {helpOpen && (
        <div className="shortcuts-backdrop" onClick={() => setHelpOpen(false)}>
          <section
            className="shortcuts-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcuts-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="shortcuts-heading">
              <h2 id="shortcuts-title">Keyboard shortcuts</h2>
              <button className="theme-toggle" type="button" onClick={() => setHelpOpen(false)}>
                Close
              </button>
            </div>
            <dl className="shortcuts-list">
              <div><dt><kbd>g</kbd> then <kbd>t</kbd></dt><dd>Open Tasks</dd></div>
              <div><dt><kbd>g</kbd> then <kbd>q</kbd></dt><dd>Open Queues</dd></div>
              <div><dt><kbd>?</kbd></dt><dd>Show this help</dd></div>
            </dl>
          </section>
        </div>
      )}
    </>
  );
}
