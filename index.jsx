import { useState, useEffect } from "react";

const TARGET = new Date("2026-05-18T08:00:00");

const MEMES = [
  "Your examiner has seen 500 nervous learners this year. They feel nothing. 👁️",
  "One of you WILL stall at the worst possible moment. It is written in the stars. ✍️",
  "The figure of 8 is just yoga on wheels and you ARE an athlete. 🧘",
  "You've watched 47 YouTube tutorials. The bike still doesn't care. 📺",
  "At least one of you will forget to cancel the indicator. The indicator will mock you. 📯",
  "Look where you want to go. Not at the ground. NOT. AT. THE. GROUND. 👀",
  "The helmet hair will be catastrophic. The freedom will be worth every bit of it. 💇",
  "The clutch friction point is your best friend. Treat it with respect. 🤝",
  "Whoever stalls at the first junction buys McDonald's. That is the sacred law. 🍟",
  "You're going to nail it then immediately start browsing used 125cc listings. 🏍️",
  "CBT: Can't Believe They're actually letting us ride. And yet here we are. 🤯",
  "Your riding jacket cost more than your first bike will. Priorities respected. 🧥",
  "The examiner's clipboard is not a weapon. It just genuinely feels like one. 📋",
  "Pro tip: do not wave at the examiner. DO NOT WAVE AT THE EXAMINER. 🚫👋",
  "You've got this. Probably. The vibes are immaculate. The clutch control: TBD. ⚡",
];

function pad(n) { return String(n).padStart(2, "0"); }

function getCD() {
  const diff = TARGET - new Date();
  if (diff <= 0) return { days:0, hours:0, minutes:0, seconds:0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const BIKES = [
  { label: "Honda CBF125", svg: (
    <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="200" height="95" fill="#0d0005"/>
      <circle cx="42" cy="68" r="20" fill="none" stroke="#cc0000" strokeWidth="5"/>
      <circle cx="42" cy="68" r="7" fill="#cc0000"/>
      <circle cx="158" cy="68" r="20" fill="none" stroke="#cc0000" strokeWidth="5"/>
      <circle cx="158" cy="68" r="7" fill="#cc0000"/>
      <line x1="42" y1="68" x2="78" y2="34" stroke="#ff5555" strokeWidth="3.5"/>
      <line x1="78" y1="34" x2="128" y2="32" stroke="#ff5555" strokeWidth="3.5"/>
      <line x1="128" y1="32" x2="158" y2="68" stroke="#ff5555" strokeWidth="3.5"/>
      <line x1="78" y1="34" x2="98" y2="52" stroke="#ff5555" strokeWidth="2.5"/>
      <line x1="98" y1="52" x2="158" y2="68" stroke="#ff5555" strokeWidth="2.5"/>
      <ellipse cx="103" cy="36" rx="27" ry="11" fill="#cc0000"/>
      <rect x="112" y="27" width="36" height="7" rx="3" fill="#1a0000"/>
      <ellipse cx="60" cy="40" rx="13" ry="9" fill="#cc0000"/>
      <ellipse cx="56" cy="40" rx="6" ry="5" fill="#ffffaa" opacity="0.9"/>
      <line x1="72" y1="29" x2="90" y2="27" stroke="#aaa" strokeWidth="3"/>
      <line x1="56" y1="62" x2="146" y2="62" stroke="#666" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  )},
  { label: "Yamaha YZF-R125", svg: (
    <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="200" height="95" fill="#00050d"/>
      <circle cx="40" cy="68" r="20" fill="none" stroke="#0033bb" strokeWidth="5"/>
      <circle cx="40" cy="68" r="7" fill="#0033bb"/>
      <circle cx="160" cy="68" r="20" fill="none" stroke="#0033bb" strokeWidth="5"/>
      <circle cx="160" cy="68" r="7" fill="#0033bb"/>
      <polygon points="40,68 54,30 100,22 145,25 160,68 145,64 100,56 58,62" fill="#0033bb" opacity="0.9"/>
      <polygon points="54,30 82,22 100,22 98,34 57,36" fill="#55aaff" opacity="0.75"/>
      <polygon points="60,22 88,18 93,29 63,32" fill="#aaddff" opacity="0.55"/>
      <ellipse cx="52" cy="36" rx="9" ry="6" fill="#ffffaa" opacity="0.9"/>
      <polygon points="122,25 155,25 158,36 120,36" fill="#000"/>
      <line x1="56" y1="63" x2="148" y2="63" stroke="#446" strokeWidth="3"/>
    </svg>
  )},
  { label: "KTM 125 Duke", svg: (
    <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="200" height="95" fill="#0d0500"/>
      <circle cx="42" cy="70" r="20" fill="none" stroke="#dd5500" strokeWidth="5"/>
      <circle cx="42" cy="70" r="7" fill="#dd5500"/>
      <circle cx="158" cy="70" r="20" fill="none" stroke="#dd5500" strokeWidth="5"/>
      <circle cx="158" cy="70" r="7" fill="#dd5500"/>
      <line x1="42" y1="70" x2="76" y2="36" stroke="#ffaa00" strokeWidth="3"/>
      <line x1="76" y1="36" x2="126" y2="32" stroke="#ffaa00" strokeWidth="3"/>
      <line x1="126" y1="32" x2="158" y2="70" stroke="#ffaa00" strokeWidth="3"/>
      <line x1="76" y1="36" x2="96" y2="55" stroke="#ffaa00" strokeWidth="2"/>
      <line x1="96" y1="55" x2="126" y2="32" stroke="#ffaa00" strokeWidth="2"/>
      <line x1="96" y1="55" x2="158" y2="70" stroke="#ffaa00" strokeWidth="2"/>
      <polygon points="76,36 126,32 130,47 72,49" fill="#dd5500"/>
      <rect x="115" y="32" width="36" height="7" rx="2" fill="#0d0500"/>
      <polygon points="50,26 78,26 78,44 50,44" fill="#dd5500"/>
      <polygon points="53,29 75,29 75,41 53,41" fill="#ffffaa" opacity="0.9"/>
      <line x1="60" y1="58" x2="148" y2="54" stroke="#888" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )},
  { label: "Aprilia RS125", svg: (
    <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="200" height="95" fill="#0d0000"/>
      <circle cx="40" cy="69" r="20" fill="none" stroke="#bb0000" strokeWidth="5"/>
      <circle cx="40" cy="69" r="7" fill="#bb0000"/>
      <circle cx="160" cy="69" r="20" fill="none" stroke="#bb0000" strokeWidth="5"/>
      <circle cx="160" cy="69" r="7" fill="#bb0000"/>
      <polygon points="40,69 52,28 98,20 148,24 160,69 148,65 98,58 56,63" fill="#bb0000"/>
      <polygon points="52,28 78,20 98,20 96,33 55,35" fill="#ff8800" opacity="0.65"/>
      <ellipse cx="50" cy="32" rx="7" ry="5" fill="#ffffaa" opacity="0.9"/>
      <ellipse cx="62" cy="28" rx="6" ry="4" fill="#ffffaa" opacity="0.9"/>
      <polygon points="64,20 90,16 95,27 67,30" fill="#aaddff" opacity="0.5"/>
      <polygon points="128,24 156,24 160,36 126,36" fill="#0d0000"/>
      <line x1="56" y1="64" x2="148" y2="64" stroke="#886" strokeWidth="3"/>
    </svg>
  )},
  { label: "Honda CB125R", svg: (
    <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="200" height="95" fill="#050505"/>
      <circle cx="42" cy="68" r="20" fill="none" stroke="#777" strokeWidth="5"/>
      <circle cx="42" cy="68" r="7" fill="#777"/>
      <circle cx="158" cy="68" r="20" fill="none" stroke="#777" strokeWidth="5"/>
      <circle cx="158" cy="68" r="7" fill="#777"/>
      <line x1="42" y1="68" x2="78" y2="34" stroke="#ccc" strokeWidth="3.5"/>
      <line x1="78" y1="34" x2="128" y2="32" stroke="#ccc" strokeWidth="3.5"/>
      <line x1="128" y1="32" x2="158" y2="68" stroke="#ccc" strokeWidth="3.5"/>
      <ellipse cx="102" cy="36" rx="26" ry="10" fill="#222"/>
      <ellipse cx="102" cy="34" rx="22" ry="8" fill="#333"/>
      <circle cx="60" cy="39" r="12" fill="#1a1a1a"/>
      <circle cx="60" cy="39" r="5" fill="#fff" opacity="0.9"/>
      <rect x="112" y="27" width="36" height="7" rx="3" fill="#111"/>
      <line x1="56" y1="62" x2="147" y2="62" stroke="#444" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )},
  { label: "Yamaha MT-125", svg: (
    <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="200" height="95" fill="#050500"/>
      <circle cx="42" cy="69" r="20" fill="none" stroke="#555" strokeWidth="5"/>
      <circle cx="42" cy="69" r="7" fill="#555"/>
      <circle cx="158" cy="69" r="20" fill="none" stroke="#555" strokeWidth="5"/>
      <circle cx="158" cy="69" r="7" fill="#555"/>
      <line x1="42" y1="69" x2="74" y2="34" stroke="#ffdd00" strokeWidth="4"/>
      <line x1="74" y1="34" x2="128" y2="31" stroke="#ffdd00" strokeWidth="4"/>
      <line x1="128" y1="31" x2="158" y2="69" stroke="#ffdd00" strokeWidth="4"/>
      <polygon points="74,34 128,31 132,47 70,49" fill="#111"/>
      <polygon points="74,34 102,31 102,39 74,41" fill="#ffdd00" opacity="0.75"/>
      <polygon points="48,24 80,24 80,43 52,45" fill="#111"/>
      <polygon points="52,27 77,27 75,41 54,42" fill="#ffdd00" opacity="0.88"/>
      <rect x="116" y="28" width="37" height="7" rx="2" fill="#050500"/>
      <line x1="58" y1="63" x2="148" y2="63" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )},
  { label: "Kawasaki Z125", svg: (
    <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="200" height="95" fill="#000d00"/>
      <circle cx="42" cy="69" r="20" fill="none" stroke="#005500" strokeWidth="5"/>
      <circle cx="42" cy="69" r="7" fill="#005500"/>
      <circle cx="158" cy="69" r="20" fill="none" stroke="#005500" strokeWidth="5"/>
      <circle cx="158" cy="69" r="7" fill="#005500"/>
      <line x1="42" y1="69" x2="76" y2="36" stroke="#00dd00" strokeWidth="3.5"/>
      <line x1="76" y1="36" x2="128" y2="33" stroke="#00dd00" strokeWidth="3.5"/>
      <line x1="128" y1="33" x2="158" y2="69" stroke="#00dd00" strokeWidth="3.5"/>
      <line x1="88" y1="50" x2="128" y2="33" stroke="#00dd00" strokeWidth="2.5"/>
      <line x1="76" y1="36" x2="88" y2="50" stroke="#00dd00" strokeWidth="2.5"/>
      <ellipse cx="100" cy="37" rx="26" ry="10" fill="#005500"/>
      <circle cx="60" cy="39" r="11" fill="#005500"/>
      <circle cx="60" cy="39" r="6" fill="#aaffaa" opacity="0.85"/>
      <line x1="55" y1="63" x2="147" y2="63" stroke="#224422" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )},
  { label: "Suzuki GSX-S125", svg: (
    <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="200" height="95" fill="#00000d"/>
      <circle cx="42" cy="69" r="20" fill="none" stroke="#000066" strokeWidth="5"/>
      <circle cx="42" cy="69" r="7" fill="#000066"/>
      <circle cx="158" cy="69" r="20" fill="none" stroke="#000066" strokeWidth="5"/>
      <circle cx="158" cy="69" r="7" fill="#000066"/>
      <line x1="42" y1="69" x2="78" y2="35" stroke="#ff9900" strokeWidth="3.5"/>
      <line x1="78" y1="35" x2="128" y2="32" stroke="#ff9900" strokeWidth="3.5"/>
      <line x1="128" y1="32" x2="158" y2="69" stroke="#ff9900" strokeWidth="3.5"/>
      <ellipse cx="101" cy="36" rx="26" ry="10" fill="#000066"/>
      <rect x="50" y="28" width="24" height="16" rx="3" fill="#000066"/>
      <rect x="53" y="31" width="18" height="10" rx="2" fill="#ffffaa" opacity="0.88"/>
      <line x1="56" y1="63" x2="147" y2="63" stroke="#223344" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )},
  { label: "Lexmoto LXR125", svg: (
    <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="200" height="95" fill="#08000d"/>
      <circle cx="40" cy="69" r="20" fill="none" stroke="#660099" strokeWidth="5"/>
      <circle cx="40" cy="69" r="7" fill="#660099"/>
      <circle cx="160" cy="69" r="20" fill="none" stroke="#660099" strokeWidth="5"/>
      <circle cx="160" cy="69" r="7" fill="#660099"/>
      <polygon points="40,69 52,28 98,20 148,23 160,69 148,65 98,57 56,63" fill="#660099" opacity="0.88"/>
      <polygon points="52,28 80,20 98,20 96,32 55,34" fill="#cc44ff" opacity="0.6"/>
      <ellipse cx="52" cy="32" rx="9" ry="6" fill="#ffffaa" opacity="0.9"/>
      <polygon points="62,20 90,16 95,27 65,30" fill="#ccaaff" opacity="0.5"/>
      <polygon points="128,23 156,23 160,35 126,35" fill="#08000d"/>
      <line x1="56" y1="64" x2="148" y2="64" stroke="#664477" strokeWidth="3"/>
    </svg>
  )},
];

function SectionRule({ color, children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, margin:"14px 0 10px", color }}>
      <div style={{ flex:1, height:2, background:"currentColor" }} />
      <span style={{ fontFamily:"'Anton',sans-serif", fontSize:"0.7rem", letterSpacing:4, whiteSpace:"nowrap", padding:"0 6px" }}>{children}</span>
      <div style={{ flex:1, height:2, background:"currentColor" }} />
    </div>
  );
}

export default function App() {
  const [cd, setCd] = useState(getCD());
  const [memeIdx, setMemeIdx] = useState(() => Math.floor(Math.random() * MEMES.length));

  useEffect(() => {
    const t = setInterval(() => setCd(getCD()), 1000);
    return () => clearInterval(t);
  }, []);

  const panic = Math.min(100, Math.max(3, Math.round((1 - cd.days / 120) * 100)));
  const panicMsg =
    cd.days >= 60 ? "😎 Totally calm. You haven't even Googled 'CBT motorbike' yet." :
    cd.days >= 30 ? "🙂 Getting real. Maybe watch a YouTube tutorial or twelve." :
    cd.days >= 14 ? "😅 Two weeks! Time to actually sit on a motorbike m8." :
    cd.days >= 7  ? "😬 ONE WEEK. Do you know where the friction point is???" :
    cd.days >= 3  ? "😰 THREE DAYS. Sleep is for people who haven't got a CBT." :
    cd.days >= 1  ? "💀 TOMORROW. Your palms are already sweating, aren't they." :
                    "🫡 TODAY IS THE DAY. YOU GOT THIS. PROBABLY. GO GO GO!!!";

  const tickerText = "⚡ BREAKING: LOCAL LEGENDS ATTEMPT CBT ON 18 MAY 2026 ⚡  |  🏍️ SOURCES CONFIRM: FRICTION POINT IS REAL  |  ⚠️ INDICATOR NOT CANCELLED: SOURCES APPALLED  |  🪖 HELMET MARKET SURGES AHEAD OF TEST DATE  |  💥 FIGURE OF 8: \"FINE ONCE YOU STOP LOOKING AT THE GROUND\"  |  🛑 EXAMINER'S FACE: UNREADABLE  |  ";

  return (
    <div style={{ background:"#050505", color:"#f0f0e8", fontFamily:"'Share Tech Mono',monospace", minHeight:"100vh", overflowX:"hidden", cursor:"crosshair", position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Share+Tech+Mono&family=Russo+One&family=Black+Ops+One&display=swap');
        @keyframes ticker   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes badgePul { 0%,100%{background:#ff1a1a} 50%{background:#ff00cc} }
        @keyframes hShake   { 0%,95%,100%{transform:translateX(0)} 96%{transform:translateX(-2px) skewX(-1deg)} 97%{transform:translateX(2px) skewX(1deg)} 98%{transform:translateX(-1px)} 99%{transform:translateX(0)} }
        @keyframes secFlash { 0%,100%{color:#ffe600;text-shadow:0 0 20px rgba(255,230,0,0.5)} 50%{color:#fff;text-shadow:0 0 30px #fff} }
        @keyframes cyanPul  { 0%,100%{text-shadow:0 0 20px #00ffee} 50%{text-shadow:0 0 40px #00ffee,0 0 60px rgba(0,255,238,0.3)} }
        @keyframes redBlink { 0%,100%{color:#ff1a1a} 50%{color:#ff7700} }
        @keyframes stripes  { 0%{background-position:0 0} 100%{background-position:32px 0} }
        @keyframes badgeBob { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-6px) rotate(2deg)} }
        @keyframes glitchT  { 0%,90%,100%{opacity:0} 92%{opacity:0.7;transform:translateX(-4px) skewX(-2deg)} 94%{opacity:0} 96%{opacity:0.5;transform:translateX(2px)} 98%{opacity:0} }
        @keyframes glitchB  { 0%,90%,100%{opacity:0} 93%{opacity:0.7;transform:translateX(4px) skewX(2deg)} 95%{opacity:0} 97%{opacity:0.5;transform:translateX(-2px)} 99%{opacity:0} }
        .glitch { position:relative }
        .glitch::before { content:attr(data-text); position:absolute; left:2px; top:0; color:#00ffee; clip-path:polygon(0 0,100% 0,100% 35%,0 35%); opacity:0; animation:glitchT 6s ease-in-out infinite; pointer-events:none }
        .glitch::after  { content:attr(data-text); position:absolute; left:-2px; top:0; color:#ff00cc; clip-path:polygon(0 65%,100% 65%,100% 100%,0 100%); opacity:0; animation:glitchB 6s ease-in-out infinite; pointer-events:none }
        .bike-tile:hover svg { filter:brightness(1.4) saturate(1.5) }
        .bike-tile svg { transition:filter 0.2s }
        .btn-hype:hover { background:#00ff44 !important; color:#050505 !important; box-shadow:0 0 20px #00ff44 }
        /* scanlines */
        #root::after { content:''; position:fixed; inset:0; background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.13) 2px,rgba(0,0,0,0.13) 4px); pointer-events:none; z-index:9999 }
        /* grid bg */
        #root::before { content:''; position:fixed; inset:0; background-image:linear-gradient(rgba(0,255,238,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,238,0.04) 1px,transparent 1px); background-size:40px 40px; pointer-events:none; z-index:0 }
      `}</style>

      {/* FLOAT BADGE */}
      <div style={{ position:"fixed", bottom:20, right:16, zIndex:200, background:"#ff00cc", color:"#fff", fontFamily:"'Anton',sans-serif", fontSize:"0.6rem", letterSpacing:2, padding:"8px 12px", textAlign:"center", lineHeight:1.4, animation:"badgeBob 2s ease-in-out infinite", boxShadow:"0 0 20px #ff00cc,0 0 40px rgba(255,0,204,0.3)", border:"1px solid rgba(255,255,255,0.3)", userSelect:"none" }}>
        🏍️<br/>CBT<br/>2026
      </div>

      {/* TICKER */}
      <div style={{ position:"relative", zIndex:10, background:"#ffe600", color:"#050505", fontFamily:"'Anton',sans-serif", fontSize:"0.85rem", letterSpacing:2, padding:"5px 0", overflow:"hidden", borderBottom:"3px solid #050505", whiteSpace:"nowrap" }}>
        <div style={{ display:"inline-block", animation:"ticker 22s linear infinite", whiteSpace:"nowrap" }}>
          {tickerText}{tickerText}
        </div>
      </div>

      {/* MASTHEAD */}
      <div style={{ position:"relative", zIndex:10, borderBottom:"6px double #ffe600", padding:"18px 20px 14px", display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", gap:10, background:"#050505" }}>
        <div style={{ fontSize:"0.65rem", letterSpacing:2, color:"#00ffee", lineHeight:1.8, textTransform:"uppercase" }}>
          EST. 2026<br/>ISSUE #001<br/>FREE COPY<br/>
          <span style={{ display:"inline-block", background:"#ff1a1a", color:"#f0f0e8", fontFamily:"'Anton',sans-serif", fontSize:"0.7rem", letterSpacing:2, padding:"3px 8px", animation:"badgePul 1.5s ease-in-out infinite" }}>⚡ LIVE</span>
        </div>
        <div style={{ textAlign:"center" }}>
          <span className="glitch" data-text="THE CBT DAILY" style={{ fontFamily:"'Black Ops One',cursive", fontSize:"clamp(2rem,7vw,5rem)", color:"#f0f0e8", lineHeight:1, textShadow:"3px 3px 0 #ffe600,6px 6px 0 rgba(255,230,0,0.3)", display:"block", letterSpacing:-1 }}>THE CBT DAILY</span>
          <span style={{ fontSize:"0.6rem", letterSpacing:6, color:"#ffe600", textTransform:"uppercase", marginTop:4, display:"block", borderTop:"1px solid #ffe600", borderBottom:"1px solid #ffe600", padding:"3px 0" }}>Britain's #1 Source For Motorbike Test Anxiety Since 2026</span>
        </div>
        <div style={{ textAlign:"right", fontSize:"0.65rem", letterSpacing:2, color:"#00ffee", lineHeight:1.8, textTransform:"uppercase" }}>
          18 MAY 2026<br/>PRICE: FREE<br/>125cc EDITION<br/>RIDE OR DIE
        </div>
      </div>

      {/* NEWSPAPER BODY */}
      <div style={{ position:"relative", zIndex:10, maxWidth:980, margin:"0 auto", padding:"0 12px 60px" }}>

        <SectionRule color="#ffe600">⚡ COUNTDOWN SPECIAL ⚡</SectionRule>

        {/* HEADLINE + COUNTDOWN */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", border:"2px solid #f0f0e8", margin:"12px 0" }}>
          <div style={{ padding:20, borderRight:"2px solid #f0f0e8" }}>
            <span style={{ fontSize:"0.65rem", letterSpacing:4, color:"#ff00cc", textTransform:"uppercase", marginBottom:8, display:"block" }}>// EXCLUSIVE REPORT //</span>
            <div style={{ fontFamily:"'Anton',sans-serif", fontSize:"clamp(2.8rem,8vw,5.5rem)", lineHeight:0.9, color:"#ffe600", textTransform:"uppercase", textShadow:"4px 4px 0 #ff00cc", animation:"hShake 8s ease-in-out infinite", marginBottom:12 }}>
              LOCAL LADS<br/>ATTEMPT<br/>CBT TEST
            </div>
            <div style={{ fontSize:"0.8rem", lineHeight:1.6, color:"rgba(240,240,232,0.75)", borderLeft:"3px solid #00ffee", paddingLeft:12, marginBottom:14 }}>
              In what sources are calling "the most anticipated motorbike event of 2026", a group of brave individuals are scheduled to sit their Compulsory Basic Training on the morning of <b style={{color:"#ffe600"}}>18th May</b>. Helmet purchases are up. YouTube tutorials have been watched. The friction point has been located. Probably.
            </div>
            <div style={{ fontSize:"0.6rem", letterSpacing:3, color:"#00ffee", textTransform:"uppercase" }}>STAFF REPORTER · CBT DAILY NEWS DESK · 18 MAY 2026</div>
          </div>

          {/* COUNTDOWN */}
          <div style={{ background:"#050505", padding:16, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:10, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(45deg,transparent,transparent 6px,rgba(255,230,0,0.03) 6px,rgba(255,230,0,0.03) 12px)", pointerEvents:"none" }} />
            <div style={{ fontFamily:"'Anton',sans-serif", fontSize:"0.7rem", letterSpacing:4, color:"#ff00cc", textAlign:"center", textTransform:"uppercase", position:"relative", zIndex:1 }}>// T-MINUS //</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, width:"100%", position:"relative", zIndex:1 }}>
              {[["days","DAYS"],["hours","HRS"],["minutes","MINS"],["seconds","SECS"]].map(([k,l]) => (
                <div key={k} style={{ background:"#050505", border:"1px solid #ffe600", padding:"8px 4px", textAlign:"center", position:"relative" }}>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(255,230,0,0.08),transparent)", pointerEvents:"none" }} />
                  <span style={{ fontFamily:"'Russo One',sans-serif", fontSize:"clamp(1.8rem,5vw,2.8rem)", color:"#ffe600", lineHeight:1, display:"block", textShadow:"0 0 20px rgba(255,230,0,0.5)", animation: k==="seconds" ? "secFlash 1s step-start infinite" : "none" }}>{pad(cd[k])}</span>
                  <span style={{ fontSize:"0.5rem", letterSpacing:3, color:"#00ffee", textTransform:"uppercase", marginTop:2, display:"block" }}>{l}</span>
                </div>
              ))}
            </div>
            <div style={{ background:"#ffe600", color:"#050505", fontFamily:"'Anton',sans-serif", fontSize:"0.65rem", letterSpacing:2, padding:"4px 10px", textAlign:"center", position:"relative", zIndex:1 }}>📅 18 MAY 2026 · 08:00</div>
          </div>
        </div>

        {/* THREE COLUMNS */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", border:"2px solid #f0f0e8", borderTop:"none" }}>
          {[
            { color:"#00ffee", tag:"ANALYSIS", head:"Will They Stall?", body: <><b>Statistical modelling</b> suggests at least one candidate will stall at a junction. Experts identify three high-risk moments: pulling away, the figure-of-eight, and <b>"whenever the examiner is watching most intently."</b><br/><br/>The clutch friction point remains <b>"an ongoing discussion"</b> despite four separate YouTube tutorials.</> },
            { color:"#ff00cc", tag:"OPINION",  head:"The Indicator Crisis", body: <><b>"Cancel your indicator. CANCEL IT."</b> Multiple test failures per year are attributed to indicators left blinking while the rider has long since forgotten about them.<br/><br/>"It blinks," our source said. <b>"It blinks and it judges you."</b></> },
            { color:"#ff7700", tag:"LIFESTYLE", head:"Post-CBT Plans", body: <>Should the candidates pass, sources indicate they will <b>immediately begin browsing used 125cc listings</b> on Facebook Marketplace. Budgets described as "optimistic."<br/><br/>One candidate has reportedly <b>already named the bike</b> they don't yet own. We respect this energy.</> },
          ].map((col, i) => (
            <div key={i} style={{ padding:14, borderRight: i < 2 ? "1px solid rgba(240,240,232,0.2)" : "none" }}>
              <SectionRule color={col.color}>{col.tag}</SectionRule>
              <div style={{ fontFamily:"'Anton',sans-serif", fontSize:"clamp(1.1rem,2.5vw,1.6rem)", lineHeight:1, marginBottom:8, textTransform:"uppercase", color:col.color }}>{col.head}</div>
              <div style={{ fontSize:"0.72rem", lineHeight:1.7, color:"rgba(240,240,232,0.7)" }}>{col.body}</div>
            </div>
          ))}
        </div>

        <SectionRule color="#00ffee">🏍️ BIKES OF THE YEAR SUPPLEMENT 🏍️</SectionRule>

        {/* BIKE MOSAIC */}
        <div style={{ border:"2px solid #f0f0e8", borderTop:"none", padding:14 }}>
          <div style={{ fontFamily:"'Anton',sans-serif", fontSize:"clamp(1.2rem,3vw,2rem)", color:"#00ffee", textTransform:"uppercase", textAlign:"center", letterSpacing:3, marginBottom:14, animation:"cyanPul 2s ease-in-out infinite" }}>// THE MACHINES //</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3 }}>
            {BIKES.map((bike) => (
              <div key={bike.label} className="bike-tile" style={{ position:"relative", aspectRatio:"16/9", border:"1px solid rgba(255,255,255,0.1)", overflow:"hidden", cursor:"crosshair" }}>
                {bike.svg}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(0,0,0,0.9))", padding:"10px 5px 3px", fontSize:"0.55rem", letterSpacing:2, color:"#ffe600", textAlign:"center", textTransform:"uppercase", fontFamily:"'Share Tech Mono',monospace" }}>{bike.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* EMOJI STRIP */}
        <div style={{ overflow:"hidden", borderTop:"3px solid #ff00cc", borderBottom:"3px solid #ff00cc", background:"rgba(255,0,204,0.04)", padding:"2px 0", margin:"0 0 0 0", whiteSpace:"nowrap" }}>
          <div style={{ display:"inline-block", animation:"ticker 12s linear infinite", fontSize:"1.8rem", lineHeight:1, whiteSpace:"nowrap" }}>
            {"🏍️ 🛵 🏍️ 🪖 🏍️ 💨 🏍️ 🛵 🏍️ 🔥 🏍️ 🛵 🏍️ 🪖 🏍️ 💨 🏍️ 🛵 🏍️ 🔥 🏍️ 🛵 🏍️ 🪖 🏍️ 💨 🏍️ 🛵 🏍️ 🔥  ".repeat(2)}
          </div>
        </div>

        {/* PANIC + HYPE */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", border:"2px solid #f0f0e8", borderTop:"none" }}>
          <div style={{ padding:14, borderRight:"1px solid rgba(240,240,232,0.2)" }}>
            <div style={{ fontFamily:"'Anton',sans-serif", fontSize:"1.3rem", letterSpacing:2, textTransform:"uppercase", marginBottom:10, animation:"redBlink 0.9s step-start infinite" }}>⚠ PANIC-O-METER</div>
            <div style={{ height:26, border:"1px solid #ff1a1a", position:"relative", overflow:"hidden", marginBottom:8, background:"rgba(255,26,26,0.05)" }}>
              <div style={{ height:"100%", width:`${panic}%`, background:"repeating-linear-gradient(90deg,#ff1a1a 0,#ff1a1a 8px,#ff7700 8px,#ff7700 16px)", backgroundSize:"32px 100%", animation:"stripes 0.3s linear infinite", transition:"width 1s ease" }} />
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Anton',sans-serif", fontSize:"0.85rem", color:"#fff", letterSpacing:2 }}>{panic}%</div>
            </div>
            <div style={{ fontSize:"0.7rem", lineHeight:1.5, color:"#ff7700", minHeight:42 }}>{panicMsg}</div>
          </div>
          <div style={{ padding:14 }}>
            <div style={{ fontFamily:"'Anton',sans-serif", fontSize:"1.3rem", letterSpacing:2, color:"#00ff44", textTransform:"uppercase", marginBottom:10, textShadow:"0 0 10px #00ff44" }}>💬 QUOTE OF THE DAY</div>
            <div style={{ fontSize:"0.72rem", lineHeight:1.6, color:"rgba(240,240,232,0.8)", borderLeft:"3px solid #00ff44", padding:"8px 10px", marginBottom:10, minHeight:72, display:"flex", alignItems:"center", background:"rgba(0,255,68,0.03)" }}>
              {MEMES[memeIdx]}
            </div>
            <button className="btn-hype" onClick={() => setMemeIdx((memeIdx + 1) % MEMES.length)} style={{ background:"transparent", border:"2px solid #00ff44", color:"#00ff44", fontFamily:"'Anton',sans-serif", fontSize:"0.85rem", letterSpacing:3, padding:"7px 14px", cursor:"pointer", textTransform:"uppercase", transition:"all 0.15s" }}>▶ NEXT QUOTE</button>
          </div>
        </div>

        {/* FACTS STRIP */}
        <div style={{ border:"2px solid #f0f0e8", borderTop:"none", display:"grid", gridTemplateColumns:"repeat(6,1fr)" }}>
          {[
            { icon:"🏍️", label:"Top Speed",  val:"~70mph\ntrust." },
            { icon:"📋", label:"CBT Valid",  val:"2 years\nthen renew" },
            { icon:"🪖", label:"Helmet",     val:"ECE 22.06\nrequired" },
            { icon:"⛽", label:"MPG",        val:"100+mpg\nlegendary" },
            { icon:"📅", label:"Test Day",   val:"~7-8 hrs\nfull day" },
            { icon:"🔑", label:"No Big Test",val:"CBT only\nfor 125cc!" },
          ].map((f, i) => (
            <div key={i} style={{ padding:"10px 8px", borderRight: i < 5 ? "1px solid rgba(240,240,232,0.15)" : "none", textAlign:"center" }}>
              <span style={{ fontSize:"1.4rem", display:"block", marginBottom:4 }}>{f.icon}</span>
              <span style={{ fontSize:"0.5rem", letterSpacing:2, color:"#ffe600", textTransform:"uppercase", display:"block", marginBottom:2 }}>{f.label}</span>
              <span style={{ fontSize:"0.65rem", color:"rgba(240,240,232,0.7)", lineHeight:1.4, display:"block", whiteSpace:"pre-line" }}>{f.val}</span>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ border:"2px solid #f0f0e8", borderTop:"4px solid #ffe600", padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <div style={{ fontFamily:"'Black Ops One',cursive", fontSize:"1rem", color:"#ffe600" }}>THE CBT DAILY</div>
          <div style={{ fontSize:"0.6rem", color:"rgba(240,240,232,0.35)", letterSpacing:1 }}>
            © 2026 CBT Daily Press • Not liable for stalled engines • No examiners were harmed<br/>
            Best viewed on any browser built after 1998 • Helmet not included
          </div>
          <div style={{ fontSize:"1.4rem" }}>🏍️ 🪖 🏍️</div>
        </div>

      </div>
    </div>
  );
}
