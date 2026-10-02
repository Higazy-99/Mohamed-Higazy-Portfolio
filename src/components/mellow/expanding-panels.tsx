import React, { useEffect, useId, useState, type CSSProperties } from 'react';
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
 * An editorial menu of numbered panels. Each panel is a real button (the trigger) and a sibling
 * region (the content it controls). Opening one blooms it into a full-height accent panel, while
 * the others compress into slim rails with vertical titles.
 *
 * A mouse opens a panel by hovering; a tap or click opens it; Enter / Space toggles it.
 * Closed content is inert and hidden from assistive technology.
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
  // `from` is the panel that was open before the last change: it decides how the content fades in.
  const [state, setState] = useState<{ active: number | null; from: number | null }>({ active: defaultActive, from: defaultActive });
  const { active, from } = state;
  const reduced = useReducedMotion();
  const uid = useId();

  const set = (index: number | null) => {
    if (index === active) return;
    setState({ active: index, from: active });
    onActiveChange?.(index);
  };

  const spring = reduced ? ({ duration: 0 } as const) : ({ type: 'spring', stiffness, damping } as const);
  const ease = [0.22, 1, 0.36, 1] as const;
  const none = { duration: 0 } as const;
  const infoEnter = reduced ? none : { duration: 0.4, delay: 0.12, ease };
  const railEnter = reduced ? none : { duration: 0.3, delay: 0.14, ease };
  const infoExit = none;
  const railExit = reduced ? none : { duration: 0.2, ease: [0.4, 0, 1, 1] as const };
  const wash = reduced ? none : { duration: 0.3, ease };
  // Content of a panel opened from rest (its title block is already on screen).
  const contentFade = reduced ? none : { duration: 0.28, delay: 0.08, ease };
  // Content of a panel opened from a rail: wait for the rail to leave (0.2s) and come in with the title block.
  const contentAfterRail = reduced ? none : { duration: 0.4, delay: 0.32, ease };

  return (
    <div
      className={['ep', vertical ? 'is-vertical' : '', className].filter(Boolean).join(' ')}
      style={{ height }}
      role="group"
      aria-label={label}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') set(defaultActive);
      }}
    >
      {items.map((item, i) => {
        const isOpen = active === i;
        const mode = active === null ? 'rest' : isOpen ? 'open' : 'rail';
        const accent = item.accent ?? 'var(--muted)';
        const fg = item.foreground ?? '#fff';
        const numeral = item.numeral ?? String(i + 1).padStart(2, '0');
        const triggerId = `${uid}-trigger-${i}`;
        const contentId = `${uid}-content-${i}`;
        const contentTransition = isOpen ? (from === null ? contentFade : contentAfterRail) : active === null ? contentFade : none;

        return (
          <motion.div
            key={item.title}
            animate={{ flexGrow: isOpen ? grow : 1 }}
            transition={spring}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') set(i);
            }}
            className={`ep-panel${isOpen ? ' is-open' : ''}`}
            data-state={mode}
            data-magnetic-off
          >
            <motion.div aria-hidden="true" initial={false} animate={{ opacity: mode === 'open' ? 1 : 0 }} transition={wash} className="ep-wash" style={{ background: accent }} />

            <button
              type="button"
              id={triggerId}
              className="ep-trigger"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={(event) => {
                // detail === 0: activated from the keyboard (Enter / Space) or by assistive tech, which toggles.
                // A pointer click only opens, because a mouse has already opened the panel by hovering.
                if (event.detail === 0) set(isOpen ? null : i);
                else set(i);
              }}
            >
              <span className="sr-only">{`${numeral}. ${item.title}${item.subtitle ? `. ${item.subtitle}` : ''}`}</span>

              <AnimatePresence mode="wait" initial={false}>
                {mode === 'rail' ? (
                  <motion.span key="rail" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: railExit }} transition={railEnter} className="ep-rail">
                    <span className="ep-numeral" style={{ '--ac': accent } as CSSProperties}>{numeral}</span>
                    <span className="ep-rail-title">{item.title}</span>
                  </motion.span>
                ) : (
                  <motion.span key="info" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: infoExit }} transition={infoEnter} className="ep-info">
                    <span className="ep-numeral ep-numeral-lg" style={(mode === 'open' ? { color: fg } : { '--ac': accent }) as CSSProperties}>{numeral}</span>

                    <span className="ep-foot">
                      <span className="ep-title" style={{ color: mode === 'open' ? fg : 'var(--ink)' }}>{item.title}</span>
                      {item.subtitle && (
                        <span className="ep-subtitle" style={{ color: mode === 'open' ? `color-mix(in oklab, ${fg} 70%, transparent)` : 'var(--muted)' }}>
                          {item.subtitle}
                        </span>
                      )}
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <motion.div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              initial={false}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={contentTransition}
              className={`ep-content${isOpen ? '' : ' is-hidden'}`}
              style={{ color: fg }}
            >
              {item.content}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default ExpandingPanels;
