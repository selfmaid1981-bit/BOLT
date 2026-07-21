import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  BrainCircuit,
  Building2,
  ChevronDown,
  HelpCircle,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Lightbulb,
  Megaphone,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  Users,
  Wand2,
  X,
  Zap,
} from 'lucide-react';

const brains = [
  { name: 'Marketing Brain', description: 'Campaigns, content & growth', icon: Megaphone, color: 'violet', activity: '12 min ago' },
  { name: 'Sales Brain', description: 'Proposals, scripts & follow-up', icon: Target, color: 'blue', activity: '1 hr ago' },
  { name: 'Operations Brain', description: 'SOPs, systems & quality', icon: Settings, color: 'amber', activity: 'Yesterday' },
  { name: 'Training Brain', description: 'Onboarding & team development', icon: Users, color: 'emerald', activity: '2 days ago' },
];

const campaigns = [
  { title: 'Summer Deep Clean', status: 'Generating', meta: '24 assets • Self-Maid', progress: 68, color: '#7457e8' },
  { title: 'Student Turnover 2026', status: 'Draft', meta: '12 assets • Self-Maid', progress: 34, color: '#dc9e32' },
  { title: 'Q3 Brand Awareness', status: 'Live', meta: '36 assets • PlayHard', progress: 100, color: '#23966c' },
];

function App() {
  const [business, setBusiness] = useState('Self-Maid');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [notice, setNotice] = useState('');
  const today = useMemo(() => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()), []);

  const runAction = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2600);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={20} /></div>
          <span>CommonGround<span>AI</span></span>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>

        <button className="business-switcher" onClick={() => setBusiness(business === 'Self-Maid' ? 'PlayHard' : 'Self-Maid')}>
          <span className="business-avatar">SM</span>
          <span><small>WORKSPACE</small><strong>{business}</strong></span>
          <ChevronDown size={16} />
        </button>

        <nav className="side-nav">
          <p>OVERVIEW</p>
          <a className="active" href="#dashboard"><LayoutDashboard /> Dashboard</a>
          <a href="#activity"><Zap /> Activity</a>
          <p>AI WORKSPACE</p>
          <a href="#brains"><BrainCircuit /> AI Brains <span className="nav-count">5</span></a>
          <a href="#knowledge"><FolderKanban /> Knowledge Base</a>
          <a href="#prompts"><MessageSquareText /> Prompt Library</a>
          <p>PRODUCTION</p>
          <a href="#campaigns"><Megaphone /> Campaigns</a>
          <a href="#assets"><FileText /> Asset Library</a>
          <a href="#analytics"><BarChart3 /> Analytics</a>
        </nav>

        <div className="sidebar-bottom">
          <a href="#help"><HelpCircle /> Help & resources</a>
          <a href="#settings"><Settings /> Settings</a>
          <div className="profile-card">
            <span className="profile-avatar">DM</span>
            <span><strong>De'Andre Moore</strong><small>Administrator</small></span>
            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <button className="menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="search"><Search size={18} /><input aria-label="Search" placeholder="Search anything..." /><kbd>⌘ K</kbd></div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Notifications"><Bell size={20} /><i /></button>
            <button className="create-button" onClick={() => runAction('New workspace item ready to create')}><Plus size={18} /> Create new <ChevronDown size={15} /></button>
          </div>
        </header>

        <div className="content" id="dashboard">
          <section className="welcome-row">
            <div>
              <p>{today}</p>
              <h1>Good morning, De'Andre <span>👋🏾</span></h1>
              <h2>Your AI workforce is ready. What are we building today?</h2>
            </div>
            <div className="system-status"><span /> All systems operational</div>
          </section>

          <section className="command-card">
            <div className="command-icon"><Wand2 /></div>
            <div className="command-copy">
              <strong>Ask your AI workforce</strong>
              <span>Turn an idea into a complete business deliverable.</span>
            </div>
            <div className="prompt-box">
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g. Build a summer deep cleaning campaign for busy families in Auburn..." />
              <button onClick={() => { if (prompt.trim()) { runAction('Your AI workforce is building it now'); setPrompt(''); } }} aria-label="Submit prompt"><ArrowRight /></button>
            </div>
            <div className="prompt-suggestions">
              <span>Try asking:</span>
              {['Create a campaign', 'Write a proposal', 'Build an SOP'].map(item => <button key={item} onClick={() => setPrompt(item)}>{item}</button>)}
            </div>
          </section>

          <section id="brains">
            <div className="section-heading">
              <div><h3>Your AI Brains</h3><p>Specialized intelligence, trained on your business.</p></div>
              <button onClick={() => runAction('Opening all AI Brains')}>View all brains <ArrowRight size={16} /></button>
            </div>
            <div className="brain-grid">
              {brains.map(({ name, description, icon: Icon, color, activity }) => (
                <article className="brain-card" key={name}>
                  <div className={`brain-icon ${color}`}><Icon /></div>
                  <button className="more" aria-label={`More options for ${name}`}><MoreHorizontal /></button>
                  <h4>{name}</h4><p>{description}</p>
                  <div className="brain-footer"><span><i /> Ready</span><small>{activity}</small><button onClick={() => runAction(`${name} is ready for your prompt`)}><ArrowRight /></button></div>
                </article>
              ))}
            </div>
          </section>

          <div className="lower-grid">
            <section className="campaign-panel" id="campaigns">
              <div className="section-heading"><div><h3>Active Campaigns</h3><p>Production moving across your businesses.</p></div><button>View all <ArrowRight size={16} /></button></div>
              <div className="campaign-list">
                {campaigns.map(c => <div className="campaign" key={c.title}>
                  <div className="campaign-symbol" style={{ background: `${c.color}16`, color: c.color }}><Megaphone /></div>
                  <div className="campaign-info"><strong>{c.title}</strong><span>{c.meta}</span><div className="progress"><i style={{ width: `${c.progress}%`, background: c.color }} /></div></div>
                  <span className={`status ${c.status.toLowerCase()}`}>{c.status === 'Generating' && <i />}{c.status}</span>
                  <button className="more"><MoreHorizontal /></button>
                </div>)}
              </div>
            </section>

            <aside className="insight-card">
              <div className="insight-top"><span><Lightbulb /></span><small>AI INSIGHT</small></div>
              <h3>Your summer campaign is outperforming</h3>
              <p>“Summer Deep Clean” is seeing <strong>32% higher engagement</strong> than your campaign average.</p>
              <button onClick={() => runAction('Opening campaign insights')}>View insight <ArrowRight /></button>
              <div className="insight-orb"><Bot /></div>
            </aside>
          </div>

          <section className="stats-grid" id="analytics">
            <article><span className="stat-icon purple"><FileText /></span><div><small>Knowledge items</small><strong>248</strong><em>+18 this month</em></div></article>
            <article><span className="stat-icon blue"><MessageSquareText /></span><div><small>AI generations</small><strong>1,284</strong><em>+24% vs last month</em></div></article>
            <article><span className="stat-icon green"><Building2 /></span><div><small>Businesses connected</small><strong>3</strong><em>All active</em></div></article>
          </section>
        </div>
      </main>
      {mobileOpen && <button className="scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      {notice && <div className="toast"><Sparkles size={17} />{notice}</div>}
    </div>
  );
}

export default App;
