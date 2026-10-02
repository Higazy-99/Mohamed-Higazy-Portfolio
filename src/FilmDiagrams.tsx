import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import type { ReactElement } from 'react';

/* Diagrams for the Film Saudi audit: journey maps, user flowcharts and information architecture. Everything is drawn from data, no images. */

/* ---------- Journey maps ---------- */

type Point = { kind: 'Need' | 'Pain'; t: string };
type JStage = { name: string; does: string[]; blocks?: string[]; points?: Point[]; touch: string[]; opp?: string; added?: boolean; mood: number; feel: string };

const asIsStages: JStage[] = [
  {
    name: 'Arriving on the home page',
    does: ['Register a new account', 'Explore the platform content', 'Scan the main sections in the navigation bar'],
    blocks: ['The official site is hard to find from a search engine', 'Weak content and unclear categories do not guide the user', 'No information on supported programmes or the latest news', 'No search on the platform'],
    touch: ['Search engine', 'The platform'],
    mood: 0.32, feel: 'Confused',
  },
  {
    name: 'Searching for programmes',
    does: ['Choose a suitable programme', 'Browse the programmes and their details', 'Open the programme page', 'Fill in and submit the form'],
    blocks: ['No clear comparison between programmes', 'Incomplete data is not saved, so it is entered again on Daw', 'Long forms', 'File uploads sometimes fail', 'A submitted request cannot be followed from account settings'],
    touch: ['Film platform', 'Daw platform'],
    mood: 0.32, feel: 'Confused',
  },
  {
    name: 'Filming locations and service providers',
    does: ['Browse suitable companies and locations', 'Choose a company and check its contact details', 'Contact the company to book the service'],
    blocks: ['Searching for companies and locations is hard', 'Users cannot tell which location suits the shoot'],
    touch: ['Service details page', 'Search'],
    mood: 0.1, feel: 'Overwhelmed',
  },
  {
    name: 'Permits and licences (Abde\'a)',
    does: ['Move to Abde\'a to get permits and licences', 'Search the services and check the conditions', 'Sign in with Nafath to complete the request'],
    blocks: ['So many services that choosing the right one is hard', 'Users do not know which permit or licence fits their service'],
    touch: ['Abde\'a platform', 'Nafath', 'Email'],
    mood: 0.32, feel: 'Confused',
  },
];

const toBeStages: JStage[] = [
  {
    name: 'Initial search and the home page',
    does: ['Search on Google with general terms', 'Enter the platform, or register', 'Explore the platform content', 'Browse the latest news and the platform history'],
    points: [{ kind: 'Need', t: 'The platform\'s history and the entity behind it' }, { kind: 'Need', t: 'Everything about applying, and the other programmes' }],
    touch: ['Search engine', 'Social media', 'The platform'],
    mood: 0.78, feel: 'Relieved',
    opp: 'Add a prominent, effective search bar, and review the names of the main sections in the IA so they are clearer.',
  },
  {
    name: 'Searching for programmes and checking the conditions',
    does: ['Search the programmes and the supported projects', 'Understand the requirements and compare programmes', 'Check the cash rebate and Daw support conditions', 'Choose a programme, fill in the form and upload documents'],
    points: [{ kind: 'Pain', t: 'Many files are required to apply to Daw' }, { kind: 'Need', t: 'The rebate rate and conditions for each film category' }, { kind: 'Need', t: 'A clear classification of project types, and easy comparison' }],
    touch: ['Film platform', 'Daw platform', 'Chatbot'],
    mood: 0.6, feel: 'Relieved, with effort',
    opp: 'Offer a checklist that users can print or save to their device, with a reminder to complete the requirements by SMS or email.',
  },
  {
    name: 'Searching for filming locations and service providers',
    does: ['Search for a suitable filming location', 'Use advanced search and the interactive map', 'Check the providers and locations the platform suggests', 'Check the permit and licence that apply'],
    points: [{ kind: 'Pain', t: 'Hard to know which location suits the type of filming' }, { kind: 'Need', t: 'Complete details, the company website and the service offered' }, { kind: 'Need', t: 'An interactive guide, and an updated, classified supplier list' }],
    touch: ['Film platform', 'Interactive map', 'Chatbot', 'Help centre or FAQ'],
    mood: 0.6, feel: 'Relieved, with effort',
    opp: 'Design request forms that fill in returning users\' details from their profile, so they do not enter the same data twice.',
  },
  {
    name: 'Getting permits and licences (Abde\'a)',
    does: ['Browse the fitting permits on the Film platform first', 'Choose the permit and review the conditions and fees', 'Move to Abde\'a to get the permit', 'Sign in with Nafath, or on Abde\'a, to complete the request'],
    points: [{ kind: 'Pain', t: 'Hard to know which service fits the user' }, { kind: 'Need', t: 'To know which service fits my request' }],
    touch: ['Film platform', 'Abde\'a platform', 'Nafath', 'Email'],
    mood: 0.6, feel: 'Relieved, with effort',
    opp: 'Add a short section in the Film Saudi platform that explains which permits fit the user\'s request before they move to Abde\'a.',
  },
  {
    name: 'Account settings and following requests',
    does: ['Follow the status of requests', 'Update the account data, or change the password'],
    points: [{ kind: 'Need', t: 'To track my request and know if it was accepted or rejected' }, { kind: 'Need', t: 'One dashboard with all current and previous transactions' }],
    touch: ['The platform', 'Email'],
    mood: 0.82, feel: 'Relieved',
    opp: 'Improve how requests are displayed, and give the user a full control dashboard.',
    added: true,
  },
];

function Dots({ n }: { n: number }) {
  return (
    <span className="jm-dots" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => <i key={i} className={i < n ? 'is-on' : undefined} />)}
    </span>
  );
}

function JmCurve({ stages }: { stages: JStage[] }) {
  const pts = stages.map((s, i) => ({ x: ((i + 0.5) / stages.length) * 100, y: 100 - s.mood * 100 }));
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
  return (
    <div className="jm-curve" aria-hidden="true">
      <div className="jm-curve-inner">
        <span className="jm-hi">Positive</span><span className="jm-lo">Negative</span>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d={path} className="jm-curve-line" vectorEffect="non-scaling-stroke" /></svg>
        {pts.map((p, i) => <i key={i} style={{ left: `${p.x}%`, top: `${p.y}%` }} />)}
      </div>
    </div>
  );
}

export function JourneyMap({ mode }: { mode: 'asis' | 'tobe' }) {
  const stages = mode === 'asis' ? asIsStages : toBeStages;
  const uid = useId();
  const [open, setOpen] = useState<boolean[]>(() => stages.map(() => false));
  const allOpen = open.every(Boolean);
  const toggle = (i: number) => setOpen((o) => o.map((v, j) => (j === i ? !v : v)));
  const rows: { label: string; detail?: boolean; cell: (s: JStage) => ReactElement; tone?: string }[] = [
    { label: 'What users do', detail: true, cell: (s) => <ol className="jm-does">{s.does.map((d) => <li key={d}>{d}</li>)}</ol> },
    ...(mode === 'asis'
      ? [{ label: 'What blocks them', tone: 'is-block', cell: (s: JStage) => <ul className="jm-blocks">{(s.blocks ?? []).map((b) => <li key={b}>{b}</li>)}</ul> }]
      : [{ label: 'What they need', detail: true, cell: (s: JStage) => <ul className="jm-points">{(s.points ?? []).map((p) => <li key={p.t} className={`is-${p.kind.toLowerCase()}`}><b>{p.kind}</b>{p.t}</li>)}</ul> }]),
    { label: 'Touchpoints', detail: true, cell: (s) => <ul className="jm-tags">{s.touch.map((t) => <li key={t}>{t}</li>)}</ul> },
    { label: 'How they feel', tone: 'is-feel', cell: (s) => <p className="jm-feel"><span className="jm-meter" aria-hidden="true"><i style={{ width: `${Math.round(s.mood * 100)}%` }} /></span><b>{s.feel}</b></p> },
    ...(mode === 'tobe' ? [{ label: 'Opportunity', tone: 'is-opp', cell: (s: JStage) => <p className="jm-opp">{s.opp}</p> }] : []),
  ];
  const detailIdx = rows.map((r, ri) => (r.detail ? ri : -1)).filter((ri) => ri >= 0);
  const ids = (kind: 'd' | 'c', i: number) => detailIdx.map((ri) => `${uid}-${kind}-${ri}-${i}`).join(' ');
  const toggleBtn = (i: number, kind: 'd' | 'c') => (
    <button type="button" className="jm-btn" aria-expanded={open[i]} aria-controls={ids(kind, i)} onClick={() => toggle(i)} data-magnetic>
      {open[i] ? 'Hide details' : 'Show details'}<ChevronDown size={16} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
  return (
    <div className={`jm-wrap is-${mode}`}>
      <div className="jm-tools">
        <button type="button" className="jm-btn" aria-expanded={allOpen} aria-controls={`${uid}-map ${uid}-cards`} onClick={() => setOpen(stages.map(() => !allOpen))} data-magnetic>
          {allOpen ? 'Hide all details' : 'Show all details'}
        </button>
      </div>
      <div className="jm-scroll" tabIndex={0} role="region" aria-label={`${mode === 'asis' ? 'Current' : 'Improved'} user journey, scrolls horizontally`}>
        <div className="jm" id={`${uid}-map`} style={{ ['--cols' as string]: stages.length }}>
          <div className="jm-label jm-corner">Stage</div>
          {stages.map((s, i) => (
            <div key={s.name} className={`jm-chev${s.added ? ' is-added' : ''}`}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.name}</h3>
              {s.added && <small>New stage</small>}
            </div>
          ))}
          <div className="jm-row">
            <div className="jm-label">Details</div>
            {stages.map((s, i) => <div key={s.name} className="jm-cell jm-toggle">{toggleBtn(i, 'd')}</div>)}
          </div>
          {mode === 'asis' && (
            <div className="jm-row">
              <div className="jm-label">Friction</div>
              {stages.map((s) => <div key={s.name} className="jm-cell jm-friction"><Dots n={s.blocks?.length ?? 0} /><span>{s.blocks?.length ?? 0} blockers</span></div>)}
            </div>
          )}
          {rows.map((row, ri) => (
            <div key={row.label} className={`jm-row ${row.tone ?? ''}`}>
              {row.label === 'How they feel' && (
                <>
                  <div className="jm-label">Emotion</div>
                  <JmCurve stages={stages} />
                </>
              )}
              {row.detail
                ? <div className={`jm-label jm-det${open.some(Boolean) ? ' is-open' : ''}`}><div className="jm-det-in">{row.label}</div></div>
                : <div className="jm-label">{row.label}</div>}
              {stages.map((s, i) => row.detail
                ? <div key={s.name} id={`${uid}-d-${ri}-${i}`} className={`jm-cell jm-det${open[i] ? ' is-open' : ''}`}><div className="jm-det-in">{row.cell(s)}</div></div>
                : <div key={s.name} className="jm-cell">{row.cell(s)}</div>)}
            </div>
          ))}
        </div>
      </div>
      <ol className="jm-cards" id={`${uid}-cards`}>
        {stages.map((s, i) => (
          <li key={s.name} className={s.added ? 'is-added' : undefined}>
            <div className="jm-cards-top"><span>{String(i + 1).padStart(2, '0')}</span><h3>{s.name}</h3></div>
            {s.added && <small className="jm-new">New stage</small>}
            <div className="jm-cards-btn">{toggleBtn(i, 'c')}</div>
            {rows.map((row, ri) => row.detail
              ? <div key={row.label} id={`${uid}-c-${ri}-${i}`} className={`jm-det${open[i] ? ' is-open' : ''}`}><div className="jm-det-in"><div className={`jm-crow ${row.tone ?? ''}`}><h4>{row.label}</h4>{row.cell(s)}</div></div></div>
              : <div key={row.label} className={row.tone}><h4>{row.label}</h4>{row.cell(s)}</div>)}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- User flow: one fork-and-join diagram, as on the Miro board ---------- */

type LStep = { t: string; changed?: boolean; redundant?: boolean; removed?: boolean };
type Lane = { goal: string; pre: LStep[]; account?: boolean; post: LStep[]; empty?: string };

const acct: LStep[] = [{ t: 'Log in' }, { t: 'Fill in the form' }, { t: 'Submit the form' }];

const lanesAsIs: Lane[] = [
  { goal: 'Change my details', pre: [], post: [], empty: 'Not part of today\'s flow' },
  { goal: 'Track my requests', pre: [{ t: 'Click "My account"' }, { t: 'Choose "My requests"' }, { t: 'Browse previous requests' }], post: [] },
  { goal: 'Apply to a programme', pre: [{ t: 'Choose a programme' }, { t: 'View the details' }, { t: 'Apply' }, { t: 'Read the requirements', removed: true }, { t: 'Apply again', redundant: true }], account: true, post: acct },
  { goal: 'Find a filming location', pre: [{ t: 'Browse all locations' }, { t: 'Set the filter', removed: true }, { t: 'Choose a location' }, { t: 'View photos and details' }], post: [] },
  { goal: 'Find a service provider', pre: [{ t: 'Browse all providers' }, { t: 'Set the "Jeddah" filter', removed: true }, { t: 'Choose a provider' }, { t: 'Contact by phone or email' }], post: [] },
  { goal: 'Get a permit', pre: [{ t: 'Go to Abde\'a' }, { t: 'Browse the platform', removed: true }, { t: 'Browse all permits', removed: true }, { t: 'Search by permit name', removed: true }, { t: 'View the permit and how to get it' }, { t: 'Submit a request' }, { t: 'Fill in the data' }, { t: 'Send the request' }], post: [] },
];

const lanesToBe: Lane[] = [
  { goal: 'Change my details', pre: [{ t: 'Click "My account"' }, { t: 'Choose "Account settings"', changed: true }, { t: 'Change my details', changed: true }, { t: 'Save the changes', changed: true }], post: [] },
  { goal: 'Track my requests', pre: [{ t: 'Click "My account"' }, { t: 'Choose "My requests"' }, { t: 'Browse previous requests' }], post: [] },
  { goal: 'Apply to a programme', pre: [{ t: 'Choose a programme' }, { t: 'View the details' }, { t: 'Read the requirements', changed: true }, { t: 'Apply' }], account: true, post: acct },
  { goal: 'Find a filming location', pre: [{ t: 'Browse all locations' }, { t: 'Filter, or search by name', changed: true }, { t: 'Search on the map', changed: true }, { t: 'Choose a location' }, { t: 'View photos and details' }], post: [] },
  { goal: 'Find a service provider', pre: [{ t: 'Browse all providers' }, { t: 'Filter "Jeddah", or search by name', changed: true }, { t: 'Choose a provider' }, { t: 'Contact by phone or email' }], post: [] },
  { goal: 'Get a permit', pre: [{ t: 'Browse film permits', changed: true }, { t: 'Choose a permit', changed: true }, { t: 'View the permit', changed: true }, { t: 'Go to Abde\'a' }, { t: 'See how to get it' }, { t: 'Submit a request' }, { t: 'Fill in the data' }, { t: 'Send the request' }], post: [] },
];

export const flowFacts = {
  changed: lanesToBe.reduce((n, l) => n + [...l.pre, ...l.post].filter((s) => s.changed).length, 0),
};

export const flowDeltas = [
  { goal: 'Change my details', text: 'A new path. Users can edit their details from account settings.' },
  { goal: 'Apply to a programme', text: 'Programmes and their requirements come before the first Apply, so the repeated Apply is removed.' },
  { goal: 'Find a filming location', text: 'Search by name and an interactive map are added next to the filter.' },
  { goal: 'Find a service provider', text: 'Search by name is added next to the filter.' },
  { goal: 'Get a permit', text: 'Users browse and choose the permit on Film Saudi first, so they reach Abde\'a with a permit already chosen.' },
];

const FW = 126;
const FH = 50;
const FG = 26;
const LBL = 158;
const X_STEPS = 236;
const LANE = 96;
const BR = 74;
const TOPPAD = 76;

function flowWrap(text: string, max = 19) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function FlowList({ mode }: { mode: 'asis' | 'tobe' }) {
  const lanes = mode === 'asis' ? lanesAsIs : lanesToBe;
  return (
    <ol className="fl-list" aria-label={`${mode === 'asis' ? 'Current' : 'To-be'} user flows as lists`}>
      {lanes.map((lane, i) => {
        const steps: { t: string; tag?: string }[] = [
          ...lane.pre.map((s) => ({ t: s.t, tag: s.changed ? 'New' : s.redundant ? 'Redundant' : s.removed ? 'Replaced' : undefined })),
          ...(lane.account ? [{ t: 'Have an account? Yes: log in. No: create an account, upload the files, verify the data, then log in.', tag: 'Decision' }] : []),
          ...lane.post.filter((s) => s.t !== 'Log in').map((s) => ({ t: s.t })),
        ];
        return (
          <li key={lane.goal} className={lane.empty ? 'is-empty' : undefined}>
            {lane.empty ? (
              <>
                <h4><span>{String(i + 1).padStart(2, '0')}</span>{lane.goal}</h4>
                <p>{lane.empty}</p>
              </>
            ) : (
              <details>
                <summary>
                  <h4><span>{String(i + 1).padStart(2, '0')}</span>{lane.goal}</h4>
                  <small>{steps.length} steps{steps.filter((s) => s.tag === 'New').length > 0 && ` · ${steps.filter((s) => s.tag === 'New').length} new`}</small>
                  <ChevronDown size={18} strokeWidth={1.8} aria-hidden="true" />
                </summary>
                <ol>{steps.map((s, k) => <li key={k} className={s.tag ? `is-${s.tag.toLowerCase()}` : undefined}>{s.t}{s.tag && <em>{s.tag}</em>}</li>)}</ol>
              </details>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function FlowDiagram({ mode }: { mode: 'asis' | 'tobe' }) {
  const lanes = mode === 'asis' ? lanesAsIs : lanesToBe;
  const maxN = Math.max(...lanes.map((l) => l.pre.length + (l.account ? 1 : 0) + l.post.length));
  const stepsEnd = X_STEPS + maxN * (FW + FG);
  const joinX = stepsEnd + 16;
  const decX = joinX + 60;
  const W = decX + 210;
  const laneY: number[] = [];
  let y = TOPPAD;
  lanes.forEach((l) => {
    laneY.push(y + LANE / 2);
    y += LANE + (l.account ? BR : 0);
  });
  const H = y + 40;
  const midY = (laneY[0] + laneY[laneY.length - 1]) / 2;
  const items: ReactElement[] = [];
  const head = `url(#fo-head-${mode})`;
  const arrow = (key: string, x1: number, y1: number, x2: number, y2: number) => <line key={key} className="fd-arrow" x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={head} />;
  const box = (key: string, x: number, cy: number, s: LStep, kind: 'step' | 'decision' = 'step') => {
    if (kind === 'decision') {
      return (
        <g key={key}>
          <polygon className="fd-node fd-decision" points={`${x + FW / 2},${cy - 34} ${x + FW},${cy} ${x + FW / 2},${cy + 34} ${x},${cy}`} />
          <text className="fd-t" x={x + FW / 2} y={cy - 6} textAnchor="middle" dominantBaseline="central">Have an</text>
          <text className="fd-t" x={x + FW / 2} y={cy + 8} textAnchor="middle" dominantBaseline="central">account?</text>
        </g>
      );
    }
    const cls = `fd-node is-${mode}${s.changed ? ' is-changed' : ''}${s.redundant ? ' is-redundant' : ''}${s.removed ? ' is-removed' : ''}`;
    const lines = flowWrap(s.t);
    const top = cy - (lines.length - 1) * 7;
    return (
      <g key={key}>
        <rect className={cls} x={x} y={cy - FH / 2} width={FW} height={FH} rx={10} />
        <text className={`fd-t${s.changed ? ' is-changed' : ''}${s.redundant ? ' is-redundant' : ''}`} x={x + FW / 2} y={top} textAnchor="middle" dominantBaseline="central">
          {lines.map((l, i) => <tspan key={i} x={x + FW / 2} dy={i === 0 ? 0 : 14}>{l}</tspan>)}
        </text>
      </g>
    );
  };

  // start, home, fork
  items.push(
    <g key="start">
      <rect className="fd-term is-start" x={0} y={midY - 19} width={78} height={38} rx={19} />
      <text className="fd-t is-term" x={39} y={midY} textAnchor="middle" dominantBaseline="central">Start</text>
      <line className="fd-arrow" x1={79} y1={midY} x2={100} y2={midY} markerEnd={head} />
      <rect className="fd-node fd-home" x={101} y={midY - 22} width={64} height={44} rx={10} />
      <text className="fd-t is-main" x={133} y={midY} textAnchor="middle" dominantBaseline="central">Home</text>
    </g>,
  );
  const forkX = 176;
  items.push(<line key="fork" className="fd-rail" x1={forkX} y1={laneY[0]} x2={forkX} y2={laneY[laneY.length - 1]} />);
  items.push(<line key="fork-in" className="fd-rail" x1={165} y1={midY} x2={forkX} y2={midY} />);

  lanes.forEach((lane, li) => {
    const cy = laneY[li];
    items.push(<line key={`f${li}`} className="fd-rail" x1={forkX} y1={cy} x2={LBL - 22} y2={cy} />);
    items.push(
      <g key={`g${li}`}>
        <rect className={`fd-goalpill${lane.empty ? ' is-empty' : ''}`} x={LBL - 20} y={cy - 17} width={64} height={34} rx={17} />
        <text className={`fd-t is-goalnum${lane.empty ? ' is-empty' : ''}`} x={LBL + 12} y={cy} textAnchor="middle" dominantBaseline="central">{String(li + 1).padStart(2, '0')}</text>
      </g>,
    );
    items.push(
      <text key={`gl${li}`} className={`fd-t is-goal${lane.empty ? ' is-empty' : ''}`} x={X_STEPS} y={cy - FH / 2 - 9} dominantBaseline="central">{lane.goal}</text>,
    );
    if (lane.empty) {
      items.push(
        <g key={`e${li}`}>
          <rect className="fd-empty" x={X_STEPS} y={cy - FH / 2} width={FW * 2 + FG} height={FH} rx={10} />
          <text className="fd-empty-t" x={X_STEPS + FW + FG / 2} y={cy} textAnchor="middle" dominantBaseline="central">{lane.empty}</text>
        </g>,
      );
      return;
    }
    const seq: { s: LStep; kind: 'step' | 'decision' }[] = [
      ...lane.pre.map((s) => ({ s, kind: 'step' as const })),
      ...(lane.account ? [{ s: { t: 'Have an account?' }, kind: 'decision' as const }] : []),
      ...lane.post.map((s) => ({ s, kind: 'step' as const })),
    ];
    items.push(arrow(`a-in${li}`, X_STEPS - 30, cy, X_STEPS - 1, cy));
    items.push(<line key={`ln${li}`} className="fd-rail" x1={LBL + 46} y1={cy} x2={X_STEPS - 30} y2={cy} />);
    seq.forEach((n, k) => {
      const x = X_STEPS + k * (FW + FG);
      items.push(box(`n${li}-${k}`, x, cy, n.s, n.kind));
      if (k < seq.length - 1) {
        const yes = n.kind === 'decision';
        items.push(arrow(`a${li}-${k}`, x + FW + 1, cy, x + FW + FG - 1, cy));
        if (yes) items.push(<text key={`y${li}`} className="fd-yes" x={x + FW + FG / 2} y={cy - 9} textAnchor="middle">Yes</text>);
      }
    });
    const last = X_STEPS + (seq.length - 1) * (FW + FG) + FW;
    items.push(<line key={`o${li}`} className="fd-rail" x1={last} y1={cy} x2={joinX} y2={cy} />);

    if (lane.account) {
      const dIdx = lane.pre.length;
      const dx = X_STEPS + dIdx * (FW + FG);
      const by = cy + 74;
      const bx = dx + (FW + FG) - 6;
      const branch = ['Create a new account', 'Upload the files', 'Verify the data'];
      items.push(<path key="brk" className="fd-arrow" d={`M${dx + FW / 2} ${cy + 35} V${by}`} fill="none" markerEnd={head} />);
      items.push(<text key="no" className="fd-yes" x={dx + FW / 2 + 8} y={cy + 52}>No</text>);
      branch.forEach((b, k) => {
        const x = dx - 0 + FW / 2 + 28 + k * (FW + FG - 8) - (k === 0 ? 0 : 0);
        const bxk = dx + FW / 2 + 12 + k * (FW + 20);
        items.push(box(`b${k}`, bxk, by, { t: b }));
        if (k > 0) items.push(arrow(`ba${k}`, bxk - 19, by, bxk - 1, by));
        void x; void bx;
      });
      items.push(<line key="bl0" className="fd-arrow" x1={dx + FW / 2} y1={by} x2={dx + FW / 2 + 11} y2={by} />);
      const backX = dx + FW + FG + FW / 2;
      const endBranch = dx + FW / 2 + 12 + 2 * (FW + 20) + FW;
      items.push(<path key="back" className="fd-arrow is-dashed" d={`M${endBranch} ${by} H${endBranch + 14} V${cy + 44} H${backX} V${cy + FH / 2 + 1}`} fill="none" markerEnd={head} />);
      items.push(<text key="backl" className="fd-cap" x={endBranch + 20} y={cy + 40}>then log in</text>);
    }
  });

  // join, decision, end, loop
  items.push(<line key="join" className="fd-rail" x1={joinX} y1={laneY[0]} x2={joinX} y2={laneY[laneY.length - 1]} />);
  items.push(<line key="join-out" className="fd-arrow" x1={joinX} y1={midY} x2={decX - 2} y2={midY} markerEnd={head} />);
  items.push(
    <g key="dec">
      <polygon className="fd-node fd-decision" points={`${decX},${midY - 40} ${decX + 60},${midY} ${decX},${midY + 40} ${decX - 60},${midY}`} transform="translate(60 0)" />
      <text className="fd-t" x={decX + 60} y={midY - 7} textAnchor="middle" dominantBaseline="central">Task</text>
      <text className="fd-t" x={decX + 60} y={midY + 8} textAnchor="middle" dominantBaseline="central">completed?</text>
      <line className="fd-arrow" x1={decX + 121} y1={midY} x2={decX + 150} y2={midY} markerEnd={head} />
      <text className="fd-yes" x={decX + 136} y={midY - 8} textAnchor="middle">Yes</text>
      <rect className="fd-term is-end" x={decX + 151} y={midY - 19} width={62} height={38} rx={19} />
      <text className="fd-t is-term" x={decX + 182} y={midY} textAnchor="middle" dominantBaseline="central">End</text>
      <path className="fd-arrow is-loop" d={`M${decX + 60} ${midY - 41} V${8} H133 V${midY - 23}`} fill="none" markerEnd={head} />
      <text className="fd-yes" x={decX + 70} y={midY - 50}>No</text>
      <text className="fd-cap" x={(decX + 60 + 133) / 2} y={0}>Back to the home page</text>
    </g>,
  );

  return (
    <svg className="fd-svg fd-overview" viewBox={`-4 -12 ${W + 8} ${H + 12}`} role="img" aria-label={`${mode === 'asis' ? 'Current' : 'To-be'} user flow: from the home page, six goals run in parallel, each as a chain of steps, and all end in a check on whether the task was completed`} preserveAspectRatio="xMinYMin meet">
      <defs>
        <marker id={`fo-head-${mode}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor" /></marker>
      </defs>
      {items}
    </svg>
  );
}

function wrap(text: string, max = 24) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

function Label({ lines, x, y, className }: { lines: string[]; x: number; y: number; className?: string }) {
  const top = y - (lines.length - 1) * 7;
  return (
    <text className={className} x={x} textAnchor="middle" y={top} dominantBaseline="central">
      {lines.map((l, i) => <tspan key={i} x={x} dy={i === 0 ? 0 : 14}>{l}</tspan>)}
    </text>
  );
}

/* ---------- Information architecture ---------- */

export type IaKind = 'sub' | 'section' | 'external';
export type IaNode = { t: string; kind: IaKind };
export type IaData = { home: string[]; tabs: { tab: string; nodes: IaNode[] }[] };

export const iaToBe: IaData = {
  home: ['Hero section', 'About us', 'Latest news', 'FAQ', 'Contact us', 'About the programmes', 'Supported projects', 'Chatbot', 'Footer'],
  tabs: [
    { tab: 'Profile', nodes: [{ t: 'My requests', kind: 'sub' }, { t: 'Track my request', kind: 'section' }, { t: 'Account settings', kind: 'sub' }, { t: 'Help centre', kind: 'sub' }, { t: 'Log out', kind: 'sub' }] },
    { tab: 'Notifications', nodes: [{ t: 'List of notifications', kind: 'section' }] },
    { tab: 'Advanced search', nodes: [] },
    { tab: 'FAQ', nodes: [{ t: 'Advanced search', kind: 'section' }, { t: 'Multi-language support', kind: 'section' }, { t: 'Step-by-step user guide', kind: 'section' }] },
    { tab: 'Licences and permits', nodes: [{ t: 'Abde\'a platform', kind: 'external' }, { t: 'List of permits', kind: 'section' }, { t: 'Submit requests', kind: 'section' }] },
    { tab: 'Service providers', nodes: [{ t: 'Group of companies', kind: 'section' }, { t: 'Advanced search', kind: 'section' }] },
    { tab: 'Filming locations', nodes: [{ t: 'Interactive map', kind: 'section' }, { t: 'Advanced search', kind: 'section' }, { t: 'List of filming locations', kind: 'sub' }, { t: 'Photo gallery', kind: 'section' }, { t: 'Location description and data', kind: 'section' }] },
    { tab: 'Incentive program', nodes: [{ t: 'Daw', kind: 'sub' }, { t: 'List of supported films', kind: 'section' }, { t: 'Services already provided', kind: 'section' }, { t: 'Suggested list of service providers', kind: 'section' }, { t: 'Application form', kind: 'section' }, { t: 'Cash rebate', kind: 'sub' }] },
    { tab: 'About us', nodes: [{ t: 'History of the Film Commission', kind: 'section' }, { t: 'About the Film Commission', kind: 'section' }, { t: 'Vision and mission', kind: 'section' }] },
  ],
};

const IW = 134;
const IGAP = 12;

export function IaDiagram({ data, label }: { data: IaData; label: string }) {
  const { home, tabs } = data;
  const width = 9 * IW + 8 * IGAP;
  const busY = 84;
  const tabY = 112;
  const tabH = 46;
  let maxY = tabY + tabH;
  const items: ReactElement[] = [];

  items.push(
    <g key="root">
      <rect className="fd-node fd-main" x={0} y={0} width={IW} height={40} rx={10} />
      <text className="fd-t is-main" x={IW / 2} y={20} textAnchor="middle" dominantBaseline="central">Home page</text>
      <line className="fd-rail" x1={IW / 2} y1={40} x2={IW / 2} y2={busY} />
    </g>,
  );
  let hx = IW + 26;
  items.push(<line key="home-link" className="fd-rail" x1={IW} y1={20} x2={hx - 4} y2={20} />);
  home.forEach((h) => {
    const w = Math.round(h.length * 6.3 + 22);
    items.push(
      <g key={`home-${h}`}>
        <rect className="fd-node fd-section" x={hx} y={6} width={w} height={28} rx={8} />
        <text className="fd-t" x={hx + w / 2} y={20} textAnchor="middle" dominantBaseline="central">{h}</text>
      </g>,
    );
    hx += w + 8;
  });
  items.push(<text key="home-cap" className="fd-cap" x={IW + 26} y={54}>Sections on the home page</text>);

  const lastX = (tabs.length - 1) * (IW + IGAP) + IW / 2;
  items.push(<line key="bus" className="fd-rail" x1={IW / 2} y1={busY} x2={lastX} y2={busY} />);

  tabs.forEach((col, i) => {
    const x = i * (IW + IGAP);
    const cxm = x + IW / 2;
    items.push(
      <g key={col.tab}>
        <line className="fd-rail" x1={cxm} y1={busY} x2={cxm} y2={tabY} />
        <rect className="fd-node fd-main" x={x} y={tabY} width={IW} height={tabH} rx={10} />
        <Label className="fd-t is-main" lines={wrap(col.tab, 16)} x={cxm} y={tabY + tabH / 2} />
      </g>,
    );
    let ny = tabY + tabH + 14;
    const railX = x + 12;
    let lastCy = 0;
    const kids: ReactElement[] = [];
    col.nodes.forEach((n) => {
      const lines = wrap(n.kind === 'external' ? `${n.t} ↗` : n.t, 15);
      const h = lines.length * 14 + 16;
      const cy = ny + h / 2;
      kids.push(
        <g key={`${col.tab}-${n.t}`}>
          <path className="fd-rail" d={`M${railX} ${cy} H${x + 24}`} />
          <rect className={`fd-node fd-${n.kind}`} x={x + 24} y={ny} width={IW - 24} height={h} rx={8} />
          <Label className="fd-t" lines={lines} x={x + 24 + (IW - 24) / 2} y={cy} />
        </g>,
      );
      lastCy = cy;
      ny += h + 8;
    });
    if (col.nodes.length) items.push(<line key={`${col.tab}-rail`} className="fd-rail" x1={railX} y1={tabY + tabH} x2={railX} y2={lastCy} />);
    items.push(...kids);
    maxY = Math.max(maxY, ny);
  });

  return (
    <svg className="fd-svg" viewBox={`-2 -2 ${width + 4} ${maxY + 8}`} role="img" aria-label={label} preserveAspectRatio="xMinYMin meet">
      {items}
    </svg>
  );
}

export function IaList({ data }: { data: IaData }) {
  return (
    <ul className="ia-list">
      {data.tabs.map((tab) => (
        <li key={tab.tab}>
          {tab.nodes.length > 0 ? (
            <details>
              <summary>
                <h3>{tab.tab}</h3>
                <small>{tab.nodes.length} {tab.nodes.length === 1 ? "page" : "pages"}</small>
                <ChevronDown size={18} strokeWidth={1.8} aria-hidden="true" />
              </summary>
              <ul>{tab.nodes.map((n) => <li key={n.t} className={`is-${n.kind}`}>{n.t}{n.kind === 'external' ? ' ↗' : ''}</li>)}</ul>
            </details>
          ) : <h3>{tab.tab}</h3>}
        </li>
      ))}
    </ul>
  );
}
