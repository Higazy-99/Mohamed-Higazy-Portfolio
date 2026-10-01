import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';

export interface WordRevealProps {
  /** The paragraph to reveal. Wrap a single word in asterisks (`*quietly*`) to give it the accent style. */
  text: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4';
  /** Opacity of words before they're revealed. */
  fromOpacity?: number;
  /** Viewport offset where the reveal starts/ends — passed to useScroll. */
  offset?: [string, string];
  /** How many words overlap in the reveal window (higher = softer wave). */
  overlap?: number;
  /** Scrollable ancestor to scrub against. Defaults to the window viewport. */
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  /** Class applied to `*accented*` words. */
  accentClassName?: string;
}

function Word({
  children,
  progress,
  range,
  fromOpacity,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  fromOpacity: number;
  className?: string;
}) {
  const opacity = useTransform(progress, range, [fromOpacity, 1]);
  return (
    <motion.span style={{ opacity }} className={className}>
      {children}{' '}
    </motion.span>
  );
}

/**
 * A paragraph that reveals word-by-word as it scrolls through the viewport —
 * ink rising to full strength, scrubbed directly to scroll position.
 */
export function WordReveal({ as: Tag = 'p', ...rest }: WordRevealProps) {
  // Keyed on Tag so switching the wrapper element fully remounts this subtree
  // instead of swapping the host element type under a persistent ref.
  return <WordRevealBody key={Tag} as={Tag} {...rest} />;
}

function WordRevealBody({
  text,
  as: Tag = 'p',
  fromOpacity = 0.13,
  offset = ['start 0.8', 'start 0.3'],
  overlap = 3,
  containerRef,
  className,
  accentClassName = 'wr-accent',
}: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef ?? undefined,
    // motion's offset type is stricter than its docs; the string pairs are valid
    offset: offset as never,
  });

  const words = useMemo(
    () =>
      text
        .split(/\s+/)
        .filter(Boolean)
        .map((raw) => {
          const accent = /^\*.+\*[.,;:!?—]*$/.test(raw);
          return { word: raw.replace(/\*/g, ''), accent };
        }),
    [text],
  );

  if (reduced) {
    return (
      <Tag ref={ref as never} className={className}>
        {words.map((w, i) => (
          <span key={i} className={w.accent ? accentClassName : undefined}>
            {w.word}{' '}
          </span>
        ))}
      </Tag>
    );
  }

  const n = words.length;
  return (
    <Tag ref={ref as never} className={className}>
      {words.map((w, i) => {
        const start = i / (n + overlap);
        const end = Math.min((i + overlap) / (n + overlap), 1);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} fromOpacity={w.accent ? Math.max(fromOpacity, 0.7) : fromOpacity} className={w.accent ? accentClassName : undefined}>
            {w.word}
          </Word>
        );
      })}
    </Tag>
  );
}

export default WordReveal;
