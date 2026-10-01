import { ArrowLeft, ArrowRight, ArrowUpRight, BadgePercent, Building2, ChevronDown, ChevronLeft, ChevronRight, FileCheck2, MapPin, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SafeImg, Zoomable } from './CaseStudy';
import { FlowDiagram, FlowList, IaDiagram, IaList, JourneyMap, flowDeltas, flowFacts, iaToBe } from './FilmDiagrams';
import './film.css';

/* UX audit case study: Film Saudi. Heuristic evaluation of film.sa and its connected platforms (Daw, Abde'a). */

const BASE = '/case/film-saudi';

function useNarrow() {
  const q = '(max-width: 900px)';
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setNarrow(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return narrow;
}

const meta = [
  { label: 'Client', value: 'Film Saudi' },
  { label: 'Year', value: '2025' },
  { label: 'Role', value: 'UX Designer' },
  { label: 'Team', value: 'With a Product Designer' },
  { label: 'Scope', value: 'Heuristic evaluation, journey, flows, IA' },
  { label: 'Tools', value: 'Miro' },
  { label: 'Status', value: 'Audit delivered' },
];

const stats = [
  { value: '10', label: 'Findings' },
  { value: '4', label: 'High severity' },
  { value: '6', label: 'Medium severity' },
  { value: '4', label: 'Areas reviewed' },
  { value: '4', label: 'Task scenarios' },
];

const toc = [
  ['context', 'Context'],
  ['method', 'Method'],
  ['journey-today', 'Journey today'],
  ['flows-today', 'Flows today'],
  ['findings', 'Findings'],
  ['to-be', 'To-be'],
  ['ia', 'Structure'],
  ['next', 'Next steps'],
];

const story = [
  { label: 'The situation', text: 'To use a film incentive in Saudi Arabia, a filmmaker moves across three platforms: Film Saudi, Daw and Abde\'a.' },
  { label: 'What I found', text: '10 usability issues in four areas. Four are High: they can stop a user from finishing a task.' },
  { label: 'What I propose', text: 'A five-stage improved journey, six redrawn flows, a nine-tab structure, and a fix order that starts with the four High findings.' },
];

const goals = [
  { icon: BadgePercent, title: 'Get the incentive', text: 'Learn about the cash rebate and apply to a programme.' },
  { icon: MapPin, title: 'Scout a location', text: 'Find the right place to shoot.' },
  { icon: Building2, title: 'Find a service provider', text: 'Find the companies and crew to work with.' },
  { icon: FileCheck2, title: 'Get the permits', text: 'Obtain permits and licences, through Abde\'a.' },
];

type Severity = 'High' | 'Medium';
type Area = 'Navigation' | 'Incentive Program' | 'Discovery' | 'Forms';
const areas: Area[] = ['Navigation', 'Incentive Program', 'Discovery', 'Forms'];

type Shot = { src: string; w: number; h: number; alt: string; caption: string };
type Callout = { id: number; x: number; y: number; w: number; h: number; label: string; rec: number; shot?: number };
type Finding = { n: number; title: string; area: Area; severity: Severity; heuristics: string[]; issue: string; impact: string; rec: string[]; shots: Shot[]; callouts?: Callout[] };

const findings: Finding[] = [
  {
    n: 1, title: 'The header and hero compete with the content', area: 'Navigation', severity: 'High',
    heuristics: ['Aesthetic and minimalist design', 'Visibility of system status'],
    issue: 'The header takes a lot of vertical space, and three important links (About Us, FAQ and the language toggle) sit in a small utility row above the main navigation. In the hero, the headline and the value proposition are small and overpowered by the background image.',
    impact: 'Key links are easy to miss, and the page does not state its purpose or invite action at first glance.',
    rec: ['Move About Us, FAQ and the language toggle (AR/EN) into the main navigation, to reduce the height of the header.', 'Enlarge the headline and the value proposition and raise their contrast, so the text is the focal point over the image and states the purpose of the site right away.'],
    shots: [{ src: 'hero.webp', w: 1440, h: 834, alt: 'The Film Saudi home page: a small utility row above the main navigation, and a small headline over a large photo', caption: 'Home page, November 2025 (archived copy)' }],
    callouts: [
      { id: 1, x: 79.3, y: 1.9, w: 13.6, h: 3.4, label: 'Utility row: About Us, FAQ and the language toggle', rec: 0 },
      { id: 2, x: 31.7, y: 51.1, w: 36.7, h: 13.2, label: 'Headline and value proposition', rec: 1 },
    ],
  },
  {
    n: 2, title: 'FAQ: no search or filter', area: 'Discovery', severity: 'Medium',
    heuristics: ['Flexibility and efficiency of use'],
    issue: 'The FAQ page has no search or filter.',
    impact: 'The page is long and has many questions, so users have to scan it all by hand, which lowers efficiency.',
    rec: ['Add a search bar at the top that filters the questions in real time as the user types.', 'Add broad category filters, such as "Incentive Program", "Permits" and "Locations", to narrow the list quickly.'],
    shots: [{ src: 'faq.webp', w: 1440, h: 1100, alt: 'The FAQ page: a long list of questions grouped by topic, without a search field', caption: 'Frequently Asked Questions' }],
    callouts: [
      { id: 1, x: 19.3, y: 19.5, w: 61, h: 8, label: 'Where a search bar is missing', rec: 0 },
      { id: 2, x: 19.3, y: 27.5, w: 16, h: 4.6, label: 'Category headings that could become filters', rec: 1 },
    ],
  },
  {
    n: 3, title: 'Incentive pages: weak hierarchy in dense text blocks', area: 'Incentive Program', severity: 'Medium',
    heuristics: ['Aesthetic and minimalist design', 'Consistency and standards'],
    issue: 'On the Incentive Program page, the bold red heading and the body text are not clearly separated. On the Daw Feature Film Track page, the description, the requirements and the conditions all look the same, in a plain white block on a black page.',
    impact: 'Users have to read every line to find the key rules, which causes fatigue and slows them down. The Daw page also does not match the look of the main site.',
    rec: ['Increase the heading size and weight, and use a lighter grey for the body text, to build a clear hierarchy.', 'Align the Daw pages with the dark look and the colour palette of the main site.', 'Use bolder headings and the accent colours for key numbers and rules, with more padding around the text.'],
    shots: [
      { src: 'incentive.webp', w: 1440, h: 1000, alt: 'The Incentive Program page with a red heading, a large text block and an image', caption: 'Incentive Program page' },
      { src: 'feature-track.webp', w: 452, h: 250, alt: 'The Feature Film Track terms in a white block on a black page', caption: 'Daw, Feature Film Track' },
    ],
    callouts: [
      { id: 1, x: 19.3, y: 19.5, w: 62, h: 18.5, label: 'Heading and body text run together', rec: 0 },
      { id: 2, x: 14.7, y: 29, w: 70.6, h: 62, label: 'White block on a black page', rec: 1, shot: 1 },
      { id: 3, x: 52, y: 60, w: 29, h: 19, label: 'Key figures inside plain bullets', rec: 2 },
    ],
  },
  {
    n: 4, title: 'CashBack: the Apply button is easy to miss', area: 'Incentive Program', severity: 'Medium',
    heuristics: ['Visibility of system status', 'Flexibility and efficiency of use'],
    issue: 'The "Apply for CashBack Program" button is an outlined secondary button, and the content around it is dense.',
    impact: 'The action has no visual priority. Users read through the descriptive text to find the core value, which takes longer and lowers efficiency.',
    rec: ['Make the button a primary element (solid colour, larger), so it draws the eye and supports quick conversion.', 'Above the main description, add a bulleted or boxed list of the key benefits, such as "Up to 40% cash rebate".'],
    shots: [{ src: 'cashback.webp', w: 419, h: 223, alt: 'The CashBack Program page with an outlined Apply button', caption: 'CashBack Program page' }],
    callouts: [
      { id: 1, x: 65.2, y: 10, w: 19.8, h: 9.5, label: 'Outlined Apply button', rec: 0 },
      { id: 2, x: 49, y: 63.5, w: 32, h: 19, label: 'Key benefits buried in the text', rec: 1 },
    ],
  },
  {
    n: 5, title: 'Filters have no reset and take too much space', area: 'Discovery', severity: 'Medium',
    heuristics: ['User control and freedom', 'Flexibility and efficiency of use'],
    issue: 'On Scout locations and Find Service Providers, the filters have no Reset button. They sit in a sidebar, and the results show only one or two items per row.',
    impact: 'Without a reset, users must undo each filter by hand. The sidebar and the low density lead to poor visibility and too much vertical scrolling.',
    rec: ['Add a clear "Reset filters" button that restores the defaults instantly.', 'Move the primary filter controls to the top of the content area.', 'Increase the listing density to at least three locations per row, for example in a grid, to reduce scrolling.'],
    shots: [
      { src: 'locations.webp', w: 1440, h: 1300, alt: 'Scout locations: a sidebar filter and two cards per row', caption: 'Scout locations' },
      { src: 'providers.webp', w: 1440, h: 1300, alt: 'Find Service Providers: a sidebar filter and one card per row', caption: 'Find Service Providers' },
    ],
    callouts: [
      { id: 1, x: 66.5, y: 58.8, w: 7.6, h: 4, label: 'Filter button, no Reset', rec: 0 },
      { id: 2, x: 64.8, y: 32.5, w: 28.2, h: 33.5, label: 'Filters in a sidebar', rec: 1 },
      { id: 3, x: 7.2, y: 31.9, w: 55.6, h: 29.2, label: 'Two cards per row', rec: 2 },
      { id: 1, x: 66.5, y: 62.7, w: 8.5, h: 4.3, label: 'Filter button, no Reset', rec: 0, shot: 1 },
      { id: 2, x: 64.9, y: 41.2, w: 28.1, h: 28, label: 'Filters in a sidebar', rec: 1, shot: 1 },
      { id: 3, x: 7.2, y: 41.1, w: 55.6, h: 27, label: 'One card per row', rec: 2, shot: 1 },
    ],
  },
  {
    n: 6, title: 'Location detail: text and images are not shown together', area: 'Discovery', severity: 'Medium',
    heuristics: ['Flexibility and efficiency of use'],
    issue: 'On a location page, users have to scroll repeatedly to match the description with its images.',
    impact: 'This high-friction interaction increases cognitive load and lowers the efficiency of use.',
    rec: ['Redesign the location page to present the content and all its images in one cohesive section.', 'Add a horizontal image gallery or carousel linked to the content area, so users can browse the visuals without leaving the text.'],
    shots: [{ src: 'location-detail.webp', w: 630, h: 377, alt: 'A location detail page with a large photo, a description and related locations', caption: 'Location detail page' }],
    callouts: [
      { id: 1, x: 31.5, y: 63, w: 66, h: 17, label: 'Description text, far from the photos', rec: 0 },
      { id: 2, x: 0.5, y: 10, w: 70, h: 57, label: 'Large photo, separate from the text', rec: 1 },
    ],
  },
  {
    n: 7, title: 'External platforms open without a way back', area: 'Navigation', severity: 'High',
    heuristics: ['Consistency and standards'],
    issue: 'Choosing Daw in the Incentive Program menu, or Licenses & Permits in the main navigation, takes the user to a different platform (Daw, and Abde\'a) with its own look and its own navigation. There is no persistent link back to Film Saudi.',
    impact: 'The sudden change breaks the user\'s mental model, and people may feel trapped or unsure how to return. This raises the risk of abandoning the task.',
    rec: ['Open external platforms in a new browser tab, so Film Saudi stays one click away.', 'If they have to open in the same tab, add a prominent, permanent "Back to Film Saudi" link to the navigation of Daw and Abde\'a.'],
    shots: [
      { src: 'daw.webp', w: 1440, h: 900, alt: 'The Daw platform, visually different from Film Saudi, with no link back', caption: 'Daw, opened from the Incentive Program menu' },
      { src: 'abdea.webp', w: 447, h: 288, alt: 'The Abde\'a platform opened from Licenses and Permits', caption: 'Abde\'a, opened from Licenses & Permits' },
    ],
    callouts: [
      { id: 2, x: 6, y: 2, w: 88, h: 9, label: 'Daw navigation, with no link back to Film Saudi', rec: 1 },
      { id: 2, x: 1, y: 1.5, w: 98, h: 9.5, label: 'Abde\'a navigation, with no link back', rec: 1, shot: 1 },
    ],
  },
  {
    n: 8, title: 'The Arabic language switch fails in some browsers', area: 'Navigation', severity: 'High',
    heuristics: ['Consistency and standards'],
    issue: 'On the Abde\'a platform, switching to Arabic fails in some browsers, such as Chrome, and shows a display or technical error instead of the localised content.',
    impact: 'Language switching is a basic feature that users expect to work everywhere. When it fails, they see the platform as broken or unreliable, which costs trust and can end the task.',
    rec: ['Run thorough cross-browser testing, so critical features, especially language switching, work on all officially supported browsers and devices before release.'],
    shots: [{ src: 'abdea-ar.webp', w: 448, h: 256, alt: 'The Abde\'a platform in Arabic', caption: 'Abde\'a in Arabic, the expected result' }],
  },
  {
    n: 9, title: 'No confirmation after sending the Contact form', area: 'Forms', severity: 'High',
    heuristics: ['Visibility of system status', 'Help users recognise, diagnose and recover from errors'],
    issue: 'After the user presses Send on the Contact Us form, the system gives no confirmation or feedback.',
    impact: 'The user is left unsure whether the message was received.',
    rec: ['Show a clear, brief success message, such as a toast or inline text above the form, once the message is sent.', 'For high-value forms, send the user to a dedicated "Thank you" page that says what happens next, for example "We will reply within 48 hours".'],
    shots: [{ src: 'contact.webp', w: 659, h: 325, alt: 'The Contact Us form with a Send button and no confirmation state', caption: 'Contact Us form (personal details blurred)' }],
    callouts: [
      { id: 1, x: 6, y: 14, w: 40, h: 6, label: 'Where a success message would appear', rec: 0 },
      { id: 2, x: 81.5, y: 90.5, w: 8.6, h: 7.5, label: 'Send button, with no feedback', rec: 1 },
    ],
  },
  {
    n: 10, title: 'The login form sits in the bottom-right corner', area: 'Forms', severity: 'Medium',
    heuristics: ['Aesthetic and minimalist design', 'User control and freedom'],
    issue: 'The login form is anchored to the bottom-right of the page.',
    impact: 'The position goes against common web patterns, adds to the cognitive load and breaks the expected flow.',
    rec: ['Centre the form vertically and horizontally in the main viewport.'],
    shots: [{ src: 'login.webp', w: 1440, h: 900, alt: 'The login page with the form in the bottom-right corner over a full-page photo', caption: 'Login page' }],
    callouts: [
      { id: 1, x: 66.5, y: 42, w: 26.8, h: 58, label: 'Login form in the bottom-right corner', rec: 0 },
    ],
  },
];

const chapters = [
  { id: 'a', stage: 1, label: 'Stage 1', title: 'Arriving on the platform', story: 'First impressions decide whether users find their way. The header and the hero do not say what the site is for, and the FAQ, where users go for answers, has no search.', ids: [1, 2] },
  { id: 'b', stage: 2, label: 'Stage 2', title: 'Choosing a programme', story: 'Users compare the incentive programmes and check the conditions. The pages that should make this easy are dense, and the main action is easy to miss.', ids: [3, 4] },
  { id: 'c', stage: 3, label: 'Stage 3', title: 'Finding locations and providers', story: 'Scouting is a browsing task. Filters that cannot be reset, and pages that split the text from the images, make it slow.', ids: [5, 6] },
  { id: 'd', stage: 4, label: 'Stage 4', title: 'Moving to permits and other platforms', story: 'Daw and Abde\'a are separate platforms. Users are sent there with no way back, and on Abde\'a the Arabic switch fails in some browsers.', ids: [7, 8] },
  { id: 'e', stage: 0, label: 'All stages', title: 'Forms and feedback', story: 'Across the platform, forms do not talk back: nothing confirms that a message was sent, and the login form sits where users do not expect it.', ids: [9, 10] },
];


const scope = [
  { area: 'Navigation', pages: 'Header navigation, dropdowns, footer, language toggle (AR/EN)', goal: 'Assess consistency in navigation, the clarity of internal versus external links, and the accessibility of core tools.' },
  { area: 'Incentive Program', pages: 'The Incentive Program page, Cashback, and the Daw pages (terms, application button)', goal: 'Assess how clearly the offer and the application step are organised and presented.' },
  { area: 'Discovery', pages: 'Scout locations and Find Service Providers', goal: 'Assess the efficiency and usability of search and filtering, and the clarity of the results.' },
  { area: 'Forms', pages: 'Contact Us form, login and registration', goal: 'Evaluate how the system handles input and data, and how it guides the user when errors occur.' },
];

const tasks = [
  { title: 'Cashback eligibility', steps: ['From the home page, go to the Incentive Program section.', 'Open the Cashback page.', 'Find the maximum cash rebate percentage.', 'Locate the first three core eligibility requirements.'] },
  { title: 'Searching for a specific location', steps: ['Go to Scout locations.', 'Use the filters to select the category "Mountain Environments" and "Accessibility".', 'Select one location from the results.'] },
  { title: 'Finding a service provider in a city', steps: ['Go to Find Service Providers.', 'Search for "company".', 'Apply the city filter "Jeddah" to narrow the results.', 'Try the text search instead of the filters.'] },
  { title: 'Registration and error handling', steps: ['Attempt to register or log in.', 'Enter an invalid email format (for example "test@test").', 'Try to submit the Contact Us form with a required field empty.'] },
];

const scale = [
  { level: 'High', text: 'Prevents the user from fulfilling one or more tasks.' },
  { level: 'Medium', text: 'Requires effort from the user and impacts performance.' },
  { level: 'Low', text: 'May be perceptible to the user, but does not prevent execution or performance.' },
];

const themes = [
  { title: 'Several platforms, no continuity', refs: [7, 8], text: 'Users move between Film Saudi, Daw and Abde\'a as if between separate sites: there is no way back, and features such as language switching do not behave the same in every browser.' },
  { title: 'Feedback and forms', refs: [9, 10], text: 'The system stays silent after key actions, and the login form sits away from where users expect it.' },
  { title: 'Hierarchy and readability', refs: [1, 3, 4], text: 'Headings, body text and actions are not clearly separated, so users read more than they need to before they can act.' },
  { title: 'Discovery efficiency', refs: [2, 5, 6], text: 'Filters, image galleries and the FAQ make users scan and scroll by hand instead of narrowing down quickly.' },
];

const roadmap = [
  { label: 'Fix first', tone: 'High', items: ['Open external platforms in a new tab, or add a permanent way back (07)', 'Confirm every form submission clearly (09)', 'Test the language switch across browsers (08)', 'Rework the header and the hero (01)'] },
  { label: 'Then', tone: 'Medium', items: ['Give headings, body text and primary actions a clear hierarchy (03, 04)', 'Add Reset, top-placed filters and denser listings (05)', 'Add search and categories to the FAQ (02)', 'Show location text and images together (06)', 'Centre the login form (10)'] },
  { label: 'Validate', tone: 'Low', items: ['Prioritise the fixes by severity and effort', 'Create design mockups of the recommended changes', 'Implement the High fixes first', 'Schedule the Medium improvements for the next development cycle', 'Run usability testing after implementation'] },
];


function Sev({ level }: { level: 'High' | 'Medium' | 'Low' }) {
  return <span className={`fs-sev is-${level.toLowerCase()}`}>{level}</span>;
}

function Badge({ mode }: { mode: 'asis' | 'tobe' }) {
  return <span className={`fs-badge is-${mode}`}>{mode === 'asis' ? 'As-is' : 'To-be'}</span>;
}

const stageShort: Record<string, string> = { a: 'Arriving', b: 'Programmes', c: 'Locations', d: 'Platforms', e: 'Forms' };
const stageOf = (n: number) => chapters.find((c) => c.ids.includes(n))!;
const firstShot = (f: Finding) => f.shots[0];

function FindingsMap({ onOpen }: { onOpen: (n: number) => void }) {
  return (
    <div className="fs-heat" role="table" aria-label="Findings by area and severity">
      <div className="fs-heat-row is-head" role="row"><span role="columnheader" /><span role="columnheader"><Sev level="High" /></span><span role="columnheader"><Sev level="Medium" /></span></div>
      {areas.map((area) => (
        <div key={area} className="fs-heat-row" role="row">
          <span className="fs-heat-area" role="rowheader">{area}</span>
          {(['High', 'Medium'] as const).map((level) => (
            <span key={level} className="fs-heat-cell" role="cell">
              {findings.filter((f) => f.area === area && f.severity === level).map((f) => (
                <button key={f.n} type="button" onClick={() => onOpen(f.n)} className={`fs-dot is-${level.toLowerCase()}`} aria-label={`Open finding ${f.n}: ${f.title}`} data-magnetic>{f.n}</button>
              ))}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function FindingsCarousel({ onOpen }: { onOpen: (n: number) => void }) {
  const [stage, setStage] = useState<string>('all');
  const track = useRef<HTMLUListElement>(null);
  const list = findings.filter((f) => stage === 'all' || stageOf(f.n).id === stage);
  const chapter = chapters.find((c) => c.id === stage);
  useEffect(() => { track.current?.scrollTo({ left: 0 }); }, [stage]);
  const step = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * Math.max(320, track.current.clientWidth * 0.8), behavior: 'smooth' });
  return (
    <div className="fk">
      <div className="fk-top">
        <div className="fid-filter" role="group" aria-label="Filter findings by journey stage">
          <button type="button" aria-pressed={stage === 'all'} onClick={() => setStage('all')} data-magnetic>All stages<b>{findings.length}</b></button>
          {chapters.map((c) => (
            <button key={c.id} type="button" aria-pressed={stage === c.id} onClick={() => setStage(c.id)} data-magnetic>{c.stage ? `${c.stage} · ` : ''}{stageShort[c.id]}<b>{c.ids.length}</b></button>
          ))}
        </div>
        <div className="fk-arrows">
          <button type="button" onClick={() => step(-1)} aria-label="Previous findings" data-magnetic><ChevronLeft size={20} strokeWidth={1.6} aria-hidden="true" /></button>
          <button type="button" onClick={() => step(1)} aria-label="Next findings" data-magnetic><ChevronRight size={20} strokeWidth={1.6} aria-hidden="true" /></button>
        </div>
      </div>
      {chapter && <p className="fk-story"><b>{chapter.title}.</b> {chapter.story}</p>}
      <ul className="fk-track" ref={track} tabIndex={0} aria-label="Findings, scroll sideways">
        {list.map((f) => {
          const shot = firstShot(f);
          return (
            <li key={f.n}>
              <button type="button" className={`fk-card is-${f.severity.toLowerCase()}`} onClick={() => onOpen(f.n)} data-cursor="view" aria-haspopup="dialog" aria-label={`Finding ${f.n}, ${f.severity} severity: ${f.title}. Opens the full finding`}>
                <span className={`fk-thumb${shot.w < 700 ? ' is-small' : ''}`}><img src={`${BASE}/${shot.src}`} alt="" loading="lazy" /></span>
                <span className="fk-meta"><span className="fk-num">{String(f.n).padStart(2, '0')}</span><Sev level={f.severity} /><span className="fk-area">{f.area}</span></span>
                <span className="fk-title">{f.title}</span>
                <span className="fk-more">Read the finding <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" /></span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FindingDialog({ n, onClose, onStep }: { n: number | null; onClose: () => void; onStep: (dir: 1 | -1) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const last = useRef<number | null>(null);
  if (n !== null) last.current = n;
  const f = findings.find((x) => x.n === (n ?? last.current));
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const handle = () => closeRef.current();
    d.addEventListener('close', handle);
    return () => d.removeEventListener('close', handle);
  });
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (n !== null && !d.open) d.showModal();
    if (n === null && d.open) d.close();
    document.documentElement.classList.toggle('is-modal', n !== null);
    return () => document.documentElement.classList.remove('is-modal');
  }, [n]);
  useEffect(() => {
    if (n === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [n, onStep]);
  if (!f) return <dialog ref={ref} className="fsd" aria-hidden="true" />;
  const ch = stageOf(f.n);
  return (
    <dialog ref={ref} className="fsd" aria-labelledby="fsd-title" onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <div className="fsd-card">
        <header className="fsd-bar">
          <div className="fsd-nav">
            <button type="button" onClick={() => onStep(-1)} aria-label="Previous finding" data-magnetic><ChevronLeft size={18} strokeWidth={1.6} aria-hidden="true" /></button>
            <span>{f.n} of {findings.length}</span>
            <button type="button" onClick={() => onStep(1)} aria-label="Next finding" data-magnetic><ChevronRight size={18} strokeWidth={1.6} aria-hidden="true" /></button>
          </div>
          <span className="fsd-stage">{ch.stage ? `Stage ${ch.stage} · ${ch.title}` : ch.title}</span>
          <button type="button" className="fsd-close" onClick={onClose} aria-label="Close finding" data-magnetic><X size={18} strokeWidth={1.6} aria-hidden="true" /></button>
        </header>
        <div className="fsd-scroll">
          <div className={`fsd-media${f.shots.length > 1 ? ' is-multi' : ''}`}>
            {f.shots.map((s, si) => {
              const marks = f.callouts?.filter((c) => (c.shot ?? 0) === si);
              const alt = marks?.length ? `${s.alt}. Marked areas: ${marks.map((c) => `${c.id}, ${c.label}`).join('; ')}.` : s.alt;
              return (
                <figure key={s.src} className={s.w < 700 ? 'is-small' : undefined}>
                  <div className={`fsd-shot is-${f.severity.toLowerCase()}`}>
                    <img src={`${BASE}/${s.src}`} alt={alt} width={s.w} height={s.h} />
                    {marks?.length ? (
                      <div className="fsd-marks" aria-hidden="true">
                        {marks.map((c) => <span key={c.id} className="fsd-co" style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, height: `${c.h}%` }}><b>{c.id}</b></span>)}
                      </div>
                    ) : null}
                  </div>
                  <figcaption>{s.caption}</figcaption>
                </figure>
              );
            })}
          </div>
          <div className="fsd-body">
            <div className="fs-finding-top"><span className="fs-num">{String(f.n).padStart(2, '0')}</span><Sev level={f.severity} /><span className="fid-g">{f.area}</span></div>
            <h2 id="fsd-title">{f.title}</h2>
            <ul className="fs-chips" aria-label="Heuristics">{f.heuristics.map((h) => <li key={h}>{h}</li>)}</ul>
            <dl className="fsd-cols">
              <div><dt>Issue</dt><dd>{f.issue}</dd></div>
              <div><dt>Why it matters</dt><dd>{f.impact}</dd></div>
              <div className="fs-rec"><dt>Recommendation</dt><dd><ul>{f.rec.map((r, ri) => {
                const mark = f.callouts?.find((c) => c.rec === ri);
                return <li key={r}>{mark && <b className={`fsd-rn is-${f.severity.toLowerCase()}`} aria-label={`Marked area ${mark.id}`}>{mark.id}</b>}{r}</li>;
              })}</ul></dd></div>
            </dl>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function FlowLegend() {
  return (
    <ul className="fs-flowkey" aria-label="Legend">
      <li><i className="k-term" />Start or end</li>
      <li><i className="k-step" />Step</li>
      <li><i className="k-decision" />Decision</li>
      <li><i className="k-changed" />New or changed step</li>
      <li><i className="k-removed" />Removed or replaced in the to-be</li>
      <li><i className="k-redundant" />Redundant step</li>
    </ul>
  );
}

export default function FilmSaudiCase({ onBack }: { onBack: () => void }) {
  const narrow = useNarrow();
  const [openFinding, setOpenFinding] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const openF = (n: number) => { opener.current = document.activeElement as HTMLElement | null; setOpenFinding(n); };
  const closeF = () => { setOpenFinding(null); window.setTimeout(() => opener.current?.focus({ preventScroll: true }), 0); };
  const stepF = (dir: 1 | -1) => setOpenFinding((cur) => (cur === null ? cur : ((cur - 1 + dir + findings.length) % findings.length) + 1));
  return (
    <article className="cs film" aria-labelledby="fs-title">
      <header className="cs-hero">
        <p className="eyebrow">UX audit · Heuristic evaluation · Film industry platform</p>
        <h1 id="fs-title">Film Saudi: <span>where the filmmaker's journey breaks, and how to fix it</span></h1>
        <p className="cs-lead">A heuristic evaluation of the Film Saudi platform and the services it connects to, Daw and Abde'a. I reviewed four areas against Nielsen's usability heuristics, rated every issue by severity, and mapped how the journey, the flows and the structure should work.</p>
        <dl className="cs-meta fs-meta">
          {meta.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <div className="cs-cover fs-cover">
          <SafeImg src={`${BASE}/hero.webp`} alt="The Film Saudi website home page hero: the header, the headline, the cash rebate line and the Apply button over a photo of cracked desert ground" width={1440} height={834} />
        </div>
        <p className="cs-note fs-cover-note">The Film Saudi home page hero, as it was at the time of the audit (archived copy, November 2025).</p>
        <dl className="fid-stats fs-stats">
          {stats.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <nav className="cs-toc" aria-label="In this case study">
          {toc.map(([id, label]) => <a key={id} href={`#${id}`} data-magnetic>{label}</a>)}
        </nav>
      </header>

      <section className="cs-section" id="context" aria-labelledby="fs-context">
        <header className="section-head" data-reveal>
          <span className="eyebrow">01 · Context</span>
          <h2 id="fs-context">Four things a filmmaker <em>comes here to do</em></h2>
          <p>Film Saudi is an initiative of the Saudi Film Commission that supports local and international productions in Saudi Arabia. It brings together the incentive programmes, filming locations and service providers, and it links out to Daw and to Abde'a, the platform for cultural licences and permits.</p>
        </header>
        <ol className="fs-goals" data-reveal>
          {goals.map((g, i) => (
            <li key={g.title}>
              <span className="fs-goal-icon" aria-hidden="true"><g.icon size={22} strokeWidth={1.5} /></span>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </li>
          ))}
        </ol>
        <p className="fs-lead-in" data-reveal>These four goals are the spine of this case study. The journey, the flows and the findings all follow them.</p>
        <ol className="fs-glance" aria-label="The case study in three steps" data-reveal>
          {story.map((item, i) => (
            <li key={item.label}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
        <dl className="cs-facts fs-facts2" data-reveal>
          <div><dt>The audit</dt><dd>Carried out in October 2025, as an expert review of the Film Saudi website and the connected platforms.</dd></div>
          <div><dt>My role</dt><dd>UX Designer. I led the heuristic evaluation, rated the issues and wrote the recommendations. A Product Designer worked with me on the evaluation.</dd></div>
        </dl>
      </section>

      <section className="cs-section" id="method" aria-labelledby="fs-method">
        <header className="section-head" data-reveal>
          <span className="eyebrow">02 · Method</span>
          <h2 id="fs-method">Four areas, four tasks, <em>one usability checklist</em></h2>
          <p>A heuristic evaluation is an expert review: I walk through the product against Jakob Nielsen's ten well-known usability principles and record every place where the design breaks one. It is a fast way to find problems, and each finding is a hypothesis to validate. The principle behind each finding is shown on its card.</p>
        </header>
        <h3 className="fs-sub" data-reveal>What I reviewed</h3>
        <ol className="fs-scope" data-reveal>
          {scope.map((item, index) => (
            <li key={item.area}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h4>{item.area}</h4>
              <p className="fs-pages">{item.pages}</p>
              <p>{item.goal}</p>
            </li>
          ))}
        </ol>
        <h3 className="fs-sub" data-reveal>Four tasks I tested</h3>
        <ol className="fs-tasks" data-reveal>
          {tasks.map((task, index) => (
            <li key={task.title}>
              {narrow ? (
                <details>
                  <summary>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h4>{task.title}</h4>
                    <small>{task.steps.length} steps</small>
                    <ChevronDown size={18} strokeWidth={1.8} aria-hidden="true" />
                  </summary>
                  <ol>{task.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                </details>
              ) : (
                <>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h4>{task.title}</h4>
                  <ol>{task.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                </>
              )}
            </li>
          ))}
        </ol>
        <h3 className="fs-sub" data-reveal>How I rated severity</h3>
        <ul className="fs-scale" data-reveal>
          {scale.map((item) => <li key={item.level}><Sev level={item.level as 'High' | 'Medium' | 'Low'} /><p>{item.text}</p></li>)}
        </ul>
      </section>

      <section className="cs-section" id="journey-today" aria-labelledby="fs-jt">
        <header className="section-head" data-reveal>
          <span className="eyebrow">03 · <Badge mode="asis" /> The journey today</span>
          <h2 id="fs-jt">What filmmakers do today, <em>and what blocks them</em></h2>
          <p>Mapping the journey shows where the friction is. The first two stages carry nine of the thirteen blockers recorded. And there is no stage for what happens after a request is submitted: users cannot follow it from account settings.</p>
        </header>
        <div data-reveal><JourneyMap mode="asis" /></div>
        <p className="cs-note">The emotion line follows the feelings row of the audit board: confused, confused, overwhelmed, confused.</p>
      </section>

      <section className="cs-section" id="flows-today" aria-labelledby="fs-ft">
        <header className="section-head" data-reveal>
          <span className="eyebrow">04 · <Badge mode="asis" /> The paths today</span>
          <h2 id="fs-ft">Five paths that work today, <em>and one that is missing</em></h2>
          <p>Every path starts on the home page and ends with a check on whether the task was completed. Two things stand out: the programme path asks users to apply twice, and there is no path at all for changing account details.</p>
        </header>
        <FlowLegend />
        <figure className="fs-figure" data-reveal>
          <div className="fs-fig-scroll" tabIndex={0} role="region" aria-label="Current user flow, scrolls horizontally">
            <FlowDiagram mode="asis" />
          </div>
          <FlowList mode="asis" />
          <figcaption>Six goals run in parallel from the home page. In the programme path, users without an account first create one, upload files and verify their data, then log in.</figcaption>
        </figure>
      </section>

      <section className="cs-section" id="findings" aria-labelledby="fs-findings">
        <header className="section-head" data-reveal>
          <span className="eyebrow">05 · <Badge mode="asis" /> The findings</span>
          <h2 id="fs-findings">Ten places where the journey breaks, <em>four that stop the task</em></h2>
          <p>Findings are grouped by the journey stage where they appear. Open any card to read the full finding: the issue, why it matters, the recommendation, the heuristics it breaks, and the screen.</p>
        </header>
        <div className="fs-overview" data-reveal>
          <FindingsMap onOpen={openF} />
          <p className="fs-overview-note">Navigation carries three of the four High findings, and the fourth is in Forms. The Incentive Program and Discovery areas have Medium findings only.</p>
        </div>
        <div data-reveal><FindingsCarousel onOpen={openF} /></div>
      </section>

      <section className="cs-band" id="themes" aria-labelledby="fs-themes">
        <div className="cs-band-inner">
          <span className="eyebrow" data-reveal>06 · Themes</span>
          <h2 id="fs-themes" data-reveal>Four patterns behind the ten findings</h2>
          <ul className="cs-band-list">
            {themes.map((item, index) => (
              <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 2) * 80}ms` }}>
                <span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3>
                <p>{item.text}</p>
                <small className="fid-applied">Findings {item.refs.map((r) => String(r).padStart(2, '0')).join(', ')}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cs-section fs-turn" id="to-be" aria-labelledby="fs-turn">
        <div data-reveal>
          <Badge mode="tobe" />
          <h2 id="fs-turn">That was the as-is. <em>This is how it should work.</em></h2>
          <p>The rest of the case study redraws the journey, the flows and the structure. Each one follows the same four goals, so the before and after can be compared side by side.</p>
        </div>
      </section>

      <section className="cs-section fs-tight" id="journey-tobe" aria-labelledby="fs-jb">
        <header className="section-head" data-reveal>
          <span className="eyebrow">07 · <Badge mode="tobe" /> The improved journey</span>
          <h2 id="fs-jb">After users apply, <em>the journey should not stop</em></h2>
          <p>The four stages stay, and a fifth is added: following requests and managing the account, so users are not left guessing after they submit. Each stage ends with one opportunity, a concrete improvement to design.</p>
        </header>
        <div data-reveal><JourneyMap mode="tobe" /></div>
        <p className="cs-note">On the audit board every stage of the improved journey shows the same relieved face. The line here separates the stages that still carry a pain point (2, 3 and 4, relieved but with some effort) from those that do not (1 and 5).</p>
      </section>

      <section className="cs-section fs-tight" id="flows-tobe" aria-labelledby="fs-fb">
        <header className="section-head" data-reveal>
          <span className="eyebrow">08 · <Badge mode="tobe" /> The paths, redrawn</span>
          <h2 id="fs-fb">Ten steps change, <em>and one path is new</em></h2>
          <p>The paths keep the same structure, so users are not asked to relearn the platform. {flowFacts.changed} steps are new or changed, the repeated Apply is removed, and a new path lets users edit their details. What changes is listed under the diagram.</p>
        </header>
        <FlowLegend />
        <figure className="fs-figure" data-reveal>
          <div className="fs-fig-scroll" tabIndex={0} role="region" aria-label="To-be user flow, scrolls horizontally">
            <FlowDiagram mode="tobe" />
          </div>
          <FlowList mode="tobe" />
          <figcaption>Same layout as the current flow, so each path can be read against its before. Scroll sideways on smaller screens to see the end of the flow.</figcaption>
        </figure>
        <ul className="fs-deltas" data-reveal>
          {flowDeltas.map((d) => <li key={d.goal}><b>{d.goal}</b><span>{d.text}</span></li>)}
        </ul>
      </section>

      <section className="cs-section" id="ia" aria-labelledby="fs-ia">
        <header className="section-head" data-reveal>
          <span className="eyebrow">09 · Structure</span>
          <h2 id="fs-ia">One structure, <em>with a clear exit to Abde'a</em></h2>
          <p>The proposed information architecture organises the platform into nine main tabs, with the sections and sub pages under each. Daw comes inside as a sub page, and Abde'a stays external but clearly marked, so users always know when they are leaving the platform.</p>
        </header>
        <ul className="fs-legend" aria-label="Legend" data-reveal>
          <li className="is-page">Main page (tab in the navigation)</li><li className="is-sub">Sub page</li><li className="is-section">Section</li><li className="is-external">External link</li>
        </ul>
        <h3 className="fs-sub" data-reveal><Badge mode="tobe" /> The proposed structure</h3>
        <figure className="fs-figure fs-ia-fig" data-reveal>
          <div className="fs-fig-scroll" tabIndex={0} role="region" aria-label="Proposed structure, scrolls horizontally">
            <IaDiagram data={iaToBe} label="The proposed structure: the home page and its sections, above nine main tabs with their sections and sub pages" />
          </div>
          <IaList data={iaToBe} />
        </figure>
      </section>

      <section className="cs-section" id="next" aria-labelledby="fs-next">
        <header className="section-head" data-reveal>
          <span className="eyebrow">10 · Recommendations</span>
          <h2 id="fs-next">What to do, <em>in what order</em></h2>
          <p>High findings first, because they stop users from completing a task. Medium improvements follow, and every change should be validated with users. The numbers point back to the findings.</p>
        </header>
        <ol className="fs-roadmap" data-reveal>
          {roadmap.map((col, index) => (
            <li key={col.label}>
              <div className="fs-road-head"><span>{String(index + 1).padStart(2, '0')}</span><h3>{col.label}</h3><Sev level={col.tone as 'High' | 'Medium' | 'Low'} /></div>
              <ul>{col.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="cs-section cs-close">
        <div className="cs-panel is-dark" data-reveal>
          <span className="eyebrow">Status</span>
          <p>Delivered as an audit report with severity-rated findings, recommendations and next steps. It is an expert review, and the improvements have not yet been validated with users.</p>
        </div>
        <div className="cs-panel" data-reveal>
          <span className="eyebrow">What I'd take forward</span>
          <p>Fix the four High findings first, then test the changes with filmmakers on the four task scenarios, to confirm that the friction is gone.</p>
        </div>
      </section>

      <section className="cs-finale">
        <span className="eyebrow">Film Saudi · UX audit</span>
        <h2 data-reveal>From a heuristic review to <em>a clear fix list.</em></h2>
        <p data-reveal>Ten findings, rated and explained, with a path from the first fix to the final test.</p>
        <div className="cs-actions" data-reveal>
          <button type="button" className="btn btn-solid" onClick={onBack} data-magnetic><ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" /> Back to portfolio</button>
          <a className="btn btn-line" href="#contact" data-magnetic>Let's talk <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
        <p className="cs-disclaimer">UX work only. Film Saudi and its logo belong to their owners and are shown to explain the audit.</p>
      </section>
      <FindingDialog n={openFinding} onClose={closeF} onStep={stepF} />
    </article>
  );
}
