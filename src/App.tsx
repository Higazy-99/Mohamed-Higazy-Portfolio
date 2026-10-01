import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Download, Minus, MoveDownRight, Pause, Play, Plus, X } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import projects from './projects.json';
import { DitherSpotlight } from './components/mellow/dither-spotlight';
import { ExpandingPanels, useNarrow } from './components/mellow/expanding-panels';
import { WordReveal } from './components/mellow/word-reveal';
import CaseStudy from './CaseStudy';
import { HMark } from './HMark';
import { applyRouteHead } from './seo/head';
import FanIdCase from './FanIdCase';
import FilmSaudiCase from './FilmSaudiCase';
import StcInspectorCase from './StcInspectorCase';

const FRAME_COUNT = 64;
const TAU = Math.PI * 2;
const FOLLOW_FACTOR = 0.26;
const FACE_Y = 0.355;

const EMAIL = 'eng.mohamedhigazy@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/mohamedhigazy91/';
const BEHANCE = 'https://www.behance.net/mohamedhigazy92';
const YEARS = 3;

type Point = { x: number; y: number };

/* ---------- Content ---------- */
const FEATURED_IDS = [1000000001, 1000000004, 1000000002, 1000000003];
const featured = FEATURED_IDS.map((id) => projects.find((project) => project.id === id)!).filter(Boolean);
const rest = projects.filter((project) => !FEATURED_IDS.includes(project.id));

const clients = [
  { name: 'Ministry of Culture', src: '/logos/ministry-of-culture.webp', h: 62, w: 98 },
  { name: 'stc', src: '/logos/stc.svg', h: 38, w: 76 },
  { name: 'Expo 2030 Riyadh', src: '/logos/expo-2030.webp', h: 74, w: 40 },
  { name: 'TAM', src: '/logos/tam.webp', h: 40, w: 115 },
  { name: 'Diriyah Company', src: '/logos/diriyah.webp', h: 72, w: 72 },
  { name: 'Golf Saudi', src: '/logos/golf-saudi.webp', h: 60, w: 82 },
  { name: 'Misk Foundation', src: '/logos/misk.webp', h: 58, w: 115 },
  { name: 'Tarjim Initiative', src: '/logos/tarjim.webp', h: 70, w: 190 },
  { name: 'King Salman Foundation', src: '/logos/king-salman-foundation.webp', h: 66, w: 80 },
  { name: 'Literature, Publishing & Translation Commission', src: '/logos/lptc.webp', h: 56, w: 134 },
  { name: 'Film Commission', src: '/logos/film-commission.webp', h: 40, w: 199 },
  { name: 'Jameel Finance', src: '/logos/jameel-finance.webp', h: 64, w: 78 },
  { name: 'Hawi', src: '/logos/hawi.webp', h: 44, w: 170 },
  { name: 'innovaDigits', src: '/logos/innovadigits.webp', h: 34, w: 207 },
];

const focusAreas = ['CX Design', 'UX Design', 'UX Research', 'Experience Strategy', 'Service Design', 'Information Architecture', 'Web & Mobile Experiences'];

const services = [
  { title: 'CX Design', text: 'End-to-end customer experience design and CX strategy that aligns every touchpoint with business goals.' },
  { title: 'UX Research', text: 'Interviews, surveys, field studies and usability testing that turn assumptions into evidence.' },
  { title: 'Journey Mapping & Personas', text: 'Journey maps, personas and user flows that keep product teams and stakeholders aligned.' },
  { title: 'Service Design', text: 'Service blueprints that connect what users see with the people, systems and policies behind it.' },
  { title: 'UX Audits', text: 'Structured reviews of live products, with usability gaps and prioritized recommendations.' },
  { title: 'UI & Prototyping', text: 'Wireframes, interfaces and interactive prototypes in Figma for web and mobile.' },
];

const steps = [
  { title: 'Research', subtitle: 'Understand people', accent: '#274a5c', text: 'Interviews, surveys, analytics and stakeholder input, to understand the people and the context around them.', tags: ['Interviews', 'Surveys', 'Analytics'] },
  { title: 'Define', subtitle: 'Frame the problem', accent: '#b8492f', text: 'Personas, journey maps, service blueprints and UX specifications that fix scope, assumptions and constraints.', tags: ['Personas', 'Journey maps', 'Blueprints'] },
  { title: 'Design', subtitle: 'Shape the flows', accent: '#55643a', text: 'User flows, information architecture, wireframes and prototypes, reviewed with product and engineering.', tags: ['User flows', 'Wireframes', 'Prototypes'] },
  { title: 'Validate', subtitle: 'Test and refine', accent: '#4b3a55', text: 'Usability tests and audits, then prioritized recommendations that feed the next iteration.', tags: ['Usability tests', 'UX audits', 'Recommendations'] },
];

const principles = [
  { lead: 'Evidence', over: 'opinion', text: 'Decisions start from research, usability tests and data, not from the loudest voice in the room.' },
  { lead: 'Clarity', over: 'cleverness', text: 'Clear flows, plain language and interfaces people understand on the first try.' },
  { lead: 'Outcomes', over: 'outputs', text: 'Success is a task completed and a goal met, not a finished screen.' },
];





const PHILOSOPHY = 'The best experience is the one people *complete* *without* *thinking* about it, and the team behind it never has to *explain* *it.*';

const sections = ['about', 'work', 'contact'];

const testimonials = [
  {
    quote: "Throughout our collaboration, we worked together across the end-to-end UX process—from analyzing complex problems and identifying usability issues to exploring solutions and translating insights into thoughtful user experiences. Mohamed consistently demonstrated strong UX knowledge, analytical thinking, and the ability to approach challenges from both user and business perspectives.",
    name: "Rawan Adel",
    role: "Senior Product Designer, TETCO",
    relation: "Worked together for nearly three years on POCs, UX audits and design systems",
  },
  {
    quote: "Working with Mohamed from 2023 to 2026 on high-end UX/UI projects for the Saudi Government was an absolute privilege. As a Senior UX & CX expert, he has a rare talent for translating complex user needs into seamless experiences, helping us deliver over 25 Proof of Concepts and drive major product enhancements. But beyond his impressive professional skills, Mohamed’s greatest asset is his character. He leads with empathy, listens actively, and brings a collaborative, positive energy to every room. He doesn't just design for users; he cares for his team just as deeply. Any organization would be lucky to have his talent and his heart.",
    name: "Salaheddine Ogontayo",
    role: "Product Designer",
    relation: "Worked together on the same team",
  },
  {
    quote: "As an associate UX instructor, Mohamed's passion for teaching and mentoring shines through in every class he leads. He has a unique talent for breaking down complex concepts into understandable parts, making the learning process engaging and enjoyable for our students.",
    name: "Muhammed M. Elsayed",
    role: "Senior UX Designer",
    relation: "Managed Mohamed as an associate UX instructor",
  },
  {
    quote: "His strong CX background and ability to see the user journey end-to-end always brought valuable perspective to our work. I also admire his genuine curiosity around AI and the way he continuously explores how it can improve both our design process and the overall user experience.",
    name: "Raneem Alnamlah",
    role: "Product Designer",
    relation: "Worked together at TAM",
  },
];
const initialsOf = (name: string) => { const w = name.split(' ').filter(Boolean); return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase(); };

/* ---------- Gaze-following portrait ---------- */
function normalizedAngle(angle: number) {
  return ((angle % TAU) + TAU) % TAU;
}

function lerpAngle(current: number, target: number, amount: number) {
  const difference = ((target - current + Math.PI) % TAU + TAU) % TAU - Math.PI;
  return current + difference * amount;
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${source}`));
    image.src = source;
  });
}


// The canvas has the frame's 16:9 ratio, so the portrait is drawn whole; CSS positions and feathers it.
function CharacterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<Point | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let raf = 0;
    let active = true;
    let angle = 0;
    let images: (HTMLImageElement | null)[] = [];
    let centerImage: HTMLImageElement | null = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const preload = async () => {
      centerImage = await loadImage('/frames/center.webp');
      if (!active) return;
      setReady(true);
      render();
      const sources = Array.from({ length: FRAME_COUNT }, (_, index) => `/frames/frame-${String(index).padStart(2, '0')}.webp`);
      const loaded = await Promise.all(sources.map((source) => loadImage(source).catch(() => null)));
      if (!active) return;
      images = loaded;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (image: HTMLImageElement, rect: DOMRect) => {
      context.clearRect(0, 0, rect.width, rect.height);
      context.drawImage(image, 0, 0, rect.width, rect.height);
    };

    const render = () => {
      if (!active || !centerImage) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0) {
        raf = requestAnimationFrame(render);
        return;
      }
      const face = { x: rect.width * 0.5, y: rect.height * FACE_Y };
      const pointer = pointerRef.current;
      let image: HTMLImageElement;
      if (!pointer) {
        image = centerImage;
      } else {
        const dx = pointer.x - face.x;
        const dy = pointer.y - face.y;
        const deadzone = Math.hypot(window.innerWidth, window.innerHeight) * 0.12;
        if (Math.hypot(dx, dy) < deadzone) {
          image = centerImage;
        } else {
          // Source index 0 is the right-facing pose and proceeds clockwise on screen.
          const target = Math.atan2(dy, dx);
          angle = lerpAngle(angle, target, FOLLOW_FACTOR);
          image = images[Math.round((normalizedAngle(angle) / TAU) * FRAME_COUNT) % FRAME_COUNT] ?? centerImage;
        }
      }
      drawFrame(image, rect);
      raf = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onPointerLeave = () => {
      pointerRef.current = null;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    preload().catch((error) => {
      console.error(error);
      setReady(false);
    });
    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={`character-canvas${ready ? ' is-ready' : ''}`} aria-label="Interactive portrait of Mohamed Higazy that follows the cursor" role="img" />;
}

/* ---------- Custom magnetic cursor (fine pointers only) ---------- */
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('has-cursor');

    let raf = 0;
    let visible = false;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pointer };
    let magnet: HTMLElement | null = null;
    let magnetCenter: Point | null = null;

    const resetMagnet = () => {
      if (magnet) magnet.style.translate = '';
      magnet = null;
      magnetCenter = null;
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = pointer.x;
        ringPos.y = pointer.y;
        document.documentElement.classList.add('cursor-visible');
      }
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>('a, button');
      const card = target?.closest<HTMLElement>('[data-cursor="view"]');
      ring.classList.toggle('is-active', !!interactive && !card);
      ring.classList.toggle('is-view', !!card);

      const next = target?.closest<HTMLElement>('[data-magnetic]') ?? null;
      if (next !== magnet) resetMagnet();
      if (next) {
        magnet = next;
        const rect = next.getBoundingClientRect();
        magnetCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        if (!reduced) next.style.translate = `${(pointer.x - magnetCenter.x) * 0.22}px ${(pointer.y - magnetCenter.y) * 0.3}px`;
      }
    };
    const onLeave = () => {
      visible = false;
      document.documentElement.classList.remove('cursor-visible');
      resetMagnet();
    };
    const onDown = () => ring.classList.add('is-pressed');
    const onUp = () => ring.classList.remove('is-pressed');

    const tick = () => {
      const goal = magnetCenter ? { x: pointer.x + (magnetCenter.x - pointer.x) * 0.35, y: pointer.y + (magnetCenter.y - pointer.y) * 0.35 } : pointer;
      ringPos.x += (goal.x - ringPos.x) * (reduced ? 1 : 0.16);
      ringPos.y += (goal.y - ringPos.y) * (reduced ? 1 : 0.16);
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      cancelAnimationFrame(raf);
      resetMagnet();
      document.documentElement.classList.remove('has-cursor', 'cursor-visible');
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div ref={ringRef} className="cursor-ring"><span>View</span></div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}

/* ---------- Behaviour hooks ---------- */
function useReveal(deps: unknown[]) {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    items.forEach((item) => observer.observe(item));
    // Failsafe: anything already at or above the fold after a moment must never stay hidden.
    const failsafe = window.setTimeout(() => {
      items.forEach((item) => {
        if (!item.classList.contains('is-visible') && item.getBoundingClientRect().top < window.innerHeight) item.classList.add('is-visible');
      });
    }, 2500);
    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function useSpotlight() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-spot]');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
}

function ScrollProgress({ onActive }: { onActive: (id: string) => void }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      const mark = window.innerHeight * 0.35;
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mark) current = id;
      }
      onActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onActive]);
  return <div ref={barRef} className="progress" aria-hidden="true" />;
}

/* ---------- Small components ---------- */
function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // starts at the real number so the HTML has it; the count-up replays when the block scrolls into view
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref} className="stat-num">{shown}{suffix}</span>;
}


function Testimonials() {
  const track = useRef<HTMLUListElement>(null);
  const [view, setView] = useState({ first: 0, visible: 3, prev: false, next: true });
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const card = el.children[0] as HTMLElement | undefined;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const step = card.offsetWidth + gap;
      setView({
        first: Math.round(el.scrollLeft / step),
        visible: Math.max(1, Math.round((el.clientWidth + gap) / step)),
        prev: el.scrollLeft > 4,
        next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  const go = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.children[0] as HTMLElement | undefined;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduced ? 'auto' : 'smooth' });
  };
  const last = Math.min(view.first + view.visible, testimonials.length);
  return (
    <div data-reveal>
      <ul className="testi-list" ref={track} tabIndex={0} role="list" aria-label="Testimonials, scrolls sideways">
        {testimonials.map((t) => (
          <li key={t.name}>
            <figure className="testi">
              <span className="testi-mark" aria-hidden="true">&ldquo;</span>
              <blockquote><p>{t.quote}</p></blockquote>
              <figcaption>
                <span className="testi-id">
                  <span className="testi-av" aria-hidden="true">{initialsOf(t.name)}</span>
                  <span className="testi-who"><b>{t.name}</b><span>{t.role}</span></span>
                </span>
                <span className="testi-rel">{t.relation}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="testi-nav">
        <p className="testi-count" aria-live="polite">{view.first + 1}{last > view.first + 1 ? `\u2013${last}` : ''} of {testimonials.length}</p>
        <div className="testi-arrows">
          <button type="button" onClick={() => go(-1)} disabled={!view.prev} aria-label="Previous testimonials" data-magnetic><ArrowLeft size={18} strokeWidth={1.6} aria-hidden="true" /></button>
          <button type="button" onClick={() => go(1)} disabled={!view.next} aria-label="Next testimonials" data-magnetic><ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}

function Clocks() {
  // empty until the page is in the browser, so the server HTML and the first browser render are identical
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const time = (timeZone: string) => (now ? new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(now) : '--:--');
  return (
    <p className="clocks">
      <span>Cairo <time>{time('Africa/Cairo')}</time></span>
    </p>
  );
}


const WIJHA_PATH = '/work/wijha';
const FANID_PATH = '/work/fan-id';
const FILM_PATH = '/work/film-saudi';
const STC_PATH = '/work/stc-inspector';

function useRoute(initialPath?: string) {
  const clean = () => (typeof window === 'undefined' ? '/' : window.location.pathname).replace(/\/$/, '') || '/';
  // the server renders the route it is given; the browser reads the address bar (the same value, so hydration matches)
  const [path, setPath] = useState(() => (initialPath !== undefined ? initialPath.replace(/\/$/, '') || '/' : clean()));
  const homeScroll = useRef(0);
  const current = useRef(path);
  useEffect(() => {
    const sync = () => {
      const next = clean();
      // a #hash link (about / work / contact) also fires popstate: the path is the same, so leave the scroll to the browser
      const changed = next !== current.current;
      current.current = next;
      setPath(next);
      if (changed && next === '/') {
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.scrollTo({ top: homeScroll.current, behavior: 'instant' as ScrollBehavior })));
      }
    };
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  const navigate = (to: string) => {
    if (to === window.location.pathname) return;
    if (window.location.pathname === '/') homeScroll.current = window.scrollY;
    window.history.pushState({}, '', to);
    current.current = to.replace(/\/$/, '') || '/';
    setPath(to.replace(/\/$/, '') || '/');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };
  return [path, navigate] as const;
}

type Project = (typeof projects)[number];

type Preview = { facts?: string[][]; numbers?: string[][]; cta?: string; problem?: string; did?: string[] };

function ProjectCard({ project, index, onPreview }: { project: Project; index: number; onPreview: (project: Project, opener: HTMLElement) => void }) {
  const internal = project.url.startsWith('/');
  return (
    <li data-reveal style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
      <a
        className="card"
        style={{ '--tint': project.color } as CSSProperties}
        href={project.url}
        {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
          event.preventDefault();
          onPreview(project, event.currentTarget);
        }}
        data-cursor="view"
        data-spot
        aria-haspopup="dialog"
        aria-label={`${project.title}, ${project.category}. Opens a short preview`}
      >
        <img src={project.cover} alt="" loading="lazy" referrerPolicy="no-referrer" style={project.position ? { objectPosition: project.position } : undefined} />
        <span className="card-no">{String(index + 1).padStart(2, '0')}</span>
        <div className="card-info">
          <span className="card-category">{project.category}</span>
          <h3>{project.title}</h3>
          {project.description && <p>{project.description}</p>}
        </div>
      </a>
    </li>
  );
}

function ProjectPreview({ project, onClose, onOpen }: { project: Project | null; onClose: () => void; onOpen: (to: string) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const shown = useRef<Project | null>(null);
  if (project) shown.current = project;
  const current = project ?? shown.current;
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handle = () => closeRef.current();
    dialog.addEventListener('close', handle);
    return () => dialog.removeEventListener('close', handle);
  });
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      dialog.querySelectorAll<HTMLElement>('.pv-card, .pv-body').forEach((el) => { el.scrollTop = 0; });
    }
    if (!project && dialog.open) dialog.close();
  }, [project]);
  if (!current) return <dialog ref={ref} className="pv" aria-hidden="true" />;
  const preview = ((current as Project & { preview?: Preview }).preview ?? {}) as Preview;
  const internal = current.url.startsWith('/');
  const go = () => {
    if (internal) {
      onClose();
      onOpen(current.url);
    } else {
      window.open(current.url, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <dialog
      ref={ref}
      className="pv"
      aria-labelledby="pv-title"
      aria-describedby="pv-desc"
      onClick={(event) => { if (event.target === ref.current) onClose(); }}
      style={{ '--tint': current.color } as CSSProperties}
    >
      <div className="pv-card">
        <button type="button" className="pv-close" onClick={onClose} aria-label="Close preview" data-magnetic><X size={18} strokeWidth={1.6} aria-hidden="true" /></button>
        <div className="pv-media">
          <img src={current.cover} alt="" referrerPolicy="no-referrer" style={current.position ? { objectPosition: current.position } : undefined} />
        </div>
        <div className="pv-body">
          <p className="pv-cat">{current.category}</p>
          <h2 id="pv-title">{current.title}</h2>
          {preview.problem ? (
            <div id="pv-desc" className="pv-block"><h3>The problem</h3><p>{preview.problem}</p></div>
          ) : current.description && <p id="pv-desc" className="pv-desc">{current.description}</p>}
          {preview.did && (
            <div className="pv-block"><h3>What I did</h3><ul>{preview.did.map((d) => <li key={d}>{d}</li>)}</ul></div>
          )}
          {preview.facts && (
            <dl className="pv-facts">
              {preview.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          )}
          {preview.numbers && (
            <ul className="pv-nums" aria-label="Key numbers">
              {preview.numbers.map(([n, label]) => <li key={label}><b>{n}</b><span>{label}</span></li>)}
            </ul>
          )}
          <div className="pv-actions">
            <button type="button" className="btn btn-solid" onClick={go}>
              {internal ? (preview.cta ?? 'View the full case study') : 'View on Behance'} <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </button>
            <button type="button" className="btn btn-line" onClick={onClose}>Close</button>
          </div>
          {!internal && <p className="pv-note">Opens Behance in a new tab.</p>}
        </div>
      </div>
    </dialog>
  );
}

function App({ initialPath }: { initialPath?: string } = {}) {
  const [showAll, setShowAll] = useState(false);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState('');
  const narrow = useNarrow(720);
  const [path, navigate] = useRoute(initialPath);
  const [preview, setPreview] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    document.documentElement.classList.toggle('is-modal', preview !== null);
    return () => document.documentElement.classList.remove('is-modal');
  }, [preview]);
  const openPreview = (project: Project, el: HTMLElement) => { opener.current = el; setPreview(project); };
  const closePreview = () => { setPreview(null); window.setTimeout(() => opener.current?.focus({ preventScroll: true }), 0); };
  const isWijha = path === WIJHA_PATH;
  const isFanId = path === FANID_PATH;
  const isFilm = path === FILM_PATH;
  const isStc = path === STC_PATH;
  const isCase = isWijha || isFanId || isFilm || isStc;
  const goWork = () => {
    navigate('/');
    window.setTimeout(() => document.getElementById('work')?.scrollIntoView(), 30);
  };
  useEffect(() => {
    applyRouteHead(path);
  }, [path]);
  useReveal([showAll, path]);
  useSpotlight();

  return (
    <>
      <div className="grid-lines" aria-hidden="true">
        <div className="grid-lines-inner"><span /><span /><span /><span /></div>
      </div>
      <a className="skip-link" href="#main">Skip to content</a>
      <Cursor />
      <ScrollProgress onActive={setActive} />

      <header className="nav-wrap">
        <nav className="nav-pill" aria-label="Main navigation">
          {isCase ? (
            <>
              <a href="/" onClick={(event) => { event.preventDefault(); goWork(); }} data-magnetic>Portfolio</a>
              <a href="#contact" data-magnetic>Contact</a>
            </>
          ) : (
            sections.map((id) => (
              <a key={id} href={`#${id}`} data-magnetic aria-current={active === id ? 'true' : undefined}>{id}</a>
            ))
          )}
        </nav>
      </header>

      {isCase ? (
        <main id="main">
          {isFanId ? <FanIdCase onBack={goWork} /> : isFilm ? <FilmSaudiCase onBack={goWork} /> : isStc ? <StcInspectorCase onBack={goWork} /> : <CaseStudy onBack={goWork} />}
        </main>
      ) : (
      <main id="main">
        <div className="portfolio-shell">
          <DitherSpotlight className="hero-dither" radius={230} dotScale={5} intensity={0.6} />
          <CharacterCanvas />
          <a className="wordmark" href="#top" aria-label="Mohamed Higazy, home"><span className="sr-only">H</span><HMark />IGAZY<span>.</span></a>

          <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="hero-kicker"><i /> CX / UX Designer · Giza, Egypt</div>
            <h1 id="hero-title">Mohamed<br /><em>Higazy</em></h1>
            <p className="hero-note">I design digital products and services that are clear, useful and easy to use.</p>
            <div className="hero-actions">
              <a className="btn btn-solid" href="/cv.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume (PDF, opens in a new tab)" data-magnetic>Resume <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" /></a>
              <a className="btn btn-line" href="#contact" data-magnetic>Let's Talk</a>
            </div>
          </section>

          <aside className="portrait-caption" aria-hidden="true">
            <span className="caption-line" />
            <span>Follow the gaze</span>
            <MoveDownRight size={15} strokeWidth={1.4} />
          </aside>


          <div className="hero-footer">
            <span>01 / 07</span>
            <a href="#about" aria-label="Scroll to the next section" data-magnetic><ArrowDownRight size={19} strokeWidth={1.4} /></a>
          </div>
        </div>

        <section className="clients" aria-labelledby="clients-title">
          <div className="clients-head">
            <h2 id="clients-title" className="clients-title">Worked with teams at</h2>
            <button type="button" className="marquee-toggle" aria-pressed={paused} aria-label={paused ? 'Play logo animation' : 'Pause logo animation'} onClick={() => setPaused((value) => !value)} data-magnetic>
              {paused ? <Play size={14} strokeWidth={1.8} aria-hidden="true" /> : <Pause size={14} strokeWidth={1.8} aria-hidden="true" />}
              {paused ? 'Play' : 'Pause'}
            </button>
          </div>
          <div className="marquee">
            <ul className={`marquee-track${paused ? ' is-paused' : ''}`}>
              {[0, 1].map((copy) => clients.map((client) => (
                <li key={`${copy}-${client.name}`} aria-hidden={copy === 1 ? 'true' : undefined}>
                  <img src={client.src} alt={copy === 0 ? client.name : ''} width={client.w} height={client.h} style={{ '--h': `${client.h}px` } as CSSProperties} loading="lazy" />
                </li>
              )))}
            </ul>
          </div>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <header className="section-head" data-reveal>
            <span className="eyebrow">02 / 07 · About</span>
            <h2 id="about-title">Human-centered design, <em>grounded in research</em></h2>
          </header>

          <div className="about-grid">
            <p className="about-lead" data-reveal>
              CX / UX Designer with {YEARS}+ years of experience designing <em>user-centered digital products and services</em>, from first research to final interface.
            </p>
            <div className="about-side" data-reveal>
              <p>I turn complex requirements into clear journeys, service blueprints and interfaces, working closely with product managers, developers and stakeholders.</p>
              <ul className="focus-list" aria-label="Focus areas">
                {focusAreas.map((area) => <li key={area}>{area}</li>)}
              </ul>
              <a className="btn btn-solid" href="/cv.pdf" download="Mohamed-Higazy-CV.pdf" data-magnetic>Download CV <Download size={15} strokeWidth={1.6} aria-hidden="true" /></a>
            </div>
          </div>

          <ul className="stats" data-reveal>
            <li><CountUp value={YEARS} suffix="+" /><span className="stat-label">Years of experience</span></li>
            <li><CountUp value={projects.length} /><span className="stat-label">Case studies &amp; showcases</span></li>
            <li><CountUp value={clients.length} /><span className="stat-label">Organizations worked with</span></li>
          </ul>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <header className="section-head" data-reveal>
            <span className="eyebrow">03 / 07 · Selected work</span>
            <h2 id="work-title">Case studies &amp; <em>interfaces</em></h2>
            <p>A selection of UX case studies and interface designs. Select a project to see the details.</p>
          </header>

          <ul className="gallery">
            {featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onPreview={openPreview} />)}
          </ul>

          {showAll && (
            <ul className="gallery gallery-more" id="more-projects">
              {rest.map((project, index) => <ProjectCard key={project.id} project={project} index={featured.length + index} onPreview={openPreview} />)}
            </ul>
          )}

          <div className="section-foot" data-reveal>
            <button className="btn btn-line" type="button" aria-expanded={showAll} aria-controls="more-projects" onClick={() => setShowAll((open) => !open)} data-magnetic>
              {showAll ? <>Show fewer <Minus size={15} strokeWidth={1.6} aria-hidden="true" /></> : <>View all projects ({projects.length}) <Plus size={15} strokeWidth={1.6} aria-hidden="true" /></>}
            </button>
            <a className="text-link" href={BEHANCE} target="_blank" rel="noopener noreferrer" data-magnetic>Full archive on Behance <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="section" id="testimonials" aria-labelledby="testimonials-title">
          <header className="section-head" data-reveal>
            <span className="eyebrow">04 / 07 · Testimonials</span>
            <h2 id="testimonials-title">What it's like to <em>work with me</em></h2>
          </header>
          <Testimonials />
          <div className="section-foot" data-reveal>
            <a className="text-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer" data-magnetic>Read full recommendations on LinkedIn <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </section>

        <section className="section" id="services" aria-labelledby="services-title">
          <header className="section-head" data-reveal>
            <span className="eyebrow">05 / 07 · What I do</span>
            <h2 id="services-title">Designing the whole digital <em>experience</em></h2>
          </header>
          <ul className="services">
            {services.map((service, index) => (
              <li key={service.title} data-reveal data-spot style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
                <span className="service-no">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="process" aria-labelledby="process-title">
          <header className="section-head" data-reveal>
            <span className="eyebrow">06 / 07 · How I work</span>
            <h2 id="process-title">A process built on <em>evidence</em></h2>
          </header>
          <div data-reveal>
            <ExpandingPanels
              label="How I work"
              height={narrow ? 760 : 440}
              vertical={narrow}
              items={steps.map((step) => ({
                title: step.title,
                subtitle: step.subtitle,
                accent: step.accent,
                content: (
                  <div className="ep-body">
                    <p>{step.text}</p>
                    <ul>{step.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  </div>
                ),
              }))}
            />
            <p className="ep-hint">Hover or tap a step to open it.</p>
          </div>
        </section>

        <section className="manifesto" aria-labelledby="philosophy-title">
          <div className="manifesto-inner">
            <span className="eyebrow" id="philosophy-title">Design philosophy</span>
            <WordReveal as="p" className="manifesto-statement" text={PHILOSOPHY} offset={['start 0.85', 'end 0.55']} fromOpacity={0.5} />
            <ul className="manifesto-list">
              {principles.map((principle, index) => (
                <li key={principle.lead} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
                  <span className="manifesto-no">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{principle.lead} <span className="over">over</span> <s>{principle.over}</s></h3>
                  <p>{principle.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      )}

      <footer className="site-footer" id="contact" aria-labelledby="contact-title">
        <div className="footer-inner">
          <div className="footer-cta">
            <span className="eyebrow">07 / 07 · Contact</span>
            <h2 id="contact-title">Have a product that <em>needs to work better?</em></h2>
            <a className="footer-mail" href={`mailto:${EMAIL}`} data-magnetic>{EMAIL}<ArrowUpRight size={24} strokeWidth={1.3} aria-hidden="true" /></a>
          </div>

          <div className="footer-cols">
            <div className="footer-about">
              <a className="wordmark" href="#top" aria-label="Back to top"><span className="sr-only">H</span><HMark />IGAZY<span>.</span></a>
              <p>Based in Giza, Egypt. Tell me what needs to work better.</p>
            </div>
            <nav aria-label="Footer navigation">
              <h3>Navigate</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/#about">About</a></li>
                <li><a href="/#work">Selected work</a></li>
                <li><a href="/#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
            <div>
              <h3>Elsewhere</h3>
              <ul>
                <li><a href={BEHANCE} target="_blank" rel="noopener noreferrer">Behance</a></li>
                <li><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="/cv.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume (PDF), opens in a new tab">Resume (PDF)</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-base">
            <span>© 2026 Mohamed Higazy</span>
            <Clocks />
            <a href="#top" data-magnetic>Back to top <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="footer-mark" aria-hidden="true">HIGAZY</div>
      </footer>
      <ProjectPreview project={preview} onClose={closePreview} onOpen={navigate} />
    </>
  );
}

export default App;
