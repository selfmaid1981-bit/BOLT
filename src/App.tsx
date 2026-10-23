import { useMemo, useState } from 'react';
import {
  ArrowRight, BarChart3, Bell, BookOpen, Check, ChevronDown, CircleDollarSign,
  Compass, Copy, Flame, LayoutDashboard, Menu, Play, Search, Settings, Sparkles,
  Target, TrendingUp, UserRound, Video, Wand2, X, Zap,
} from 'lucide-react';

const steps = [
  { title: 'Choose your money niche', detail: 'Pick one category you can talk about for 30 days.', action: 'Choose niche' },
  { title: 'Join 3 affiliate programs', detail: 'Start with products you already use and trust.', action: 'Find programs' },
  { title: 'Create your first 3 videos', detail: 'Use the proven hook → demo → result framework.', action: 'Write scripts' },
  { title: 'Publish & track your links', detail: 'Post consistently, then double down on winners.', action: 'Set up tracking' },
];

const niches = [
  { emoji: '✨', name: 'Beauty', score: 92, label: 'Hot', commission: '10–25%' },
  { emoji: '🏠', name: 'Home', score: 87, label: 'Growing', commission: '8–20%' },
  { emoji: '💪', name: 'Wellness', score: 84, label: 'Strong', commission: '12–30%' },
  { emoji: '💻', name: 'Tech', score: 79, label: 'Steady', commission: '3–15%' },
];

const scripts: Record<string, string> = {
  Beauty: 'I stopped wasting money on products that didn’t work—this is the one that changed my routine. Watch the difference after one use…',
  Home: 'Three things in my apartment that look expensive but aren’t—and number three saves me time every single day…',
  Wellness: 'If your morning routine still feels chaotic, this tiny change made it so much easier for me to stay consistent…',
  Tech: 'I wish someone told me about this before I spent twice as much. Here’s what it does in under 20 seconds…',
};

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState('Beauty');
  const [completed, setCompleted] = useState<number[]>([]);
  const [views, setViews] = useState(50000);
  const [toast, setToast] = useState('');
  const [script, setScript] = useState('');
  const earnings = useMemo(() => Math.round(views * 0.022 * 0.04 * 38), [views]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const generateScript = () => {
    setScript(scripts[selectedNiche]);
    notify('Your high-converting script is ready');
  };

  return (
    <div className="shell">
      <aside className={mobileOpen ? 'sidebar open' : 'sidebar'}>
        <div className="logo"><span><TrendingUp /></span> Creator<span>Launch</span><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button></div>
        <div className="profile-mini"><div>DM</div><span><b>De'Andre</b><small>Creator in training</small></span><ChevronDown /></div>
        <nav>
          <p>YOUR WORKSPACE</p>
          <a className="active" href="#today"><LayoutDashboard /> Today</a>
          <a href="#roadmap"><Compass /> My Roadmap</a>
          <a href="#content"><Video /> Content Studio <em>NEW</em></a>
          <a href="#programs"><CircleDollarSign /> Affiliate Programs</a>
          <a href="#analytics"><BarChart3 /> Analytics</a>
          <p>LEARN & GROW</p>
          <a href="#playbook"><BookOpen /> Playbooks</a>
          <a href="#trends"><Flame /> Trend Radar</a>
        </nav>
        <div className="pro-card"><Sparkles /><b>Unlock Creator Pro</b><small>AI scripts, trend alerts & more</small><button onClick={() => notify('Creator Pro waitlist joined!')}>Explore Pro <ArrowRight /></button></div>
        <a className="settings" href="#settings"><Settings /> Settings</a>
      </aside>

      <main>
        <header>
          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="search"><Search /><input aria-label="Search" placeholder="Search playbooks, programs, trends..." /></div>
          <div className="header-actions"><button className="icon"><Bell /><i /></button><button className="avatar"><UserRound /></button></div>
        </header>

        <div className="page" id="today">
          <section className="hero">
            <div><div className="eyebrow"><Zap /> YOUR CREATOR JOURNEY STARTS HERE</div><h1>Let’s build your first<br/><span>$1,000 month.</span></h1><p>No huge following needed. Follow the plan, post consistently, and let your content do the selling.</p><button onClick={() => document.getElementById('roadmap')?.scrollIntoView()}><Play /> Start your first step</button></div>
            <div className="hero-visual">
              <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
              <div className="phone"><div className="phone-top"/><div className="video-card"><span>YOUR VIDEO</span><Play /></div><div className="video-lines"><i/><i/><i/></div></div>
              <div className="float-card sale"><span><CircleDollarSign /></span><div><small>COMMISSION EARNED</small><b>+$48.20</b></div></div>
              <div className="float-card views"><TrendingUp /><div><b>12.4K</b><small>video views</small></div></div>
            </div>
          </section>

          <section className="stats" id="analytics">
            <div><span className="purple"><Target /></span><p><small>30-DAY GOAL</small><b>$1,000</b></p><em>Set your goal</em></div>
            <div><span className="orange"><Video /></span><p><small>VIDEOS POSTED</small><b>0</b></p><em>Start creating</em></div>
            <div><span className="green"><CircleDollarSign /></span><p><small>TOTAL EARNED</small><b>$0.00</b></p><em>Let’s change that</em></div>
            <div><span className="blue"><BarChart3 /></span><p><small>YOUR STREAK</small><b>Day 1</b></p><em>🔥 Keep going</em></div>
          </section>

          <section className="workspace-grid">
            <div className="roadmap" id="roadmap">
              <div className="section-title"><div><span>01</span><h2>Your path to first commission</h2><p>Complete these steps in order. We’ll guide you through each one.</p></div><b>{completed.length}/4 complete</b></div>
              <div className="steps">
                {steps.map((step, index) => <article key={step.title} className={completed.includes(index) ? 'done' : index === completed.length ? 'current' : ''}>
                  <button className="step-check" onClick={() => setCompleted(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])}>{completed.includes(index) ? <Check /> : index + 1}</button>
                  <div><h3>{step.title}</h3><p>{step.detail}</p></div>
                  <button className="step-action" onClick={() => index === 0 ? document.getElementById('niches')?.scrollIntoView() : notify(`${step.action} opened`)}>{step.action} <ArrowRight /></button>
                </article>)}
              </div>
            </div>

            <aside className="calculator">
              <span className="calc-icon"><Sparkles /></span><small>EARNINGS POTENTIAL</small><h2>See what’s possible</h2><p>Move the slider to estimate your monthly affiliate earnings.</p>
              <label><span>Monthly video views</span><b>{views.toLocaleString()}</b></label>
              <input type="range" min="1000" max="500000" step="1000" value={views} onChange={e => setViews(Number(e.target.value))} style={{'--range': `${((views - 1000) / 499000) * 100}%`} as React.CSSProperties}/>
              <div className="range-labels"><span>1K</span><span>500K</span></div>
              <div className="estimate"><small>ESTIMATED MONTHLY EARNINGS</small><b>${earnings.toLocaleString()}</b><span>Based on average conversion rates</span></div>
              <p className="fine">Results vary. Consistency and product fit matter most.</p>
            </aside>
          </section>

          <section className="niche-section" id="niches">
            <div className="section-title"><div><span>02</span><h2>Pick a niche with momentum</h2><p>Start focused. You can always expand once you find what converts.</p></div><button>View all niches <ArrowRight /></button></div>
            <div className="niche-grid">{niches.map(niche => <button key={niche.name} className={selectedNiche === niche.name ? 'selected' : ''} onClick={() => setSelectedNiche(niche.name)}><span className="niche-emoji">{niche.emoji}</span><div><h3>{niche.name}</h3><p>{niche.commission} avg. commission</p></div><em>{niche.label}</em><small>{niche.score}<i>/100</i></small>{selectedNiche === niche.name && <b><Check /></b>}</button>)}</div>
          </section>

          <section className="script-studio" id="content">
            <div><span><Wand2 /></span><small>AI CONTENT STUDIO</small><h2>Turn your idea into a scroll-stopping script.</h2><p>We’ll use a proven UGC structure, tailored to your {selectedNiche.toLowerCase()} niche.</p><button onClick={generateScript}>Generate my first script <ArrowRight /></button></div>
            <div className="script-paper"><div><i/><i/><i/></div><small>30-SECOND UGC SCRIPT</small><p>{script || 'Your personalized hook, product demo, proof, and call-to-action will appear here.'}</p>{script && <button onClick={() => { navigator.clipboard?.writeText(script); notify('Script copied to clipboard'); }}><Copy /> Copy script</button>}</div>
          </section>
        </div>
      </main>
      {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
      {toast && <div className="toast"><Check /> {toast}</div>}
    </div>
  );
}

export default App;
