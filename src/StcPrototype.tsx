import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

/* Click-through prototype of the delivered STC Inspector screens. Image based: hotspots link the screens that were delivered, nothing else is invented. */

const BASE = '/case/stc-inspector';

type Spot = { x: number; y: number; w: number; h: number; to?: string; label: string };
type Screen = { id: string; src: string; cw: number; ch: number; alt: string; spots: Spot[] };
type StepText = { does: string; decision?: string; story?: string };
type Step = StepText & { screen: string; title: string; byScreen?: Record<string, Partial<StepText>> };
type Path = { id: string; name: string; steps: Step[] };
type Tab = { id: 'inspector' | 'admin'; name: string; kind: 'phone' | 'web'; screens: Screen[]; paths: Path[] };

const P = { cw: 924, ch: 2000 };
const bottomBtn = (x: number, w: number) => ({ x, y: 1795, w, h: 98 });
const back = { x: 46, y: 160, w: 70, h: 60 };

const inspector: Tab = {
  id: 'inspector', name: 'Inspector app', kind: 'phone',
  screens: [
    { id: 'splash', src: 'm-splash.webp', ...P, alt: 'Splash screen with the STC logo on a purple background.', spots: [{ x: 0, y: 0, w: 924, h: 2000, to: 'login', label: 'Continue to sign in' }] },
    { id: 'login', src: 'm-login.webp', ...P, alt: 'Inspector Portal sign-in screen with email and password fields and a Login button.', spots: [{ x: 59, y: 1316, w: 806, h: 100, to: 'home', label: 'Log in' }] },
    { id: 'home', src: 'm-home.webp', ...P, alt: 'Home screen: counters for 14 new, 9 completed and 3 pending tickets, then a list of new tickets with priority labels.', spots: [{ x: 40, y: 755, w: 844, h: 388, to: 'ticket', label: 'Open ticket: Golden Sands Hotel' }] },
    { id: 'ticket', src: 'm-ticket.webp', ...P, alt: 'Ticket details for Golden Sands Hotel: inspection type, date and SLA, location with a maps button, admin comments, an instructions file, and Reject and Accept buttons.', spots: [
      { ...bottomBtn(40, 392), to: 'reject', label: 'Reject ticket' }, { ...bottomBtn(491, 393), to: 'ticket-start', label: 'Accept ticket' }, { ...back, to: 'home', label: 'Back to home' }] },
    { id: 'reject', src: 'm-reject.webp', ...P, alt: 'Reject ticket sheet over the ticket details, with a rejection reason list, a details field and a Send button.', spots: [
      { ...bottomBtn(40, 845), to: 'home', label: 'Send rejection' }, { x: 810, y: 1185, w: 76, h: 76, to: 'ticket', label: 'Close the sheet' }] },
    { id: 'ticket-start', src: 'm-ticket-start.webp', ...P, alt: 'The same ticket after accepting, with a Start inspection button.', spots: [
      { ...bottomBtn(40, 845), to: 'inspection', label: 'Start inspection' }, { ...back, to: 'ticket', label: 'Back to the ticket' }] },
    { id: 'inspection', src: 'm-inspection.webp', ...P, alt: 'Inspection form with a 13 percent progress ring, category tabs, checkboxes and fields, a photo upload, and Report violation and Next buttons.', spots: [
      { ...bottomBtn(40, 392), to: 'violation', label: 'Report a violation' }, { x: 810, y: 165, w: 76, h: 76, to: 'home', label: 'Close the inspection' }] },
    { id: 'violation', src: 'm-violation.webp', ...P, alt: 'Report violation form: the facility card, then area, category with a Major severity label, a description and evidence photos, and a Send button.', spots: [
      { ...bottomBtn(40, 845), to: 'violation-sent', label: 'Send the violation' }, { ...back, to: 'inspection', label: 'Back to the inspection' }] },
    { id: 'violation-sent', src: 'm-violation-sent.webp', ...P, alt: 'Confirmation sheet: Violation VM-0014 has been sent to admin, who will review the details and issue the adequate actions.', spots: [
      { x: 40, y: 1830, w: 845, h: 98, to: 'inspection', label: 'Dismiss' }, { x: 810, y: 1185, w: 76, h: 76, to: 'inspection', label: 'Close the sheet' }] },
  ],
  paths: [
    { id: 'accept', name: 'Accept and inspect', steps: [
      { screen: 'login', title: 'Sign in',
        does: 'Signs the inspector in to the Inspector Portal with an email and a password.',
        decision: 'One focused field and one primary button, with help and password recovery within reach.',
        story: 'Task: sign in securely using credentials.' },
      { screen: 'home', title: 'See what is assigned',
        does: 'Gives the inspector the day at a glance: how many tickets are new, completed and pending, then the new tickets.',
        decision: 'Counters first, tickets second, so the inspector sees the load before the detail. Each ticket carries its priority, type, address and date.',
        story: 'View a dashboard showing my assigned, accepted, and submitted tickets, so that I can keep track of all my tasks easily.' },
      { screen: 'ticket', title: 'Open the ticket',
        does: 'Shows what is needed to decide: facility, inspection type, priority, date and SLA, location, and the admin’s notes and files.',
        decision: 'Reject and Accept sit side by side at the bottom, so the decision is the one action on the screen.',
        story: 'Tap a ticket to review its full details, so that I understand what’s required before accepting.' },
      { screen: 'ticket-start', title: 'Accept',
        does: 'The same ticket after accepting. The map link and the admin’s instructions are within reach.',
        decision: 'The bottom bar changes from Accept and Reject to a single Start inspection, so the next step cannot be missed.',
        story: 'Open navigation directly from the ticket, so that I can travel to the inspection site efficiently.' },
      { screen: 'inspection', title: 'Inspect by category',
        does: 'Where the inspection happens: category tabs, structured fields, checkboxes and photo upload.',
        decision: 'A progress ring shows how far along the inspector is, and Report violation sits beside Next, so a failed item can be reported at once.',
        story: 'Mark each form section as complete, so that I can track my own progress through the inspection.' },
      { screen: 'violation', title: 'Report a violation',
        does: 'Records a violation against the facility: area, category with severity, a description and evidence photos.',
        decision: 'Area and category are lists, and the category carries its severity, so records stay consistent.',
        story: 'Select a violation type and severity level from a predefined list, so that records stay consistent with regulations.' },
      { screen: 'violation-sent', title: 'Sent to the admin',
        does: 'Confirms that the violation reached the admin, with its reference number.',
        decision: 'An explicit success state, added after developer review, so the inspector never wonders whether it went through.',
        story: 'See a clear submission confirmation once my report is uploaded, so that I know it’s successfully received by the system.' },
    ] },
    { id: 'reject', name: 'Reject a ticket', steps: [
      { screen: 'ticket', title: 'Cannot take it?',
        does: 'The same ticket screen, seen from the other side of the decision.',
        decision: 'Rejecting is a first-class action, not a hidden menu item: an inspector who cannot take a ticket says so straight away.',
        story: 'Reject an assignment with a reason (e.g., conflict, unavailable), so that the admin can reassign it appropriately.' },
      { screen: 'reject', title: 'Give a reason',
        does: 'A bottom sheet over the ticket asks for a reason and optional details, then sends it.',
        decision: 'The reason comes from a list, so the admin gets a consistent signal. The ticket stays visible behind the sheet, and returns to the list on Send.',
        story: 'Reject an assignment with a reason (e.g., conflict, unavailable), so that the admin can reassign it appropriately.' },
    ] },
  ],
};

const A = (cw: number, ch: number) => ({ cw, ch });
const admin: Tab = {
  id: 'admin', name: 'Admin hub', kind: 'web',
  screens: [
    { id: 'dashboard', src: 'a-dashboard.webp', ...A(2000, 1799), alt: 'Admin dashboard: four KPI cards, a compliance trend chart, a map of regions and a table of the latest inspections.', spots: [{ x: 0, y: 481, w: 356, h: 66, to: 'inspections', label: 'Open Tickets' }] },
    { id: 'inspections', src: 'a-inspections.webp', ...A(2000, 1276), alt: 'Inspections list with filters, tabs for All, Pending and Completed, a New inspection button and a table of tickets.', spots: [
      { x: 1745, y: 197, w: 222, h: 44, to: 'new-ticket', label: 'New inspection' },
      { x: 390, y: 505, w: 1575, h: 56, to: 'ticket-compliant', label: 'Open ticket TF-2025-0001' },
      { x: 0, y: 140, w: 356, h: 44, to: 'dashboard', label: 'Back to the dashboard' }] },
    { id: 'new-ticket', src: 'a-new-ticket.webp', ...A(2000, 1644), alt: 'New inspection ticket panel: facility, inspection type, priority with its SLA, schedule, inspector with completion rate and active inspections, notes and files, with Save as draft and Publish.', spots: [
      { x: 1855, y: 1578, w: 112, h: 44, to: 'inspections', label: 'Publish the ticket' }, { x: 1272, y: 25, w: 44, h: 44, to: 'inspections', label: 'Close the panel' }] },
    { id: 'ticket-noncompliant', src: 'a-ticket-noncompliant.webp', ...A(1994, 1848), alt: 'Ticket panel for a non-compliant report: compliance score 32 percent, labelled Not compliant, with a Send warning note button, an activity log and review fields.', spots: [
      { x: 1272, y: 25, w: 40, h: 40, to: 'inspections', label: 'Close the panel' }, { x: 1274, y: 969, w: 686, h: 45, label: 'Send warning note (not part of the delivered screens)' }] },
    { id: 'ticket-compliant', src: 'a-ticket-compliant.webp', ...A(1994, 1848), alt: 'Ticket panel for a compliant report: compliance score 75 percent, labelled Compliant, with an Issue certificate button, an activity log and review fields.', spots: [
      { x: 1272, y: 25, w: 40, h: 40, to: 'inspections', label: 'Close the panel' }, { x: 1274, y: 969, w: 686, h: 45, to: 'certificate', label: 'Issue certificate' }] },
    { id: 'certificate', src: 'a-certificate.webp', ...A(2000, 1175), alt: 'Generate certificate panel: certificate type, date, authority, certificate number and valid until, with a Generate certificate button.', spots: [
      { x: 1280, y: 28, w: 300, h: 34, to: 'ticket-compliant', label: 'Back to the ticket' }, { x: 1729, y: 1108, w: 238, h: 44, to: 'inspections', label: 'Generate certificate' }] },
  ],
  paths: [
    { id: 'create', name: 'Create and assign a ticket', steps: [
      { screen: 'dashboard', title: 'Start from the numbers',
        does: 'Gives the admin the operational picture: inspector counts, a compliance trend, a map of regions and the latest inspections.',
        decision: 'Overview first, detail below: numbers, then the trend and the map, then the table, all on one page.',
        story: 'View a real-time dashboard of active and completed inspections, so that I can monitor daily operational performance.' },
      { screen: 'inspections', title: 'All inspections',
        does: 'Lists every inspection with its inspector, type, status, facility and due date.',
        decision: 'Colour-coded statuses and tabs for All, Pending and Completed let the admin focus on what needs action.',
        story: 'Filter inspections by status (New, Assigned, Under Review, Closed), so that I can focus on specific workflow stages.' },
      { screen: 'new-ticket', title: 'Create a ticket',
        does: 'Creates a ticket in one side panel: facility, inspection type, priority with its SLA, schedule, inspector, notes and files.',
        decision: 'A side panel keeps the list visible behind it. The chosen inspector’s completion rate and active tickets show before publishing, with Save as draft as a safe exit.',
        story: 'Create new inspection tickets with site details, type, and due date, so that inspections are properly scheduled and tracked.' },
      { screen: 'inspections', title: 'Back to the list',
        does: 'Publishing returns the admin to the list, where the ticket can be monitored.' },
    ] },
    { id: 'review', name: 'Review a report', steps: [
      { screen: 'inspections', title: 'Pick a ticket',
        does: 'The admin opens a ticket from the list to review it.' },
      { screen: 'ticket-compliant', title: 'The score sets the next action',
        does: 'One panel holds the whole ticket: facility, inspector, compliance score, the inspection file, the activity log and the admin’s notes.',
        decision: 'The score decides the main action. A compliant report leads to Issue certificate. Switch the score below to see what a non-compliant report leads to.',
        story: 'Open submitted inspection reports with all evidence, timestamps, and geotags, so that I can validate authenticity and accuracy.',
        byScreen: { 'ticket-noncompliant': {
          does: 'The same panel for a non-compliant report: a low score, a Not compliant label and the activity log of the inspection.',
          decision: 'The main action changes to Send warning note, in red, so the admin acts on the report without searching for the next step.' } } },
      { screen: 'certificate', title: 'Issue the certificate',
        does: 'Generates the compliance certificate: type, authority, number and validity.',
        decision: 'A short form in the same side panel, one click from the ticket.' },
      { screen: 'inspections', title: 'Done',
        does: 'The admin is back on the list.' },
    ] },
  ],
};

const tabs = [inspector, admin];
const fullStory = (text: string, role: string) => {
  if (text.startsWith('Task:')) return text;
  const lower = text.charAt(0).toLowerCase() + text.slice(1);
  return `As ${role}, I want ${lower.startsWith('the ') ? '' : 'to '}${lower}`;
};
const alias = (stepScreen: string, current: string) => stepScreen === current || (stepScreen.startsWith('ticket-') && current.startsWith('ticket-'));

function Stage({ tab, screenId, nextScreen, onGo }: { tab: Tab; screenId: string; nextScreen?: string; onGo: (id: string) => void }) {
  const screen = tab.screens.find((s) => s.id === screenId)!;
  const img = (
    <div className="stc-shot" style={{ aspectRatio: `${screen.cw} / ${screen.ch}` }}>
      <img key={screen.id} src={`${BASE}/${screen.src}`} alt={screen.alt} className="stc-shot-img" draggable={false} />
      {screen.spots.map((spot) => {
        const isNext = !!spot.to && !!nextScreen && alias(nextScreen, spot.to);
        return (
          <button
            key={spot.label}
            type="button"
            className={`stc-spot${isNext ? ' is-next' : ''}`}
            style={{ left: `${(spot.x / screen.cw) * 100}%`, top: `${(spot.y / screen.ch) * 100}%`, width: `${(spot.w / screen.cw) * 100}%`, height: `${(spot.h / screen.ch) * 100}%` }}
            aria-label={spot.label}
            aria-disabled={!spot.to}
            onClick={() => spot.to && onGo(spot.to)}
            data-cursor="view"
          />
        );
      })}
    </div>
  );
  return tab.kind === 'phone'
    ? <div className="stc-phone">{img}</div>
    : <div className="stc-browser"><div className="stc-browser-bar" aria-hidden="true"><i /><i /><i /><span>inspection-hub</span></div>{img}</div>;
}

export type ProtoTarget = { tab: Tab['id']; path: string; screen: string };

export function Prototype({ target }: { target: ProtoTarget | null }) {
  const [tabId, setTabId] = useState<Tab['id']>('inspector');
  const [pathIds, setPathIds] = useState<Record<string, string>>({ inspector: 'accept', admin: 'create' });
  const [screens, setScreens] = useState<Record<string, string>>({ inspector: 'login', admin: 'dashboard' });
  const tab = tabs.find((t) => t.id === tabId)!;
  const path = tab.paths.find((p) => p.id === pathIds[tabId])!;
  const screenId = screens[tabId];

  useEffect(() => {
    tab.screens.forEach((s) => { const i = new Image(); i.src = `${BASE}/${s.src}`; });
  }, [tab]);

  const [lastIdx, setLastIdx] = useState(0);
  // a decision tag outside the prototype can ask for a screen (a new object per click, so the same tag works twice)
  useEffect(() => {
    if (!target) return;
    const t = tabs.find((x) => x.id === target.tab);
    const pth = t?.paths.find((x) => x.id === target.path);
    if (!t || !pth) return;
    const i = Math.max(0, pth.steps.findIndex((st) => alias(st.screen, target.screen)));
    setTabId(target.tab);
    setPathIds((cur) => ({ ...cur, [target.tab]: target.path }));
    setScreens((cur) => ({ ...cur, [target.tab]: target.screen }));
    setLastIdx(i);
  }, [target]);
  const matches = path.steps.map((st, i) => (alias(st.screen, screenId) ? i : -1)).filter((i) => i >= 0);
  const idx = matches.includes(lastIdx) ? lastIdx : (matches.find((i) => i > lastIdx) ?? matches[0] ?? -1);
  useEffect(() => { if (idx >= 0) setLastIdx(idx); }, [idx]);
  const stepIdx = idx >= 0 ? idx : Math.min(lastIdx, path.steps.length - 1);
  const onPath = idx >= 0;
  const step = path.steps[stepIdx];
  const shown: StepText = { ...step, ...(step.byScreen?.[screenId] ?? {}) } as StepText;
  const nextStep = path.steps[stepIdx + 1];

  const goTo = (id: string) => setScreens((s) => ({ ...s, [tabId]: id }));
  const goStep = (i: number) => { setLastIdx(i); goTo(path.steps[i].screen); };
  const pickPath = (id: string) => {
    const p = tab.paths.find((x) => x.id === id)!;
    setPathIds((s) => ({ ...s, [tabId]: id }));
    setLastIdx(0);
    goTo(p.steps[0].screen);
  };
  const isTicket = screenId.startsWith('ticket-');

  return (
    <div className="stc-proto">
      <div className="stc-proto-top">
        <div className="stc-seg" role="group" aria-label="Prototype">
          {tabs.map((t) => <button key={t.id} type="button" aria-pressed={tabId === t.id} onClick={() => setTabId(t.id)} data-magnetic>{t.name}</button>)}
        </div>
        <div className="stc-seg is-paths" role="group" aria-label="Guided paths">
          {tab.paths.map((p) => <button key={p.id} type="button" aria-pressed={path.id === p.id} onClick={() => pickPath(p.id)} data-magnetic>{p.name}</button>)}
        </div>
      </div>

      <div className={`stc-proto-body is-${tab.kind}`}>
        <div className="stc-stage" role="group" tabIndex={-1} aria-label={`Interactive prototype, ${tab.name}`}>
          <Stage tab={tab} screenId={screenId} nextScreen={onPath ? nextStep?.screen : step.screen} onGo={goTo} />
          {tab.kind === 'web' && <p className="stc-swipe">Swipe sideways to see the whole screen.</p>}
          {tab.id === 'admin' && isTicket && (
            <div className="stc-seg is-score" role="group" aria-label="Compliance score">
              <button type="button" aria-pressed={screenId === 'ticket-noncompliant'} onClick={() => goTo('ticket-noncompliant')}>Score 32%</button>
              <button type="button" aria-pressed={screenId === 'ticket-compliant'} onClick={() => goTo('ticket-compliant')}>Score 75%</button>
            </div>
          )}
        </div>

        <div className="stc-panel" role="group" aria-label="Path step" aria-live="polite">
          <p className="stc-count"><b>{String(stepIdx + 1).padStart(2, '0')}</b> / {String(path.steps.length).padStart(2, '0')}</p>
          <div className="stc-bar" aria-hidden="true"><i style={{ width: `${((stepIdx + 1) / path.steps.length) * 100}%` }} /></div>
          <h3>{step.title}</h3>
          <dl className="stc-facts">
            <div><dt>What this screen does</dt><dd>{shown.does}</dd></div>
            {shown.decision && <div><dt>Design decision</dt><dd>{shown.decision}</dd></div>}
            {shown.story && <div><dt>{shown.story.startsWith('Task:') ? 'From the user tasks' : 'From the user stories'}</dt><dd className="stc-story">{fullStory(shown.story, tab.id === 'admin' ? 'an Admin' : 'an Inspector')}</dd></div>}
          </dl>
          {!onPath && <p className="stc-offpath">You are exploring outside this path. Use Next to return to it.</p>}
          <div className="stc-controls">
            <button type="button" className="btn btn-line" onClick={() => goStep(Math.max(0, stepIdx - 1))} disabled={stepIdx === 0 && onPath} data-magnetic><ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" /> Back</button>
            <button type="button" className="btn btn-solid" onClick={() => goStep(onPath ? Math.min(path.steps.length - 1, stepIdx + 1) : stepIdx)} disabled={onPath && stepIdx === path.steps.length - 1} data-magnetic>Next <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" /></button>
            <button type="button" className="stc-restart" onClick={() => goStep(0)} aria-label="Restart this path" data-magnetic><RotateCcw size={16} strokeWidth={1.6} aria-hidden="true" /></button>
          </div>
          <p className="stc-hint">Click the pulsing area on the screen, or use Next. Screens are linked only where the delivered design links them.</p>
        </div>
      </div>
    </div>
  );
}
