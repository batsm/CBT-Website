import { useState, useEffect } from "react";

const TARGET = new Date("2026-05-18T08:00:00");

const MEMES = [
  "Your examiner has seen 500 nervous learners this year. They feel nothing. 👁️",
  "One of you WILL stall at the worst possible moment. It is written. ✍️",
  "The figure of 8 is just yoga on wheels and you ARE an athlete 🧘",
  "You've watched 47 YouTube tutorials. The bike still doesn't care. 📺",
  "At least one of you will forget to cancel the indicator. THE INDICATOR WILL MOCK YOU. 📯",
  "Remember: look where you want to go. Not at the ground. NOT AT THE GROUND. 👀",
  "The helmet hair will be catastrophic. The freedom will be worth it. 💇",
  "Clutch friction point is your best friend. Treat it right. 🤝",
  "Whoever stalls at the junction buys McDonald's. That is the sacred law. 🍟",
  "You're going to nail it and then immediately start planning what 125 to buy 🏍️",
  "CBT = Can't Believe They're letting me ride. And yet here we are!!! 🤯",
  "Your riding jacket cost more than your first bike probably will. Priorities: respected. 🧥",
  "The examiner's clipboard is not a weapon. It just FEELS like one. 📋",
  "Pro tip: don't wave at the examiner. DO NOT WAVE AT THE EXAMINER. 🚫👋",
];

const FACTS = [
  ["🏍️ 125cc TOP SPEED", "~70mph. Enough. Trust."],
  ["📋 CBT LASTS", "2 years before renewal"],
  ["🪖 HELMETS", "Must be ECE 22.06 rated"],
  ["⛽ MPG", "125s can do 100+ mpg!!"],
  ["📅 TEST LENGTH", "Full day, ~7-8 hrs"],
  ["🔑 NO FULL TEST", "Just CBT for a 125. LFG!"],
];

function pad(n) { return String(n).padStart(2, "0"); }

function getCountdown() {
  const diff = TARGET - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    done: false,
  };
}

// Hand-drawn SVG bike silhouettes — no external URLs needed
const BIKES = [
  {
    name: "Honda CBF125", color: "#cc0000", accent: "#ff5555", bg: "#1a0000",
    svg: (c, a) => (
      <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="200" height="95" fill="#1a0000"/>
        <circle cx="42" cy="68" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="42" cy="68" r="7" fill={c}/>
        <circle cx="158" cy="68" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="158" cy="68" r="7" fill={c}/>
        <line x1="42" y1="68" x2="78" y2="34" stroke={a} strokeWidth="3.5"/>
        <line x1="78" y1="34" x2="128" y2="32" stroke={a} strokeWidth="3.5"/>
        <line x1="128" y1="32" x2="158" y2="68" stroke={a} strokeWidth="3.5"/>
        <line x1="78" y1="34" x2="98" y2="52" stroke={a} strokeWidth="2.5"/>
        <line x1="98" y1="52" x2="158" y2="68" stroke={a} strokeWidth="2.5"/>
        <ellipse cx="103" cy="36" rx="27" ry="11" fill={c}/>
        <rect x="112" y="27" width="36" height="7" rx="3" fill="#2a0000"/>
        <ellipse cx="60" cy="40" rx="13" ry="9" fill={c}/>
        <ellipse cx="56" cy="40" rx="6" ry="5" fill="#ffff99" opacity="0.9"/>
        <line x1="72" y1="29" x2="90" y2="27" stroke="#aaa" strokeWidth="3"/>
        <line x1="56" y1="62" x2="146" y2="62" stroke="#888" strokeWidth="3.5" strokeLinecap="round"/>
        <text x="100" y="88" textAnchor="middle" fill={a} fontSize="8" fontFamily="Impact,sans-serif">HONDA CBF125</text>
      </svg>
    )
  },
  {
    name: "Yamaha YZF-R125", color: "#0033bb", accent: "#55aaff", bg: "#000820",
    svg: (c, a) => (
      <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="200" height="95" fill="#000820"/>
        <circle cx="40" cy="68" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="40" cy="68" r="7" fill={c}/>
        <circle cx="160" cy="68" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="160" cy="68" r="7" fill={c}/>
        <polygon points="40,68 54,30 100,22 145,25 160,68 145,64 100,56 58,62" fill={c} opacity="0.9"/>
        <polygon points="54,30 82,22 100,22 98,34 57,36" fill={a} opacity="0.75"/>
        <polygon points="60,22 88,18 93,29 63,32" fill="#aaddff" opacity="0.55"/>
        <ellipse cx="52" cy="36" rx="9" ry="6" fill="#ffff99" opacity="0.9"/>
        <polygon points="122,25 155,25 158,36 120,36" fill="#000"/>
        <line x1="56" y1="63" x2="148" y2="63" stroke="#667" strokeWidth="3"/>
        <text x="100" y="88" textAnchor="middle" fill={a} fontSize="8" fontFamily="Impact,sans-serif">YAMAHA YZF-R125</text>
      </svg>
    )
  },
  {
    name: "KTM 125 Duke", color: "#dd5500", accent: "#ffaa00", bg: "#120800",
    svg: (c, a) => (
      <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="200" height="95" fill="#120800"/>
        <circle cx="42" cy="70" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="42" cy="70" r="7" fill={c}/>
        <circle cx="158" cy="70" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="158" cy="70" r="7" fill={c}/>
        <line x1="42" y1="70" x2="76" y2="36" stroke={a} strokeWidth="3"/>
        <line x1="76" y1="36" x2="126" y2="32" stroke={a} strokeWidth="3"/>
        <line x1="126" y1="32" x2="158" y2="70" stroke={a} strokeWidth="3"/>
        <line x1="76" y1="36" x2="96" y2="55" stroke={a} strokeWidth="2"/>
        <line x1="96" y1="55" x2="126" y2="32" stroke={a} strokeWidth="2"/>
        <line x1="96" y1="55" x2="158" y2="70" stroke={a} strokeWidth="2"/>
        <polygon points="76,36 126,32 130,47 72,49" fill={c}/>
        <rect x="115" y="32" width="36" height="7" rx="2" fill="#1a0800"/>
        <polygon points="50,26 78,26 78,44 50,44" fill={c}/>
        <polygon points="53,29 75,29 75,41 53,41" fill="#ffff99" opacity="0.9"/>
        <line x1="60" y1="58" x2="148" y2="54" stroke="#888" strokeWidth="4.5" strokeLinecap="round"/>
        <text x="100" y="88" textAnchor="middle" fill={a} fontSize="8" fontFamily="Impact,sans-serif">KTM 125 DUKE</text>
      </svg>
    )
  },
  {
    name: "Aprilia RS125", color: "#bb0000", accent: "#ff8800", bg: "#110000",
    svg: (c, a) => (
      <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="200" height="95" fill="#110000"/>
        <circle cx="40" cy="69" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="40" cy="69" r="7" fill={c}/>
        <circle cx="160" cy="69" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="160" cy="69" r="7" fill={c}/>
        <polygon points="40,69 52,28 98,20 148,24 160,69 148,65 98,58 56,63" fill={c}/>
        <polygon points="52,28 78,20 98,20 96,33 55,35" fill={a} opacity="0.65"/>
        <ellipse cx="50" cy="32" rx="7" ry="5" fill="#ffff99" opacity="0.9"/>
        <ellipse cx="62" cy="28" rx="6" ry="4" fill="#ffff99" opacity="0.9"/>
        <polygon points="64,20 90,16 95,27 67,30" fill="#aaddff" opacity="0.5"/>
        <polygon points="128,24 156,24 160,36 126,36" fill="#110000"/>
        <line x1="56" y1="64" x2="148" y2="64" stroke="#997" strokeWidth="3"/>
        <text x="100" y="88" textAnchor="middle" fill={a} fontSize="8" fontFamily="Impact,sans-serif">APRILIA RS125</text>
      </svg>
    )
  },
  {
    name: "Honda CB125R", color: "#222222", accent: "#cccccc", bg: "#0d0d0d",
    svg: (c, a) => (
      <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="200" height="95" fill="#0d0d0d"/>
        <circle cx="42" cy="68" r="20" fill="none" stroke="#777" strokeWidth="5"/>
        <circle cx="42" cy="68" r="7" fill="#777"/>
        <circle cx="158" cy="68" r="20" fill="none" stroke="#777" strokeWidth="5"/>
        <circle cx="158" cy="68" r="7" fill="#777"/>
        <line x1="42" y1="68" x2="78" y2="34" stroke={a} strokeWidth="3.5"/>
        <line x1="78" y1="34" x2="128" y2="32" stroke={a} strokeWidth="3.5"/>
        <line x1="128" y1="32" x2="158" y2="68" stroke={a} strokeWidth="3.5"/>
        <line x1="90" y1="48" x2="128" y2="32" stroke={a} strokeWidth="2.5" opacity="0.5"/>
        <line x1="78" y1="34" x2="90" y2="48" stroke={a} strokeWidth="2.5" opacity="0.5"/>
        <ellipse cx="102" cy="36" rx="26" ry="10" fill="#222"/>
        <ellipse cx="102" cy="34" rx="22" ry="8" fill="#333"/>
        <circle cx="60" cy="39" r="12" fill="#1a1a1a"/>
        <circle cx="60" cy="39" r="8" fill="#333"/>
        <circle cx="60" cy="39" r="5" fill="#fff" opacity="0.9"/>
        <rect x="112" y="27" width="36" height="7" rx="3" fill="#111"/>
        <line x1="56" y1="62" x2="147" y2="62" stroke="#555" strokeWidth="4" strokeLinecap="round"/>
        <text x="100" y="88" textAnchor="middle" fill={a} fontSize="8" fontFamily="Impact,sans-serif">HONDA CB125R</text>
      </svg>
    )
  },
  {
    name: "Yamaha MT-125", color: "#111111", accent: "#ffdd00", bg: "#0a0a00",
    svg: (c, a) => (
      <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="200" height="95" fill="#0a0a00"/>
        <circle cx="42" cy="69" r="20" fill="none" stroke="#555" strokeWidth="5"/>
        <circle cx="42" cy="69" r="7" fill="#555"/>
        <circle cx="158" cy="69" r="20" fill="none" stroke="#555" strokeWidth="5"/>
        <circle cx="158" cy="69" r="7" fill="#555"/>
        <line x1="42" y1="69" x2="74" y2="34" stroke={a} strokeWidth="4"/>
        <line x1="74" y1="34" x2="128" y2="31" stroke={a} strokeWidth="4"/>
        <line x1="128" y1="31" x2="158" y2="69" stroke={a} strokeWidth="4"/>
        <polygon points="74,34 128,31 132,47 70,49" fill="#111"/>
        <polygon points="74,34 102,31 102,39 74,41" fill={a} opacity="0.75"/>
        <polygon points="48,24 80,24 80,43 52,45" fill="#111"/>
        <polygon points="52,27 77,27 75,41 54,42" fill={a} opacity="0.88"/>
        <rect x="116" y="28" width="37" height="7" rx="2" fill="#0a0a00"/>
        <line x1="58" y1="63" x2="148" y2="63" stroke="#444" strokeWidth="4" strokeLinecap="round"/>
        <text x="100" y="88" textAnchor="middle" fill={a} fontSize="8" fontFamily="Impact,sans-serif">YAMAHA MT-125</text>
      </svg>
    )
  },
  {
    name: "Kawasaki Z125", color: "#005500", accent: "#00dd00", bg: "#001100",
    svg: (c, a) => (
      <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="200" height="95" fill="#001100"/>
        <circle cx="42" cy="69" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="42" cy="69" r="7" fill={c}/>
        <circle cx="158" cy="69" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="158" cy="69" r="7" fill={c}/>
        <line x1="42" y1="69" x2="76" y2="36" stroke={a} strokeWidth="3.5"/>
        <line x1="76" y1="36" x2="128" y2="33" stroke={a} strokeWidth="3.5"/>
        <line x1="128" y1="33" x2="158" y2="69" stroke={a} strokeWidth="3.5"/>
        <line x1="88" y1="50" x2="128" y2="33" stroke={a} strokeWidth="2.5"/>
        <line x1="76" y1="36" x2="88" y2="50" stroke={a} strokeWidth="2.5"/>
        <ellipse cx="100" cy="37" rx="26" ry="10" fill={c}/>
        <rect x="112" y="28" width="36" height="7" rx="3" fill="#001a00"/>
        <circle cx="60" cy="39" r="11" fill={c}/>
        <circle cx="60" cy="39" r="6" fill="#aaffaa" opacity="0.85"/>
        <line x1="55" y1="63" x2="147" y2="63" stroke="#336633" strokeWidth="4" strokeLinecap="round"/>
        <text x="100" y="88" textAnchor="middle" fill={a} fontSize="8" fontFamily="Impact,sans-serif">KAWASAKI Z125</text>
      </svg>
    )
  },
  {
    name: "Suzuki GSX-S125", color: "#000066", accent: "#ff9900", bg: "#000011",
    svg: (c, a) => (
      <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="200" height="95" fill="#000011"/>
        <circle cx="42" cy="69" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="42" cy="69" r="7" fill={c}/>
        <circle cx="158" cy="69" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="158" cy="69" r="7" fill={c}/>
        <line x1="42" y1="69" x2="78" y2="35" stroke={a} strokeWidth="3.5"/>
        <line x1="78" y1="35" x2="128" y2="32" stroke={a} strokeWidth="3.5"/>
        <line x1="128" y1="32" x2="158" y2="69" stroke={a} strokeWidth="3.5"/>
        <line x1="90" y1="50" x2="128" y2="32" stroke={a} strokeWidth="2.5"/>
        <line x1="78" y1="35" x2="90" y2="50" stroke={a} strokeWidth="2.5"/>
        <line x1="90" y1="50" x2="158" y2="69" stroke={a} strokeWidth="2"/>
        <ellipse cx="101" cy="36" rx="26" ry="10" fill={c}/>
        <rect x="113" y="28" width="36" height="7" rx="3" fill="#000022"/>
        <rect x="50" y="28" width="24" height="16" rx="3" fill={c}/>
        <rect x="53" y="31" width="18" height="10" rx="2" fill="#ffff99" opacity="0.88"/>
        <line x1="56" y1="63" x2="147" y2="63" stroke="#334466" strokeWidth="4" strokeLinecap="round"/>
        <text x="100" y="88" textAnchor="middle" fill={a} fontSize="8" fontFamily="Impact,sans-serif">SUZUKI GSX-S125</text>
      </svg>
    )
  },
  {
    name: "Lexmoto LXR125", color: "#660099", accent: "#cc44ff", bg: "#0d001a",
    svg: (c, a) => (
      <svg viewBox="0 0 200 95" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="200" height="95" fill="#0d001a"/>
        <circle cx="40" cy="69" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="40" cy="69" r="7" fill={c}/>
        <circle cx="160" cy="69" r="20" fill="none" stroke={c} strokeWidth="5"/>
        <circle cx="160" cy="69" r="7" fill={c}/>
        <polygon points="40,69 52,28 98,20 148,23 160,69 148,65 98,57 56,63" fill={c} opacity="0.88"/>
        <polygon points="52,28 80,20 98,20 96,32 55,34" fill={a} opacity="0.6"/>
        <ellipse cx="52" cy="32" rx="9" ry="6" fill="#ffff99" opacity="0.9"/>
        <polygon points="62,20 90,16 95,27 65,30" fill="#ccaaff" opacity="0.5"/>
        <polygon points="128,23 156,23 160,35 126,35" fill="#0d001a"/>
        <line x1="56" y1="64" x2="148" y2="64" stroke="#885599" strokeWidth="3"/>
        <text x="100" y="88" textAnchor="middle" fill={a} fontSize="8" fontFamily="Impact,sans-serif">LEXMOTO LXR125</text>
      </svg>
    )
  },
];

function BikeCard({ bike, big }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `3px outset ${bike.accent}`,
        overflow: "hidden",
        position: "relative",
        background: bike.bg,
        aspectRatio: big ? "16/9" : "4/3",
        cursor: "crosshair",
        transform: hov ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: hov ? `0 0 14px ${bike.accent}` : "none",
      }}
    >
      {bike.svg(bike.color, bike.accent)}
    </div>
  );
}

function Marquee({ children, speed = 20 }) {
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <span style={{ display: "inline-block", animation: `mq ${speed}s linear infinite`, whiteSpace: "nowrap" }}>
        {children}&nbsp;&nbsp;&nbsp;&nbsp;{children}
      </span>
    </div>
  );
}

export default function App() {
  const [cd, setCd] = useState(getCountdown());
  const [memeIdx, setMemeIdx] = useState(0);
  const [secFlip, setSecFlip] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCd(getCountdown());
      setSecFlip(f => !f);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const panic = Math.min(100, Math.max(3, Math.round((1 - cd.days / 120) * 100)));
  const panicMsg =
    cd.days >= 60 ? "😎 Totally calm. Haven't even Googled 'CBT motorbike' yet." :
    cd.days >= 30 ? "🙂 Getting a bit real. Maybe watch a YouTube video or twelve." :
    cd.days >= 14 ? "😅 Two weeks!! Time to actually sit on a motorbike m8." :
    cd.days >= 7  ? "😬 ONE WEEK. Do you know where the friction point is??? DO YOU???" :
    cd.days >= 3  ? "😰 THREE DAYS. Sleep? Who needs sleep?? PRACTISE INSTEAD." :
    cd.days >= 1  ? "💀 TOMORROW!! Your palms are already sweating aren't they." :
                    "🫡 TODAY IS THE DAY. YOU GOT THIS. PROBABLY. GO GO GO!!!";

  const marq = "🏍️ CBT COUNTDOWN 🏍️    🔥 18TH MAY 2026 - THE BIG DAY 🔥    ⚡ YOU WILL PASS ⚡    🪖 HELMET ON ALWAYS 🪖    💥 CANCEL YOUR INDICATORS 💥    ";

  return (
    <div style={{ background: "#000080", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,180,0.09) 2px,rgba(0,0,180,0.09) 4px),repeating-linear-gradient(90deg,transparent,transparent 2px,rgba(0,0,180,0.09) 2px,rgba(0,0,180,0.09) 4px)", fontFamily: "Impact,'Arial Black',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&display=swap');
        @keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes twobble{0%,100%{transform:skewX(-2deg)}50%{transform:skewX(2deg) scale(1.02)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes glow{0%,100%{text-shadow:3px 3px 0 #f00,0 0 20px #ff0}50%{text-shadow:3px 3px 0 #f00,0 0 50px #ff0,0 0 80px #f90}}
        @keyframes badge{0%,100%{transform:rotate(-8deg) scale(1)}50%{transform:rotate(8deg) scale(1.06)}}
        @keyframes bbounce{0%,100%{transform:translateY(0) scaleX(-1)}50%{transform:translateY(-20px) scaleX(-1)}}
        @keyframes stripe{0%{background-position:0 0}100%{background-position:40px 0}}
        @keyframes rainbow{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @keyframes secpop{0%{transform:scaleY(1)}40%{transform:scaleY(0.75)}100%{transform:scaleY(1)}}
      `}</style>

      {/* RAINBOW MARQUEE */}
      <div style={{ background: "linear-gradient(90deg,#f00,#f70,#ff0,#0f0,#00f,#80f,#f00)", backgroundSize: "200%", animation: "rainbow 2.5s linear infinite", padding: "6px 0", overflow: "hidden", fontSize: "0.9rem", fontWeight: "bold", color: "#000", letterSpacing: 2, borderTop: "3px solid #fff", borderBottom: "3px solid #fff" }}>
        <Marquee speed={20}>{marq}</Marquee>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 10px 40px" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", padding: "18px 10px 6px", position: "relative" }}>
          <div style={{ background: "radial-gradient(circle,#ff0,#f60)", border: "4px solid #f00", borderRadius: "50%", width: 78, height: 78, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.62rem", color: "#000", textAlign: "center", lineHeight: 1.2, position: "absolute", right: 10, top: 18, boxShadow: "0 0 18px #f00", animation: "badge 3s ease-in-out infinite", padding: 6 }}>🏍️<br/>SO<br/>EPIC!!</div>
          <div style={{ color: "#ff0", fontSize: "1.2rem", letterSpacing: 8, marginBottom: 6 }}>✦ ✦ ✦ ✦ ✦ ✦</div>
          <div style={{ fontSize: "clamp(2.8rem,10vw,6rem)", color: "#ff0", textShadow: "4px 4px 0 #f00, 7px 7px 0 #f70, -2px -2px 0 #fff", lineHeight: 0.95, animation: "twobble 1.8s ease-in-out infinite" }}>CBT COUNTDOWN!!</div>
          <div style={{ fontFamily: "'Boogaloo',cursive", fontSize: "clamp(0.85rem,2.5vw,1.25rem)", color: "#0ff", textShadow: "2px 2px 0 #00a", marginTop: 8, animation: "blink 1.2s step-start infinite" }}>~~*~~ THE ULTIMATE MOTORBIKE TEST HYPE PAGE ~~*~~</div>
          <div style={{ color: "#ff0", fontSize: "1.2rem", letterSpacing: 8, marginTop: 8 }}>✦ ✦ ✦ ✦ ✦ ✦</div>
        </div>

        {/* DIVIDER */}
        <div style={{ height: 8, background: "repeating-linear-gradient(90deg,#f00 0,#f00 20px,#ff0 20px,#ff0 40px,#0f0 40px,#0f0 60px,#0ff 60px,#0ff 80px,#00f 80px,#00f 100px,#f0f 100px,#f0f 120px)", margin: "8px 0", border: "2px solid #fff" }} />

        <div style={{ background: "#000", border: "4px dashed #ff0", padding: "6px 12px", margin: "6px 0", fontFamily: "'Courier New',monospace", color: "#f90", fontSize: "0.8rem", fontWeight: "bold", letterSpacing: 2, textAlign: "center" }}>
          ⚠️ [[ BEST VIEWED IN INTERNET EXPLORER 6 AT 800x600 ]] ⚠️ &nbsp; 🏍️ LOADING... PLEASE WAIT 🏍️
        </div>

        {/* BOUNCING BIKES */}
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: 65, overflow: "hidden", margin: "6px 0" }}>
          {[0.7,0.9,0.6,0.8,0.75,0.65,0.85,0.95].map((dur, i) => (
            <span key={i} style={{ fontSize: "1.9rem", display: "inline-block", animation: `bbounce ${dur}s ease-in-out ${i*0.08}s infinite` }}>🏍️</span>
          ))}
        </div>

        {/* COUNTDOWN */}
        <div style={{ background: "linear-gradient(135deg,#1a0033,#000055,#1a0033)", border: "6px ridge #f0f", padding: 20, margin: "12px 0", textAlign: "center", boxShadow: "0 0 28px #f0f, inset 0 0 28px rgba(255,0,255,0.08)" }}>
          <div style={{ color: "#ff0", letterSpacing: 6, marginBottom: 4, fontSize: "0.9rem" }}>★ ★ ★ ★ ★</div>
          <div style={{ color: "#ff0", fontSize: "clamp(1.2rem,3.5vw,1.9rem)", margin: "6px 0 16px", animation: "glow 1.2s ease-in-out infinite" }}>🔥 TIME UNTIL CBT DAY 🔥</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {[["days","DAYS"],["hours","HRS"],["minutes","MINS"],["seconds","SECS"]].map(([key, lbl]) => (
              <div key={key} style={{ background: "linear-gradient(180deg,#f09,#60c)", border: "4px outset #f6f", padding: "12px 16px", minWidth: 78, textAlign: "center" }}>
                <span style={{ fontFamily: "'Courier New',monospace", fontSize: "clamp(2rem,7vw,3.8rem)", fontWeight: "bold", color: "#ff0", textShadow: "0 0 10px #ff0,0 0 20px #f90", lineHeight: 1, display: "block", animation: key === "seconds" ? "secpop 1s ease-in-out infinite" : "none" }}>{pad(cd[key])}</span>
                <div style={{ color: "#0ff", fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase", marginTop: 4, fontFamily: "'Courier New',monospace" }}>{lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ color: "#0f0", fontFamily: "'Courier New',monospace", fontSize: "0.85rem", marginTop: 12, textShadow: "0 0 8px #0f0", letterSpacing: 2 }}>📅 TEST DATE: 18 MAY 2026 @ 08:00 AM 📅</div>
          <div style={{ marginTop: 8, fontSize: "1.8rem" }}>🏍️ 🪖 🏍️</div>
          <div style={{ color: "#ff0", letterSpacing: 6, marginTop: 4, fontSize: "0.9rem" }}>★ ★ ★ ★ ★</div>
        </div>

        {/* TICKER */}
        <div style={{ background: "#000", border: "2px solid #ff0", padding: "5px 8px", overflow: "hidden", fontFamily: "'Courier New',monospace", color: "#ff0", fontSize: "0.8rem", letterSpacing: 1, margin: "6px 0" }}>
          <Marquee speed={26}>💥 CLUTCH IN BEFORE BRAKING &nbsp;|&nbsp; 🪖 HELMET AT ALL TIMES &nbsp;|&nbsp; 👀 HEAD CHECKS = PASSING &nbsp;|&nbsp; 🛑 SMOOTH ON THE BRAKES &nbsp;|&nbsp; ⚙️ FRICTION POINT = BEST FRIEND &nbsp;|&nbsp; 💡 CANCEL YOUR INDICATOR &nbsp;|&nbsp; 🔄 FIGURE OF 8 DAILY &nbsp;|&nbsp;</Marquee>
        </div>

        {/* BIG BIKE GRID */}
        <div style={{ background: "#000033", border: "5px ridge #f0f", padding: 12, margin: "10px 0" }}>
          <div style={{ color: "#f0f", fontSize: "1.35rem", textAlign: "center", textShadow: "2px 2px 0 #000,0 0 14px #f0f", marginBottom: 10 }}>🏍️ THE BIKES YOU'LL WISH YOU OWNED 🏍️</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {BIKES.slice(0,6).map(b => <BikeCard key={b.name} bike={b} big />)}
          </div>
        </div>

        {/* TWO COL */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "10px 0" }}>
          <div style={{ background: "#000033", border: "5px inset #0ff", padding: 12 }}>
            <div style={{ color: "#f90", fontSize: "1.1rem", textAlign: "center", textShadow: "2px 2px 0 #000", marginBottom: 8, borderBottom: "2px dashed #f90", paddingBottom: 6 }}>📸 BIKE GALLERY v2.0</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {BIKES.slice(6,10).map(b => <BikeCard key={b.name} bike={b} />)}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, color: "#0ff", fontFamily: "'Courier New',monospace", fontSize: "0.68rem" }}>HOVER 4 SICK GLOW EFFECT!!!!</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "linear-gradient(135deg,#003300,#001100)", border: "5px outset #0f0", padding: 14, flex: 1 }}>
              <div style={{ color: "#0f0", fontSize: "1.1rem", textAlign: "center", textShadow: "2px 2px 0 #000,0 0 10px #0f0", marginBottom: 8 }}>💬 HYPE GENERATOR 3000</div>
              <div style={{ color: "#fff", fontSize: "0.85rem", lineHeight: 1.5, fontFamily: "'Courier New',monospace", minHeight: 80, display: "flex", alignItems: "center", textAlign: "center", border: "1px dashed #0f0", padding: 10, marginBottom: 10 }}>{MEMES[memeIdx]}</div>
              <button onClick={() => setMemeIdx((memeIdx + 1) % MEMES.length)} style={{ display: "block", width: "100%", background: "linear-gradient(180deg,#f60,#c30)", border: "3px outset #f90", color: "#fff", fontFamily: "Impact,sans-serif", fontSize: "1rem", padding: 8, cursor: "pointer", letterSpacing: 1 }}>⚡ NEXT HYPE ⚡</button>
            </div>
            <div style={{ background: "#000", border: "3px solid #ff0", padding: 10, textAlign: "center" }}>
              <div style={{ color: "#ff0", fontFamily: "'Courier New',monospace", fontSize: "0.72rem", marginBottom: 4 }}>VISITORS:</div>
              <div style={{ background: "#000", border: "3px inset #aaa", display: "inline-block", padding: "4px 12px", fontFamily: "'Courier New',monospace", color: "#0f0", fontSize: "1.2rem", letterSpacing: 4, textShadow: "0 0 8px #0f0" }}>000069</div>
              <div style={{ color: "#aaa", fontFamily: "'Courier New',monospace", fontSize: "0.62rem", marginTop: 4 }}>since 2026</div>
            </div>
          </div>
        </div>

        {/* EMOJI SCROLL */}
        <div style={{ overflow: "hidden", borderTop: "4px solid #f0f", borderBottom: "4px solid #f0f", background: "#000", padding: "4px 0", margin: "10px 0" }}>
          <span style={{ display: "inline-block", fontSize: "3.2rem", animation: "mq 10s linear infinite", whiteSpace: "nowrap", lineHeight: 1 }}>{"🏍️ 🛵 🏍️ 🪖 🏍️ 🛵 🏍️ 💨 🏍️ 🛵 🏍️ 🪖 🏍️ 🛵 🏍️ 💨 ".repeat(2)}</span>
        </div>

        {/* PANIC METER */}
        <div style={{ background: "#1a0000", border: "5px ridge #f00", padding: 14, margin: "10px 0", textAlign: "center" }}>
          <div style={{ fontSize: "1.4rem", color: "#f00", textShadow: "2px 2px 0 #000,0 0 14px #f00", marginBottom: 10, animation: "blink 0.7s step-start infinite" }}>⚠️ PANIC-O-METER ⚠️</div>
          <div style={{ height: 32, background: "#000", border: "3px inset #f00", position: "relative", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${panic}%`, background: "repeating-linear-gradient(90deg,#f00 0,#f00 10px,#f60 10px,#f60 20px)", backgroundSize: "40px 100%", animation: "stripe 0.4s linear infinite", transition: "width 1s ease" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Courier New',monospace", fontWeight: "bold", fontSize: "1rem", textShadow: "1px 1px 0 #000" }}>{panic}%</div>
          </div>
          <div style={{ color: "#f90", fontFamily: "'Courier New',monospace", fontSize: "0.88rem", marginTop: 8, minHeight: 40 }}>{panicMsg}</div>
        </div>

        {/* FUN FACTS */}
        <div style={{ background: "#1a1a00", border: "4px double #ff0", padding: 14, margin: "10px 0" }}>
          <div style={{ color: "#ff0", fontSize: "1.25rem", textAlign: "center", marginBottom: 10 }}>⚡ DID U KNOW?? ⚡</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {FACTS.map(([title, body]) => (
              <div key={title} style={{ background: "#000", border: "2px solid #ff0", padding: 8 }}>
                <div style={{ color: "#ff0", fontFamily: "'Courier New',monospace", fontSize: "0.68rem", fontWeight: "bold" }}>{title}</div>
                <div style={{ color: "#fff", fontFamily: "'Courier New',monospace", fontSize: "0.78rem", marginTop: 3 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 8, background: "repeating-linear-gradient(90deg,#f00 0,#f00 20px,#ff0 20px,#ff0 40px,#0f0 40px,#0f0 60px,#0ff 60px,#0ff 80px,#00f 80px,#00f 100px,#f0f 100px,#f0f 120px)", margin: "8px 0", border: "2px solid #fff" }} />

        <div style={{ background: "#000", padding: 10, textAlign: "center", border: "3px inset #aaa" }}>
          <span style={{ fontSize: "1.6rem" }}>🔥</span>
          <span style={{ color: "#f90", fontSize: "1.1rem", margin: "0 10px" }}>GOOD LUCK LEGENDS!!!</span>
          <span style={{ fontSize: "1.6rem" }}>🔥</span>
          <div style={{ color: "#aaa", fontFamily: "'Courier New',monospace", fontSize: "0.68rem", marginTop: 6 }}>
            Best viewed at 800x600 • Netscape Navigator 4.0+ required<br/>
            This page is <span style={{ color: "#0f0" }}>CBT CERTIFIED ✓</span> • No motorbikes were harmed
          </div>
        </div>

      </div>
    </div>
  );
}
