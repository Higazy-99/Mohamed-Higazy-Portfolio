import { ArrowDown, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { SafeImg } from './CaseStudy';
import { FlowDiagram, FlowList, adminFlow, adminSteps, inspectorFlow, inspectorSteps } from './StcFlows';
import { Prototype, type ProtoTarget } from './StcPrototype';
import './stc.css';

/* UX case study: STC Inspector, an MVP for hospitality compliance inspections. UX work (stories, flows, design follow-through); UI by a Product Designer. */

const BASE = '/case/stc-inspector';

const meta = [
  { label: 'Project', value: 'STC Inspector' },
  { label: 'Year', value: '2025' },
  { label: 'Role', value: 'UX Designer' },
  { label: 'Team', value: 'Product Designer (UI), developers' },
  { label: 'Scope', value: 'User stories, flows, design follow-through' },
  { label: 'Platforms', value: 'Inspector app, admin hub' },
  { label: 'Status', value: 'MVP delivered' },
];

const stats = [
  { value: '2', label: 'Roles' },
  { value: '44', label: 'User stories' },
  { value: '2', label: 'End-to-end flows' },
  { value: '15', label: 'MVP screens' },
];

const toc = [
  ['context', 'Context'],
  ['foundation', 'UX foundation'],
  ['flows', 'Flows'],
  ['decisions', 'Decisions'],
  ['prototype', 'Prototype'],
];

const pains: { pain: string; inMvp: boolean; text: string }[] = [
  { pain: 'Low compliance rates', inMvp: true, text: 'Violations carry a severity, and the compliance score sets the admin\u2019s next action: a warning note or a certificate.' },
  { pain: 'Too few resources for inspections', inMvp: true, text: 'Admins see each inspector\u2019s completion rate and active tickets before assigning, and rejected tickets come back with a reason so they can be reassigned fast.' },
  { pain: 'Data scattered across sources', inMvp: true, text: 'One ticket holds the facility, the form, violations, photos and the activity log.' },
  { pain: 'Disruption during inspections', inMvp: true, text: 'The inspection form opens pre-filled with site details, and category tabs with a progress ring keep the visit short and in order.' },
  { pain: 'Low awareness of regulations', inMvp: false, text: 'Violation lists follow the regulations, but informing facilities is left for a later phase.' },
  { pain: 'Low service quality', inMvp: false, text: 'A long-term goal the inspection data can support, not something the MVP solves on its own.' },
];

type Role = {
  id: 'inspector' | 'admin';
  name: string;
  summary: string;
  activities: number;
  tasks: string[];
  groups: { name: string; stories: string[] }[];
};

const roles: Role[] = [
  {
    id: 'inspector',
    name: 'Inspector',
    summary: 'Field inspector responsible for conducting on-site inspections and submitting verified reports.',
    activities: 6,
    tasks: [
      'Sign in securely using credentials',
      'Grant required permissions (e.g., location)',
      'View list or map of assigned tickets',
      'Accept or reject assignments',
      'Navigate to assigned site',
      'Fill inspection forms and attach evidence',
      'Record violations with severity and corrective actions',
      'Review and submit inspection report',
    ],
    groups: [
      { name: 'Authenticate and initialise session', stories: [
        'view a dashboard showing my assigned, accepted, and submitted tickets, so that I can keep track of all my tasks easily.',
        'see assignments plotted on a map view with distance indicators, so that I can prioritise nearby inspections efficiently.',
        'tap a ticket to review its full details (site name, type, contact, priority, and due time), so that I understand what’s required before accepting.',
        'reject an assignment with a reason (e.g., conflict, unavailable), so that the admin can reassign it appropriately.',
        'receive a notification when a new ticket is assigned to me, so that I’m aware of updates in real time.',
      ] },
      { name: 'Travel to site', stories: [
        'open navigation directly from the ticket, so that I can travel to the inspection site efficiently.',
        'the system to automatically detect when I’ve reached the site, so that my arrival can be logged without manual input.',
        'manually mark my arrival if GPS detection fails, so that the system still records an accurate timestamp.',
        'see the ticket status change to “On Site”, so that I know the system has acknowledged my arrival.',
        'the visit timer to start automatically upon arrival, so that my time on site is tracked correctly for SLA purposes.',
      ] },
      { name: 'Manage active inspections', stories: [
        'open a dynamic inspection form pre-filled with site information, so that I can begin recording findings quickly.',
        'complete form sections with checkboxes, text inputs, and drop-downs, so that I can capture structured data easily.',
        'continue inspections offline if the connection drops, so that I can still complete the task without disruption.',
        'mark each form section as complete, so that I can track my own progress through the inspection.',
      ] },
      { name: 'Record and classify violations', stories: [
        'log violations for any failed inspection item, so that non-compliance is clearly documented.',
        'select a violation type and severity level from a predefined list, so that records stay consistent with regulations.',
        'add photos, notes, and corrective action targets for each violation, so that issues are traceable and actionable.',
      ] },
      { name: 'Submit and finalise report', stories: [
        'review a summary of my inspection including findings, photos, and violations, so that I can confirm accuracy before submission.',
        'edit or update any form section before final submission, so that I can correct errors easily.',
        'see a clear submission confirmation once my report is uploaded, so that I know it’s successfully received by the system.',
        'the system to notify me if the admin requests clarification, so that I can provide additional information promptly.',
      ] },
      { name: 'Post-submission and clarification', stories: [
        'receive clarification requests from admins in-app, so that I can review feedback directly within the same ticket.',
        'add additional notes, photos, or corrections in response to admin feedback, so that the inspection record remains accurate and complete.',
        'be notified when the ticket is officially closed, so that I can confirm the inspection lifecycle has ended.',
      ] },
    ],
  },
  {
    id: 'admin',
    name: 'Admin',
    summary: 'Manages inspection operations, assigns tasks, monitors progress and reviews submitted reports.',
    activities: 5,
    tasks: [
      'View dashboard with KPIs and ticket status',
      'Create and assign new inspection tickets',
      'Reassign inspectors or send reminders',
      'Review submitted reports and evidence',
      'Request clarification or additional documentation',
      'Close or initiate follow-up tickets',
    ],
    groups: [
      { name: 'Monitor operational performance', stories: [
        'view a real-time dashboard of active and completed inspections, so that I can monitor daily operational performance.',
        'filter inspections by status (New, Assigned, Under Review, Closed), so that I can focus on specific workflow stages.',
        'see key performance metrics (SLA compliance, overdue tickets, top violations), so that I can identify potential bottlenecks.',
        'receive alerts when tickets breach SLA thresholds, so that I can take timely corrective action.',
      ] },
      { name: 'Create and assign inspection tickets', stories: [
        'create new inspection tickets with site details, type, and due date, so that inspections are properly scheduled and tracked.',
        'assign tickets automatically based on inspector proximity and workload, so that task distribution remains efficient.',
        'manually assign a specific inspector when needed, so that I can handle special cases or high-priority sites.',
        'the system to automatically set SLA times based on inspection type, so that deadlines are consistent with policy.',
        'the system to send instant push notifications to inspectors upon assignment, so that they can begin promptly.',
      ] },
      { name: 'Manage active inspections', stories: [
        'reassign tickets if an inspector is unavailable or delayed, so that operations continue smoothly.',
        'send reminders or escalation messages for pending inspections, so that inspectors are prompted to act before SLA breaches occur.',
        'view inspectors’ live locations and assignment progress, so that I can verify field coverage and efficiency.',
        'log all assignment changes (reassignments, reminders, comments), so that audit trails are maintained for accountability.',
      ] },
      { name: 'Review submitted reports', stories: [
        'open submitted inspection reports with all evidence, timestamps, and geotags, so that I can validate authenticity and accuracy.',
        'filter or sort reports by priority or severity of violations, so that I can review critical inspections first.',
        'add comments or feedback within the report, so that inspectors understand corrections or improvements needed.',
      ] },
      { name: 'Clarify, close, or follow up', stories: [
        'request clarification from inspectors for incomplete or unclear submissions, so that data accuracy is maintained.',
        'reopen tickets for re-inspection if clarifications reveal missing evidence, so that the inspection meets quality standards.',
        'create follow-up tickets automatically when corrective actions are due, so that ongoing compliance can be tracked.',
        'close tickets once reports are verified and approved, so that the inspection lifecycle is properly finalised.',
      ] },
    ],
  },
];

const lifecycle: { side: string; steps: string[]; branch?: string[] }[] = [
  { side: 'Inspector side', steps: ['Assigned', 'Accepted', 'On Site', 'In Progress', 'Submitted (Under Review)', 'Closed'] },
  { side: 'Admin side', steps: ['New', 'Assigned', 'Under Review'], branch: ['Closed', 'Follow-up', 'Clarification'] },
];

const handoffs = [
  { from: 'Admin', to: 'Inspector', text: 'A ticket is created and assigned. It appears in the inspector’s assignments.' },
  { from: 'Inspector', to: 'Admin', text: 'A rejected ticket comes back with a reason, so the admin can reassign it.' },
  { from: 'Inspector', to: 'Admin', text: 'A submitted report, with its violations and evidence, waits for review.' },
  { from: 'Admin', to: 'Inspector', text: 'If the report is not clear, the admin asks for clarification and the inspector answers on the same ticket.' },
];

type Tag = { label: string; to: ProtoTarget | { flow: 'inspector' | 'admin' } };

const decisions: { q: string; options: string[]; chosen: number; we: string; why: string; trade: string; screens: Tag[] }[] = [
  {
    q: 'What happens when an inspector cannot take a ticket?',
    options: ['The ticket is ignored', 'Reject with a reason'],
    chosen: 1,
    we: 'Reject with a reason, and return the ticket to the list.',
    why: 'The admin has to know why a ticket came back in order to reassign it quickly. The reason comes from a short list, with room for details.',
    trade: 'Rejecting takes the inspector one more step, and the reasons only help if the list stays short and specific.',
    screens: [
      { label: 'Inspector app · Reject ticket', to: { tab: 'inspector', path: 'reject', screen: 'reject' } },
      { label: 'Admin flow · Reassign inspector', to: { flow: 'admin' } },
    ],
  },
  {
    q: 'How should violations be recorded?',
    options: ['Free text', 'Classified'],
    chosen: 1,
    we: 'Classified: area, category and severity from lists, then a description and photos.',
    why: 'Predefined lists keep records consistent with regulations. Every violation reaches the admin with a severity, evidence and a reference number.',
    trade: 'A fixed list cannot cover every case, so a free-text description stays alongside it.',
    screens: [
      { label: 'Inspector app · Report violation', to: { tab: 'inspector', path: 'accept', screen: 'violation' } },
      { label: 'Inspector app · Violation sent', to: { tab: 'inspector', path: 'accept', screen: 'violation-sent' } },
    ],
  },
  {
    q: 'What should the admin do with a finished report?',
    options: ['One generic action', 'Next step set by the score'],
    chosen: 1,
    we: 'The compliance score sets the main action: a warning note for a non-compliant report, a certificate for a compliant one.',
    why: 'An admin reviews many reports. Putting the right action first saves them from searching the ticket for it.',
    trade: 'A score-led action can be followed without reading the report, so the full report and activity log stay in the same panel.',
    screens: [
      { label: 'Admin hub · Ticket, score 32%', to: { tab: 'admin', path: 'review', screen: 'ticket-noncompliant' } },
      { label: 'Admin hub · Ticket, score 75%', to: { tab: 'admin', path: 'review', screen: 'ticket-compliant' } },
    ],
  },
];

function Foundation() {
  const [roleId, setRoleId] = useState<Role['id']>('inspector');
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [tasksOpen, setTasksOpen] = useState(false);
  const role = roles.find((r) => r.id === roleId)!;
  const total = role.groups.reduce((n, g) => n + g.stories.length, 0);
  const who = role.name;
  return (
    <>
      <div className="stc-found-top">
        <div className="stc-seg" role="group" aria-label="Role">
          {roles.map((r) => <button key={r.id} type="button" aria-pressed={roleId === r.id} onClick={() => setRoleId(r.id)} data-magnetic>{r.name}</button>)}
        </div>
        <label className="stc-switch">
          <input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} />
          <span aria-hidden="true" />
          Show all stories in full
        </label>
      </div>
      <p className="stc-found-sum"><b>{who}:</b> {role.summary} <span>{role.activities} activities, {role.tasks.length} tasks, {total} user stories.</span></p>
      <button type="button" className="stc-more stc-tasks-btn" aria-expanded={tasksOpen} aria-controls="stc-tasks" onClick={() => setTasksOpen((v) => !v)} data-magnetic>
        {tasksOpen ? `Hide the ${role.tasks.length} tasks` : `Show the ${role.tasks.length} tasks`}
      </button>
      <ul className="stc-tasks" id="stc-tasks" aria-label="User tasks" hidden={!tasksOpen}>{role.tasks.map((t) => <li key={t}>{t}</li>)}</ul>
      <h3 className="stc-small-h">User stories</h3>
      <ol className="stc-map">
        {role.groups.map((g, gi) => {
          const key = `${roleId}-${gi}`;
          const isOpen = all || !!open[key];
          const shown = isOpen ? g.stories : g.stories.slice(0, 1);
          const more = g.stories.length - 1;
          return (
            <li key={g.name}>
              <header><span>{String(gi + 1).padStart(2, '0')}</span><h4>{g.name}</h4><small>{g.stories.length} {g.stories.length === 1 ? 'story' : 'stories'}</small></header>
              <ul id={`stc-stories-${key}`}>
                {shown.map((st) => {
                  const [want, so] = st.split(', so that ');
                  const lead = want.startsWith('the ') ? '' : 'to ';
                  return <li key={st}><b>As an {who},</b> I want {lead}{want.replace(/\.$/, '')}{so && all && <em>, so that {so.replace(/\.$/, '')}</em>}.</li>;
                })}
              </ul>
              {more > 0 && !all && (
                <button type="button" className="stc-more" aria-expanded={isOpen} aria-controls={`stc-stories-${key}`} onClick={() => setOpen((o) => ({ ...o, [key]: !isOpen }))} data-magnetic>
                  {isOpen ? 'Show fewer' : `Show ${more} more`}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}

function Flows({ tab, setTab }: { tab: 'inspector' | 'admin'; setTab: (t: 'inspector' | 'admin') => void }) {
  return (
    <>
      <div className="stc-seg" role="group" aria-label="Flow">
        <button type="button" aria-pressed={tab === 'inspector'} onClick={() => setTab('inspector')} data-magnetic>Inspector flow</button>
        <button type="button" aria-pressed={tab === 'admin'} onClick={() => setTab('admin')} data-magnetic>Admin flow</button>
      </div>
      <div className="stc-flow-wrap">
        {tab === 'inspector'
          ? <FlowDiagram flow={inspectorFlow} label="Inspector flow: sign in, view assignments, open and accept or reject an assignment. A rejection needs a reason and returns to the list. An accepted one leads to navigating to the site, starting the inspection, recording violations, and reviewing and submitting, with a clarification loop before the end." />
          : <FlowDiagram flow={adminFlow} label="Admin flow: log in, dashboard, then create a ticket (ticket info, auto or manual assignment) or manage inspections (monitor tickets, reassign, send reminders, add notes). Completed inspections are reviewed; unclear ones go back for clarification, clear ones are completed and closed." />}
        <div className="stc-flow-list"><FlowList steps={tab === 'inspector' ? inspectorSteps : adminSteps} /></div>
      </div>
      <h3 className="stc-small-h">How a ticket changes status</h3>
      <div className="stc-life">
        {lifecycle.map((row) => (
          <div key={row.side} className="stc-life-row">
            <p>{row.side}</p>
            <ol>
              {row.steps.map((step) => <li key={step}>{step}</li>)}
              {row.branch && <li className="is-branch"><span className="sr-only">Then one of: </span>{row.branch.map((b) => <b key={b}>{b}</b>)}</li>}
            </ol>
          </div>
        ))}
      </div>
      <h3 className="stc-small-h">Where the two flows meet</h3>
      <ol className="stc-handoffs">
        {handoffs.map((h, i) => (
          <li key={h.text}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <p className="stc-ho-dir">{h.from} <i aria-hidden="true">&rarr;</i> {h.to}</p>
            <p>{h.text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

export default function StcInspectorCase({ onBack }: { onBack: () => void }) {
  const [target, setTarget] = useState<ProtoTarget | null>(null);
  const [flowTab, setFlowTab] = useState<'inspector' | 'admin'>('inspector');
  const openTag = (tag: Tag) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
    if ('flow' in tag.to) {
      setFlowTab(tag.to.flow);
      requestAnimationFrame(() => document.getElementById('flows')?.scrollIntoView({ behavior, block: 'start' }));
      return;
    }
    setTarget({ ...tag.to });
    requestAnimationFrame(() => document.querySelector('.stc-proto')?.scrollIntoView({ behavior, block: 'start' }));
    window.setTimeout(() => document.querySelector<HTMLElement>('.stc-stage')?.focus({ preventScroll: true }), reduce ? 50 : 700);
  };
  return (
    <article className="cs stc" aria-labelledby="stc-title">
      <header className="cs-hero">
        <p className="eyebrow">UX case study · Field inspection · Hospitality compliance</p>
        <h1 id="stc-title">STC Inspector: <span>one workflow for the inspector on site and the admin behind the desk</span></h1>
        <p className="cs-lead">An MVP that connects the inspector on site with the admin who assigns, reviews and closes every inspection. I worked on the UX: user stories, flows and design follow-through to hand-off.</p>
        <dl className="cs-meta">
          {meta.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <div className="cs-cover"><SafeImg src={`${BASE}/hero.webp`} alt="STC illustration: two people seated across a small table in conversation, with a coffee pot and cups between them, and the STC logo." width={1419} height={580} loading="eager" /></div>
        <dl className="stc-stats">
          {stats.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <nav className="cs-toc" aria-label="In this case study">
          {toc.map(([id, label]) => <a key={id} href={`#${id}`} data-magnetic>{label}</a>)}
        </nav>
      </header>

      <section className="cs-section" id="context" aria-labelledby="stc-context">
        <div className="cs-two">
          <header data-reveal>
            <span className="eyebrow">01 · Context</span>
            <h2 id="stc-context">Two people carry <em>every inspection</em></h2>
            <p className="cs-sub">The platform serves hospitality in Saudi Arabia, starting with 3-star hotels and below. The inspector works in the field. The admin assigns, reviews and closes. The product had to keep both in step.</p>
          </header>
          <div data-reveal>
            <h3 className="stc-small-h">Pain points raised across the project teams, and what the MVP did with them</h3>
            <ul className="stc-pains">
              {pains.map((p) => (
                <li key={p.pain} className={p.inMvp ? undefined : 'is-out'}>
                  <h4>{p.pain}</h4>
                  <small>{p.inMvp ? 'In the MVP' : 'Outside the MVP'}</small>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
            <p className="stc-scope-sum">The concept covered three users. The MVP focused on the two who run an inspection; the hotel side was left for a later phase.</p>
            <ul className="stc-roles">
              {roles.map((r) => (
                <li key={r.id}>
                  <h3>{r.name}</h3>
                  <span className="stc-badge">In the MVP</span>
                  <p>{r.summary}</p>
                  <small>{r.activities} activities · {r.tasks.length} tasks · {r.groups.reduce((n, g) => n + g.stories.length, 0)} stories</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cs-section" id="foundation" aria-labelledby="stc-foundation">
        <header className="section-head" data-reveal>
          <span className="eyebrow">02 · UX foundation</span>
          <h2 id="stc-foundation">44 user stories became <em>two flows, four handoffs and fifteen screens</em></h2>
          <p>The stories for both roles, grouped by activity. One example is shown for each; open any activity to read the rest.</p>
        </header>
        <div data-reveal><Foundation /></div>
      </section>

      <section className="cs-section" id="flows" aria-labelledby="stc-flows">
        <header className="section-head" data-reveal>
          <span className="eyebrow">03 · Flows</span>
          <h2 id="stc-flows">Two flows, <em>joined at four handoffs</em></h2>
          <p>Each role has its own flow. The product works because of the places where they meet.</p>
        </header>
        <div data-reveal><Flows tab={flowTab} setTab={setFlowTab} /></div>
      </section>

      <section className="cs-section" id="decisions" aria-labelledby="stc-decisions">
        <header className="section-head" data-reveal>
          <span className="eyebrow">04 · Key decisions</span>
          <h2 id="stc-decisions">Three decisions <em>behind the screens</em></h2>
        </header>
        <ol className="stc-dec">
          {decisions.map((item, index) => (
            <li key={item.q} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <div className="stc-dec-head">
                <span className="stc-dec-n">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.q}</h3>
                <ul className="stc-dec-opts" aria-label="Options">
                  {item.options.map((option, oi) => <li key={option} className={oi === item.chosen ? 'is-chosen' : undefined}>{option}{oi === item.chosen && <span className="sr-only"> (chosen)</span>}</li>)}
                </ul>
              </div>
              <div className="stc-dec-body">
                <h4>We chose</h4>
                <p className="stc-dec-we">{item.we}</p>
                <div className="stc-dec-two">
                  <div><h4>Why</h4><p>{item.why}</p></div>
                  <div><h4>Trade-off</h4><p>{item.trade}</p></div>
                </div>
                <ul className="fid-links stc-tags" aria-label="Where to see it">
                  {item.screens.map((tag) => (
                    <li key={tag.label}>
                      <button type="button" onClick={() => openTag(tag)} aria-label={`Show in the ${'flow' in tag.to ? 'flows' : 'prototype'}: ${tag.label.replace(' · ', ', ')}`} data-magnetic>
                        {tag.label}<ArrowDown size={13} strokeWidth={1.8} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cs-section" id="prototype" aria-labelledby="stc-prototype">
        <header className="section-head" data-reveal>
          <span className="eyebrow">05 · Prototype</span>
          <h2 id="stc-prototype">Click through <em>the delivered screens</em></h2>
          <p>Follow a guided path, or explore on your own.</p>
        </header>
        <div data-reveal><Prototype target={target} /></div>
      </section>

      <section className="cs-section cs-close">
        <div className="cs-panel is-dark" data-reveal>
          <span className="eyebrow">My contribution</span>
          <p>The user stories and flows for the inspector app and the admin hub, and design follow-through with the Product Designer and the developers, through reviews until delivery. Developer reviews added an explicit success state after a violation is sent.</p>
        </div>
        <div className="cs-panel" data-reveal>
          <span className="eyebrow">Status and next steps</span>
          <p>Delivered as an MVP. Post-launch figures did not reach the design team, so there are no results to report here.</p>
          <p className="fid-gap">Not shown in these screens: Arabic and right-to-left layouts, offline use, and the Tickets, Audit and Settings areas of the app.</p>
        </div>
      </section>

      <section className="cs-finale">
        <span className="eyebrow">STC Inspector</span>
        <h2 data-reveal>From a ticket to <em>a verified report.</em></h2>
        <p data-reveal>One workflow that keeps the inspector and the admin working from the same ticket.</p>
        <div className="cs-actions" data-reveal>
          <button type="button" className="btn btn-solid" onClick={onBack} data-magnetic><ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" /> Back to portfolio</button>
          <a className="btn btn-line" href="#contact" data-magnetic>Let's talk <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
        <p className="cs-disclaimer">UX work only. The interface was designed by the Product Designer on the team. STC names and logos belong to their owners.</p>
      </section>
    </article>
  );
}
