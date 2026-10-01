import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { SafeImg, Zoomable } from './CaseStudy';
import './film.css';

/* UX case study: Fan-ID for the AFC Asian Cup 2027. UX work up to the proof of concept; the UI was designed by a Product Designer. */

const BASE = '/case/fan-id';

const meta = [
  { label: 'Project', value: 'AFC27 Fan-ID platform' },
  { label: 'Year', value: '2025' },
  { label: 'Role', value: 'UX Designer' },
  { label: 'Scope', value: 'Benchmarking, journey map, UX principles' },
  { label: 'Team', value: 'With a Product Designer (UI)' },
  { label: 'Tools', value: 'Figma, FigJam, Miro' },
  { label: 'Status', value: 'Proof of concept delivered' },
];

const stats = [
  { value: '4', label: 'Tournaments benchmarked' },
  { value: '14', label: 'Benchmarking criteria' },
  { value: '8', label: 'Journey stages' },
  { value: '5', label: 'UX principles' },
  { value: '7', label: 'Proof-of-concept screens' },
];

const persona = {
  goals: [
    { text: 'Buy tickets and register for the Fan-ID in one place.', ref: 'Stage 01' },
    { text: 'Clear immigration and stadium entry quickly.', ref: 'Stages 02, 06' },
    { text: 'Plan match days and stay informed as things change.', ref: 'Stage 04' },
    { text: 'Enjoy the atmosphere, then share feedback.', ref: 'Stages 05, 08' },
  ],
  needs: [
    { text: 'Fast, secure identity verification.', ref: 'Criterion 03' },
    { text: 'A multilingual, accessible interface.', ref: 'Criterion 05' },
    { text: 'Clear, real-time information.', ref: 'Criterion 07' },
    { text: 'Reassurance about personal data.', ref: 'Criterion 08' },
  ],
  frustrations: [
    { text: 'Visa and flight delays', ref: 'Stage 01' },
    { text: 'Long queues', ref: 'Stages 02, 05' },
    { text: 'Language barriers', ref: 'Stage 02' },
    { text: 'Menu complexity and information overload', ref: 'Stage 04' },
    { text: 'App glitches and poor connectivity', ref: 'Stages 04 to 07' },
  ],
};

const toc = [
  ['context', 'Context'],
  ['approach', 'Research'],
  ['criteria', 'Criteria'],
  ['standards', 'Guidelines'],
  ['persona', 'Persona'],
  ['journey', 'Journey'],
  ['principles', 'Principles'],
  ['decisions', 'Decisions'],
  ['poc', 'Proof of concept'],
];

const facts = [
  { label: 'Client', text: 'The AFC27 Local Organising Committee.' },
  { label: 'The platform', text: 'One Fan-ID for the AFC Under-23 Asian Cup 2026 and the AFC Asian Cup 2027: a mobile app, a website, CRM and CMS, with links to ticketing, visa and government ID systems.' },
  { label: 'The goal', text: 'A secure, scalable system built around the fan that improves the fan journey, streamlines access and supports a more personal fan experience, aligned with Saudi Vision 2030.' },
  { label: 'Constraints', text: 'A new design system that follows the brand guidelines of the AFC LOC and its partners (the Ministry of Sports and the DGA), and the DGA standards for mobile-first digital services.' },
  { label: 'My role', text: 'UX Designer. I built the research foundation, mapped the fan journey and followed the design process until the proof of concept was delivered. A Product Designer created the UI.' },
];

const steps = [
  { title: 'Review case studies', text: 'Four recent tournaments with digital or physical fan identity systems.' },
  { title: 'Define criteria', text: 'A 14-point benchmarking matrix built from the platform requirements.' },
  { title: 'Benchmark', text: 'For each criterion: best practice observed, and relevance to Fan-ID.' },
  { title: 'Map the journey', text: 'Eight stages from pre-arrival to post-event loyalty.' },
  { title: 'Set principles', text: 'Five UX principles for a high-security, high-scale platform.' },
  { title: 'Proof of concept', text: 'Handed over as a PoC, with the UI designed by the Product Designer.' },
];

const benchmarks = [
  {
    year: '2018',
    title: 'FIFA World Cup, Russia',
    img: { src: 'russia-2018.webp', w: 1099, h: 853, alt: 'The 2018 FIFA World Cup Fan ID, front and back: a laminated card with a photo, personal data and a barcode' },
    about: 'The 2018 World Cup introduced the Fan ID, a mandatory laminated identification card containing personal data, a photo and an RFID barcode.',
    source: { href: 'https://info.viselio.com/visa-vs-fan-id-apply/', label: 'info.viselio.com' },
    learnings: [
      { label: 'One card, many services', text: 'Fans applied online with their ticket number, and the Fan ID gave visa-free entry, stadium access and free trains between host cities.' },
      { label: 'Accessibility', text: 'Efforts to serve fans with disabilities and to keep communication multilingual.' },
    ],
  },
  {
    year: '2020',
    title: 'Euro 2020, Fan ID (Russia)',
    img: { src: 'euro-2020.webp', w: 1079, h: 801, alt: 'The UEFA Euro 2020 Fan ID for Saint Petersburg, with a photo, name and stadium artwork' },
    about: 'The Fan ID system was built on the 2018 World Cup experience and extended to support COVID-19 health protocols, with health status checks and contact tracing.',
    learnings: [
      { label: 'Fan-ID and ticketing', text: 'Multilingual support and simple interfaces that cut friction at registration.' },
      { label: 'Sustainability', text: 'Public and shared transport was encouraged to reduce environmental impact.' },
    ],
  },
  {
    year: '2022',
    title: 'FIFA World Cup, Qatar',
    img: { src: 'qatar-2022.webp', w: 969, h: 685, alt: 'The Hayya entry permit for the 2022 FIFA World Cup, shown in the app and as a PDF' },
    about: 'The 2022 World Cup introduced the Hayya Card, a mandatory digital Fan-ID that combined an entry permit to Qatar with stadium access for ticket holders, for over one million fans. It also gave free access to public transport (Doha Metro, buses and trams) during the tournament, plus discounts at venues and fan zones.',
    learnings: [
      { label: 'All-in-one pass', text: 'It acted as both a visa waiver and stadium access, simplifying international fan entry and reducing administrative barriers.' },
      { label: 'Smart technology', text: 'Facial recognition and RFID-enabled cards sped up entry and improved security, and thousands of cameras supported crowd management.' },
      { label: 'Fan perks', text: 'Free public transport on match days, a "Hayya with Me" programme to invite non-ticket holders, and visa-free travel to neighbouring countries (Saudi Arabia, UAE, Oman and Jordan).' },
    ],
  },
  {
    year: '2024',
    title: 'UEFA Euro, Germany',
    img: { src: 'euro-2024.webp', w: 972, h: 708, alt: 'UEFA Euro 2024 tournament summary pages on match attendance, fans and fan zones' },
    about: 'Held in 10 German cities, Euro 2024 turned the match ticket into a pass: a personalised mobile ticket in the UEFA app, registered to the fan, plus a 36-hour public transport pass in every host city at no extra cost.',
    source: { href: 'https://www.uefa.com/news-media/news/0286-19407e1254d7-16b5c6fe87dd-1000--public-transport-included-for-uefa-euro-2024-match-ticket-ho/', label: 'uefa.com' },
    learnings: [
      { label: 'Ticket as a pass', text: 'Personalised mobile tickets shown in the app at the gate, with public transport included on match days.' },
      { label: 'Fan app', text: 'An app for real-time crowd management, personalised tips and multiple languages.' },
      { label: 'Brand identity', text: 'An inclusive visual identity for all UEFA nations, promoting fan unity.' },
      { label: 'Accessibility and sustainability', text: 'High-contrast modes, text scaling and sustainable transport options.' },
    ],
  },
];

type Group = 'Identity & access' | 'Experience' | 'Foundations' | 'Future';
const groups: Group[] = ['Identity & access', 'Experience', 'Foundations', 'Future'];

const criteria: { n: number; group: Group; title: string; covers: string; practice: string; why: string }[] = [
  { n: 1, group: 'Foundations', title: 'User research & persona development', covers: 'Deep research to understand diverse fan segments (hardcore, casual, international) and develop personas.', practice: 'Interviews, surveys and observation; personas guide design for usability and emotional connection.', why: 'Ensures the platform meets varied fan needs and delivers personalised, meaningful experiences.' },
  { n: 2, group: 'Identity & access', title: 'Onboarding & registration', covers: 'Stepwise, minimal-input forms with progress bars, AI-assisted autofill, social login and inline validation.', practice: 'Simplified registration and AI autofill reduce friction; progress indicators add clarity.', why: 'Streamlines fan registration, reduces drop-offs and improves data accuracy.' },
  { n: 3, group: 'Identity & access', title: 'Verification & ID validation', covers: 'Integration with government ID, visa and ticketing; biometric authentication (facial recognition, fingerprint); real-time status updates.', practice: 'Multi-factor authentication, biometric verification at entry and real-time feedback on verification status.', why: 'Critical for secure, fast and transparent identity verification, reducing queues and fraud.' },
  { n: 4, group: 'Experience', title: 'Mobile-first & responsive design', covers: 'Optimised for smartphones and tablets; native app features such as push notifications, live updates and AR navigation; responsive web fallback.', practice: 'A mobile-first approach mandated by the DGA; native apps for richer features; responsive web for accessibility.', why: 'The same Fan-ID works on the phone, the web and a printed QR.' },
  { n: 5, group: 'Experience', title: 'Accessibility & multilingual support', covers: 'WCAG 2.1 compliance: keyboard navigation, screen-reader support, scalable text, high contrast; a bilingual UI (Arabic and English); localised cultural content, dates and times.', practice: 'High-contrast modes, text scaling and multiple languages; voice commands and hands-free navigation are emerging.', why: 'Ensures inclusivity and usability for diverse fan demographics, including people with disabilities.' },
  { n: 6, group: 'Experience', title: 'Information architecture & navigation', covers: 'Clear, logical content categories; shallow navigation (two to three levels); persistent bottom navigation; no horizontal scrolling or clutter; top-aligned form labels.', practice: 'Simple menus and consistent labelling; quick access to key features such as ticketing, profile and live scores.', why: 'Reduces cognitive load and lets fans complete tasks quickly.' },
  { n: 7, group: 'Experience', title: 'Real-time information & fan interaction', covers: 'Live scores, notifications, transport updates and queue status; interactive features such as polls, rewards and social sharing.', practice: 'Timely, non-intrusive updates; gamification and personalised messaging keep fans involved.', why: 'Keeps fans informed and involved, which builds loyalty and satisfaction.' },
  { n: 8, group: 'Identity & access', title: 'Security & data privacy UX', covers: 'Transparent consent flows, clear privacy policies, end-to-end encryption and user dashboards for data control and session management.', practice: 'GDPR-compliant data handling, role-based access, encrypted biometric data and user control over data.', why: 'Fans hand over passport and biometric data, so they need to see what is kept and why. It also keeps the platform compliant with data-protection law.' },
  { n: 9, group: 'Foundations', title: 'Usability testing & iterative improvement', covers: 'Wireframes and interactive prototypes, user testing, and analytics and fan-behaviour data for continuous optimisation.', practice: 'Iterative design cycles and data-driven improvement after launch (AFC and FIFA best practice).', why: 'Enables continuous refinement of the UX and UI based on real feedback and behaviour.' },
  { n: 10, group: 'Foundations', title: 'Design system & brand compliance', covers: 'Adherence to the AFC LOC and partner brand guidelines (Ministry of Sports and DGA): logos, colours and typography.', practice: 'A unified design language system and brand consistency across digital platforms.', why: 'Gives a cohesive, professional and culturally appropriate visual identity.' },
  { n: 11, group: 'Identity & access', title: 'Integration with the AFC ecosystem', covers: 'Integration with the AFC LIVE app, CRM, CMS, ticketing, visa and government ID systems.', practice: 'Shared data for personalised fan journeys; gamification integration; one unified digital experience.', why: 'Provides a smooth, connected experience across all AFC digital touchpoints.' },
  { n: 12, group: 'Foundations', title: 'Analytics & data-driven insights', covers: 'Analytics that track user behaviour, usage and platform performance to inform UX and UI improvements.', practice: 'CRM data, AI personalisation and predictive UX (AFC digital strategy, emerging trends).', why: 'Enables personalised content, targeted communication and continuous optimisation.' },
  { n: 13, group: 'Future', title: 'Emerging technologies & trends', covers: 'AI personalisation, AR navigation, predictive UX, micro-interactions, and voice and gesture controls.', practice: 'Dynamic interfaces that adapt to behaviour; immersive AR; hands-free controls in stadium environments.', why: 'Hands-free and AR features help fans in crowded, noisy stadiums, including fans with disabilities.' },
  { n: 14, group: 'Future', title: 'Sustainability & ethical design', covers: 'Privacy-first data collection, transparent AI use and sustainable digital practices.', practice: 'Ethical AI guidelines, a privacy-first approach and sustainable design principles.', why: 'Aligns the platform with global best practice for ethical, responsible digital services.' },
];

type Stage = { name: string; story: string; actions: string[]; feeling: string; mood: number; touchpoints: string[]; pains: string[]; insight: string };

const stages: Stage[] = [
  { name: 'Pre-arrival', story: 'Fan browses the AFC app, buys tickets and registers for Fan-ID. Appreciates clear guidance but worries about data privacy.', actions: ['Ticket purchase', 'Fan-ID registration'], feeling: 'Curious and slightly cautious about data privacy', mood: 0.42, touchpoints: ['AFC app', 'Ticketing platform', 'Fan-ID registration portal'], pains: ['Visa and flight delays', 'App navigation issues', 'Ticketing confusion'], insight: 'Easy onboarding and visa support build trust and readiness (Russia 2018, Euro 2020, Euro 2024, Qatar 2022).' },
  { name: 'Airport & immigration', story: 'Fan arrives, uses the Fan-ID biometric scan for fast immigration clearance and feels relieved by the smooth process.', actions: ['Airport immigration', 'Biometric scan', 'Currency exchange and SIM card purchase'], feeling: 'Relieved after a smooth arrival process', mood: 0.72, touchpoints: ['Airport', 'Immigration counter', 'Biometric scanner'], pains: ['Long queues', 'Language barrier', 'Lost luggage'], insight: 'Fan-ID integration and biometrics speed entry and improve security (Russia 2018, Qatar 2022).' },
  { name: 'Transfer to hotel', story: 'Fan tracks the shuttle in the AFC app, checks in, and reviews the match schedule and local information. Feels welcomed but tired.', actions: ['Hotel check-in', 'Local info review'], feeling: 'Tired but reassured by helpful information', mood: 0.55, touchpoints: ['AFC app', 'Shuttle bus', 'Hotel front desk'], pains: ['Shuttle delays', 'Room readiness', 'Fatigue'], insight: 'Coordinated transport and real-time updates reduce stress (Russia 2018, Qatar 2022).' },
  { name: 'At the hotel: schedule & planning', story: 'Fan reviews the match schedule, sets reminders, struggles with the menus at first but adapts quickly.', actions: ['Review match schedule and set reminders', 'Plan match-day logistics', 'Connect with other fans'], feeling: 'Initially confused, then comfortable navigating the app', mood: 0.5, touchpoints: ['AFC app', 'Hotel Wi-Fi', 'Concierge'], pains: ['Menu complexity', 'Information overload', 'App bugs'], insight: 'Personalised schedules and multilingual apps help fans plan and stay informed (Euro 2024, Euro 2020).' },
  { name: 'Pre-match: atmosphere & preparation', story: 'Fan visits the fan zone, buys merchandise and joins app polls. Enjoys the atmosphere despite the queues.', actions: ['Fan zone visit', 'Merchandise purchase', 'Gamification and social features'], feeling: 'Excited and social despite minor inconveniences', mood: 0.86, touchpoints: ['Fan zone', 'Merchandise shop', 'AFC app'], pains: ['Long queues', 'Payment issues', 'Connectivity'], insight: 'Fan zones and interactive apps boost excitement and participation (Euro 2020, Euro 2024, Qatar 2022).' },
  { name: 'Match day: move to stadium', story: 'Fan follows metro updates in the app and navigates from the station to the stadium with ease, feeling confident despite the crowds.', actions: ['Early departure and transport to the stadium', 'Stadium entry and Fan-ID verification', 'Enjoy the match and real-time updates'], feeling: 'Confident and focused navigating the crowd', mood: 0.78, touchpoints: ['Metro station', 'AFC app', 'Stadium signage'], pains: ['Slow queues, technical glitches', 'Signage clarity', 'Entry bottlenecks'], insight: 'Biometric entry and crowd management ensure smooth, secure stadium access (Russia 2018, Euro 2020, Qatar 2022, Euro 2024).' },
  { name: 'Post-match: exit & transport', story: 'Fan returns to the hotel safely, books a taxi in the app and rests after an exciting day.', actions: ['Follow exit guidance and transport updates', 'Meet friends or visit the fan zone', 'Return to the hotel'], feeling: 'Calm and satisfied after a long but fun day', mood: 0.74, touchpoints: ['AFC app', 'Taxi service', 'Hotel'], pains: ['Transport availability', 'App glitches', 'Fatigue'], insight: 'Efficient post-match transport and rest opportunities reduce fatigue and improve the overall experience.' },
  { name: 'Post-event: feedback & loyalty', story: 'Fan completes a quick survey, giving feedback that helps improve future events.', actions: ['Survey completion', 'Feedback submission', 'Earn and redeem loyalty rewards'], feeling: 'Happy and reflective while giving feedback', mood: 0.9, touchpoints: ['AFC app', 'Email'], pains: ['Survey fatigue', 'Lack of incentives'], insight: 'Continuous improvement through fan feedback was a best practice at Euro 2024, helping organisers refine future events.' },
];

const principles: { title: string; text: string; applied?: string }[] = [
  { title: 'One pass for the whole trip', text: 'Tickets, travel and the Fan-ID live in one app, so a fan never has to work out which system does what.', applied: 'Screens 1, 5, 6, 7' },
  { title: 'Ready at the gate in one tap', text: 'The ID opens full screen from the profile, with a large QR code and the Fan-ID number, so it can be scanned without searching the app.', applied: 'Screens 6, 7' },
  { title: 'Show less, reveal on demand', text: 'Each screen shows the one decision a fan has to make, and keeps the details one step away.', applied: 'Screens 3, 4' },
  { title: 'Never leave a fan guessing', text: 'Every verification state (pending, approved, rejected, expired) is shown with the next step to take.' },
  { title: 'Ask only for what is needed, and say why', text: 'Personal and biometric data is requested at the moment it is needed, with a plain reason and a clear choice.' },
];

const decisions: { q: string; options: string[]; chosen: number; we: string; why: string; trade: string; screens: string[] }[] = [
  {
    q: 'Where should the Fan-ID live?',
    options: ['A separate ID app', 'Inside the tournament app'],
    chosen: 1,
    we: 'Inside the tournament app, under Profile, next to tickets, wallet and orders.',
    why: 'Every benchmarked tournament tied several services to one pass: Russia 2018 linked visa-free entry, stadium access and free trains to the Fan ID, Qatar 2022 combined the entry permit with stadium access, and Euro 2024 bundled public transport with the match ticket. Fans treated these as one thing, so the app should too.',
    trade: 'One app has to carry more. Navigation stays shallow with a five-tab bottom bar, and details stay one step away.',
    screens: ['Screen 1', 'Screen 5', 'Screen 6'],
  },
  {
    q: 'Digital ID or physical card?',
    options: ['A physical card', 'Digital first, on the phone'],
    chosen: 1,
    we: 'Digital first: the ID lives on the phone, with a QR code and the Fan-ID number.',
    why: 'The laminated card at Russia 2018 had to be produced and collected before travel. The DGA standards ask for mobile-first services, and fans already carry their tickets on the phone.',
    trade: 'The ID depends on the phone. Low battery and poor signal at the gate are real risks (stage 06), so an offline QR and a fallback at the gate are the next things to design.',
    screens: ['Screen 6', 'Screen 7'],
  },
  {
    q: "Should the ID carry the fan's loyalty status?",
    options: ['Keep the ID neutral', 'Show the fan tier on the ID'],
    chosen: 1,
    we: 'Show the tier as a small badge, and link the ID to the fan experience.',
    why: 'The journey ends with feedback and loyalty (stage 08), and "lack of incentives" is one of its pain points. Putting the tier on the pass the fan opens most often keeps rewards in view.',
    trade: 'An identity pass has to be read fast at the gate, so the tier stays secondary to the name, the QR code and the number.',
    screens: ['Screen 7'],
  },
];

const inPoc = new Set([2, 3, 4, 6, 7]);

const trends = ['AI-powered personalisation', 'AR venue navigation', 'Predictive UX', 'Micro-interactions and haptics', 'Ethical, transparent AI', 'Voice and gesture control'];

const guidelines = [
  { title: 'AFC digital ecosystem', text: 'Integrate with the AFC digital ecosystem, using CRM data and gamification to personalise fan journeys.' },
  { title: 'Multilingual', text: 'Support multiple languages and localised content, to repeat the AFC\'s success with fans across Asia.' },
  { title: 'Mobile-first', text: 'Design mobile-first and integrate with the AFC LIVE app for real-time fan interaction.' },
  { title: 'Analytics', text: 'Let analytics and data-driven insights guide continuous UX and UI improvement, in line with AFC digital transformation goals and Vision 2030.' },
  { title: 'Competition Management System', text: 'Connect to the AFC Competition Management System and other digital assets for a unified experience for fans, teams and organisers.' },
  { title: 'DGA standards', text: 'Align the design system and prototype with the DGA digital government service standards, with a mobile-first approach.' },
];

const answers = [
  { asks: 'Shallow navigation with a persistent bottom bar', source: 'Criterion 06 · Navigation', answer: 'Five tabs (Home, Book, Tickets, News, Profile) sit at the bottom of the main screens.', screens: '2, 6' },
  { asks: 'Clear ticket options, to remove ticketing confusion', source: 'Pain point · Pre-arrival', answer: 'Match details list what is included, and seat selection offers three tiers with their price and inclusions.', screens: '3, 4' },
  { asks: 'Help fans plan their trip before they arrive', source: 'Pain point · Visa and flight delays', answer: 'Flights and hotels are booked inside the same app, with shortcuts from the home screen.', screens: '1, 5' },
  { asks: 'A clear, verifiable identity', source: 'Criterion 03 · Verification', answer: 'The digital ID shows the photo, visa and passport numbers, a QR code and a barcode, with a check mark on the photo. The pass opens full screen with a large QR code for the gate.', screens: '6, 7' },
  { asks: 'Simple forms with few inputs', source: 'Criterion 02 · Onboarding', answer: 'The flight form has labelled fields and one primary action, Find flights.', screens: '5' },
  { asks: 'Mobile-first design', source: 'Criterion 04 · Mobile-first', answer: 'All seven screens are designed for the phone.', screens: '1 to 7' },
];

const pocScreens: { id: string; title: string; src: string; w: number; h: number; alt: string; note: string; links: string[] }[] = [
  { id: 'poc-1', title: 'Home', src: 'poc-1-home.webp', w: 615, h: 2000, alt: 'Home screen: the featured match with a Book now button, latest news, and shortcuts to book a flight or hotels', note: 'The featured match sits at the top with a Book now action. Below it: news, and shortcuts to flights and hotels.', links: ['06 · Information architecture', '07 · Real-time information'] },
  { id: 'poc-2', title: 'Booking', src: 'poc-2-booking.webp', w: 738, h: 2000, alt: 'Booking screen: AFC Asia Cup matches listed by date, with sport filters and a bottom navigation bar', note: 'Matches are listed by date, with sport filters above and five tabs in a persistent bottom bar.', links: ['04 · Mobile-first design', '06 · Navigation: persistent bottom bar'] },
  { id: 'poc-3', title: 'Match details', src: 'poc-3-match.webp', w: 708, h: 2000, alt: 'Match details: teams, date, venue, what is included, and a Navigate now button', note: 'Teams, date and venue at a glance, then what the ticket includes and a Navigate now action.', links: ['Principle 03 · Show less, reveal on demand'] },
  { id: 'poc-4', title: 'Seat selection', src: 'poc-4-seats.webp', w: 863, h: 2000, alt: 'Seat selection: a stadium map with colour-coded seats and Standard, Popular and Premium options with prices', note: 'A stadium map with a price on the chosen zone, three tiers with what each includes, and a timer to complete the booking.', links: ['Principle 03 · Show less, reveal on demand', '07 · Real-time information'] },
  { id: 'poc-5', title: 'Flights & hotels', src: 'poc-5-flights.webp', w: 924, h: 2000, alt: 'Book a flight form with round trip and one way options, airports, dates, passengers and a Find flights button', note: 'Travel is booked in the same app: one form for route, dates, passengers and cabin class, and one clear action.', links: ['Journey stage 01 · Pre-arrival'] },
  { id: 'poc-6', title: 'Profile and Fan-ID', src: 'poc-6-profile.webp', w: 752, h: 2000, alt: 'Profile screen with the fan digital ID card showing a photo, visa and passport numbers, a QR code and a barcode', note: 'The digital ID holds the photo, visa and passport numbers, a QR code and a barcode, next to wallet and orders.', links: ['03 · Verification and ID validation', 'Journey stage 06 · Fan-ID check at the stadium'] },
  { id: 'poc-7', title: 'Fan-ID pass', src: 'poc-7-fan-id-pass.webp', w: 924, h: 2000, alt: 'The Fan-ID pass opened full screen over the profile, with the fan\'s name, a QR code, the Fan-ID number, a Super fan badge and a My Fan experience button.', note: 'Tapping the ID on the profile opens it full screen: the fan\'s name, a large QR code and the Fan-ID number, ready to scan at the gate. The fan tier sits below as a small badge, and My Fan experience leads to perks and rewards.', links: ['Criterion 03 · Verification and ID validation', 'Principle 02 · Ready at the gate in one tap', 'Stage 06 · Fan-ID check at the stadium', 'Stage 08 · Loyalty'] },
];

function Curve() {
  const points = stages.map((stage, index) => ({ x: ((index + 0.5) / stages.length) * 100, y: 100 - stage.mood * 100 }));
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
  return (
    <div className="fid-curve" aria-hidden="true">
      <div className="fid-curve-inner">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d={d} className="fid-curve-line" vectorEffect="non-scaling-stroke" /></svg>
        {points.map((p, i) => <i key={i} style={{ left: `${p.x}%`, top: `${p.y}%` }} />)}
      </div>
    </div>
  );
}

function JourneyGrid() {
  const rows: { label: string; render: (stage: Stage) => ReactNode }[] = [
    { label: 'Story', render: (s) => <p>{s.story}</p> },
    { label: 'Actions', render: (s) => <ul>{s.actions.map((a) => <li key={a}>{a}</li>)}</ul> },
    { label: 'Feelings', render: (s) => <p className="fid-feeling">{s.feeling}</p> },
    { label: 'Touchpoints', render: (s) => <ul className="fid-tags">{s.touchpoints.map((a) => <li key={a}>{a}</li>)}</ul> },
    { label: 'Pain points', render: (s) => <ul className="fid-pains">{s.pains.map((a) => <li key={a}>{a}</li>)}</ul> },
  ];
  const insight = { label: 'Benchmark insight', render: (s: Stage) => <p className="fid-insight">{s.insight}</p> };
  return (
    <div className="fid-journey-scroll" tabIndex={0} role="region" aria-label="Fan journey map, scrolls horizontally">
      <div className="fid-journey">
        <div className="fid-label fid-corner">Stage</div>
        {stages.map((stage, index) => (
          <div key={stage.name} className="fid-cell fid-stage"><span>{String(index + 1).padStart(2, '0')}</span><h3>{stage.name}</h3></div>
        ))}
        {rows.map((row) => (
          <div key={row.label} className="fid-row">
            <div className="fid-label">{row.label}</div>
            {stages.map((stage) => <div key={stage.name} className="fid-cell">{row.render(stage)}</div>)}
          </div>
        ))}
        <div className="fid-label">Emotion</div>
        <Curve />
        <div className="fid-row">
          <div className="fid-label">{insight.label}</div>
          {stages.map((stage) => <div key={stage.name} className="fid-cell">{insight.render(stage)}</div>)}
        </div>
      </div>
    </div>
  );
}

function JourneyCards() {
  return (
    <ol className="fid-stage-cards">
      {stages.map((stage, index) => (
        <li key={stage.name} data-reveal>
          <div className="fid-stage-top"><span>{String(index + 1).padStart(2, '0')}</span><h3>{stage.name}</h3></div>
          <div className="fid-meter" role="img" aria-label={`Emotion: ${stage.feeling}`}><i style={{ width: `${Math.round(stage.mood * 100)}%` }} /></div>
          <p className="fid-feeling">{stage.feeling}</p>
          <p>{stage.story}</p>
          <dl>
            <div><dt>Actions</dt><dd>{stage.actions.join(' · ')}</dd></div>
            <div><dt>Touchpoints</dt><dd>{stage.touchpoints.join(' · ')}</dd></div>
            <div><dt>Pain points</dt><dd>{stage.pains.join(' · ')}</dd></div>
            <div><dt>Benchmark insight</dt><dd>{stage.insight}</dd></div>
          </dl>
        </li>
      ))}
    </ol>
  );
}

type Criterion = (typeof criteria)[number];

function CriterionDialog({ list, index, onClose, onStep }: { list: Criterion[]; index: number | null; onClose: () => void; onStep: (dir: 1 | -1) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const last = useRef<Criterion | null>(null);
  const item = index !== null ? list[index] : undefined;
  if (item) last.current = item;
  const f = item ?? last.current;
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
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
    document.documentElement.classList.toggle('is-modal', index !== null);
    return () => document.documentElement.classList.remove('is-modal');
  }, [index]);
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onStep]);
  if (!f) return <dialog ref={ref} className="fsd" aria-hidden="true" />;
  const pos = Math.max(0, list.findIndex((x) => x.n === f.n)) + 1;
  return (
    <dialog ref={ref} className="fsd fid-ckd" aria-labelledby="ckd-title" onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <div className="fsd-card">
        <header className="fsd-bar">
          <div className="fsd-nav">
            <button type="button" onClick={() => onStep(-1)} aria-label="Previous criterion" data-magnetic><ChevronLeft size={18} strokeWidth={1.6} aria-hidden="true" /></button>
            <span>{pos} of {list.length}</span>
            <button type="button" onClick={() => onStep(1)} aria-label="Next criterion" data-magnetic><ChevronRight size={18} strokeWidth={1.6} aria-hidden="true" /></button>
          </div>
          <span className="fsd-stage">{f.group}</span>
          <button type="button" className="fsd-close" onClick={onClose} aria-label="Close criterion" data-magnetic><X size={18} strokeWidth={1.6} aria-hidden="true" /></button>
        </header>
        <div className="fsd-scroll">
          <div className="fsd-body">
            <div className="fs-finding-top"><span className="fs-num">{String(f.n).padStart(2, '0')}</span><span className="fid-g">{f.group}</span>{inPoc.has(f.n) && <span className="fid-inpoc">In the PoC</span>}</div>
            <h2 id="ckd-title">{f.title}</h2>
            <dl className="fsd-cols">
              <div><dt>What it covers</dt><dd>{f.covers}</dd></div>
              <div><dt>Best practice observed</dt><dd>{f.practice}</dd></div>
              <div className="fid-ck-why"><dt>Why it matters for Fan-ID</dt><dd>{f.why}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function CriteriaMatrix() {
  const [filter, setFilter] = useState<Group | 'All'>('All');
  const [open, setOpen] = useState<number | null>(null);
  const list = criteria.filter((item) => filter === 'All' || item.group === filter);
  const openIndex = open === null ? null : list.findIndex((item) => item.n === open);
  const current = openIndex === null || openIndex < 0 ? null : openIndex;
  const close = () => {
    const n = open;
    setOpen(null);
    if (n !== null) requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-ck="${n}"]`)?.focus());
  };
  const step = (dir: 1 | -1) => {
    if (current === null) return;
    setOpen(list[(current + dir + list.length) % list.length].n);
  };
  return (
    <>
      <div className="fid-filter" role="group" aria-label="Filter criteria by group">
        {(['All', ...groups] as const).map((group) => (
          <button key={group} type="button" aria-pressed={filter === group} onClick={() => setFilter(group)} data-magnetic>
            {group === 'All' ? 'All criteria' : group}<b>{group === 'All' ? criteria.length : criteria.filter((c) => c.group === group).length}</b>
          </button>
        ))}
      </div>
      <ul className="fid-ck-grid">
        {list.map((item) => (
          <li key={item.n}>
            <button type="button" className="fid-ck" data-ck={item.n} onClick={() => setOpen(item.n)} aria-haspopup="dialog" aria-label={`Criterion ${item.n}: ${item.title}${inPoc.has(item.n) ? ', in the proof of concept' : ''}. Opens the details`} data-cursor="view">
              <span className="fid-ck-n">{String(item.n).padStart(2, '0')}</span>
              <span className="fid-t">{item.title}</span>
              <span className="fid-ck-foot"><span className="fid-g">{item.group}</span>{inPoc.has(item.n) && <span className="fid-inpoc">In the PoC</span>}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="sr-only">
        <table className="fid-table">
          <caption>Benchmarking criteria: what each covers, the best practice observed, and why it matters for Fan-ID</caption>
          <thead>
            <tr><th scope="col">No.</th><th scope="col">Criterion</th><th scope="col">What it covers</th><th scope="col">Best practice observed</th><th scope="col">Why it matters for Fan-ID</th></tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.n}>
                <td>{String(item.n).padStart(2, '0')}</td>
                <th scope="row">{item.title} ({item.group})</th>
                <td>{item.covers}</td>
                <td>{item.practice}</td>
                <td>{item.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CriterionDialog list={list} index={current} onClose={close} onStep={step} />
    </>
  );
}

export default function FanIdCase({ onBack }: { onBack: () => void }) {
  return (
    <article className="cs fid" aria-labelledby="fid-title">
      <header className="cs-hero">
        <p className="eyebrow">UX case study · Digital identity · Sports events</p>
        <h1 id="fid-title">Fan-ID: <span>the UX foundation for a tournament-wide digital identity</span></h1>
        <p className="cs-lead">One Fan-ID for the AFC Under-23 Asian Cup 2026 and the AFC Asian Cup 2027. I worked on the UX side: benchmarking, the fan journey and UX principles, and followed the design process through to the proof of concept.</p>
        <dl className="cs-meta">
          {meta.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <div className="cs-cover"><SafeImg src={`${BASE}/hero.webp`} alt="AFC Fan experience: the Fan-ID eagle emblem beside a footballer in mid-air" width={2000} height={1125} /></div>
        <dl className="fid-stats">
          {stats.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <nav className="cs-toc" aria-label="In this case study">
          {toc.map(([id, label]) => <a key={id} href={`#${id}`} data-magnetic>{label}</a>)}
        </nav>
      </header>

      <section className="cs-section" id="context" aria-labelledby="fid-context">
        <div className="cs-two">
          <header data-reveal>
            <span className="eyebrow">01 · Context</span>
            <h2 id="fid-context">One identity for the <em>whole fan journey</em></h2>
            <p className="cs-sub">Fans cross airports, hotels, fan zones, metro lines and stadium gates. The Fan-ID had to work at every one of them.</p>
          </header>
          <dl className="cs-facts" data-reveal>
            {facts.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.text}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="cs-section" id="approach" aria-labelledby="fid-approach">
        <header className="section-head" data-reveal>
          <span className="eyebrow">02 · Approach and research</span>
          <h2 id="fid-approach">From research to <em>a proof of concept</em></h2>
          <p>The research is desk research: a review of case studies from major tournaments, turned into a benchmarking matrix, then into a fan journey and a set of principles.</p>
        </header>
        <ol className="fid-steps">
          {steps.map((step, index) => (
            <li key={step.title} data-reveal style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
              <span>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.text}</p>
            </li>
          ))}
        </ol>

        <h3 className="fid-sub" data-reveal>Four tournaments, <em>four fan identity systems</em></h3>
        <p className="fid-sub-lead" data-reveal>I selected leading events with advanced fan identity systems and extracted what worked for the Asian Cup context.</p>
        <ul className="fid-bench">
          {benchmarks.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 2) * 80}ms` }}>
              <figure className="fid-shot"><Zoomable src={`${BASE}/${item.img.src}`} alt={item.img.alt} w={item.img.w} h={item.img.h} /></figure>
              <span className="fid-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p className="fid-lead">{item.about}</p>
              <h4>Key learnings</h4>
              <ul>{item.learnings.map((line) => <li key={line.label}><b>{line.label}.</b> {line.text}</li>)}</ul>
              {item.source && <p className="fid-source">Source: <a href={item.source.href} target="_blank" rel="noopener noreferrer">{item.source.label}<span className="sr-only"> (opens in a new tab)</span></a></p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="cs-section" id="criteria" aria-labelledby="fid-criteria">
        <header className="section-head" data-reveal>
          <span className="eyebrow">03 · Benchmarking matrix</span>
          <h2 id="fid-criteria">Fourteen criteria for <em>a fan identity platform</em></h2>
          <p>Every criterion is set out the same way: what it covers, the best practice observed across the tournaments, and why it matters for Fan-ID. Filter by group to focus.</p>
        </header>
        <div data-reveal><CriteriaMatrix /></div>
      </section>

      <section className="cs-section" id="standards" aria-labelledby="fid-standards">
        <header className="section-head" data-reveal>
          <span className="eyebrow">04 · AFC and DGA guidelines</span>
          <h2 id="fid-standards">Designed within <em>the guidelines</em></h2>
          <p>The platform follows a new design system that adheres to the brand guidelines of the AFC LOC and its partners, the Ministry of Sports and the DGA. Six guidelines shaped the work.</p>
        </header>
        <ol className="fid-guide">
          {guidelines.map((item, index) => (
            <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="cs-section" id="persona" aria-labelledby="fid-persona">
        <header className="section-head" data-reveal>
          <span className="eyebrow">05 · Persona</span>
          <h2 id="fid-persona">Designing for <em>the travelling fan</em></h2>
          <p>A persona built from the desk research and the journey map. It gives the team one shared fan to design for.</p>
        </header>
        <div className="fid-persona" data-reveal>
          <div className="fid-persona-card">
            <img className="fid-persona-photo" src={`${BASE}/persona.svg`} alt="Illustration of the travelling fan wearing a scarf, a backpack and a Fan-ID lanyard" width={400} height={400} />
            <span className="fid-persona-tag">Proto-persona · International fan</span>
            <h3>The travelling fan</h3>
            <p>A fan who travels to the tournament and passes through the airport, the hotel, the fan zone, the metro and the stadium gate.</p>
            <p className="fid-persona-note">Built from desk research and the benchmark, not from interviews. To be validated with fans before build.</p>
            <p className="fid-persona-seg">The research also names two other segments: hardcore supporters and casual fans.</p>
          </div>
          <div className="fid-persona-grid">
            <div><h4>Goals</h4><ul>{persona.goals.map((item) => <li key={item.text}><span>{item.text}</span><em>{item.ref}</em></li>)}</ul></div>
            <div><h4>Needs</h4><ul>{persona.needs.map((item) => <li key={item.text}><span>{item.text}</span><em>{item.ref}</em></li>)}</ul></div>
            <div className="fid-persona-pains"><h4>Frustrations</h4><ul>{persona.frustrations.map((item) => <li key={item.text}><span>{item.text}</span><em>{item.ref}</em></li>)}</ul></div>
            <div className="fid-persona-mood">
              <h4>Emotion across the journey</h4>
              <Curve />
              <p className="fid-persona-ends"><span>Pre-arrival</span><span>Post-event</span></p>
              <p>Curious but cautious at registration, relieved at the airport, briefly confused by the menus, excited in the fan zone, confident on match day.</p>
            </div>
          </div>
        </div>
        <p className="cs-note">Every goal, need and frustration links back to a journey stage or a benchmarking criterion.</p>
      </section>

      <section className="cs-section" id="journey" aria-labelledby="fid-journey">
        <header className="section-head" data-reveal>
          <span className="eyebrow">06 · Fan journey map</span>
          <h2 id="fid-journey">Eight stages, <em>digital and physical</em>: a hypothesised journey</h2>
          <p>Each stage combines digital touchpoints (app, website, notifications) with physical ones (airport, hotel, stadium), the fan's emotions and pain points, and a short story to humanise the journey. Every stage also carries an insight from the benchmarked tournaments. The stories and feelings are hypotheses drawn from the benchmark.</p>
        </header>
        <div className="fid-journey-wrap" data-reveal>
          <JourneyGrid />
          <JourneyCards />
        </div>
        <p className="cs-note">The emotion curve is a visual reading of the Feelings row.</p>
      </section>

      <section className="cs-band" id="principles" aria-labelledby="fid-principles">
        <div className="cs-band-inner">
          <span className="eyebrow" data-reveal>07 · UX principles</span>
          <h2 id="fid-principles" data-reveal>Five principles for a high-security, high-scale Fan-ID</h2>
          <ul className="cs-band-list">
            {principles.map((item, index) => (
              <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 2) * 80}ms` }}>
                <span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.applied ? <small className="fid-applied">Applied in the PoC · {item.applied}</small> : <small className="fid-applied is-not">Not yet shown in the PoC</small>}
              </li>
            ))}
          </ul>
          <p className="fid-applied-note" data-reveal>Tags show which principles are visible in the proof-of-concept screens, and which are still to design.</p>
          <p className="fid-trends" data-reveal><b>Trends considered</b>{trends.map((item) => <span key={item}>{item}</span>)}</p>
        </div>
      </section>

      <section className="cs-section" id="decisions" aria-labelledby="fid-decisions">
        <header className="section-head" data-reveal>
          <span className="eyebrow">08 · Key decisions</span>
          <h2 id="fid-decisions">Three decisions <em>the research settled</em></h2>
          <p>The benchmark did more than list best practice. It settled three questions about what the Fan-ID should be.</p>
        </header>
        <ol className="fid-dec">
          {decisions.map((item, index) => (
            <li key={item.q} data-reveal>
              <h3><span>{String(index + 1).padStart(2, '0')}</span>{item.q}</h3>
              <div className="fid-dec-row">
                <h4>Options</h4>
                <ul className="fid-dec-opts">
                  {item.options.map((option, oi) => <li key={option} className={oi === item.chosen ? 'is-chosen' : undefined}>{option}{oi === item.chosen && <span className="sr-only"> (chosen)</span>}</li>)}
                </ul>
              </div>
              <div className="fid-dec-row">
                <h4>We chose</h4>
                <p className="fid-dec-we">{item.we}</p>
              </div>
              <div className="fid-dec-cols">
                <div><h4>Why</h4><p>{item.why}</p></div>
                <div><h4>Trade-off</h4><p>{item.trade}</p></div>
              </div>
              <div className="fid-dec-row">
                <h4>Where to see it</h4>
                <ul className="fid-links" aria-label="Proof-of-concept screens">{item.screens.map((screen) => <li key={screen}>{screen}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cs-section" id="poc" aria-labelledby="fid-poc">
        <header className="section-head" data-reveal>
          <span className="eyebrow">09 · Proof of concept</span>
          <h2 id="fid-poc">Research, <em>made visible</em></h2>
          <p>Seven screens from the proof of concept, in the order a fan meets them, from the home screen to booking, travel and the Fan-ID pass at the gate. Each one is tagged with the criteria, principles and journey stages from this study that it aligns with. The UI was designed by the Product Designer on the team.</p>
          <p className="cs-note">Scope: the proof of concept covers the fan-facing app, from booking and travel to the Fan-ID pass. Registration, identity verification and consent flows were outside its scope, and are the next to design (principles 04 and 05).</p>
        </header>
        <ol className="fid-poc">
          {pocScreens.map((screen, index) => (
            <li key={screen.id} data-reveal style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
              <div className="fid-screen"><Zoomable src={`${BASE}/${screen.src}`} alt={screen.alt} w={screen.w} h={screen.h} /></div>
              <div className="fid-step"><span>{String(index + 1).padStart(2, '0')}</span><strong>{screen.title}</strong></div>
              <p>{screen.note}</p>
              <ul className="fid-links" aria-label="Links to the research">
                {screen.links.map((link) => <li key={link}>{link}</li>)}
              </ul>
            </li>
          ))}
        </ol>

        <div className="fid-answers" data-reveal>
          <h3>How the proof of concept answers the research</h3>
          <div className="fid-table-wrap">
            <table className="fid-table fid-map">
              <caption className="sr-only">What the research asked for, where it comes from, and how the proof of concept answers it</caption>
              <thead>
                <tr><th scope="col">The research asked for</th><th scope="col">Source</th><th scope="col">How the proof of concept answers it</th><th scope="col">Screens</th></tr>
              </thead>
              <tbody>
                {answers.map((row) => (
                  <tr key={row.asks}>
                    <th scope="row" data-label="The research asked for"><span className="fid-t">{row.asks}</span></th>
                    <td data-label="Source">{row.source}</td>
                    <td data-label="How the proof of concept answers it" className="fid-why">{row.answer}</td>
                    <td data-label="Screens" className="fid-scr">{row.screens}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="cs-section cs-close">
        <div className="cs-panel is-dark" data-reveal>
          <span className="eyebrow">My contribution</span>
          <p>The UX research foundation, the 14-criteria benchmarking matrix, the eight-stage fan journey map and the UX principles, and following the design process until the proof of concept was delivered.</p>
        </div>
        <div className="cs-panel" data-reveal>
          <span className="eyebrow">Status and next steps</span>
          <p>Delivered as a proof of concept, not yet tested with users. Next: validate the journey and the proof of concept with real fans across languages and abilities before build, starting with registration, verification and stadium entry.</p>
          <p className="fid-gap">Not yet shown in these seven screens: Arabic and right-to-left layouts, accessibility checks and consent flows.</p>
        </div>
      </section>

      <section className="cs-finale">
        <span className="eyebrow">Fan-ID · AFC Asian Cup</span>
        <h2 data-reveal>From benchmarks to <em>a fan journey.</em></h2>
        <p data-reveal>A shared research foundation that keeps every team designing for the same fan, at every stage.</p>
        <div className="cs-actions" data-reveal>
          <button type="button" className="btn btn-solid" onClick={onBack} data-magnetic><ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" /> Back to portfolio</button>
          <a className="btn btn-line" href="#contact" data-magnetic>Let's talk <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
        <p className="cs-disclaimer">UX work only. The interface was designed by the Product Designer on the team.</p>
      </section>
    </article>
  );
}
