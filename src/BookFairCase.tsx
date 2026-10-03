import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Bell, Check, CircleCheck, ClipboardList, Lightbulb, Minus, Smartphone, X, CalendarCheck, Compass, DoorOpen, Gift, HeartHandshake, LayoutDashboard, MapPin, Medal, MessageSquareText, Navigation, PenLine, QrCode, Route, Search, Sparkles, Star, Target, Ticket, Trophy, UserCheck, Users, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { SafeImg, Zoomable } from './CaseStudy';
import './bookfair.css';

/* Experience design case: Smart Book Fair, a complete digital visitor experience (May 2025).
   Every line of copy is translated from the project's two source files (the concept document and the deck); nothing is added. */

const BASE = '/case/book-fair';

const meta = [
  { label: 'Project', value: 'Smart Book Fair' },
  { label: 'For', value: 'Literature, Publishing & Translation Commission' },
  { label: 'Classification', value: 'Experience Design' },
  { label: 'Date', value: 'May 2025' },
  { label: 'Role', value: 'CX / UX Designer' },
  { label: 'Team', value: 'With a Product Designer (UI of the screens)' },
];

const stats = [
  { value: '6', label: 'Strategic objectives' },
  { value: '4', label: 'Journey stages' },
  { value: '5', label: 'Key features' },
  { value: '6', label: 'Dashboard modules' },
];

const toc = [
  ['overview', 'Overview'],
  ['challenge', 'Challenge'],
  ['discovery', 'Discovery'],
  ['journey', 'Journey and flow'],
  ['features', 'Features'],
  ['dashboard', 'Dashboard'],
  ['next', 'Next steps'],
];

const objectives = [
  { icon: Sparkles, title: 'Improve the visitor experience', text: 'Provide simple digital tools that help the visitor navigate, explore and book events.' },
  { icon: Trophy, title: 'Increase interaction and participation', text: "Use gamification to raise participation and improve the crowd-management experience at the fair's events." },
  { icon: Users, title: 'Manage crowds efficiently', text: 'Direct visitor movement and reduce congestion using live maps and smart notifications.' },
  { icon: BarChart3, title: 'Collect and analyse data', text: 'Enable the Commission to access data on interaction, satisfaction and visitor behaviour.' },
  { icon: LayoutDashboard, title: 'Raise the level of organisation', text: 'Through an admin dashboard that allows tracking visitors and making suitable decisions.' },
  { icon: HeartHandshake, title: 'Strengthen loyalty to the fairs', text: "Through a smart, personal digital experience that stays in the visitor's memory for future fairs." },
];

const challenges = [
  { icon: Compass, title: 'Navigation difficulty', text: 'Visitors, especially on a first visit, find it hard to understand how the stands are laid out inside the fair, to know where the important events are, and to work out the fastest route to their destination.' },
  { icon: Users, title: 'Crowding', text: 'Areas of the fair become congested and bottlenecks form, and visitors face long waits in queues for events such as book signings.' },
  { icon: Target, title: 'Lack of digital interaction', text: 'The visitor is a passive recipient rather than an active participant in the fair experience.' },
  { icon: BarChart3, title: 'Limited data for organisers', text: 'Organisers need live data on interaction, satisfaction and visitor behaviour, on peak times and on crowd flow, to make decisions on organisation and distribution.' },
];

type Mark = 'yes' | 'no' | 'partial';
const capabilities = ['Interactive map', 'VR / AR navigation', 'Gamification', 'Crowd management', 'Event booking', 'Live surveys'];
/* Checked against each product's own public pages (October 2026). "Partial" means an add-on, or only part of the capability. */
const matrix: { app: string; kind: string; ours?: boolean; cells: [Mark, string?][] }[] = [
  { app: 'Whova', kind: 'Conferences', cells: [['yes'], ['no'], ['yes'], ['no'], ['yes'], ['yes']] },
  { app: 'Swapcard', kind: 'Expos', cells: [['yes'], ['no'], ['partial', 'Add-on'], ['no'], ['yes'], ['yes']] },
  { app: 'PheedLoop', kind: 'Events', cells: [['yes'], ['no'], ['yes'], ['no'], ['yes'], ['yes']] },
  { app: 'Cvent', kind: 'Large conferences', cells: [['yes'], ['no'], ['yes'], ['partial'], ['yes'], ['yes']] },
  { app: 'Navigine', kind: 'Indoor navigation', cells: [['yes'], ['partial', 'AR only'], ['no'], ['partial', 'Heat maps'], ['no'], ['no']] },
  { app: 'Smart Book Fair', kind: 'Our solution', ours: true, cells: [['yes'], ['yes', 'VR'], ['yes'], ['yes'], ['yes'], ['yes']] },
];

const research = [
  { text: 'The Riyadh International Book Fair drew about 500,000 visitors over ten days in 2016, and needed queue systems, signage and crowd management procedures inside and outside the venue.', source: 'Crowd Dynamics', href: 'https://crowddynamics.com/riyadh-international-book-fair' },
  { text: 'The Cairo International Book Fair recorded 445,029 visitors in a single day in 2025.', source: 'Maspero, Egyptian National Media Authority', href: 'https://www.maspero.eg/art-and-culture/2025/01/26/838326/445-%D8%A3%D9%84%D9%81-%D8%B2%D8%A7%D8%A6%D8%B1-%D8%AE%D9%84%D8%A7%D9%84-%D8%A7%D9%84%D9%8A%D9%88%D9%85-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A-%D9%84%D9%85%D8%B9%D8%B1%D8%B6-%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9-%D8%A7%D9%84%D8%AF%D9%88%D9%84%D9%8A-%D9%84%D9%84%D9%83%D8%AA%D8%A7%D8%A8' },
  { text: 'A study of a gamified AR navigation system for exhibitions found that visitors in game mode followed the intended route more closely.', source: 'Applied Sciences (MDPI), 2022', href: 'https://www.mdpi.com/2076-3417/12/6/2969' },
];

const impact = [
  { value: '40%', label: 'Expected reduction in average wayfinding time' },
  { value: '3×', label: 'Projected increase in visitor interaction rate' },
  { value: '0 min', label: 'Queue time with the pre-booking system' },
  { value: '500K+', label: 'Visitors the system is designed to handle' },
];

const journey = [
  {
    icon: QrCode,
    title: 'Entry point',
    tag: 'QR code scan',
    does: ['Scans the QR code received after buying the ticket.', 'Chooses a publisher from the list and follows the interactive steps to reach it.'],
    app: ["Sends a welcome message and shows the day's highlights.", "Suggests events based on the visitor's preferences.", 'Activates the interactive (VR) guidance inside the fair.'],
    touchpoints: ['QR code', 'App', 'VR guidance'],
    points: 'Registered automatically in the gamification system. Points start with the QR scan.',
    organiser: 'A starting point for tracking the visitor digitally: peak times and crowd flow in real time.',
  },
  {
    icon: CalendarCheck,
    title: 'Engaging with events',
    tag: 'Live schedule',
    does: ['Adds the events they want to attend to a personal schedule.', 'Visits the stands and explores the fair.', 'Takes part in quizzes, workshops and book-related competitions.'],
    app: ['Shows a dynamic schedule that changes in real time with updates or availability.', 'Sends a notification before each event.', 'Tracks movement and encourages exploring different areas of the fair.'],
    touchpoints: ['Schedule', 'Notifications', 'Stands', 'Live map'],
    points: 'Points for visiting or interacting with stands, and for interactive activities.',
    organiser: 'The live map shows crowd density, so visitors can be directed to less crowded areas.',
  },
  {
    icon: PenLine,
    title: 'Book signings and workshops',
    tag: 'Booked in advance',
    does: ['Skips the queue at a book signing booked in advance.', 'Takes part in workshops, such as writing books or tips on publishing.'],
    app: ['Sends a notification when their time comes.', 'Guides them to the stand.'],
    touchpoints: ['Digital ticket', 'Notification', "Author's stand", 'Workshops'],
    points: 'Extra points for workshops. Exclusive workshops and special events unlock higher-value rewards: signed books, invitations to private events, or tickets to coming events.',
    organiser: 'Sets the capacity of each event, with real data on interests and expected attendance.',
  },
  {
    icon: DoorOpen,
    title: 'Exit and survey',
    tag: 'The end',
    does: ['Fills in a short survey about the events, the ease of navigation and the digital tools.', 'Redeems points for rewards.'],
    app: ['Shows the available points and the rewards on offer.', 'Sends a thank-you message with a summary of the day, the points collected and the rewards redeemed.', 'Offers discounts for the next fair, or special offers from partner bookshops.'],
    touchpoints: ['Survey', 'Rewards', 'Thank-you message'],
    points: 'Points are exchanged for rewards through the app.',
    organiser: 'Survey data is collected in real time and analysed, to give the organisers immediate feedback.',
  },
];

const shots = {
  vr: { src: 'vr-navigation.webp', w: 900, h: 1949, alt: 'App screen: a camera view of the fair hall with an arrow path on the floor, a "turn left, 50 m" instruction, and a label for the Egyptian pavilion marked as a crowded area' },
  home: { src: 'home.webp', w: 900, h: 2422, alt: 'App home screen: a greeting, a search field, the competitions rating with a points total, browsing by country with flags, and the top picks of books, above a bottom navigation bar' },
  request: { src: 'signing-request.webp', w: 900, h: 1948, alt: "App screen: an author's page with her portrait, name, a 4.5 out of 5 rating, an About the author text, and two buttons, Request signing and Share" },
  checkin: { src: 'signing-checkin.webp', w: 900, h: 1948, alt: "App screen: an author's page with his portrait, name, a 4.5 out of 5 rating, a 03:47 countdown, a waiting list count of 14, an About the author text, and two buttons, Check in and Cancel request" },
  survey: { src: 'survey.webp', w: 900, h: 1948, alt: 'App screen, exit survey: a star rating for the events, a three-option question on how easy it was to move around the fair, a three-option question on satisfaction with the digital tools, a short optional note, a banner about extra points for completing the survey, and a Send rating button' },
  map: { src: 'crowd-map.webp', w: 900, h: 2050, alt: 'App screen: a map of the fair with country pavilions shown as flags, and a highlighted route from the current position to a destination' },
};

const vr = {
  problem: 'Visitors, especially on a first visit, find it hard to understand how the stands are laid out inside the fair, to know where the important events are, and to work out the fastest route to their destination.',
  solution: 'A virtual tour through a VR app, activated right after scanning the QR code at the entrance.',
  can: ['See an interactive map of the fair as a 3D experience, and be guided to the hall or the event by following the steps.', 'Move through the stands virtually before deciding to move physically.'],
  steps: ['Scan the code', 'Choose the publisher from the list', 'Follow the interactive steps'],
  visitor: "Strengthens the visitor's sense of control over their experience inside the fair. It helps them start with a guided tour that suits their personal interests, and saves the time and effort of random exploration.",
  organiser: 'A starting point for tracking the visitor digitally. It lets the team know peak times and follow crowd flow in real time, which makes immediate decisions on organisation and distribution easier.',
};

const gamification = {
  cards: [
    { icon: Star, title: 'Points', text: 'Visitors earn points when they attend events, visit stands and take part in challenges.' },
    { icon: Medal, title: 'Leaderboards', text: 'Interactive digital boards in key areas of the fair, such as the main hall entrances or next to event areas, show the most engaged visitors, ranked by activities such as visiting a large number of publishers, taking part in events and solving challenges.' },
    { icon: Gift, title: 'Rewards', text: 'Points can be exchanged for digital rewards (such as e-books or discounts) or for rewards such as signed books or vouchers.' },
    { icon: Target, title: 'Challenges', text: "Field challenges built into the app: attending a meeting with an author and documenting the attendance, visiting a set number of stands within a set time, or taking a photo in a distinctive spot such as the children's corner or a rare exhibit." },
  ],
  crowd: 'Crowd managers can use gamification when an area is congested, for example by directing visitors to other places to reduce congestion, with a reward for visiting that place (for example, a discount on books, or attending an exclusive event in hall X).',
  visitor: 'The visitor feels enjoyment and involvement, earning points for visiting certain stands or taking part in activities, which makes them an active participant in the fair experience.',
  organiser: 'An effective tool for motivating visitors to interact with every corner of the fair and to visit the less crowded stands. It also generates data on interests and on the strongest points of interaction.',
};

const booking = {
  steps: [
    { icon: PenLine, title: 'Book', text: 'Visitors book their place at the book signing through the app.' },
    { icon: Ticket, title: 'Ticket', text: 'They receive a digital ticket with an allotted time.' },
    { icon: Bell, title: 'Reminder', text: 'Timely notifications remind them of the session, or of any changes to the schedule.' },
    { icon: UserCheck, title: 'Attend', text: 'No standing in the waiting queue.' },
  ],
  visitor: 'Gives the visitor the chance to book a seat at important events, or a signing by their favourite author, in advance and without a long wait, which strengthens their sense of being valued and of good organisation.',
  organiser: 'Helps set the capacity of each event and organise the flow of the audience to it precisely. It reduces randomness, and gives real data on interests and on expected attendance.',
};

const crowd = {
  tracking: ['Interactive map: updated in real time to show the stands, the events and crowd density.', 'Crowd management: helps organisers track congestion and direct visitors intelligently.', 'Smart notifications: the app alerts visitors when an area is congested, and suggests alternative routes and less crowded events.'],
  guidance: ['Notification system: directs visitors to other places based on available space or on event timings.', 'Live data is used to determine the best time for visitors to move to certain areas, to avoid congestion.'],
  example: 'The current area is 85% crowded. We suggest visiting the comics stand in Hall 3. Congestion there is currently low, and an event starts in 10 minutes. Tap here to go to it on the map.',
  visitor: 'Comfortable movement for visitors: an overall view of the fair helps them avoid congestion and make faster decisions.',
  organiser: 'Smart control for organisers: monitoring gatherings and directing visitors, to improve crowd flow and avoid bottlenecks.',
};

const surveys = {
  lead: 'Instead of traditional surveys after the visit has ended, the visitor is asked to rate the experience quickly and interactively after each activity, through attractive interfaces in the app or on screens at exit points.',
  points: [
    { title: 'Instant surveys', text: 'A quick rating after each event, with extra points for those who take part.' },
    { title: 'Smart analysis', text: 'The data is analysed in real time to give organisers direct feedback.' },
    { title: 'Immediate improvement', text: 'Direct decisions, such as adjusting timings or changing locations, based on what visitors say.' },
  ],
  exit: 'Before leaving the fair, visitors are asked to fill in a short survey about their experience with the events, the ease of navigation, and their satisfaction with the digital tools.',
  visitor: 'Gives their opinion easily through a simple, guided survey, and feels that their voice is heard and that their opinion matters for improving the fair.',
  organiser: 'A rich source of data on how visitors rate the experience, used to improve future editions and to support decisions based on real numbers and opinions.',
};

const flowPhases: { phase: string; steps: { icon: LucideIcon; title: string; text: string }[] }[] = [
  { phase: 'Discovery', steps: [
    { icon: Search, title: 'Search', text: 'Browse by author name or book title' },
    { icon: ClipboardList, title: 'Details', text: 'View author profile, available signing sessions, remaining spots' },
  ] },
  { phase: 'Booking', steps: [
    { icon: Ticket, title: 'Book', text: 'Select session, confirm booking' },
    { icon: Smartphone, title: 'Ticket', text: 'Receive digital ticket with QR code, time & seat number' },
  ] },
  { phase: 'Navigation', steps: [
    { icon: Bell, title: 'Reminder', text: 'Push notification 30 min & 15 min before' },
    { icon: Navigation, title: 'VR Guide', text: 'Tap \'Start Navigation\' → AR arrows guide to venue' },
  ] },
  { phase: 'Attendance', steps: [
    { icon: CircleCheck, title: 'Check-in', text: 'Scan QR at venue → auto check-in → earn 50 points' },
    { icon: Star, title: 'Rate', text: 'Quick 3-question survey → earn 20 bonus points' },
  ] },
];

const compact = [
  { id: 'book', icon: PenLine, title: 'Pre-booking system', shots: ['request', 'checkin'] as const, text: 'Visitors can book their place at book signings through the app, and receive a digital ticket with an allotted time, without standing in the waiting queue. Timely notifications remind them of signing sessions, or of any changes to the schedule.', visitor: 'No long wait for a favourite author', organiser: 'Real data on expected attendance' },
  { id: 'crowd', icon: Users, title: 'Crowd management', shots: ['map'] as const, text: 'An interactive map is updated in real time to show the stands, the events and crowd density. The app alerts visitors when an area is congested, and suggests alternative routes and less crowded events.', visitor: 'Avoids congestion, decides faster', organiser: 'Better crowd flow, no bottlenecks' },
  { id: 'survey', icon: MessageSquareText, title: 'Interactive surveys', shots: ['survey'] as const, text: 'Instead of traditional surveys after the visit has ended, the visitor rates the experience quickly after each activity, with extra points for taking part. The data is analysed in real time to give organisers direct feedback.', visitor: 'Their voice is heard', organiser: 'Decisions based on real numbers', note: 'Exit survey screen drawn for this case study in the visual style of the app.' },
];

const dashboard = [
  { title: 'Live monitoring of attendance and congestion', lead: 'An interactive map of the site that shows:', items: ['The number of visitors in each area.', 'Traffic-light signals for congestion.', 'The option to send alerts to visitors, to spread them across less crowded areas.'] },
  { title: 'Following ticket and event bookings', items: ['The number of tickets booked, and daily tickets.', 'An updated events schedule, with the attendance rate for each event.', 'Notifications when bookings are full, or when expected attendance is low.'] },
  { title: 'Managing interaction and gamification', items: ['The number of participants in the digital challenges.', 'The leaders on the honour board.', 'Control over launching new challenges, or closing challenges when needed.'] },
  { title: 'Managing visitor surveys', items: ['A board that shows visitor survey results and classifies them (general satisfaction, suggestions, complaints).', 'Alerts about immediate negative ratings.', 'Filtering results by date or by type of event.'] },
  { title: 'Statistics and analytics', items: ['Total number of visitors by day and by hour.', 'The areas of highest activity inside the fair.', 'The average time a visitor stays inside the fair.', 'The rate of visitor participation in events and challenges.'] },
  { title: 'Sending notifications and alerts to visitors', lead: 'A panel for sending instant alerts to all visitors or to a specific group:', items: ['A change in the location of an event.', 'An alert about congestion.', 'A notice that an event or a signing is starting.'] },
];

const nextSteps = [
  { title: "Align the concept with the Commission's goals", items: ['Hold a workshop with the stakeholders at the Commission to review the strategic objectives, and make sure the digital concept fits their cultural and organisational vision.'] },
  { title: 'UX design and wireframes', items: ['Design the wireframes for the platform and the app.', 'Draw the user journey visually, to show the interaction points and the incentive tools.', 'Run usability tests with a group of potential visitors.', 'Collect the feedback and improve the pain points.'] },
  { title: 'Develop an MVP', lead: 'Build a first version of the app or the digital portal that includes:', items: ['Ticket booking.', 'QR scan.', 'The smart map.', 'The rewards system.'] },
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

function Value({ visitor, organiser }: { visitor: string; organiser: string }) {
  return (
    <dl className="bf-value" aria-label="Added value">
      <div><dt><Users size={14} strokeWidth={2} aria-hidden="true" /> For the visitor</dt><dd>{visitor}</dd></div>
      <div><dt><LayoutDashboard size={14} strokeWidth={2} aria-hidden="true" /> For the organiser</dt><dd>{organiser}</dd></div>
    </dl>
  );
}

function FeatureHead({ index, id, title, lead }: { index: number; id: string; title: string; lead: string }) {
  return (
    <header className="bf-fhead">
      <span>Feature {num(index)}</span>
      <h3 id={id}>{title}</h3>
      <p>{lead}</p>
    </header>
  );
}

function BookFairCase({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'journey' | 'flow'>('journey');
  return (
    <article className="cs bf" aria-labelledby="bf-title">
      <header className="cs-hero">
        <p className="eyebrow">Experience design · Digital visitor experience · May 2025</p>
        <h1 id="bf-title">Smart Book Fair: <span>a complete digital visitor experience</span></h1>
        <p className="cs-lead">Digital tools that give visitors ease of access, navigation and interaction with the fair, with gamification and crowd-management strategies. The journey begins when visitors scan a QR code on entry, and continues until the end of the visit.</p>
        <dl className="cs-meta">
          {meta.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <div className="cs-cover"><SafeImg src={`${BASE}/hero.webp`} alt="Smart Book Fair, a complete digital visitor experience. Experience design, May 2025. The logo of the Literature, Publishing & Translation Commission above a row of coloured book spines." width={2000} height={1125} loading="eager" /></div>
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
          <p className="bf-overview-text" data-reveal>Enhancing the visitor experience through digital tools that give visitors ease of access, navigation and interaction with the fair, while introducing gamification techniques and crowd-management strategies. The journey begins when visitors scan a QR code on entry, and they continue to move between the fair's events with ease until the end of the visit, with rewards and incentives along the way.</p>
        </div>
        <h3 className="bf-sub" data-reveal>The strategic objectives of the digital experience at the book fair</h3>
        <ol className="bf-objectives">
          {objectives.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
              <span className="bf-ico" aria-hidden="true"><item.icon size={22} strokeWidth={1.6} /></span>
              <b>{num(index)}</b>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Projected impact: design targets, not measured results */}
      <section className="cs-section bf-impact" aria-labelledby="bf-impact">
        <h2 id="bf-impact" className="bf-impact-title" data-reveal>Projected impact <small>Design targets, not measured results</small></h2>
        <ul className="bf-impact-grid">
          {impact.map((item, index) => (
            <li key={item.label} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
              <strong>{item.value}</strong>
              <p>{item.label}</p>
              <small>Design target</small>
            </li>
          ))}
        </ul>
      </section>

      {/* 02 Challenge: dark band */}
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
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 Research and discovery: competitive analysis matrix */}
      <section className="cs-section" id="discovery" aria-labelledby="bf-discovery">
        <header className="section-head" data-reveal>
          <span className="eyebrow">03 · Research and discovery</span>
          <h2 id="bf-discovery">Competitive analysis: <em>five event and exhibition apps</em></h2>
        </header>
        <p className="bf-scroll-hint" id="bf-matrix-hint">Swipe sideways to see all six capabilities.</p>
        <div className="bf-matrix-scroll" role="region" aria-labelledby="bf-discovery" aria-describedby="bf-matrix-hint" tabIndex={0} data-reveal>
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
        <p className="bf-insight" data-reveal><Lightbulb size={18} strokeWidth={1.8} aria-hidden="true" /><span>No single platform covers all six capabilities. Event apps such as Whova, PheedLoop and Cvent cover maps, gamification, booking and surveys, but none offers VR or AR navigation, and crowd management is partial at best. Navigine covers indoor navigation, but not the event side. Smart Book Fair combines all six in one experience designed for book fairs.</span></p>
        <h3 className="bf-sub" data-reveal>Supporting research</h3>
        <ol className="bf-research">
          {research.map((item, index) => (
            <li key={item.source} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <span>{num(index)}</span>
              <p>{item.text}</p>
              <a href={item.href} target="_blank" rel="noopener noreferrer">Source: {item.source}<span className="sr-only"> (opens in a new tab)</span> <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" /></a>
            </li>
          ))}
        </ol>
      </section>

      {/* 04 Journey map: a drawn route with four stops */}
      <section className="cs-section" id="journey" aria-labelledby="bf-journey">
        <header className="section-head" data-reveal>
          <span className="eyebrow">04 · Visitor journey and user flow</span>
          <h2 id="bf-journey">The visitor journey, <em>from the QR scan to the exit</em></h2>
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
                  <small>{num(index)} · {stage.tag}</small>
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
              <div className="bf-jm-cardhead"><span className="bf-jm-ico" aria-hidden="true"><stage.icon size={20} strokeWidth={1.7} /></span><div><small>{num(index)} · {stage.tag}</small><h3>{stage.title}</h3></div></div>
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
                  <span className="bf-phase-name">Phase {p + 1} · {phase.phase}</span>
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
          <p className="bf-insight"><Lightbulb size={18} strokeWidth={1.8} aria-hidden="true" /><span>Notice how one flow connects 4 systems together: Pre-booking, VR Navigation, Gamification and Interactive Surveys. This is what makes the experience integrated, not just separate features.</span></p>
        </div>
        <figure className="bf-entry" data-reveal>
          <Zoomable src={`${BASE}/entry-point.webp`} alt='A visitor holds a phone in front of a "Scan here" kiosk with a touch screen, next to shelves of books. The logos of the Literature, Publishing & Translation Commission and of the Riyadh International Book Fair are on the wall.' w={2000} h={1125} />
          <figcaption><QrCode size={16} strokeWidth={1.8} aria-hidden="true" /> The entry point. On arrival, the visitor scans the QR code, and the digital experience starts.</figcaption>
        </figure>
      </section>

      {/* 05 Key features: a different layout for each */}
      <section className="cs-section" id="features" aria-labelledby="bf-features">
        <header className="section-head" data-reveal>
          <span className="eyebrow">05 · Key features</span>
          <h2 id="bf-features">Five features, <em>each with its added value</em></h2>
        </header>

        {/* VR navigation: full width, the phone is the hero */}
        <article className="bf-vr" aria-labelledby="bf-f-vr" data-reveal>
          <div className="bf-vr-text">
            <FeatureHead index={0} id="bf-f-vr" title="VR navigation experience" lead="QR scan for smart guidance." />
            <div className="bf-vr-pair">
              <div><h4>The problem</h4><p>{vr.problem}</p></div>
              <div><h4>The solution</h4><p>{vr.solution}</p><ul>{vr.can.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <ol className="bf-chips" aria-label="Steps to reach a publisher">
              {vr.steps.map((step, i) => <li key={step}><b>{i + 1}</b>{step}</li>)}
            </ol>
          </div>
          <Device shot={shots.vr} className="is-hero" />
        </article>
        <Value visitor={vr.visitor} organiser={vr.organiser} />

        {/* Gamification: split screen, the app on one half and four cards on the other */}
        <article className="bf-game" aria-labelledby="bf-f-game">
          <div data-reveal>
            <FeatureHead index={1} id="bf-f-game" title="Gamification system" lead="Improving the overall experience and crowd management through gamification." />
            <ul className="bf-game-grid">
              {gamification.cards.map((card) => (
                <li key={card.title}>
                  <span className="bf-ico" aria-hidden="true"><card.icon size={20} strokeWidth={1.6} /></span>
                  <h4>{card.title}</h4>
                  <p>{card.text}</p>
                </li>
              ))}
            </ul>
            <p className="bf-note"><Users size={16} strokeWidth={1.8} aria-hidden="true" /> {gamification.crowd}</p>
          </div>
          <Device shot={shots.home} className="is-tall" />
        </article>
        <Value visitor={gamification.visitor} organiser={gamification.organiser} />

        {/* Pre-booking, crowd management and surveys: three compact cards */}
        <ul className="bf-compact">
          {compact.map((item, index) => (
            <li key={item.id} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <div className={`bf-compact-shots${item.shots.length > 1 ? ' has-two' : ''}`}>
                {item.shots.map((key) => <Device key={key} shot={shots[key]} />)}
              </div>
              <div className="bf-compact-body">
                <span className="bf-compact-no">Feature {num(index + 2)}</span>
                <h3><item.icon size={20} strokeWidth={1.7} aria-hidden="true" /> {item.title}</h3>
                <p>{item.text}</p>
                <ul className="bf-tags" aria-label="Added value">
                  <li><b>Visitor</b>{item.visitor}</li>
                  <li className="is-org"><b>Organiser</b>{item.organiser}</li>
                </ul>
                {item.note && <small className="bf-compact-note">{item.note}</small>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 06 Admin dashboard */}
      <section className="cs-section" id="dashboard" aria-labelledby="bf-dashboard">
        <header className="section-head" data-reveal>
          <span className="eyebrow">06 · Admin dashboard</span>
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
              {item.lead && <p>{item.lead}</p>}
              <ul>{item.items.map((text) => <li key={text}>{text}</li>)}</ul>
            </li>
          ))}
        </ol>
        <Value visitor="Not directly visible, but its effect on the visitor is large in terms of organisation, speed of response and a smooth experience." organiser="One interface to monitor everything: visitor numbers, congestion points, the level of interaction, survey results and more, which lets the organising team make quick decisions and improve performance in real time." />
      </section>

      {/* 07 Next steps */}
      <section className="cs-section" id="next" aria-labelledby="bf-next">
        <header className="section-head" data-reveal>
          <span className="eyebrow">07 · Next steps</span>
          <h2 id="bf-next">What comes <em>next</em></h2>
        </header>
        <ol className="bf-next">
          {nextSteps.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <span>{num(index)}</span>
              <div>
                <h3>{item.title}</h3>
                {item.lead && <p>{item.lead}</p>}
                <ul>{item.items.map((text) => <li key={text}>{text}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cs-finale">
        <span className="eyebrow">Smart Book Fair</span>
        <h2 data-reveal>A complete digital <em>visitor experience.</em></h2>
        <p data-reveal>A smart, personal digital experience that stays in the visitor's memory.</p>
        <div className="cs-actions" data-reveal>
          <button type="button" className="btn btn-solid" onClick={onBack} data-magnetic><ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" /> Back to portfolio</button>
          <a className="btn btn-line" href="#contact" data-magnetic>Let's talk <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
        <p className="cs-disclaimer">Experience design work. The app screens and the dashboard were designed by the Product Designer on the team, except the exit survey screen, which was drawn for this case study. The name and logo of the Literature, Publishing & Translation Commission belong to their owner.</p>
      </section>
    </article>
  );
}

export default BookFairCase;
