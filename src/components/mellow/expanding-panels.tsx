import React, { useEffect, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export interface ExpandingPanelItem {
  title: string;
  subtitle?: string;
  /** Numeral label; defaults to 01, 02… */
  numeral?: string;
  /** Numeral color, and the panel wash when open. Any CSS color. */
  accent?: string;
  /** Text color on top of the accent wash. */
  foreground?: string;
  /** Rich content revealed when the panel opens. */
  content?: React.ReactNode;
}

export interface ExpandingPanelsProps {
  items: ExpandingPanelItem[];
  /** Panel open on mount; null = all columns rest equal. */
  defaultActive?: number | null;
  height?: number;
  /** Lay the panels out as rows instead of columns (used on narrow screens). */
  vertical?: boolean;
  /** Flex-grow of the open panel relative to the rails. */
  grow?: number;
  stiffness?: number;
  damping?: number;
  onActiveChange?: (index: number | null) => void;
  className?: string;
  label?: string;
}

/** True below the given viewport width. */
export function useNarrow(maxWidth = 720) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const sync = () => setNarrow(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, [maxWidth]);
  return narrow;
}

/**
 * An editorial menu of numbered panels. Hover (or focus) one and it blooms into
 * a full-height accent panel with its content, while the others compress into
 * slim rails with vertical titles.
 */
export function ExpandingPanels({
  items,
  defaultActive = null,
  height = 420,
  vertical = false,
  grow = 3.4,
  stiffness = 220,
  damping = 30,
  onActiveChange,
  className,
  label,
}: ExpandingPanelsProps) {
  const [active, setActive] = useState<number | null>(defaultActive);
  const reduced = useReducedMotion();

  const set = (index: number | null) => {
    setActive(index);
    onActiveChange?.(index);
  };

  const spring = reduced ? ({ duration: 0 } as const) : ({ type: 'spring', stiffness, damping } as const);
  const ease = [0.22, 1, 0.36, 1] as const;
  const infoEnter = reduced ? { duration: 0 } : { duration: 0.4, delay: 0.12, ease };
  const railEnter = reduced ? { duration: 0 } : { duration: 0.3, delay: 0.14, ease };
  const infoExit = { duration: 0 };
  const railExit = reduced ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 1, 1] as const };
  const wash = reduced ? { duration: 0 } : { duration: 0.3, ease };
  const contentFade = reduced ? { duration: 0 } : { duration: 0.28, delay: 0.08, ease };

  return (
    <div
      className={['ep', vertical ? 'is-vertical' : '', className].filter(Boolean).join(' ')}
      style={{ height }}
      role="group"
      aria-label={label}
      onMouseLeave={() => set(defaultActive)}
    >
      {items.map((item, i) => {
        const isOpen = active === i;
        const mode = active === null ? 'rest' : isOpen ? 'open' : 'rail';
        const accent = item.accent ?? 'var(--muted)';
        const fg = item.foreground ?? '#fff';
        const numeral = item.numeral ?? String(i + 1).padStart(2, '0');

        return (
          <motion.div
            key={item.title}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-label={`${numeral} — ${item.title}`}
            animate={{ flexGrow: isOpen ? grow : 1 }}
            transition={spring}
            onMouseEnter={() => set(i)}
            onFocus={() => set(i)}
            onClick={() => set(i)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                set(isOpen ? null : i);
              }
            }}
            className="ep-panel"
            data-magnetic-off
          >
            <motion.div aria-hidden="true" initial={false} animate={{ opacity: mode === 'open' ? 1 : 0 }} transition={wash} className="ep-wash" style={{ background: accent }} />

            <AnimatePresence mode="wait" initial={false}>
              {mode === 'rail' ? (
                <motion.div key="rail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: railExit }} transition={railEnter} className="ep-rail">
                  <span className="ep-numeral" style={{ '--ac': accent } as CSSProperties}>{numeral}</span>
                  <span className="ep-rail-title">{item.title}</span>
                </motion.div>
              ) : (
                <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: infoExit }} transition={infoEnter} className="ep-info">
                  <span className="ep-numeral ep-numeral-lg" style={(mode === 'open' ? { color: fg } : { '--ac': accent }) as CSSProperties}>{numeral}</span>

                  <motion.div initial={false} animate={{ opacity: mode === 'open' ? 1 : 0 }} transition={contentFade} className={`ep-content${mode === 'open' ? '' : ' is-hidden'}`} style={{ color: fg }}>
                    {item.content}
                  </motion.div>

                  <div className="ep-foot">
                    <div className="ep-title" style={{ color: mode === 'open' ? fg : 'var(--ink)' }}>{item.title}</div>
                    {item.subtitle && (
                      <div className="ep-subtitle" style={{ color: mode === 'open' ? `color-mix(in oklab, ${fg} 70%, transparent)` : 'var(--muted)' }}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default ExpandingPanels;
