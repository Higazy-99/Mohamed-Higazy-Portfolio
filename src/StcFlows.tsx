import { useId } from 'react';

/* Flow diagrams for the STC Inspector case. Drawn from data (no screenshots of the source tool), faithful to the UX flows. */

type Kind = 'start' | 'end' | 'step' | 'decision' | 'review';
type Side = 'l' | 'r' | 't' | 'b';
type Pt = [number, number];

type FlowNode = { id: string; label: string; kind: Kind; x: number; y: number; w?: number; h?: number };
type FlowEdge = { from: string; to: string; fs: Side; ts: Side; via?: Pt[]; label?: string; at?: Pt; tone?: 'loop' | 'no' | 'yes' };
type Flow = { w: number; h: number; nodes: FlowNode[]; edges: FlowEdge[] };

const SIZE: Record<Kind, [number, number]> = { start: [104, 56], end: [104, 56], step: [128, 58], review: [150, 58], decision: [150, 92] };

export const inspectorFlow: Flow = {
  w: 1560, h: 450,
  nodes: [
    { id: 'sign', label: 'Sign in', kind: 'start', x: 70, y: 170 },
    { id: 'view', label: 'View my assignments', kind: 'step', x: 218, y: 170, w: 140 },
    { id: 'open', label: 'Open assignment', kind: 'step', x: 372, y: 170 },
    { id: 'ar', label: 'Accept or reject assignment', kind: 'step', x: 526, y: 170, w: 148 },
    { id: 'dec1', label: 'Accept?', kind: 'decision', x: 700, y: 170, w: 120 },
    { id: 'reason', label: 'Provide reason and return to list', kind: 'step', x: 890, y: 70, w: 170 },
    { id: 'nav', label: 'Navigate to site', kind: 'step', x: 870, y: 330 },
    { id: 'start', label: 'Start inspection', kind: 'step', x: 1010, y: 330 },
    { id: 'rec', label: 'Record violations', kind: 'step', x: 1150, y: 330 },
    { id: 'rev', label: 'Review & submit', kind: 'step', x: 1290, y: 330 },
    { id: 'dec2', label: 'Clarification needed?', kind: 'decision', x: 1450, y: 330, w: 150, h: 100 },
    { id: 'end', label: 'End', kind: 'end', x: 1450, y: 170 },
  ],
  edges: [
    { from: 'sign', to: 'view', fs: 'r', ts: 'l' },
    { from: 'view', to: 'open', fs: 'r', ts: 'l' },
    { from: 'open', to: 'ar', fs: 'r', ts: 'l' },
    { from: 'ar', to: 'dec1', fs: 'r', ts: 'l' },
    { from: 'dec1', to: 'reason', fs: 'r', ts: 'l', via: [[780, 170], [780, 70]], label: 'No', at: [780, 120], tone: 'no' },
    { from: 'reason', to: 'view', fs: 't', ts: 't', via: [[890, 20], [218, 20]], tone: 'loop' },
    { from: 'dec1', to: 'nav', fs: 'b', ts: 'l', via: [[700, 330]], label: 'Yes', at: [700, 275], tone: 'yes' },
    { from: 'nav', to: 'start', fs: 'r', ts: 'l' },
    { from: 'start', to: 'rec', fs: 'r', ts: 'l' },
    { from: 'rec', to: 'rev', fs: 'r', ts: 'l' },
    { from: 'rev', to: 'dec2', fs: 'r', ts: 'l' },
    { from: 'dec2', to: 'end', fs: 't', ts: 'b', label: 'Clear', at: [1450, 240], tone: 'yes' },
    { from: 'dec2', to: 'rev', fs: 'b', ts: 'b', via: [[1450, 420], [1290, 420]], label: 'Clarification', at: [1370, 420], tone: 'loop' },
  ],
};

export const adminFlow: Flow = {
  w: 1580, h: 470,
  nodes: [
    { id: 'login', label: 'Admin log in', kind: 'start', x: 76, y: 210, w: 124 },
    { id: 'dash', label: 'Dashboard', kind: 'step', x: 222, y: 210, w: 112 },
    { id: 'dec1', label: 'Create or manage inspections?', kind: 'decision', x: 392, y: 210, w: 180, h: 104 },
    { id: 'create', label: 'Create new ticket', kind: 'step', x: 480, y: 400 },
    { id: 'info', label: 'Enter ticket info', kind: 'step', x: 625, y: 400 },
    { id: 'assign', label: 'Auto / manual assignment', kind: 'step', x: 770, y: 400, w: 140 },
    { id: 'created', label: 'Ticket created', kind: 'step', x: 915, y: 400 },
    { id: 'mon', label: 'Monitor tickets', kind: 'step', x: 915, y: 210 },
    { id: 'review', label: 'Review completed inspections', kind: 'review', x: 1130, y: 60, w: 160 },
    { id: 'reassign', label: 'Reassign inspector', kind: 'step', x: 1130, y: 160, w: 160 },
    { id: 'remind', label: 'Send reminder', kind: 'step', x: 1130, y: 250, w: 160 },
    { id: 'notes', label: 'Add internal notes', kind: 'step', x: 1130, y: 340, w: 160 },
    { id: 'dec2', label: 'Review submission', kind: 'decision', x: 1300, y: 60, w: 140, h: 84 },
    { id: 'clar', label: 'Request clarification', kind: 'step', x: 1500, y: 60, w: 120 },
    { id: 'complete', label: 'Complete submission', kind: 'step', x: 1300, y: 190, w: 140 },
    { id: 'close', label: 'Close ticket', kind: 'step', x: 1300, y: 290 },
    { id: 'end', label: 'End task', kind: 'end', x: 1300, y: 390 },
  ],
  edges: [
    { from: 'login', to: 'dash', fs: 'r', ts: 'l' },
    { from: 'dash', to: 'dec1', fs: 'r', ts: 'l' },
    { from: 'dec1', to: 'create', fs: 'b', ts: 'l', via: [[392, 400]], label: 'Create', at: [392, 335] },
    { from: 'create', to: 'info', fs: 'r', ts: 'l' },
    { from: 'info', to: 'assign', fs: 'r', ts: 'l' },
    { from: 'assign', to: 'created', fs: 'r', ts: 'l' },
    { from: 'created', to: 'mon', fs: 't', ts: 'b' },
    { from: 'dec1', to: 'mon', fs: 'r', ts: 'l', label: 'Manage', at: [660, 210] },
    { from: 'mon', to: 'review', fs: 't', ts: 'l', via: [[915, 60]], label: 'Review', at: [990, 60] },
    { from: 'mon', to: 'reassign', fs: 'r', ts: 'l', via: [[1005, 210], [1005, 160]] },
    { from: 'mon', to: 'remind', fs: 'r', ts: 'l', via: [[1005, 210], [1005, 250]] },
    { from: 'mon', to: 'notes', fs: 'r', ts: 'l', via: [[1005, 210], [1005, 340]] },
    { from: 'review', to: 'dec2', fs: 'r', ts: 'l' },
    { from: 'dec2', to: 'clar', fs: 'r', ts: 'l', label: 'Not clear', at: [1398, 38], tone: 'no' },
    { from: 'clar', to: 'review', fs: 't', ts: 't', via: [[1500, 12], [1130, 12]], tone: 'loop' },
    { from: 'dec2', to: 'complete', fs: 'b', ts: 't', label: 'Clear', at: [1300, 132], tone: 'yes' },
    { from: 'complete', to: 'close', fs: 'b', ts: 't' },
    { from: 'close', to: 'end', fs: 'b', ts: 't' },
  ],
};

function dims(n: FlowNode): [number, number] {
  const [dw, dh] = SIZE[n.kind];
  return [n.w ?? dw, n.h ?? dh];
}

function anchor(n: FlowNode, s: Side): Pt {
  const [w, h] = dims(n);
  return s === 'l' ? [n.x - w / 2, n.y] : s === 'r' ? [n.x + w / 2, n.y] : s === 't' ? [n.x, n.y - h / 2] : [n.x, n.y + h / 2];
}

function roundedPath(pts: Pt[], r = 12) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [cx, cy] = pts[i], [nx, ny] = pts[i + 1];
    const l1 = Math.hypot(cx - px, cy - py), l2 = Math.hypot(nx - cx, ny - cy);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const ax = cx - ((cx - px) / l1) * rr, ay = cy - ((cy - py) / l1) * rr;
    const bx = cx + ((nx - cx) / l2) * rr, by = cy + ((ny - cy) / l2) * rr;
    d += ` L${ax} ${ay} Q${cx} ${cy} ${bx} ${by}`;
  }
  const last = pts[pts.length - 1];
  return d + ` L${last[0]} ${last[1]}`;
}

function wrap(label: string, max: number) {
  const words = label.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) { lines.push(line); line = w; } else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

export function FlowDiagram({ flow, label }: { flow: Flow; label: string }) {
  const uid = useId().replace(/:/g, '');
  const byId = Object.fromEntries(flow.nodes.map((n) => [n.id, n]));
  return (
    <svg className="stc-flow" viewBox={`0 0 ${flow.w} ${flow.h}`} role="img" aria-label={label}>
      <defs>
        <marker id={`${uid}-a`} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="context-stroke" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></marker>
      </defs>
      {flow.edges.map((e, i) => {
        const a = anchor(byId[e.from], e.fs), b = anchor(byId[e.to], e.ts);
        const pts: Pt[] = [a, ...(e.via ?? []), b];
        // straight edges whose ends are not aligned are never drawn: via points keep them orthogonal
        return <path key={i} d={roundedPath(pts)} className={`stc-edge${e.tone ? ` is-${e.tone}` : ''}`} markerEnd={`url(#${uid}-a)`} />;
      })}
      {flow.edges.filter((e) => e.label).map((e, i) => {
        const [x, y] = e.at!;
        const w = e.label!.length * 7.6 + 14;
        return (
          <g key={`l${i}`} className={`stc-elabel${e.tone ? ` is-${e.tone}` : ''}`}>
            <rect x={x - w / 2} y={y - 12} width={w} height={22} rx={11} />
            <text x={x} y={y + 4} textAnchor="middle">{e.label}</text>
          </g>
        );
      })}
      {flow.nodes.map((n) => {
        const [w, h] = dims(n);
        const lines = wrap(n.label, n.kind === 'decision' ? 13 : Math.max(9, Math.floor((w - 14) / 8.0)));
        const lh = 17, y0 = n.y - ((lines.length - 1) * lh) / 2 + 5;
        return (
          <g key={n.id} className={`stc-node is-${n.kind}`}>
            {n.kind === 'decision'
              ? <polygon points={`${n.x},${n.y - h / 2} ${n.x + w / 2},${n.y} ${n.x},${n.y + h / 2} ${n.x - w / 2},${n.y}`} />
              : <rect x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} rx={n.kind === 'start' || n.kind === 'end' ? h / 2 : 12} />}
            <text textAnchor="middle">{lines.map((ln, li) => <tspan key={li} x={n.x} y={y0 + li * lh}>{ln}</tspan>)}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* the same flows as ordered lists, for small screens */
export type FlowStep = { label: string; note?: string; kind?: 'decision' | 'start' | 'end' };

export const inspectorSteps: FlowStep[] = [
  { label: 'Sign in', kind: 'start' },
  { label: 'View my assignments' },
  { label: 'Open assignment' },
  { label: 'Accept or reject assignment' },
  { label: 'Accept?', kind: 'decision', note: 'No: provide a reason and return to the list. Yes: continue.' },
  { label: 'Navigate to site' },
  { label: 'Start inspection' },
  { label: 'Record violations' },
  { label: 'Review & submit' },
  { label: 'Clarification needed?', kind: 'decision', note: 'Yes: back to Review & submit. No: end.' },
  { label: 'End', kind: 'end' },
];

export const adminSteps: FlowStep[] = [
  { label: 'Admin log in', kind: 'start' },
  { label: 'Dashboard' },
  { label: 'Create or manage inspections?', kind: 'decision', note: 'Create: new ticket, ticket info, auto or manual assignment, ticket created. Manage: monitor tickets.' },
  { label: 'Monitor tickets', note: 'Reassign an inspector, send a reminder, add internal notes, or review completed inspections.' },
  { label: 'Review completed inspections' },
  { label: 'Review submission', kind: 'decision', note: 'Not clear: request clarification, then review again. Clear: continue.' },
  { label: 'Complete submission' },
  { label: 'Close ticket' },
  { label: 'End task', kind: 'end' },
];

export function FlowList({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="stc-flowlist">
      {steps.map((s, i) => (
        <li key={s.label} className={s.kind ? `is-${s.kind}` : undefined}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <div><strong>{s.label}</strong>{s.note && <p>{s.note}</p>}</div>
        </li>
      ))}
    </ol>
  );
}
