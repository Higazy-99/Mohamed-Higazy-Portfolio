import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Bell, CalendarCheck, Compass, DoorOpen, Gift, HeartHandshake, LayoutDashboard, MapPin, Medal, MessageSquareText, Navigation, PenLine, QrCode, Route, Search, Sparkles, Star, Target, Ticket, Trophy, UserCheck, Users, type LucideIcon } from 'lucide-react';
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

const compare = [
  { capability: 'Finding the way to a stand or an event', usual: 'Random exploration', smart: 'A guided tour after the QR scan' },
  { capability: 'A place at a book signing', usual: 'Standing in the waiting queue', smart: 'A digital ticket with an allotted time' },
  { capability: 'Visitor feedback', usual: 'Traditional surveys after the visit', smart: 'A quick rating after each activity' },
  { capability: 'Leaderboards', usual: 'Randomly distributed points', smart: 'Interactive boards in key areas' },
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
  home: { src: 'home.webp', w: 900, h: 2726, alt: 'App home screen: a greeting, a search field, the competitions rating with a points total, browsing by country with flags, the top picks of books, and a row of top authors, above a bottom navigation bar' },
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

const bookingFlow: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Search, title: "Open the author's page", text: 'Top authors are listed on the home screen. The page shows the author, a rating and an "About the author" text.' },
  { icon: PenLine, title: 'Request the signing', text: 'Visitors book their place at the book signing through the app.' },
  { icon: Ticket, title: 'Digital ticket', text: 'A ticket with an allotted time, without standing in the waiting queue.' },
  { icon: Bell, title: 'Reminders', text: 'Timely notifications remind the visitor of the session, or of any changes to the schedule.' },
  { icon: Navigation, title: 'VR guidance to the stand', text: 'When their time comes they get a notification, and use the app to reach the stand.' },
  { icon: MapPin, title: 'Check in, skip the queue', text: 'The screen shows the countdown and the waiting list, with Check in and Cancel request.' },
  { icon: Star, title: 'Rate the session', text: 'An instant survey with quick rating options, and extra points for completing it.' },
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

      {/* 03 Research and discovery: comparison table */}
      <section className="cs-section" id="discovery" aria-labelledby="bf-discovery">
        <header className="section-head" data-reveal>
          <span className="eyebrow">03 · Research and discovery</span>
          <h2 id="bf-discovery">Existing practice, <em>and the gaps</em></h2>
          <p>Where the usual way of running a fair falls short, and what the concept puts in its place.</p>
        </header>
        <div className="bf-compare" data-reveal>
          <table>
            <caption className="sr-only">The usual fair experience compared with the Smart Book Fair concept</caption>
            <thead>
              <tr><th scope="col">&nbsp;</th><th scope="col">The usual fair</th><th scope="col" className="is-smart">Smart Book Fair</th></tr>
            </thead>
            <tbody>
              {compare.map((row) => (
                <tr key={row.capability}>
                  <th scope="row">{row.capability}</th>
                  <td><span className="bf-mark is-no" aria-hidden="true">✗</span><span className="sr-only">Not covered: </span>{row.usual}</td>
                  <td className="is-smart"><span className="bf-mark is-yes" aria-hidden="true">✓</span><span className="sr-only">Covered: </span>{row.smart}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <div className="bf-flow-wrap">
            <ol className="bf-flow">
              {bookingFlow.map((step, index) => (
                <li key={step.title}>
                  <div className="bf-flow-node">
                    <span className="bf-flow-ico" aria-hidden="true"><step.icon size={22} strokeWidth={1.6} /></span>
                    <small>{num(index)}</small>
                    <h3>{step.title}</h3>
                  </div>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
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

        {/* Gamification: four small cards */}
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

        {/* Pre-booking: a mini flow */}
        <article className="bf-book" aria-labelledby="bf-f-book" data-reveal>
          <FeatureHead index={2} id="bf-f-book" title="Pre-booking system" lead="Booking book fair events in advance (book signings)." />
          <div className="bf-book-body">
            <ol className="bf-mini">
              {booking.steps.map((step) => (
                <li key={step.title}>
                  <span className="bf-ico" aria-hidden="true"><step.icon size={20} strokeWidth={1.6} /></span>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
            <div className="bf-book-shots">
              <Device shot={shots.request} />
              <Device shot={shots.checkin} />
            </div>
          </div>
        </article>
        <Value visitor={booking.visitor} organiser={booking.organiser} />

        {/* Crowd management: the live map on the phone, the alert next to it */}
        <article className="bf-crowd" aria-labelledby="bf-f-crowd" data-reveal>
          <Device shot={shots.map} />
          <div className="bf-crowd-text">
            <FeatureHead index={3} id="bf-f-crowd" title="Crowd management" lead="Managing crowds and controlling congestion." />
            <div className="bf-crowd-lists">
              <div><h4>Tracking visitor density</h4><ul>{crowd.tracking.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h4>Dynamic guidance</h4><ul>{crowd.guidance.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <blockquote className="bf-push">
              <span><Bell size={14} strokeWidth={2} aria-hidden="true" /> Example notification</span>
              <p>{crowd.example}</p>
            </blockquote>
          </div>
        </article>
        <Value visitor={crowd.visitor} organiser={crowd.organiser} />

        {/* Interactive surveys: the exit survey screen */}
        <article className="bf-survey" aria-labelledby="bf-f-survey" data-reveal>
          <div className="bf-survey-text">
            <FeatureHead index={4} id="bf-f-survey" title="Interactive surveys" lead={surveys.lead} />
            <ul className="bf-survey-points">
              {surveys.points.map((item) => <li key={item.title}><MessageSquareText size={18} strokeWidth={1.6} aria-hidden="true" /><div><h4>{item.title}</h4><p>{item.text}</p></div></li>)}
            </ul>
            <p className="bf-note"><DoorOpen size={16} strokeWidth={1.8} aria-hidden="true" /> {surveys.exit}</p>
          </div>
          <figure className="bf-survey-shot">
            <Device shot={shots.survey} />
            <figcaption>Exit survey screen, drawn for this case study in the visual style of the app.</figcaption>
          </figure>
        </article>
        <Value visitor={surveys.visitor} organiser={surveys.organiser} />

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
