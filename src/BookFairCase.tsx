import { ArrowLeft, ArrowUpRight, BarChart3, Bell, CalendarCheck, Check, CircleCheck, ClipboardList, Compass, DoorOpen, Gift, HeartHandshake, LayoutDashboard, Lightbulb, MapPin, MessageSquareText, Minus, Navigation, PenLine, QrCode, Search, Smartphone, Sparkles, Star, Target, Ticket, Trophy, UserCheck, Users, X, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { SafeImg, Zoomable } from './CaseStudy';
import './bookfair.css';

/* Experience design case: Smart Book Fair, a complete digital visitor experience (concept delivered May 2025).
   One chain runs through the page: problem -> objective -> feature -> measure. A concept: no results, targets or decisions are claimed.
   Text in [square brackets] is a placeholder the owner still has to fill in. */

const BASE = '/case/book-fair';

const meta = [
  { label: 'Project', value: 'Smart Book Fair' },
  { label: 'Year', value: '2025' },
  { label: 'Role', value: 'CX / UX Designer' },
  { label: 'Team', value: 'With a Product Designer (UI)' },
  { label: 'Scope', value: 'Experience strategy, visitor journey, features and admin dashboard' },
  { label: 'Status', value: 'Concept delivered' },
];

const stats = [
  { value: '4', label: 'Journey stages' },
  { value: '5', label: 'Key features' },
  { value: '6', label: 'Dashboard modules' },
  { value: '4', label: 'Core problems' },
];

const toc = [
  ['overview', 'Overview'],
  ['challenge', 'Challenge'],
  ['start', 'Starting point'],
  ['decisions', 'Decisions'],
  ['journey', 'Journey'],
  ['features', 'Features'],
  ['dashboard', 'Dashboard'],
  ['risks', 'Risks'],
  ['metrics', 'Metrics'],
];

const objectives = [
  { icon: Sparkles, title: 'Improve the visitor experience', text: 'Simple digital tools that help the visitor navigate, explore and book events.' },
  { icon: Users, title: 'Manage crowds', text: 'Direct visitor movement and reduce congestion with the live map, alerts and timed signing slots.' },
  { icon: Trophy, title: 'Increase participation', text: 'Points, challenges and rewards that turn a passive visitor into an active participant.' },
  { icon: BarChart3, title: 'Data-led organisation', text: 'Live data on interaction, satisfaction and visitor behaviour, in an admin dashboard that supports quick decisions.' },
];

const challenges = [
  { icon: Compass, title: 'Navigation difficulty', objective: 'Improve the visitor experience', text: 'Visitors, especially on a first visit, find it hard to understand how the stands are laid out, to know where the important events are, and to work out the fastest route.' },
  { icon: Users, title: 'Crowding and queues', objective: 'Manage crowds', text: 'Areas of the fair become congested and bottlenecks form. Visitors face long waits in queues for events such as book signings.' },
  { icon: Target, title: 'Passive visitors', objective: 'Increase participation', text: 'The visitor is a passive recipient rather than an active participant in the fair experience.' },
  { icon: BarChart3, title: 'Limited data for organisers', objective: 'Data-led organisation', text: 'Organisers need live data on interaction, satisfaction, peak times and crowd flow to make decisions on organisation and distribution.' },
];

type Mark = 'yes' | 'no' | 'partial';
const capabilities = ['Live map', 'AR navigation', 'Rewards system', 'Crowd management', 'Event booking', 'Live surveys'];
/* Checked against each product's own public pages (October 2026). "Partial" means an add-on, or only part of the capability. */
const matrix: { app: string; kind: string; ours?: boolean; cells: [Mark, string?][] }[] = [
  { app: 'Whova', kind: 'Conferences', cells: [['yes'], ['no'], ['yes'], ['no'], ['yes'], ['yes']] },
  { app: 'Swapcard', kind: 'Expos', cells: [['yes'], ['no'], ['partial', 'Add-on'], ['no'], ['yes'], ['yes']] },
  { app: 'PheedLoop', kind: 'Events', cells: [['yes'], ['no'], ['yes'], ['no'], ['yes'], ['yes']] },
  { app: 'Cvent', kind: 'Large conferences', cells: [['yes'], ['no'], ['yes'], ['partial'], ['yes'], ['yes']] },
  { app: 'Navigine', kind: 'Indoor navigation', cells: [['yes'], ['yes'], ['no'], ['partial', 'Heat maps'], ['no'], ['no']] },
  { app: 'Smart Book Fair', kind: 'Our concept', ours: true, cells: [['yes'], ['yes', 'Phase 3'], ['yes'], ['yes'], ['yes'], ['yes']] },
];

const research = [
  { text: 'The Riyadh International Book Fair drew about 500,000 visitors over ten days in 2016, and needed queue systems, signage and crowd management procedures inside and outside the venue.', source: 'Crowd Dynamics', href: 'https://crowddynamics.com/riyadh-international-book-fair' },
  { text: 'The Cairo International Book Fair recorded 445,029 visitors in a single day in 2025.', source: 'Maspero, Egyptian National Media Authority', href: 'https://www.maspero.eg/art-and-culture/2025/01/26/838326/445-%D8%A3%D9%84%D9%81-%D8%B2%D8%A7%D8%A6%D8%B1-%D8%AE%D9%84%D8%A7%D9%84-%D8%A7%D9%84%D9%8A%D9%88%D9%85-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A-%D9%84%D9%85%D8%B9%D8%B1%D8%B6-%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9-%D8%A7%D9%84%D8%AF%D9%88%D9%84%D9%8A-%D9%84%D9%84%D9%83%D8%AA%D8%A7%D8%A8' },
  { text: 'A study of an AR navigation system for exhibitions found that visitors in game mode followed the intended route more closely.', source: 'Applied Sciences (MDPI), 2022', href: 'https://www.mdpi.com/2076-3417/12/6/2969' },
];

const assumptions = [
  { assumption: 'First-time visitors struggle to find stands', test: 'Observe the entrance, run 6–8 intercept interviews, and time how long it takes to reach a first stand.' },
  { assumption: 'Signing queues are the sharpest pain point', test: 'Measure queue length and wait at 3 signing sessions.' },
  { assumption: 'Visitors will open an app at the gate', test: 'Share of ticket holders who open the app on day one.' },
  { assumption: 'Rewards can move visitors to quieter areas', test: 'A/B test crowd alerts with and without a reward.' },
  { assumption: 'Visitors will rate events if it takes one tap', test: 'Completion rate, with a cap on prompts per visit.' },
];

const decisions = [
  { icon: QrCode, title: 'One QR as the backbone', text: 'The QR code is the app login and the start of the journey.', tradeoff: 'It depends on a phone, so the QR also works offline and as a printout.' },
  { icon: CalendarCheck, title: 'Timed signing slots instead of a physical queue', text: 'The visitor gets a time slot, not a place in a long line.', tradeoff: 'No-shows. A slot is released after 10 minutes to a short standby list.' },
  { icon: MapPin, title: 'A 2D live map first, AR on top', text: 'The live map is the base for wayfinding and crowd alerts.', tradeoff: 'Indoor positioning needs beacons and venue setup, so AR is a later layer, not the base.' },
  { icon: Gift, title: 'Rewards as a crowd-control lever, not just a game', text: 'Organisers can attach a reward to a quieter area.', tradeoff: 'A reward can pull people into one place, so rewards need caps (see Risks).' },
];

const stageNo = (index: number) => String(index + 1).padStart(2, '0');

const journey = [
  {
    icon: QrCode,
    title: 'Entry point',
    tag: 'QR code scan',
    does: ['Scans the QR code received with the ticket.', 'Chooses a publisher from the list and follows the steps to reach it.'],
    app: ['Opens the app. If it is not installed, takes the visitor to download it.', "Sends a welcome message with the day's highlights.", "Suggests events based on the visitor's preferences (phase 3).", 'Opens the live map with a route to the stand (AR guidance on top from phase 3).'],
    touchpoints: ['QR code', 'App', 'Live map', 'AR guidance (phase 3)'],
    points: 'Registered automatically in the rewards system. Points start with the QR scan (from phase 2).',
    organiser: 'The QR scan and the positioning give a starting point for tracking: peak times and crowd flow in real time.',
  },
  {
    icon: CalendarCheck,
    title: 'Engaging with events',
    tag: 'Live schedule',
    does: ['Adds the events they want to attend to a personal schedule.', 'Visits the stands and explores the fair.', 'Takes part in quizzes, workshops and book-related competitions.', 'Rates an event with one tap, after the event (from phase 2).'],
    app: ['Shows a dynamic schedule that changes in real time with updates or availability.', 'Sends a notification before each event.', 'Uses anonymised movement data to encourage exploring different areas of the fair.', 'Asks for a one-tap micro-rating after an event, never after every stand.'],
    touchpoints: ['Schedule', 'Notifications', 'Stands', 'Live map', 'Micro-rating (phase 2)'],
    points: 'Points for visiting or interacting with stands, for interactive activities and for rating an event (from phase 2).',
    organiser: 'The live map shows crowd density, so visitors can be directed to less crowded areas.',
  },
  {
    icon: PenLine,
    title: 'Book signings and workshops',
    tag: 'Booked in advance',
    does: ["Books a signing slot in advance, and checks in at the author's stand at their time.", 'Takes part in workshops, such as writing books or tips on publishing.'],
    app: ['Sends a notification when their time comes.', 'Guides them to the stand.', 'Releases an unclaimed slot after 10 minutes to a short standby list.'],
    touchpoints: ['Digital ticket', 'Notification', "Author's stand", 'Workshops'],
    points: 'Extra points for workshops. Exclusive workshops and special events unlock higher-value rewards: signed books, invitations to private events, or tickets to coming events (from phase 2).',
    organiser: 'Sets the capacity of each event, with real data on interests and expected attendance.',
  },
  {
    icon: DoorOpen,
    title: 'Exit and survey',
    tag: 'The end',
    does: ['Fills in one short exit survey about the events, the ease of navigation and the digital tools.', 'Redeems points for rewards.'],
    app: ['Shows the available points and the rewards on offer.', 'Sends a thank-you message with a summary of the day, the points collected and the rewards redeemed.', 'Offers discounts for the next fair, or special offers from partner bookshops.'],
    touchpoints: ['Exit survey', 'Rewards', 'Thank-you message'],
    points: 'Points are exchanged for rewards through the app (from phase 2).',
    organiser: 'Exit survey data and event micro-ratings are collected in real time and analysed, to give the organisers immediate feedback.',
  },
];

const shots = {
  ar: { src: 'vr-navigation.webp', w: 900, h: 1949, alt: 'App screen: a camera view of the fair hall with an arrow path on the floor, a "turn left, 50 m" instruction, and a label for the Egyptian pavilion marked as a crowded area (phase 3 concept)' },
  home: { src: 'home.webp', w: 900, h: 2422, alt: 'App home screen: a greeting, a search field, the competitions rating with a points total, browsing by country with flags, and the top picks of books, above a bottom navigation bar' },
  request: { src: 'signing-request.webp', w: 900, h: 1948, alt: "App screen: an author's page with her portrait, name, a 4.5 out of 5 rating, an About the author text, and two buttons, Request signing and Share" },
  checkin: { src: 'signing-checkin.webp', w: 900, h: 1948, alt: "App screen: an author's page with his portrait, name, a 4.5 out of 5 rating, a 03:47 countdown to the visitor's slot, the number 14 beside an Arabic label meaning 'ahead of you', an About the author text, and two buttons, Check in and Cancel request" },
  survey: { src: 'survey.webp', w: 900, h: 1948, alt: 'App screen, exit survey: a star rating for the events, a three-option question on how easy it was to move around the fair, a three-option question on satisfaction with the digital tools, a short optional note, a banner about extra points for completing the survey, and a Send rating button' },
  map: { src: 'crowd-map.webp', w: 900, h: 2050, alt: 'App screen: a map of the fair with country pavilions shown as flags, and a highlighted route from the current position to a destination' },
};

const wayfinding = {
  solves: 'Solves problem 01 · Navigation difficulty',
  problem: 'First-time visitors cannot read the layout of the stands or find the fastest route.',
  solution: 'A live 2D map, opened right after the QR scan at the entrance. In phase 3, AR guidance is added on top: a camera view with arrows on the floor.',
  can: ['Preview the floor plan, and follow the route to a hall or an event.', 'In phase 3, follow AR arrows on the floor to the chosen stand.'],
  steps: ['Scan the code', 'Choose the publisher from the list', 'Follow the route'],
  visitor: 'A stronger sense of control over the visit: a guided start that suits their interests, without random exploration.',
  organiser: 'Meant to reduce requests for help and to spread movement more evenly across the halls.',
  kpi: 'Time to reach a first chosen stand',
};

const rewards = {
  solves: 'Solves problem 03 · Passive visitors',
  cards: [
    { icon: Star, title: 'Points', text: 'Visitors earn points when they attend events, visit stands and take part in challenges.' },
    { icon: Target, title: 'Challenges', text: "Field challenges built into the app: attending a meeting with an author and documenting the attendance, visiting a set number of stands within a set time, or taking a photo in a distinctive spot such as the children's corner or a rare exhibit. Quizzes, book-related competitions and workshops count as challenges too: workshops earn extra points, and exclusive ones unlock higher-value rewards." },
    { icon: Gift, title: 'Rewards', text: 'Points can be exchanged for digital rewards (such as e-books or discounts) or for rewards such as signed books or vouchers.' },
    { icon: MapPin, title: 'Rewards that move people', text: 'Organisers can attach a reward to a quieter area, for example a book discount or an exclusive event in Hall X.' },
  ],
  later: 'Leaderboards are held for phase 3.',
  visitor: 'Enjoyment and involvement: earning points for visiting stands or taking part in activities makes them an active participant.',
  organiser: 'A tool for motivating visitors to visit the less crowded stands, and a source of data on interests and the strongest points of interaction.',
  kpi: 'Share of visitors who complete at least one challenge, quiz or workshop',
};

const flowPhases: { phase: string; steps: { icon: LucideIcon; title: string; text: string }[] }[] = [
  { phase: 'Discovery', steps: [
    { icon: Search, title: 'Search', text: 'Browse by author name or book title' },
    { icon: ClipboardList, title: 'Details', text: 'View the author profile, the signing slots and the places left' },
  ] },
  { phase: 'Booking', steps: [
    { icon: Ticket, title: 'Book', text: 'Select a slot, confirm the booking' },
    { icon: Smartphone, title: 'Ticket', text: 'Receive a digital ticket with a QR code and a time' },
  ] },
  { phase: 'Navigation', steps: [
    { icon: Bell, title: 'Reminder', text: 'Push notification before the slot' },
    { icon: Navigation, title: 'Guide', text: "Tap 'Start navigation' and follow the route to the stand (AR arrows from phase 3)" },
  ] },
  { phase: 'Attendance', steps: [
    { icon: CircleCheck, title: 'Check-in', text: 'Check in at the stand. A slot not claimed in 10 minutes is released' },
    { icon: Star, title: 'Rate', text: 'Rate the session with one tap, and earn points' },
  ] },
];

const compact = [
  { id: 'book', icon: PenLine, title: 'Book signing', solves: 'Solves problem 02 · Crowding and queues', shots: ['request', 'checkin'] as const, text: 'Visitors book a timed slot at a book signing in the app and receive a digital ticket. They are reminded before the slot, and check in on arrival. A slot that is not claimed is released after 10 minutes to a short standby list.', visitor: 'No long queue: a short, ordered check-in within a slot', organiser: 'Capacity set per signing, with real data on expected attendance', kpi: 'Average wait at book signings', note: "In the concept, each signing slot is a 15-minute window shared by a small group of up to 20 visitors. On the check-in screen, the countdown is the time left until the visitor's slot opens, and the figure beside it is their place in that group's check-in order." },
  { id: 'crowd', icon: Users, title: 'Crowd management', solves: 'Solves problem 02 · Crowding and queues', shots: ['map'] as const, text: 'The live map shows crowd density in real time. When an area is congested, the app alerts visitors and suggests a quieter route or a less crowded event nearby.', visitor: 'Avoids congestion, decides faster', organiser: 'Better crowd flow, fewer bottlenecks', kpi: 'Share of visitors who follow a reroute alert' },
  { id: 'survey', icon: MessageSquareText, title: 'Micro-ratings and exit survey', solves: 'Solves problem 04 · Limited data for organisers', shots: ['survey'] as const, text: 'Two light touches, not one long form: a one-tap micro-rating after an event, never after every stand, and one short survey at the exit. Both feed the dashboard in real time, so organisers can adjust timings or locations.', visitor: 'Their voice is heard in a few taps', organiser: 'Decisions based on real ratings', kpi: 'Survey completion rate', badge: 'Phase 2', note: 'Exit survey screen drawn for this case study in the visual style of the app.' },
];

const dashboard = [
  { title: 'Live monitoring of attendance and congestion', feeds: 'Fed by features 01 and 04', lead: 'A live map of the site that shows:', items: ['The number of visitors in each area.', 'Traffic-light signals for congestion.', 'The option to send alerts to visitors, to spread them across less crowded areas.'] },
  { title: 'Following ticket and event bookings', feeds: 'Fed by feature 03', items: ['The number of tickets booked, and daily tickets.', 'An updated events schedule, with the attendance rate for each event.', 'Notifications when bookings are full, or when expected attendance is low.'] },
  { title: 'Managing the rewards system', feeds: 'Fed by feature 02 (phase 2)', items: ['The number of participants in challenges, quizzes and workshops.', 'Control over starting new challenges, or closing challenges when needed.'] },
  { title: 'Managing ratings and surveys', feeds: 'Fed by feature 05 (phase 2)', items: ['A board that shows micro-ratings and exit-survey results and classifies them (general satisfaction, suggestions, complaints).', 'Alerts about immediate negative ratings.', 'Filtering results by date or by type of event.'] },
  { title: 'Statistics and analytics', feeds: 'Fed by all five features', items: ['Total number of visitors by day and by hour.', 'The areas of highest activity inside the fair.', 'The average time a visitor stays inside the fair.', 'The rate of visitor participation in events and challenges.'] },
  { title: 'Sending notifications and alerts to visitors', feeds: 'Fed by features 03 and 04', lead: 'A panel for sending instant alerts to all visitors or to a specific group:', items: ['A change in the location of an event.', 'An alert about congestion.', 'A notice that an event or a signing is starting.'] },
];

const risks = [
  { title: 'Privacy', text: 'Movement tracking needs explicit consent and anonymised, aggregated data, in line with Saudi data-protection law.' },
  { title: 'No smartphone or a dead battery', text: 'Printed QR codes, kiosks and staffed help points.' },
  { title: 'Network load in a full hall', text: 'Offline tickets and cached maps.' },
  { title: 'Indoor positioning accuracy', text: 'GPS does not work reliably indoors, and both the live crowd map and AR wayfinding depend on knowing where visitors are. A crowd map only has to show how busy an area is, while AR needs much finer accuracy. Use BLE beacons or Wi-Fi positioning, validated in one hall before scaling. This is why AR wayfinding is held for phase 3.' },
  { title: 'Gamification side effects', text: 'Challenges can create new crowds and points can be gamed, so challenges are spread across zones and capped.' },
  { title: 'Survey fatigue and incentive bias', text: 'Points for ratings can inflate scores, so points reward completing a rating, never the score given; micro-ratings are limited to one per event; and the exit survey is the only longer form.' },
  { title: 'Accessibility', text: 'Step-free routes on the map, screen-reader support, Arabic and English.' },
];

const measures = [
  { problem: 'Navigation difficulty', feature: 'Live map and AR wayfinding', kpi: 'Time to reach a first chosen stand' },
  { problem: 'Crowding and queues', feature: 'Book signing and crowd alerts', kpi: 'Average wait at book signings. Share of visitors who follow a reroute alert.' },
  { problem: 'Passive visitors', feature: 'Rewards system', kpi: 'Share of visitors who complete at least one challenge, quiz or workshop' },
  { problem: 'Limited data for organisers', feature: 'Micro-ratings, exit survey and admin dashboard', kpi: 'Survey completion rate. Time from a crowd alert to action.' },
];

const phases = [
  { title: 'Phase 1', text: 'QR ticket, book signing, live 2D map with crowd alerts, and the core dashboard (modules 01, 02, 05 and 06).' },
  { title: 'Phase 2', text: 'Rewards system (points, challenges and rewards) and micro-ratings, with dashboard modules 03 and 04.' },
  { title: 'Phase 3', text: 'AR wayfinding, leaderboards, personalised suggestions.' },
];

const num = (index: number) => String(index + 1).padStart(2, '0');

type Shot = { src: string; w: number; h: number; alt: string };

/** A screen inside a phone frame. The screens were designed by the Product Designer on the team. */
function Device({ shot, className }: { shot: Shot; className?: string }) {
  return (
    <div className={`bf-device${className ? ` ${className}` : ''}`}>
      <Zoomable src={`${BASE}/${shot.src}`} alt={shot.alt} w={shot.w} h={shot.h} />
    </div>
  );
}

function Value({ visitor, organiser, kpi }: { visitor: string; organiser: string; kpi?: string }) {
  return (
    <dl className={`bf-value${kpi ? ' has-kpi' : ''}`} aria-label={kpi ? 'Added value and success measure' : 'Added value'}>
      <div><dt><Users size={14} strokeWidth={2} aria-hidden="true" /> For the visitor</dt><dd>{visitor}</dd></div>
      <div><dt><LayoutDashboard size={14} strokeWidth={2} aria-hidden="true" /> For the organiser</dt><dd>{organiser}</dd></div>
      {kpi && <div className="is-kpi"><dt><Target size={14} strokeWidth={2} aria-hidden="true" /> Success measure</dt><dd>{kpi}</dd></div>}
    </dl>
  );
}

function FeatureHead({ index, id, title, lead, solves, badge, onDark }: { index: number; id: string; title: string; lead: string; solves: string; badge?: string; onDark?: boolean }) {
  return (
    <header className="bf-fhead">
      <span>Feature {num(index)}</span>
      <h3 id={id}>{title}</h3>
      {badge && (onDark ? <ol className="bf-chips" aria-label="Arrives in"><li>{badge}</li></ol> : <ul className="bf-jm-tags" aria-label="Arrives in"><li>{badge}</li></ul>)}
      <p>{lead}</p>
      <p className="bf-solves">{solves}</p>
    </header>
  );
}

function BookFairCase({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'journey' | 'flow'>('journey');
  return (
    <article className="cs bf" aria-labelledby="bf-title">
      <header className="cs-hero">
        <p className="eyebrow">Experience design · Digital visitor experience · 2025</p>
        <h1 id="bf-title">Smart Book Fair: <span>a complete digital visitor experience</span></h1>
        <p className="cs-lead">One end-to-end concept for the visitor, from the QR scan at the entrance to the exit survey, with crowd management and rewards built in.</p>
        <dl className="cs-meta">
          {meta.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <div className="cs-cover"><SafeImg src={`${BASE}/hero.webp`} alt="Smart Book Fair, a complete digital visitor experience. Experience design, 2025. The logo of the Literature, Publishing & Translation Commission above a row of coloured book spines." width={2000} height={1125} loading="eager" /></div>
        <dl className="fid-stats bf-stats">
          {stats.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <nav className="cs-toc" aria-label="In this case study">
          {toc.map(([id, label]) => <a key={id} href={`#${id}`} data-magnetic>{label}</a>)}
        </nav>
      </header>

      {/* 01 Overview */}
      <section className="cs-section" id="overview" aria-labelledby="bf-overview">
        <div className="cs-two">
          <header data-reveal>
            <span className="eyebrow">01 · Overview</span>
            <h2 id="bf-overview">From the QR scan <em>to the exit</em></h2>
          </header>
          <p className="bf-overview-text" data-reveal>Digital tools that give visitors ease of access, navigation and interaction with the fair, with rewards and crowd management built in. The experience starts with the QR scan at the entrance and continues until the exit survey.</p>
        </div>
        <h3 className="bf-sub" data-reveal>Context</h3>
        <p className="bf-context" data-reveal>A concept I developed for the Literature, Publishing &amp; Translation Commission and delivered in May 2025. The goal was to give the Commission one end-to-end visitor experience to align on before any detailed design or build. The phasing is my recommendation, not part of the original brief.</p>
        <h3 className="bf-sub" data-reveal>Four objectives</h3>
        <ol className="bf-objectives is-four">
          {objectives.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <span className="bf-ico" aria-hidden="true"><item.icon size={22} strokeWidth={1.6} /></span>
              <b>{num(index)}</b>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
        <p className="bf-note" data-reveal><HeartHandshake size={16} strokeWidth={1.8} aria-hidden="true" /><span>A secondary objective, strengthening loyalty to the fairs, is tied to one touchpoint only: the offers at the exit, such as discounts for the next fair or offers from partner bookshops.</span></p>
      </section>

      {/* 02 Challenge: dark band, each problem linked to its objective */}
      <section className="cs-band bf-challenge" id="challenge" aria-labelledby="bf-challenge">
        <div className="cs-band-inner">
          <span className="eyebrow" data-reveal>02 · The challenge</span>
          <h2 id="bf-challenge" data-reveal>Four problems the experience sets out to solve</h2>
          <ol className="bf-problems">
            {challenges.map((item, index) => (
              <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 2) * 80}ms` }}>
                <span className="bf-problem-no" aria-hidden="true">{num(index)}</span>
                <span className="bf-ico is-dark" aria-hidden="true"><item.icon size={22} strokeWidth={1.6} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <p className="bf-problem-goal"><b>Objective</b>{item.objective}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 Starting point: what exists, and what has to be tested */}
      <section className="cs-section" id="start" aria-labelledby="bf-start">
        <header className="section-head" data-reveal>
          <span className="eyebrow">03 · Starting point</span>
          <h2 id="bf-start">What exists today, <em>and what to test</em></h2>
        </header>
        <h3 className="bf-sub bf-sub-first" data-reveal>Competitive analysis: five event and exhibition apps</h3>
        <p className="bf-scroll-hint" id="bf-matrix-hint">Swipe sideways to see all six capabilities.</p>
        <div className="bf-matrix-scroll" role="region" aria-labelledby="bf-start" aria-describedby="bf-matrix-hint" tabIndex={0} data-reveal>
          <table className="bf-matrix">
            <caption className="sr-only">Six capabilities compared across five event and exhibition apps and Smart Book Fair</caption>
            <thead>
              <tr><th scope="col">App</th>{capabilities.map((name) => <th key={name} scope="col">{name}</th>)}</tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.app} className={row.ours ? 'is-ours' : undefined}>
                  <th scope="row"><b>{row.app}</b><small>{row.kind}</small></th>
                  {row.cells.map(([mark, note], i) => (
                    <td key={capabilities[i]}>
                      <span className={`bf-m is-${mark}`}>
                        {mark === 'yes' ? <Check size={15} strokeWidth={2.6} aria-hidden="true" /> : mark === 'no' ? <X size={15} strokeWidth={2.6} aria-hidden="true" /> : <Minus size={15} strokeWidth={2.6} aria-hidden="true" />}
                        <span className={note || mark === 'partial' ? undefined : 'sr-only'}>{note ?? (mark === 'yes' ? 'Yes' : mark === 'no' ? 'No' : 'Partial')}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <small className="bf-compact-note" data-reveal>Feature comparison as of May 2025, based on each product's public website.</small>
        <p className="bf-insight" data-reveal><Lightbulb size={18} strokeWidth={1.8} aria-hidden="true" /><span>No single platform covers all six capabilities. Event apps such as Whova, PheedLoop and Cvent cover the live map, rewards, booking and surveys, but none offers AR navigation, and crowd management is partial at best. Navigine covers indoor navigation, but not the event side. Smart Book Fair combines all six in one experience designed for book fairs, with AR arriving in phase 3.</span></p>

        <h3 className="bf-sub" data-reveal>Public sources</h3>
        <ol className="bf-research">
          {research.map((item, index) => (
            <li key={item.source} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <span>{num(index)}</span>
              <p>{item.text}</p>
              <a href={item.href} target="_blank" rel="noopener noreferrer">Source: {item.source}<span className="sr-only"> (opens in a new tab)</span> <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" /></a>
            </li>
          ))}
        </ol>

        <h3 className="bf-sub" data-reveal>Assumptions and how I would validate them</h3>
        <div className="bf-matrix-scroll bf-table-wrap" data-reveal>
          <table className="bf-table">
            <caption className="sr-only">Five assumptions behind the concept and how each would be validated</caption>
            <thead><tr><th scope="col">Assumption</th><th scope="col">How I would validate it</th></tr></thead>
            <tbody>
              {assumptions.map((row) => (
                <tr key={row.assumption}>
                  <th scope="row">{row.assumption}</th>
                  <td data-label="How I would validate it">{row.test}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 04 Key decisions */}
      <section className="cs-section" id="decisions" aria-labelledby="bf-decisions">
        <header className="section-head" data-reveal>
          <span className="eyebrow">04 · Key decisions</span>
          <h2 id="bf-decisions">Four decisions, <em>and what each one costs</em></h2>
        </header>
        <ol className="bf-objectives is-two">
          {decisions.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 2) * 80}ms` }}>
              <span className="bf-ico" aria-hidden="true"><item.icon size={22} strokeWidth={1.6} /></span>
              <b>{num(index)}</b>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
              <p className="bf-tradeoff"><strong>Trade-off</strong> {item.tradeoff}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 05 Journey map: four stages, 01 to 04 */}
      <section className="cs-section" id="journey" aria-labelledby="bf-journey">
        <header className="section-head" data-reveal>
          <span className="eyebrow">05 · Visitor journey and user flow</span>
          <h2 id="bf-journey">The visitor journey, <em>from the QR scan to the exit</em></h2>
          <p>The journey shows the full concept across all three phases. Features that arrive later are marked with their phase.</p>
        </header>
        <div className="bf-seg" role="group" aria-label="Journey view" data-reveal>
          <button type="button" aria-pressed={view === 'journey'} aria-controls="bf-view-journey" onClick={() => setView('journey')} data-magnetic>Journey map</button>
          <button type="button" aria-pressed={view === 'flow'} aria-controls="bf-view-flow" onClick={() => setView('flow')} data-magnetic>User flow: booking a book signing</button>
        </div>
        <div id="bf-view-journey" hidden={view !== 'journey'}>
        <div className="bf-jm-scroll">
          <div className="bf-jm" role="table" aria-label="Visitor journey map: four stages from the QR scan to the exit">
            <div className="bf-jm-row" role="row">
              <div className="bf-jm-label" role="columnheader">Stage</div>
              {journey.map((stage, index) => (
                <div key={stage.title} className={`bf-jm-cell bf-jm-stage is-s${index + 1}`} role="columnheader">
                  <span className="bf-jm-ico" aria-hidden="true"><stage.icon size={20} strokeWidth={1.7} /></span>
                  <small>{stageNo(index)} · {stage.tag}</small>
                  <h3>{stage.title}</h3>
                </div>
              ))}
            </div>
            <div className="bf-jm-row" role="row">
              <div className="bf-jm-label" role="rowheader">The visitor</div>
              {journey.map((stage) => <div key={stage.title} className="bf-jm-cell" role="cell"><ul>{stage.does.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
            </div>
            <div className="bf-jm-row" role="row">
              <div className="bf-jm-label" role="rowheader">The app</div>
              {journey.map((stage) => <div key={stage.title} className="bf-jm-cell" role="cell"><ul>{stage.app.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
            </div>
            <div className="bf-jm-row" role="row">
              <div className="bf-jm-label" role="rowheader">Touchpoints</div>
              {journey.map((stage) => <div key={stage.title} className="bf-jm-cell" role="cell"><ul className="bf-jm-tags">{stage.touchpoints.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
            </div>
            <div className="bf-jm-row" role="row">
              <div className="bf-jm-label" role="rowheader">Points and rewards</div>
              {journey.map((stage) => <div key={stage.title} className="bf-jm-cell is-points" role="cell"><p>{stage.points}</p></div>)}
            </div>
            <div className="bf-jm-row" role="row">
              <div className="bf-jm-label" role="rowheader">For the organiser</div>
              {journey.map((stage) => <div key={stage.title} className="bf-jm-cell is-org" role="cell"><p>{stage.organiser}</p></div>)}
            </div>
          </div>
        </div>
        <ol className="bf-jm-cards">
          {journey.map((stage, index) => (
            <li key={stage.title} className={`is-s${index + 1}`}>
              <div className="bf-jm-cardhead"><span className="bf-jm-ico" aria-hidden="true"><stage.icon size={20} strokeWidth={1.7} /></span><div><small>{stageNo(index)} · {stage.tag}</small><h3>{stage.title}</h3></div></div>
              <dl>
                <div><dt>The visitor</dt><dd><ul>{stage.does.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>
                <div><dt>The app</dt><dd><ul>{stage.app.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>
                <div><dt>Touchpoints</dt><dd>{stage.touchpoints.join(' · ')}</dd></div>
                <div><dt>Points and rewards</dt><dd>{stage.points}</dd></div>
                <div><dt>For the organiser</dt><dd>{stage.organiser}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
        </div>
        <div id="bf-view-flow" hidden={view !== 'flow'}>
          <div className="bf-phases-scroll" role="region" aria-label="User flow: booking a book signing, scrolls sideways on small screens" tabIndex={0}>
            <ol className="bf-phases">
              {flowPhases.map((phase, p) => (
                <li key={phase.phase} className={`is-s${p + 1}`}>
                  <span className="bf-phase-name">{p + 1} · {phase.phase}</span>
                  <ol>
                    {phase.steps.map((step, i) => (
                      <li key={step.title}>
                        <span className="bf-step-ico" aria-hidden="true"><step.icon size={24} strokeWidth={1.7} /></span>
                        <small>Step {p * 2 + i + 1}</small>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
          <p className="bf-insight"><Lightbulb size={18} strokeWidth={1.8} aria-hidden="true" /><span>One flow connects four parts of the concept: book signing, the live map, the rewards system and micro-ratings. This is what makes the experience one system, not separate features.</span></p>
        </div>
        <figure className="bf-entry" data-reveal>
          <Zoomable src={`${BASE}/entry-point.webp`} alt='A visitor holds a phone in front of a "Scan here" kiosk with a touch screen, next to shelves of books. The logos of the Literature, Publishing & Translation Commission and of the Riyadh International Book Fair are on the wall.' w={2000} h={1125} />
          <figcaption><QrCode size={16} strokeWidth={1.8} aria-hidden="true" /> The entry point. On arrival, the visitor scans the QR code, and the digital experience starts.</figcaption>
        </figure>
      </section>

      {/* 06 Key features: a different layout for each */}
      <section className="cs-section" id="features" aria-labelledby="bf-features">
        <header className="section-head" data-reveal>
          <span className="eyebrow">06 · Key features</span>
          <h2 id="bf-features">Five features, <em>each with a measure of success</em></h2>
        </header>

        {/* Live map and AR: full width, the phone is the hero */}
        <article className="bf-vr" aria-labelledby="bf-f-ar" data-reveal>
          <div className="bf-vr-text">
            <FeatureHead index={0} id="bf-f-ar" title="Live map and AR wayfinding" lead="One scan opens a guided route to the first stand." solves={wayfinding.solves} badge="Phase 3" onDark />
            <div className="bf-vr-pair">
              <div><h4>The problem</h4><p>{wayfinding.problem}</p></div>
              <div><h4>The solution</h4><p>{wayfinding.solution}</p><ul>{wayfinding.can.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <ol className="bf-chips" aria-label="Steps to reach a publisher">
              {wayfinding.steps.map((step, i) => <li key={step}><b>{i + 1}</b>{step}</li>)}
            </ol>
          </div>
          <Device shot={shots.ar} className="is-hero" />
        </article>
        <Value visitor={wayfinding.visitor} organiser={wayfinding.organiser} kpi={wayfinding.kpi} />

        {/* Rewards system: split screen, the app on one half and four cards on the other */}
        <article className="bf-game" aria-labelledby="bf-f-game">
          <div data-reveal>
            <FeatureHead index={1} id="bf-f-game" title="Rewards system" lead="Points, challenges and rewards that turn visitors into participants." solves={rewards.solves} badge="Phase 2" />
            <ul className="bf-game-grid">
              {rewards.cards.map((card) => (
                <li key={card.title}>
                  <span className="bf-ico" aria-hidden="true"><card.icon size={20} strokeWidth={1.6} /></span>
                  <h4>{card.title}</h4>
                  <p>{card.text}</p>
                </li>
              ))}
            </ul>
            <p className="bf-note"><Star size={16} strokeWidth={1.8} aria-hidden="true" /> {rewards.later}</p>
          </div>
          <Device shot={shots.home} className="is-tall" />
        </article>
        <Value visitor={rewards.visitor} organiser={rewards.organiser} kpi={rewards.kpi} />

        {/* Book signing, crowd management and ratings: three compact cards */}
        <ul className="bf-compact">
          {compact.map((item, index) => (
            <li key={item.id} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <div className={`bf-compact-shots${item.shots.length > 1 ? ' has-two' : ''}`}>
                {item.shots.map((key) => <Device key={key} shot={shots[key]} />)}
              </div>
              <div className="bf-compact-body">
                <span className="bf-compact-no">Feature {num(index + 2)}</span>
                <h3><item.icon size={20} strokeWidth={1.7} aria-hidden="true" /> {item.title}</h3>
                {'badge' in item && item.badge && <ul className="bf-jm-tags" aria-label="Arrives in"><li>{item.badge}</li></ul>}
                <p className="bf-solves">{item.solves}</p>
                <p>{item.text}</p>
                <ul className="bf-tags" aria-label="Added value and success measure">
                  <li><b>Visitor</b>{item.visitor}</li>
                  <li className="is-org"><b>Organiser</b>{item.organiser}</li>
                  <li className="is-kpi"><b>Measure</b>{item.kpi}</li>
                </ul>
                {item.note && <small className="bf-compact-note">{item.note}</small>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 07 Admin dashboard */}
      <section className="cs-section" id="dashboard" aria-labelledby="bf-dashboard">
        <header className="section-head" data-reveal>
          <span className="eyebrow">07 · Admin dashboard</span>
          <h2 id="bf-dashboard">The whole experience, <em>followed in real time</em></h2>
          <p>Enabling the fair's management team to follow every detail of the digital experience in real time, and to make quick decisions based on real data that help improve organisation and interaction.</p>
        </header>
        <figure className="bf-dash" data-reveal>
          <Zoomable src={`${BASE}/dashboard.webp`} alt="Admin dashboard: four summary figures with trend lines above a floor plan of the fair, with a heat map that marks the crowded areas in red and yellow" w={2000} h={1203} />
        </figure>
        <ol className="bf-modules">
          {dashboard.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
              <span>{num(index)}</span>
              <h3>{item.title}</h3>
              <p className="bf-feeds">{item.feeds}</p>
              {item.lead && <p>{item.lead}</p>}
              <ul>{item.items.map((text) => <li key={text}>{text}</li>)}</ul>
            </li>
          ))}
        </ol>
        <Value visitor="Not directly visible, but its effect on the visitor is large in terms of organisation, speed of response and a smooth experience." organiser="One interface to monitor everything: visitor numbers, congestion points, the level of interaction, ratings and more, which lets the organising team make quick decisions and improve performance in real time." />
      </section>

      {/* 08 Risks and open questions */}
      <section className="cs-section" id="risks" aria-labelledby="bf-risks">
        <header className="section-head" data-reveal>
          <span className="eyebrow">08 · Risks and open questions</span>
          <h2 id="bf-risks">Seven things that could go <em>wrong</em></h2>
        </header>
        <ol className="bf-next">
          {risks.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
              <span>{num(index)}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 09 Measuring success: proposed measures, no targets */}
      <section className="cs-section" id="metrics" aria-labelledby="bf-metrics">
        <header className="section-head" data-reveal>
          <span className="eyebrow">09 · Measuring success</span>
          <h2 id="bf-metrics">Four problems, <em>four sets of measures</em></h2>
          <p>Proposed measures. No targets are set until a baseline is measured on site.</p>
        </header>
        <div className="bf-matrix-scroll bf-table-wrap" data-reveal>
          <table className="bf-table is-three">
            <caption className="sr-only">Each problem, the feature that answers it and the proposed measure</caption>
            <thead><tr><th scope="col">Problem</th><th scope="col">Feature</th><th scope="col">Proposed measure</th></tr></thead>
            <tbody>
              {measures.map((row) => (
                <tr key={row.problem}>
                  <th scope="row">{row.problem}</th>
                  <td data-label="Feature">{row.feature}</td>
                  <td data-label="Proposed measure">{row.kpi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="bf-sub" data-reveal>Phasing</h3>
        <ol className="bf-next">
          {phases.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <span>{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cs-section cs-close">
        <div className="cs-panel is-dark" data-reveal>
          <span className="eyebrow">My contribution</span>
          <p>The experience strategy, the four-stage visitor journey, the feature set and the six dashboard modules, shaped into one concept for the Commission. The UI screens were designed by the Product Designer on the team.</p>
        </div>
        <div className="cs-panel" data-reveal>
          <span className="eyebrow">Where it stands</span>
          <p>Delivered to the Commission in May 2025 as a complete concept: a four-stage visitor journey, five features, an admin dashboard and a phased plan, ready to move into detailed design. It has not been tested with visitors yet. The first step would be to validate the riskiest assumptions on site, starting with signing queues and entry, before any build.</p>
          <p className="fid-gap">Not yet covered here: usability testing, Arabic and right-to-left screens, consent flows, and the author's side of the signing experience.</p>
        </div>
        <div className="cs-panel" data-reveal>
          <span className="eyebrow">What I'd take forward</span>
          <p>Crowd management and rewards work best as one system, not as two features: every reward is also a way to move people. Next time I would ground the concept in a day of field observation at a fair before presenting it.</p>
        </div>
      </section>

      <section className="cs-finale">
        <span className="eyebrow">Smart Book Fair · Digital Visitor Experience</span>
        <h2 data-reveal>From a QR scan to <em>a managed fair.</em></h2>
        <p data-reveal>One experience that guides the visitor and gives organisers a live view of the fair.</p>
        <div className="cs-actions" data-reveal>
          <button type="button" className="btn btn-solid" onClick={onBack} data-magnetic><ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" /> Back to portfolio</button>
          <a className="btn btn-line" href="#contact" data-magnetic>Let's talk <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
        <p className="cs-disclaimer">A concept, not yet validated with visitors. Experience design work. The app screens and the dashboard were designed by the Product Designer on the team, except the exit survey screen, which was drawn for this case study, and one label on the check-in screen, which was edited to match the concept. The name and logo of the Literature, Publishing &amp; Translation Commission belong to their owner.</p>
      </section>
    </article>
  );
}

export default BookFairCase;
