import { useMemo, useState } from 'react';
import {
  ArrowRight, BarChart3, Check, ChevronDown, CircleDollarSign, Compass,
  Flame, LayoutDashboard, Menu, PackageOpen, Play, Search, Settings,
  Sparkles, Target, TrendingUp, Users, Video, X, Zap,
} from 'lucide-react';

const niches = [
  { emoji: '✨', name: 'Beauty & skincare', rate: '12–25%', demand: 'Very high' },
  { emoji: '💪', name: 'Fitness & wellness', rate: '10–20%', demand: 'High' },
  { emoji: '🏠', name: 'Home & lifestyle', rate: '8–18%', demand: 'High' },
];

const steps = [
  { title: 'Pick your profitable niche', detail: 'Choose one audience and one problem you can speak about naturally.', time: '15 min' },
  { title: 'Join 3 affiliate programs', detail: 'Start with products you already use and can demonstrate honestly.', time: '30 min' },
  { title: 'Film your first 3 videos', detail: 'Use the hook → proof → payoff structure. Your phone is enough.', time: '60 min' },
  { title: 'Publish & track every link', detail: 'Post consistently, disclose clearly, and double down on what converts.', time: 'Daily' },
];

function buildScript(product: string, audience: string, proof: string) {
  const p = product.trim() || 'this product';
  const a = audience.trim() || 'people who care about results';
  const r = proof.trim() || 'a clear before/after';
  return {
    hook: `If you are ${a}, stop scrolling — ${p} is the shortcut I actually use.`,
    proof: `I tested it myself. The proof point: ${r}. No fluff, just what changed.`,
    payoff: `Want the same path? Link is in my bio — grab ${p} and start today. Disclosure: affiliate link.`,
  };
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [completed, setCompleted] = useState<number[]>([0]);
  const [goal, setGoal] = useState(5000);
  const [commission, setCommission] = useState(20);
  const [price, setPrice] = useState(60);
  const [started, setStarted] = useState(false);
  const [scriptOpen, setScriptOpen] = useState(false);
  const [product, setProduct] = useState('Glow Serum');
  const [audience, setAudience] = useState('busy creators building side income');
  const [proof, setProof] = useState('noticeably clearer skin in two weeks');
  const [scriptReady, setScriptReady] = useState(false);

  const math = useMemo(() => {
    const earned = price * (commission / 100);
    return { earned, sales: Math.ceil(goal / Math.max(earned, 1)), daily: Math.ceil(goal / Math.max(earned, 1) / 30) };
  }, [goal, commission, price]);

  const script = useMemo(() => buildScript(product, audience, proof), [product, audience, proof]);

  const toggleStep = (index: number) => setCompleted(current =>
    current.includes(index) ? current.filter(item => item !== index) : [...current, index]
  );

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand"><span className="brand-mark"><TrendingUp /></span><strong>Creator<span>Flow</span></strong><button onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X /></button></div>
        <nav>
          <small>WORKSPACE</small>
          <a className="active" href="#start"><LayoutDashboard /> Overview</a>
          <a href="#roadmap"><Compass /> My roadmap <b>4</b></a>
          <a href="#calculator"><Target /> Income goal</a>
          <small>GROW</small>
          <a href="#niches"><PackageOpen /> Offer finder</a>
          <a href="#scripts"><Video /> Script studio</a>
          <a href="#analytics"><BarChart3 /> Analytics</a>
          <a href="#community"><Users /> Community</a>
        </nav>
        <div className="side-tip"><span><Sparkles /></span><strong>Creator tip</strong><p>Specific proof beats perfect production. Show the product solving a real problem.</p></div>
        <a className="settings" href="#settings"><Settings /> Settings</a>
        <div className="profile"><span>MC</span><div><strong>Michelle Corrigan</strong><small>Playhard · Self-Maid</small></div><ChevronDown /></div>
      </aside>

      <main>
        <header>
          <button className="menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu /></button>
          <div className="search"><Search /><input aria-label="Search" placeholder="Search playbooks, offers, scripts..." /></div>
          <div className="streak"><Flame /> Demo mode</div>
          <button className="avatar" aria-label="Michelle Corrigan">MC</button>
        </header>

        <div className="content" id="start">
          <section className="hero">
            <div className="hero-copy"><span className="eyebrow"><Sparkles /> YOUR CREATOR ERA STARTS NOW</span><h1>Turn your content into<br/><em>real income.</em></h1><p>Build a profitable UGC affiliate business with a clear plan—no huge following, fancy gear, or guesswork required.</p><div className="hero-actions"><button onClick={() => { setStarted(true); document.querySelector('#roadmap')?.scrollIntoView({ behavior: 'smooth' }); }}>Start my game plan <ArrowRight /></button><a href="#scripts"><Play /> See how it works</a></div><div className="proof"><div className="faces"><i>MC</i><i>PH</i><i>SM</i></div><span><b>Demo preview</b><small>sample metrics for walkthroughs</small></span></div></div>
            <div className="earnings-card"><div className="earnings-top"><span><CircleDollarSign /></span><small>THIS MONTH · DEMO DATA</small><b>+32.8%</b></div><h3>$2,847.60</h3><p>Sample affiliate earnings (not live)</p><div className="chart"><i style={{height:'25%'}}/><i style={{height:'38%'}}/><i style={{height:'31%'}}/><i style={{height:'56%'}}/><i style={{height:'48%'}}/><i style={{height:'72%'}}/><i className="hot" style={{height:'88%'}}/></div><div className="sale"><span><Check /></span><div><b>Example commission</b><small>Glow Serum · sample event</small></div><strong>+$18.40</strong></div></div>
          </section>

          {started && <div className="success"><Check /> Your plan is active—complete the next step below to keep your momentum.</div>}

          <section className="roadmap" id="roadmap">
            <div className="section-title"><div><span>YOUR 4-STEP LAUNCH PLAN</span><h2>From zero to first commission</h2><p>Simple, focused actions designed to get you earning—not endlessly learning.</p></div><strong>{completed.length}/4 complete</strong></div>
            <div className="steps">
              {steps.map((step, index) => <button className={completed.includes(index) ? 'done' : ''} onClick={() => toggleStep(index)} key={step.title}><span className="step-number">{completed.includes(index) ? <Check /> : index + 1}</span><div><small>STEP {index + 1} · {step.time}</small><h3>{step.title}</h3><p>{step.detail}</p></div><ArrowRight className="step-arrow" /></button>)}
            </div>
          </section>

          <div className="two-col">
            <section className="calculator" id="calculator"><span className="eyebrow">THE INCOME MATH</span><h2>Make the goal feel doable.</h2><p>See exactly how many sales stand between you and your monthly target.</p><label>Monthly income goal <output>${goal.toLocaleString()}</output><input type="range" min="500" max="15000" step="500" value={goal} onChange={e => setGoal(Number(e.target.value))}/></label><div className="field-row"><label>Product price<input type="number" min="1" value={price} onChange={e => setPrice(Number(e.target.value))}/></label><label>Commission<input type="number" min="1" max="100" value={commission} onChange={e => setCommission(Number(e.target.value))}/><span>%</span></label></div><div className="result"><div><small>EARN PER SALE</small><b>${math.earned.toFixed(2)}</b></div><div><small>SALES / MONTH</small><b>{math.sales}</b></div><div><small>SALES / DAY</small><b>{math.daily}</b></div></div><small className="disclaimer">Estimates are planning targets, not income guarantees. Results depend on your offer, audience, content, and consistency.</small></section>
            <section className="niches" id="niches"><span className="eyebrow">START WITH DEMAND</span><h2>Beginner-friendly niches</h2><p>Look for repeat purchases, visible results, and products you genuinely trust.</p>{niches.map((niche) => <article key={niche.name}><span>{niche.emoji}</span><div><h3>{niche.name}</h3><small>{niche.rate} typical commission</small></div><b>{niche.demand}</b><button aria-label={`Explore ${niche.name}`}><ArrowRight /></button></article>)}<button className="explore">Explore all offers <ArrowRight /></button></section>
          </div>

          <section className="cta" id="scripts"><span><Zap /></span><div><small>READY TO CREATE?</small><h2>Your first converting script is 60 seconds away.</h2><p>Choose a product, answer three questions, and get a natural script built around your voice.</p></div><button type="button" onClick={() => { setScriptOpen(true); setScriptReady(false); }}>{'Build my first script '}<ArrowRight /></button></section>

          <footer className="built-by" id="settings">
            <p><strong>Built by Michelle Corrigan</strong> · Playhard Advertising · Self-Maid</p>
            <a href="https://github.com/selfmaid1981-bit/BOLT" target="_blank" rel="noreferrer">github.com/selfmaid1981-bit/BOLT</a>
          </footer>
        </div>
      </main>

      {scriptOpen && (
        <div className="script-modal" role="dialog" aria-modal="true" aria-labelledby="script-title">
          <div className="script-panel">
            <header>
              <h2 id="script-title">Script studio</h2>
              <button type="button" aria-label="Close script studio" onClick={() => setScriptOpen(false)}><X /></button>
            </header>
            <div className="script-fields">
              <label>Product<input value={product} onChange={e => setProduct(e.target.value)} /></label>
              <label>Audience<input value={audience} onChange={e => setAudience(e.target.value)} /></label>
              <label>Proof point<input value={proof} onChange={e => setProof(e.target.value)} /></label>
            </div>
            <button type="button" className="generate" onClick={() => setScriptReady(true)}>Generate hook → proof → payoff</button>
            {scriptReady && (
              <ol className="script-out">
                <li><small>HOOK</small><p>{script.hook}</p></li>
                <li><small>PROOF</small><p>{script.proof}</p></li>
                <li><small>PAYOFF</small><p>{script.payoff}</p></li>
              </ol>
            )}
          </div>
          <button type="button" className="scrim" aria-label="Close" onClick={() => setScriptOpen(false)} />
        </div>
      )}

      {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />}
    </div>
  );
}

export default App;
