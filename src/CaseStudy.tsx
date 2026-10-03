import { ArrowLeft, ArrowUpRight, ClipboardList, Eye, FileCheck, Hand, Maximize2, Percent, RefreshCw, ShieldCheck, SlidersHorizontal, ToggleRight, UserX, X, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './wijha-mobile.css';

/* UX concept: Wijha, a proof-of-concept dispatch engine (in progress).
   Copy is adapted from the original write-up; sector-specific wording is generalised. */

const BASE = '/case/wijha';

const meta = [
  { label: 'Project', value: 'Wijha – Dispatch Engine UX Design' },
  { label: 'Role', value: 'CX / UX Designer' },
  { label: 'Sector', value: 'Service Ops' },
  { label: 'Type', value: 'UX concept · In progress' },
];

const toc = [
  ['overview', 'Problem'],
  ['users', 'Users'],
  ['impact', 'Scale'],
  ['requirements', 'Requirements'],
  ['process', 'Process'],
  ['decisions', 'Decisions'],
  ['screens', 'Screens'],
];

const problem = [
  { label: 'Project', text: 'Wijha is a dispatch engine designed to structure how work is assigned to the right resource. It evaluates eligibility, ranks suitable candidates, and supports the final assignment decision through configurable rules and an explainable decision record.' },
  { label: 'Context', text: 'The assignment step sits between incoming work and the people responsible for handling it. In the existing workflow, supervisors may need to consider operational rules, specialist availability, workload, and work-item requirements before deciding where work should go. The challenge was to turn that judgement into a structured process without removing human control.' },
  { label: 'Key finding', text: 'The challenge was not simply choosing a specialist. It was making the assignment logic explicit: who is eligible, how candidates are ranked, what dispatch mode should be used, and why the final decision was made.' },
  { label: 'Users', text: 'The primary user is the distribution supervisor responsible for reviewing candidate recommendations and making or approving the final assignment decision. Administrators also need to configure the rules that shape how those recommendations are generated.' },
  { label: 'Design focus', text: 'The design focused on three things: making assignment reasoning visible, giving operations control over the rules that shape recommendations, and keeping a human decision point when the workflow requires it.' },
];

const responsibilities = [
  { title: 'Work Assignment & Routing', text: 'Registers incoming work items and routes them to the appropriate specialised team.' },
  { title: 'Evaluating Resource Fit', text: 'Assesses specialised experience, current active workload, past performance speed, and skill match.' },
  { title: 'Exceptions & Redistribution', text: 'Coordinates overrides due to sudden unavailability, leaves of absence, or potential conflicts of interest.' },
  { title: 'Monitoring Availability', text: 'Tracks active leaves, specialised training schedules, temporary transfers, and current field presence.' },
];

const pains = [
  { title: 'No consistent mechanism', text: 'Assignment decisions relied on manual judgement rather than a shared, structured mechanism.' },
  { title: 'Limited traceability', text: 'The reasoning behind candidate selection was difficult to review consistently.' },
  { title: 'Uneven workload', text: 'Availability and current workload could affect assignment decisions across resources.' },
];

const workflow = [
  { title: 'Review the work', text: 'Understand the incoming work item and its requirements.' },
  { title: 'Evaluate options', text: 'Review eligible candidates, ranking, and recommendation reasoning.' },
  { title: 'Make the decision', text: 'Accept, override, and record the final assignment decision.' },
];

const stats = [
  { value: '116', title: 'Locations nationwide', text: 'Branches spread across 116 regions and locations, each with varying specialisation levels.' },
  { value: '80%', title: 'Core work type', text: 'Most of the distribution workload is tied to one work type, which defined the scope of the first phase.' },
  { value: '0', title: 'Unified mechanisms', text: 'No standardised distribution rules existed. Every assignment relied entirely on personal judgement.' },
  { value: '18×', title: 'Duration variance', text: 'The gap between the shortest and longest work item is 18-fold, making workload prediction nearly impossible without a system.' },
];

const demonstrates = [
  { title: 'Document the decision', text: 'Every assignment carries a reason. The concept shows how the interface can capture accountability without slowing down the supervisor.' },
  { title: 'Make evaluation visible', text: 'Who was considered, who was excluded, and why, all visible in a single screen. No hidden logic.' },
  { title: 'Configure the rules', text: 'Eligibility criteria, ranking weights, and dispatch modes live in one screen that operations leads can tune without engineering.' },
  { title: 'Keep human control', text: 'The system recommends. The supervisor decides. The record captures both, so the interface supports trust, not blind automation.' },
];

const requirements: { icon: LucideIcon; text: string }[] = [
  { icon: Eye, text: 'See the reasoning behind a recommendation before acting on it' },
  { icon: ClipboardList, text: 'Turn a manual judgement call into a structured, documented decision' },
  { icon: UserX, text: 'Know who was excluded from consideration, and why' },
  { icon: SlidersHorizontal, text: 'Let operations leads tune rules without engineering support' },
  { icon: ToggleRight, text: 'Keep a way to override a recommendation without leaving the flow' },
  { icon: Hand, text: 'Keep a human decision point where the workflow requires it' },
  { icon: ShieldCheck, text: 'Give operations leads control over the rules that shape dispatch decisions' },
  { icon: RefreshCw, text: 'Use outcomes to inform future tuning of the decision logic' },
];

const stages = [
  { title: 'Align with Product', text: 'Aligned directly with the product team to understand the concept, scope, and intended role of Wijha before shaping the UX direction.' },
  { title: 'Explicit decision logic', text: 'Reviewed stakeholder questions and operational context to clarify the assignment problem and identify what the experience needed to make explicit.' },
  { title: 'AI-Assisted Exploration', text: 'Used AI-assisted tools to rapidly explore early structures, interaction directions, and alternative ways to represent the dispatch concept.' },
  { title: 'Shape the Initial Concept', text: 'Synthesised the explored directions into a preliminary UX concept, expressed through four POC screens rather than a final production design.' },
];

const decisions: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Eye, title: 'Exclusions stay visible next to the shortlist', text: 'Deleting rejected candidates would delete the evidence for the decision, so they stay on-screen, greyed out, with the rule that excluded them.' },
  { icon: Percent, title: 'Ranking weights must visibly sum to 100%', text: 'Administrators should never wonder whether their changes still add up, so the total stays on screen while sliders move.' },
  { icon: SlidersHorizontal, title: 'Four dispatch modes, one dial', text: "Auto-Assign, Recommend, Offer and Batch Optimise are framed as one control: the human's role shrinks or grows, but it's never designed out." },
  { icon: FileCheck, title: "A decision can't submit without a reason", text: 'The reason field is required, not optional, because eventually someone will read the record as one.' },
];

const stack = [
  { title: 'New work items', text: 'Entry point for incoming work' },
  { title: 'Client system', text: 'Initial intake via the client system' },
  { title: 'Wijha', text: 'Core processing platform', accent: true },
  { title: 'Apply eligibility', text: 'Determine eligibility criteria' },
  { title: 'Rank candidates', text: 'Evaluate and rank available resources' },
  { title: 'Assignment method', text: 'Auto-Assign or Recommend', accent: true },
  { title: 'Assign', text: 'Finalise the assignment' },
  { title: 'Record decision', text: 'Log the assignment outcome' },
  { title: 'Return result', text: 'Output the final assignment result' },
];

type Screen = { id: string; title: string; subtitle: string; src: string; w: number; h: number; alt: string; points: { title: string; text: string }[] };

const screens: Screen[] = [
  {
    id: 'operations',
    title: 'Operations View',
    subtitle: 'The full picture before any action.',
    src: `${BASE}/operations-view.webp`, w: 1800, h: 1455,
    alt: 'Wijha operations overview: summary tiles, assignment charts, latest decisions and available resources',
    points: [
      { title: 'A donut chart, not a bar chart', text: 'The proportion between Eligibility, Fit, and Balance matters more than the exact count. A donut reveals imbalance at a glance.' },
      { title: 'Pending items get their own lane', text: 'Anything waiting on a human is surfaced as a named queue, not buried behind a filter a supervisor might never open.' },
      { title: 'Outcomes sit next to volume', text: 'Showing recent decisions alongside active workload builds trust. Supervisors see the system working, not just claiming to.' },
    ],
  },
  {
    id: 'layers',
    title: 'Layer Configuration',
    subtitle: 'Where judgement becomes configuration.',
    src: `${BASE}/layer-configuration.webp`, w: 1800, h: 1554,
    alt: 'Wijha dispatch rules and layer configuration: eligibility rules, ranking weights, dispatch mode and decision layers',
    points: [
      { title: 'Mandatory gates are locked, not just labelled', text: "Conflict-of-interest exclusion isn't a toggle anyone can quietly switch off." },
      { title: 'Preview before save', text: 'A rule change previews its effect before it touches a single live work item.' },
      { title: 'One screen, not a settings maze', text: "Eligibility, ranking, and dispatch mode live together because they're one decision, not three." },
    ],
  },
  {
    id: 'assignment',
    title: 'Work Assignment',
    subtitle: "See who qualifies, who ranks highest, and who didn't make it.",
    src: `${BASE}/work-assignment.webp`, w: 1800, h: 1688,
    alt: 'Wijha work assignment: ranked eligible candidates, the top candidate profile and excluded candidates',
    points: [
      { title: 'Top candidate gets a full profile card', text: 'The person a supervisor is about to act on deserves more than a table row.' },
      { title: 'Ineligible rows stay visible, greyed', text: 'Showing who almost made it turns “trust me” into “see for yourself.”' },
      { title: 'Completion rate sits next to workload', text: "Fit isn't just specialty match. It's demonstrated capacity." },
    ],
  },
  {
    id: 'decision',
    title: 'Assignment Decision',
    subtitle: 'The moment a supervisor commits, and the record begins.',
    src: `${BASE}/assignment-decision.webp`, w: 1788, h: 2000,
    alt: 'Wijha assignment decision: recommendation, alternatives, decision summary, decision record and required reason field',
    points: [
      { title: 'Reason is required, not optional', text: "A decision can't be submitted without a stated reason attached to it." },
      { title: 'Alternatives stay one click away', text: 'Overriding the recommendation should never feel like leaving the flow.' },
      { title: 'The summary reads like a record', text: 'Because eventually, someone will read it as one.' },
    ],
  },
];


type FlowNode = { x: number; y: number; w: number; h: number; title: string[]; desc: string[]; tone?: 'accent' | 'hex' | 'end' };

const flowNodes: FlowNode[] = [
  { x: 24, y: 142, w: 112, h: 96, title: ['New work', 'items'], desc: ['Entry point', 'for incoming work'] },
  { x: 170, y: 142, w: 112, h: 96, title: ['Client', 'system'], desc: ['Initial intake', 'via client system'] },
  { x: 316, y: 142, w: 112, h: 96, title: ['Wijha'], desc: ['Core processing', 'platform'], tone: 'accent' },
  { x: 462, y: 142, w: 112, h: 96, title: ['Apply', 'eligibility'], desc: ['Determine', 'eligibility criteria'] },
  { x: 608, y: 142, w: 112, h: 96, title: ['Rank', 'candidates'], desc: ['Evaluate and rank', 'available resources'] },
  { x: 754, y: 138, w: 112, h: 104, title: ['Assignment', 'method'], desc: [], tone: 'hex' },
  { x: 900, y: 46, w: 112, h: 88, title: ['Auto-Assign'], desc: ['System automatically', 'allocates the work'] },
  { x: 900, y: 246, w: 112, h: 88, title: ['Recommend'], desc: ['System provides', 'recommendations'] },
  { x: 1046, y: 142, w: 112, h: 96, title: ['Assign'], desc: ['Finalise the', 'assignment'] },
  { x: 1192, y: 142, w: 112, h: 96, title: ['Record', 'decision'], desc: ['Log the', 'assignment outcome'] },
  { x: 1338, y: 142, w: 112, h: 96, title: ['Return', 'result'], desc: ['Output the final', 'assignment result'], tone: 'end' },
];

function FlowDiagram() {
  const line = 16;
  return (
    <svg className="fd" viewBox="0 0 1480 420" role="img" aria-label="User flow: new work items enter through the client system, Wijha applies eligibility, ranks candidates and applies the assignment method (auto-assign or recommend), then the work is assigned, the decision is recorded and the result is returned to the client system.">
      <defs>
        <marker id="fd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fd-arrowhead" />
        </marker>
      </defs>

      {/* straight connectors */}
      {[[136, 170], [282, 316], [428, 462], [574, 608], [720, 754], [1158, 1192], [1304, 1338]].map(([a, b]) => (
        <path key={a} d={`M${a} 190 L${b - 2} 190`} className="fd-line" markerEnd="url(#fd-arrow)" />
      ))}
      <path d="M136 190 L168 190" className="fd-line" markerEnd="url(#fd-arrow)" />
      {/* branch */}
      <path d="M866 190 C 886 190, 880 90, 898 90" className="fd-line" markerEnd="url(#fd-arrow)" />
      <path d="M866 190 C 886 190, 880 290, 898 290" className="fd-line" markerEnd="url(#fd-arrow)" />
      <path d="M1012 90 C 1032 90, 1026 190, 1044 190" className="fd-line" markerEnd="url(#fd-arrow)" />
      <path d="M1012 290 C 1032 290, 1026 190, 1044 190" className="fd-line" markerEnd="url(#fd-arrow)" />
      {/* factors */}
      <path d="M372 238 L372 278" className="fd-line fd-dash" />
      <rect x="316" y="278" width="112" height="72" rx="14" className="fd-node fd-soft" />
      <text x="372" y="304" className="fd-title fd-small">Factors</text>
      <text x="372" y="324" className="fd-desc">Eligibility · Ranking</text>
      <text x="372" y="339" className="fd-desc">Dispatch · Decision</text>

      {flowNodes.map((node) => {
        const cx = node.x + node.w / 2;
        const cy = node.y + node.h / 2;
        const total = node.title.length + node.desc.length;
        const top = cy - (total * line) / 2 + 12 - (node.desc.length ? 0 : 0);
        const dark = node.tone === 'accent' || node.tone === 'hex';
        const hexPoints = [[cx - 56, cy], [cx - 28, cy - 52], [cx + 28, cy - 52], [cx + 56, cy], [cx + 28, cy + 52], [cx - 28, cy + 52]].map((p) => p.join(',')).join(' ');
        return (
          <g key={node.title.join('')}>
            {node.tone === 'hex' ? (
              <polygon points={hexPoints} className="fd-hex" />
            ) : (
              <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="14" className={`fd-node${node.tone === 'accent' ? ' is-dark' : ''}${node.tone === 'end' ? ' is-end' : ''}`} />
            )}
            {node.title.map((text, i) => <text key={text} x={cx} y={top + i * line} className={`fd-title${dark ? ' on-dark' : ''}`}>{text}</text>)}
            {node.desc.map((text, i) => <text key={text} x={cx} y={top + (node.title.length + i) * line + 4} className={`fd-desc${dark ? ' on-dark' : ''}`}>{text}</text>)}
          </g>
        );
      })}
    </svg>
  );
}

/* The same flow as a vertical stepper for phones. Built from flowNodes (the diagram's own data),
   in diagram order; the two branch nodes are listed under the decision they belong to. */
const flowText = (parts: string[]) => parts.join(' ');
const isBranch = (node: FlowNode) => node.y !== 142 && node.tone !== 'hex';
const flowBranches = flowNodes.filter(isBranch);
const flowSteps = flowNodes.filter((node) => !isBranch(node));

function FlowStepper() {
  return (
    <ol className="process-stepper" role="list">
      {flowSteps.map((node, index) => {
        const title = flowText(node.title);
        const text = node.desc.length ? flowText(node.desc) : stack.find((item) => item.title === title)?.text;
        return (
          <li key={title} className={node.tone === 'accent' ? 'is-accent' : node.tone ? `is-${node.tone}` : undefined}>
            <div className="ps-rail"><span className="ps-num" aria-hidden="true">{index + 1}</span></div>
            <div className="ps-body">
              <h3>{title}</h3>
              {text && <p>{text}</p>}
              {node.tone === 'accent' && <p className="ps-extra"><b>Factors:</b> Eligibility · Ranking · Dispatch · Decision</p>}
              {node.tone === 'hex' && (
                <ul className="ps-options" role="list">
                  {flowBranches.map((branch) => <li key={flowText(branch.title)}><b>{flowText(branch.title)}</b> {flowText(branch.desc)}</li>)}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Image that loads eagerly and shows a readable fallback (with a direct link) if the file cannot be loaded. */
export function SafeImg({ src, alt, width, height, className, loading }: { src: string; alt: string; width: number; height: number; className?: string; loading?: 'lazy' | 'eager' }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="cs-img-fallback" role="img" aria-label={alt}>
        <span>Image could not be loaded</span>
        <a href={src} target="_blank" rel="noopener noreferrer">Open {src.split('/').pop()}</a>
      </span>
    );
  }
  return <img className={className} src={src} alt={alt} width={width} height={height} decoding="async" loading={loading} onError={() => setFailed(true)} />;
}

export function Zoomable({ src, alt, w, h, className }: { src: string; alt: string; w: number; h: number; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button type="button" className={`cs-zoom ${className ?? ''}`} onClick={() => setOpen(true)} data-cursor="view" aria-haspopup="dialog" aria-label={`Enlarge image: ${alt}`}>
        <SafeImg src={src} alt={alt} width={w} height={h} loading="lazy" />
        <span className="cs-zoom-hint" aria-hidden="true"><Maximize2 size={15} strokeWidth={1.6} /> Enlarge</span>
      </button>
      <dialog ref={dialogRef} className="cs-dialog" aria-label="Enlarged image" onClose={() => setOpen(false)} onClick={(event) => event.target === dialogRef.current && setOpen(false)}>
        <button type="button" className="cs-dialog-close" onClick={() => setOpen(false)} aria-label="Close enlarged image"><X size={18} strokeWidth={1.6} /></button>
        {open && <img src={src} alt={alt} />}
      </dialog>
    </>
  );
}

export default function CaseStudy({ onBack }: { onBack: () => void }) {
  return (
    <article className="cs" aria-labelledby="cs-title">
      {/* ---- Hero ---- */}
      <header className="cs-hero">
        <p className="eyebrow">UX concept · Dispatch Engine · B2B SaaS</p>
        <h1 id="cs-title">Turning operational decisions into <span>explainable assignments</span></h1>
        <p className="cs-lead">Wijha is an AI-powered dispatch engine that determines who should handle each work item by evaluating eligibility, fit, cost, and balance, while keeping the final decision traceable and human-controlled.</p>
        <dl className="cs-meta">
          {meta.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <div className="cs-cover">
          <SafeImg src={`${BASE}/cover.webp`} alt="Wijha dispatch engine dashboard on a laptop" width={1656} height={980} />
        </div>
        <nav className="cs-toc" aria-label="In this UX concept">
          {toc.map(([id, label]) => <a key={id} href={`#${id}`} data-magnetic>{label}</a>)}
        </nav>
      </header>

      {/* ---- Problem ---- */}
      <section className="cs-section" id="overview" aria-labelledby="cs-problem">
        <div className="cs-two">
          <div className="cs-left">
          <header data-reveal>
            <span className="eyebrow">01 · Overview</span>
            <h2 id="cs-problem">The <em>problem</em></h2>
            <p className="cs-sub">Once a work item enters the system, the difficult question is no longer what it is. It is who should handle it, and why them.</p>
          </header>
          <figure className="cs-map">
            <SafeImg src={`${BASE}/map.webp`} alt="Map showing five operating regions: north, central, east, west and south" width={890} height={745} />
          </figure>
          </div>
          <dl className="cs-facts" data-reveal>
            {problem.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.text}</dd></div>)}
          </dl>
        </div>
      </section>
      {/* ---- Users ---- */}
      <section className="cs-section" id="users" aria-labelledby="cs-users">
        <header className="section-head" data-reveal>
          <span className="eyebrow">02 · Who uses Wijha</span>
          <h2 id="cs-users">The operational role behind <em>the decision</em></h2>
          <p>Wijha is designed around the people responsible for evaluating recommendations, configuring the rules, and making the final assignment decision.</p>
        </header>
        <div className="cs-users">
          <figure className="cs-persona" data-reveal>
            <SafeImg src={`${BASE}/persona.webp`} alt="Portrait of the fictional distribution supervisor persona" width={900} height={607} />
            <figcaption>
              <strong>Distribution Supervisor</strong>
              <p>Reviews ranked candidates, evaluates the recommendation, and approves or overrides the final assignment decision. The role is responsible for making sure each assignment follows the configured rules and is recorded with a clear reason.</p>
              <small>Fictional persona created for this concept.</small>
            </figcaption>
          </figure>
          <div className="cs-users-main" data-reveal>
            <h3>Daily responsibilities</h3>
            <p className="cs-muted">The core functions this role manages on a day-to-day basis.</p>
            <ul className="cs-cards">
              {responsibilities.map((item, index) => (
                <li key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h4>{item.title}</h4><p>{item.text}</p></li>
              ))}
            </ul>
          </div>
          <div className="cs-panel" data-reveal>
            <h3>Key pain points</h3>
            <ul className="cs-pains">
              {pains.map((item) => <li key={item.title}><h4>{item.title}</h4><p>{item.text}</p></li>)}
            </ul>
          </div>
          <div className="cs-panel" data-reveal>
            <h3>The 3-step workflow with Wijha</h3>
            <p className="cs-muted">How the supervisor makes an explainable and reliable assignment using the decision engine.</p>
            <ol className="cs-flow3">
              {workflow.map((item, index) => <li key={item.title}><b>{index + 1}</b><div><h4>{item.title}</h4><p>{item.text}</p></div></li>)}
            </ol>
          </div>
        </div>
      </section>

      {/* ---- Scale ---- */}
      <section className="cs-section" id="impact" aria-labelledby="cs-scale">
        <header className="section-head" data-reveal>
          <span className="eyebrow">03 · Scale of the challenge</span>
          <h2 id="cs-scale">Why this problem demanded a system, <em>not a workaround</em></h2>
          <p>The manual distribution process that this concept was designed to replace. The figures are approximate and reflect the project context.</p>
        </header>
        <ul className="cs-stats">
          {stats.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <strong>{item.value}</strong><h3>{item.title}</h3><p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Demonstrates (inverted band) ---- */}
      <section className="cs-band" aria-labelledby="cs-demo">
        <div className="cs-band-inner">
          <span className="eyebrow" data-reveal>04 · What this concept demonstrates</span>
          <h2 id="cs-demo" data-reveal>One flow. Every decision explainable.</h2>
          <p className="cs-band-sub" data-reveal>This UX concept demonstrates that a transparent, traceable assignment process can be designed end to end without disrupting the existing workflow.</p>
          <ul className="cs-band-list">
            {demonstrates.map((item, index) => (
              <li key={item.title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
                <span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Requirements ---- */}
      <section className="cs-section" id="requirements" aria-labelledby="cs-req">
        <div className="cs-two is-sticky">
          <header data-reveal>
            <span className="eyebrow">05 · What had to be true</span>
            <h2 id="cs-req">The requirements that <em>couldn't be traded away</em></h2>
            <p className="cs-sub">These were the constraints that shaped every screen. They were not feature requests. They were the minimum conditions required for trust.</p>
          </header>
          <ul className="cs-req">
            {requirements.map(({ icon: Icon, text }, index) => (
              <li key={text} data-reveal style={{ transitionDelay: `${(index % 2) * 80}ms` }}>
                <span className="cs-req-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* ---- Process ---- */}
      <section className="cs-section" id="process" aria-labelledby="cs-process">
        <header className="section-head" data-reveal>
          <span className="eyebrow">06 · From concept to first UX direction</span>
          <h2 id="cs-process">How the product concept became <em>a first UX direction</em></h2>
          <p>Before designing the screens, I worked through four stages: aligning with the product team, framing the problem from stakeholder input, exploring early directions with AI-assisted tools, and shaping the first UX concept.</p>
        </header>
        <ol className="cs-stages">
          {stages.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
              <span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Decisions ---- */}
      <section className="cs-section" id="decisions" aria-labelledby="cs-decisions">
        <header className="section-head" data-reveal>
          <span className="eyebrow">07 · Key design decisions</span>
          <h2 id="cs-decisions">Four decisions that shaped <em>the core experience</em></h2>
          <p>Each decision came directly from the way the dispatch engine works, rather than being imposed as a UI convention.</p>
        </header>
        <ul className="cs-decisions">
          {decisions.map(({ icon: Icon, title, text }, index) => (
            <li key={title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <div className="cs-dec-top"><span className="cs-dec-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span><b>{String(index + 1).padStart(2, '0')}</b></div>
              <h3>{title}</h3><p>{text}</p>
            </li>
          ))}
        </ul>
      </section>
      {/* ---- Stack (user flow) ---- */}
      <section className="cs-section" aria-labelledby="cs-stack">
        <header className="section-head" data-reveal>
          <span className="eyebrow">08 · Designing within the stack</span>
          <h2 id="cs-stack">Wijha had to fit the existing operational stack, <em>not compete with it</em></h2>
          <p>The end-to-end flow, from the moment a work item arrives to the moment the result returns to the client system.</p>
        </header>
        <div className="cs-flow" data-reveal tabIndex={0} role="region" aria-label="User flow diagram, scrolls sideways"><FlowDiagram /></div>
        <ol className="cs-stack" data-reveal tabIndex={0} aria-label="How Wijha routes a work item, scrolls sideways">
          {stack.map((item, index) => (
            <li key={item.title} className={item.accent ? 'is-accent' : undefined}>
              <span>{index + 1}</span><h4>{item.title}</h4><p>{item.text}</p>
            </li>
          ))}
        </ol>
        <FlowStepper />
        <div className="cs-two-cols" data-reveal>
          <div><h3>Upstream</h3><p>The client system provides the work item and available context Wijha needs, so supervisors do not have to re-enter information already captured upstream.</p></div>
          <div><h3>Side by side</h3><p>Existing client systems remain the systems of record. Wijha adds the decision layer that determines who should handle each work item and why.</p></div>
        </div>
      </section>
      {/* ---- Screens ---- */}
      <section className="cs-section cs-screens-intro" id="screens" aria-labelledby="cs-screens">
        <header className="section-head" data-reveal>
          <span className="eyebrow">09 · The four screens</span>
          <h2 id="cs-screens">The flow, <em>made visible</em></h2>
          <p>Each screen carries one slice of the dispatch flow. Select a screen to enlarge it.</p>
        </header>
      </section>
      <div className="cs-screens">
        {screens.map((screen, index) => (
          <section key={screen.id} className={`cs-screen${index % 2 ? ' is-inverted' : ''}`} aria-labelledby={`cs-${screen.id}`}>
            <div className="cs-screen-inner">
              <div className="cs-screen-text" data-reveal>
                <span>{String(index + 1).padStart(2, '0')} / 04</span>
                <h3 id={`cs-${screen.id}`}>{screen.title}</h3>
                <p className="cs-screen-sub">{screen.subtitle}</p>
                <ul className="cs-points">
                  {screen.points.map((point) => <li key={point.title}><h4>{point.title}</h4><p>{point.text}</p></li>)}
                </ul>
              </div>
              <div className="cs-screen-shot"><Zoomable src={screen.src} alt={screen.alt} w={screen.w} h={screen.h} /></div>
            </div>
          </section>
        ))}
      </div>
      {/* ---- Close ---- */}
      <section className="cs-section cs-close">
        <div className="cs-panel is-dark" data-reveal>
          <span className="eyebrow">My contribution</span>
          <p>UX concept, screen specification, and interface design for the Wijha POC, translating a six-track decision engine into an operational flow where supervisors can review recommendations, override when needed, and leave a traceable decision.</p>
        </div>
        <div className="cs-panel" data-reveal>
          <span className="eyebrow">What I'd take forward</span>
          <p>The next step would be to validate the decision flow with real operational scenarios, especially edge cases where eligibility rules remove the entire shortlist or require an alternative path.</p>
        </div>
      </section>

      <section className="cs-finale">
        <span className="eyebrow">Wijha · The Dispatch Engine</span>
        <h2 data-reveal>From rules to <em>decisions.</em></h2>
        <p data-reveal>Wijha makes the logic behind assignment visible, giving operations teams a clearer way to review, control, and record each decision.</p>
        <div className="cs-actions" data-reveal>
          <button type="button" className="btn btn-solid" onClick={onBack} data-magnetic><ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" /> Back to portfolio</button>
          <a className="btn btn-line" href="#contact" data-magnetic>Let's talk <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
        <p className="cs-disclaimer">A proof of concept, still in progress. Names and sector-specific details are generalised, and the persona is fictional.</p>
      </section>
    </article>
  );
}
