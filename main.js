document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // Copy Email Functionality
  const copyBtn = document.getElementById("copy-email-btn");
  const copyText = document.getElementById("copy-btn-text");

  if (copyBtn && copyText) {
    copyBtn.addEventListener("click", () => {
      const email = "erik@mattheis.org";
      navigator.clipboard
        .writeText(email)
        .then(() => {
          const originalText = copyText.textContent;
          copyText.textContent = "Copied to Clipboard!";
          copyBtn.style.backgroundColor = "var(--color-success)";
          copyBtn.style.color = "#000";

          setTimeout(() => {
            copyText.textContent = originalText;
            copyBtn.style.backgroundColor = "";
            copyBtn.style.color = "";
          }, 2500);
        })
        .catch((err) => {
          console.error("Copy failed:", err);
        });
    });
  }

  // Quant AI Agent Simulation Data
  const signals = [
    {
      symbol: "AAPL",
      action: "BUY LIMIT @ $224.50",
      actionClass: "text-success",
      stopLoss: "$221.10 (-1.5%)",
      target: "$231.00 (+2.9%)",
      rationale: "3-timeframe EMA compression + unusual volume spike (+180%).",
      subject: "[ACTION REQUIRED] Trade Signal Approval - AAPL Breakout",
    },
    {
      symbol: "NVDA",
      action: "SELL SHORT @ $128.80",
      actionClass: "text-danger",
      stopLoss: "$131.20 (+1.8%)",
      target: "$122.00 (-5.2%)",
      rationale: "RSI divergence on 1H chart + macro liquidity sweep.",
      subject: "[ACTION REQUIRED] Short Hedge Trigger - NVDA Volatility",
    },
    {
      symbol: "SPY",
      action: "REBALANCE / TRIM 15%",
      actionClass: "text-warning",
      stopLoss: "N/A (Portfolio Risk Model)",
      target: "Reduce Delta Exposure to 0.4",
      rationale: "Systemic risk index crossed 0.72 threshold prior to FOMC release.",
      subject: "[ACTION REQUIRED] Risk Model Adjustment - SPY Portfolio",
    },
  ];

  let currentSignalIdx = 0;
  const simTriggerBtn = document.getElementById("sim-trigger-btn");
  const emailSubject = document.getElementById("email-subject");
  const emailTime = document.getElementById("email-time");
  const emailBody = document.getElementById("email-body");

  if (simTriggerBtn) {
    simTriggerBtn.addEventListener("click", () => {
      currentSignalIdx = (currentSignalIdx + 1) % signals.length;
      const sig = signals[currentSignalIdx];

      emailSubject.textContent = sig.subject;
      emailTime.textContent = "Just Now";

      const tradeBox = emailBody.querySelector(".trade-summary-box");
      if (tradeBox) {
        tradeBox.innerHTML = `
          <div class="trade-row"><span>Symbol:</span> <strong class="mono-text">${sig.symbol}</strong></div>
          <div class="trade-row"><span>Action:</span> <strong class="mono-text ${sig.actionClass}">${sig.action}</strong></div>
          <div class="trade-row"><span>Stop Loss:</span> <strong class="mono-text text-danger">${sig.stopLoss}</strong></div>
          <div class="trade-row"><span>Target:</span> <strong class="mono-text text-success">${sig.target}</strong></div>
          <div class="trade-row"><span>Agent Rationale:</span> <span>${sig.rationale}</span></div>
        `;
      }

      // Reset status msg
      const statusEl = document.getElementById("agent-response-status");
      if (statusEl) {
        statusEl.style.display = "none";
        statusEl.textContent = "";
      }
    });
  }
});

// Handle Human Decision in Agent Simulator
function handleAgentDecision(action) {
  const statusEl = document.getElementById("agent-response-status");
  if (!statusEl) return;

  statusEl.style.display = "block";

  if (action === "APPROVED") {
    statusEl.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
    statusEl.style.border = "1px solid var(--color-success)";
    statusEl.style.color = "var(--color-success)";
    statusEl.innerHTML = `✓ <strong>Order Confirmed:</strong> Token dispatched to broker API. Trade execution verified.`;
  } else if (action === "REJECTED") {
    statusEl.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
    statusEl.style.border = "1px solid var(--color-danger)";
    statusEl.style.color = "var(--color-danger)";
    statusEl.innerHTML = `✕ <strong>Order Canceled:</strong> Agent standing down. Parameters logged for backtest fine-tuning.`;
  } else if (action === "ADJUST") {
    statusEl.style.backgroundColor = "rgba(245, 158, 11, 0.15)";
    statusEl.style.border = "1px solid var(--color-warning)";
    statusEl.style.color = "var(--color-warning)";
    statusEl.innerHTML = `⚙ <strong>Parameters Opening:</strong> Lowering position sizing by 50% & setting trailing stop.`;
  }
}

// --------------------------------------------------------------------------
// 300-500 Word Expanded Case Studies Dataset & Modal Controller
// --------------------------------------------------------------------------

const projectCaseStudies = {
  "times-square": {
    category: "Hardware & Video Sync",
    title: "Non-Standard Billboard Frame-Accurate Midnight Video Sync",
    subtitle: "NYC Times Square Landmark Display",
    body: `
      <h4>Project Context & Objectives</h4>
      <p>Contracted to execute a high-profile live video presentation on a prominent triangular LED billboard overlooking Times Square in New York City. The video had to trigger and play synchronized to the exact millisecond as the clock struck midnight on New Year's Eve / live event broadcast.</p>
      
      <h4>The Challenge: Zero Documentation & Non-Standard Hardware</h4>
      <p>The physical LED display hardware arrived on location without vendor documentation, instruction manuals, or standard software APIs. Furthermore, the non-standard triangular screen geometry and controller latency created severe risks of visible video tearing, frame dropping, and aspect ratio stretching across panel seams.</p>

      <h4>Engineering Solution & Reverse Engineering</h4>
      <p>Without manual documentation, I reverse-engineered the display controller's communication protocol directly using serial and network socket packet sniffing. I identified the proprietary control codes required to trigger raw frame playback, bypass software UI lag, and control panel refresh rates.</p>
      <p>To guarantee millisecond precision, I developed a microsecond system clock synchronization harness that monitored local time against high-precision NTP servers, pre-buffering video frames into memory and dispatching playback commands at the exact frame boundary. I also wrote custom aspect-ratio slicing routines tailored to the physical triangular dimensions to ensure perfect alignment without edge distortion.</p>

      <h4>Outcome & Key Impact</h4>
      <p>Delivered a flawless, frame-accurate video presentation live at midnight before a massive live Times Square audience and national broadcast viewers with zero frame dropping, zero latency drift, and crisp geometric visual rendering across all display facets.</p>
    `,
    tags: ["Hardware Reverse Engineering", "C / C++", "Socket Protocols", "Frame Sync", "Media Systems"]
  },

  "bmw-screensaver": {
    category: "Enterprise Systems",
    title: "Global Corporate Network Desktop Workstation Takeover",
    subtitle: "German Luxury Automotive Manufacturer (BMW)",
    body: `
      <h4>Project Context & Objectives</h4>
      <p>A major global luxury automotive manufacturer required a simultaneous, network-wide rollout of a custom interactive screensaver across all corporate employee desktop workstations worldwide to launch an internal brand campaign.</p>

      <h4>The Enterprise IT Challenge</h4>
      <p>Enterprise IT infrastructure enforced exceptionally strict operational constraints: zero memory growth profiles over weeks of continuous background idle execution, minimal CPU utilization during business hours, cross-platform OS workstation support (Windows & macOS), and silent deployment across active directory domains.</p>

      <h4>Engineering Architecture & Memory Optimization</h4>
      <p>I engineered a standalone, lightweight executable payload optimized specifically for zero memory leaks. By implementing strict object lifecycle management, static canvas buffer re-use, and avoiding dynamic heap allocations in animation loops, the payload maintained a rock-solid, flat memory footprint across thousands of continuous runtime hours.</p>
      <p>Working alongside corporate network administrators, I scripted silent installer packages and registry/preference configuration routines that allowed enterprise software management tools to push the update silently across tens of thousands of global endpoints without requiring user restarts or elevated prompt interaction.</p>

      <h4>Outcome & Key Impact</h4>
      <p>Achieved a 100% successful global rollout across corporate headquarters and regional facilities with zero downtime, zero memory leak degradation, and zero reported IT ticket escalations across the entire workstation fleet.</p>
    `,
    tags: ["Enterprise Deployment", "Zero-Leak Memory Architecture", "C / C++ / Win32 / macOS", "Active Directory", "Performance Optimization"]
  },

  "firebell": {
    category: "Live High-Stress Simulation",
    title: "Firebell: C-Level Social Media Crisis Simulator",
    subtitle: "Global Public Relations Agency (Weber Shandwick)",
    body: `
      <h4>Project Context & Objectives</h4>
      <p>In the early era of viral social media, major brands faced sudden, catastrophic reputational threats from online outrage, activist boycotts, product recalls, and leaked corporate communications. Traditional crisis management manuals were obsolete because executive teams had never experienced the velocity of real-time social panic. Weber Shandwick commissioned the architecture and development of <strong>Firebell</strong>—a proprietary social crisis simulator.</p>

      <h4>The Solution: Replicating the Online Universe in a Sandbox</h4>
      <p>I architected and built <strong>Firebell</strong> as a secure, real-time web application capable of building pixel-perfect, fully interactive replicas of major social platforms (Facebook, Twitter/X, YouTube) and corporate news blogs within a completely isolated, off-the-internet sandbox environment.</p>
      <p>Firebell allowed crisis facilitators to construct realistic scenarios where fake hostile stakeholder accounts, enraged customer groups, and simulated news media outlets unleashed rapid-fire attacks against the client's brand. Facilitators used a real-time event control dashboard to inject unexpected plot twists—such as trending hashtag surges, petition launches, or fake video leaks—forcing executive teams to respond live under immense pressure.</p>

      <h4>Engineering & Security Isolation</h4>
      <p>Because the platform simulated intense corporate emergencies and reputational panics, absolute network isolation was mandatory. I engineered strict sandbox boundaries ensuring zero simulated posts or media assets could ever leak onto the public web, while maintaining high-concurrency real-time WebSocket feeds for participants in the room.</p>

      <h4>Outcome & Industry Impact</h4>
      <p>Firebell put hundreds of Fortune 500 C-suite executives, legal counsel, and PR leadership teams through live "trial-by-fire" crisis exercises globally, establishing Weber Shandwick as the global leader in digital crisis preparedness.</p>
    `,
    tags: ["Firebell", "Weber Shandwick", "Full-Stack Web Architecture", "Real-Time WebSockets", "Crisis Simulation", "Fortune 500 C-Suite"]
  },

  "linetrader": {
    category: "Quant & AI Agents",
    title: "LineTrader: Algorithmic Quant Engine & Human-in-the-Loop AI",
    subtitle: "Personal Quantitative Trading Infrastructure",
    body: `
      <h4>Project Context & Architecture</h4>
      <p>Designed and built <strong>LineTrader</strong>, a personal quantitative trading platform engineered for multi-timeframe OHLCV market analysis, technical indicator generation, backtesting simulation, and automated order execution.</p>

      <h4>High-Performance DuckDB Time-Series Cache</h4>
      <p>At the core of LineTrader is <code class="mono-text">@erikmattheis/data-tools</code>, a custom DuckDB time-series bar caching module I built. It organizes historical OHLCV data into partitioned DuckDB files (<code class="mono-text">&lt;provider&gt;/&lt;barSize&gt;.duckdb</code>), tracks range coverage intervals, and automatically detects and fills historical data gaps via API fetchers, dramatically accelerating backtests and live analysis.</p>

      <h4>Human-in-the-Loop AI Agent Integration</h4>
      <p>Rather than leaving trade execution completely unsupervised, I integrated custom LLM AI agents (OpenAI API) into the trading loop. The AI agents continually monitor market sentiment, volume compression, and technical indicator alignment across multiple timeframes.</p>
      <p>When an agent identifies a high-probability trade hypothesis, it constructs a structured trade proposal (entry limit price, stop loss, take profit target, position sizing, and risk rationale) and emails an interactive approval request directly to my inbox.</p>
      <p>Clicking an approval button in the email dispatches a cryptographically signed web token back to the local execution daemon, which verifies the signature and places the trade with the broker's API instantly.</p>

      <h4>Outcome & Personal Execution</h4>
      <p>LineTrader provides disciplined, quantitative risk management backed by automated AI hypothesis generation, keeping human risk management in ultimate control before capital is deployed.</p>
    `,
    tags: ["LineTrader", "DuckDB", "Node.js / Python", "LLM AI Agents", "Quant Trading", "Human-in-the-Loop", "Crypto / Equities API"]
  },

  "memory-leak": {
    category: "Systems Diagnostics",
    title: "Node.js Memory Leak Diagnostic Suite & Agent Benchmark",
    subtitle: "Memory Leak Tutorial Engine (`memiry-leak`)",
    body: `
      <h4>Project Context & Objectives</h4>
      <p>In long-running Node.js processes—such as continuous algorithmic trading loops, WebSocket market data streaming microservices, and serverless background workers—subtle memory leaks gradually degrade garbage collection performance, increase event loop latency, and lead to sudden out-of-memory crashes.</p>

      <h4>Engineering a Memory Leak Diagnostic Suite</h4>
      <p>I built an isolated diagnostic web application and tutorial benchmark (<code class="mono-text">memiry-leak</code>) featuring reproducible test beds that isolate specific, real-world Node.js heap leaks: circular closure references, orphaned event listeners, uncleared timers, and unbounded array growth.</p>
      <p>This suite serves a dual purpose: it acts as a visual learning environment for deep heap profiling and provides a standardized benchmark to evaluate and train AI coding agents on diagnosing memory leaks from heap snapshot dumps and memory allocation timelines.</p>

      <h4>Real-World Fixes Applied</h4>
      <ul>
        <li><strong>IBKR Broker API Event Listeners:</strong> Implemented explicit event listener cleanup in error handling and reconnection branches to prevent unbounded listener accumulation.</li>
        <li><strong>Market Data Provider Timers:</strong> Fixed uncleared timer retention in WebSocket reconnection loops.</li>
        <li><strong>Rate Limiter Arrays:</strong> Enforced hard upper bounds on rate-limiting window arrays to prevent unconstrained memory growth.</li>
      </ul>

      <h4>Outcome & Impact</h4>
      <p>Eliminated memory degradation in live market data collection microservices, ensuring flat memory utilization across weeks of continuous high-volume execution, while proving the capability of AI agents to reason about low-level Node.js memory profiling.</p>
    `,
    tags: ["Node.js Heap Profiling", "V8 Engine Diagnostics", "Memory Leaking Fixes", "AI Agent Benchmark", "WebSockets", "Performance Optimization"]
  },

  "naturally-hued": {
    category: "Multimodal AI Studio",
    title: "AI-Powered Generative Content & Asset Studio",
    subtitle: "NaturallyHued.com",
    body: `
      <h4>Project Context & Objectives</h4>
      <p>Developed <strong>NaturallyHued.com</strong> as an exploration of automated, AI-assisted content publishing and generative asset creation focused on botanical dyes, natural pigments, and sustainable textile art.</p>

      <h4>Full-Stack Architecture & AI Integration</h4>
      <p>The platform is engineered as a single-page web app using Vue 3 and Vite, deployed on Netlify, and backed by Google Cloud Functions and Firestore database storage.</p>
      <p>The backend features serverless microservices connecting OpenAI GPT models for structured article generation (historical context, chemical properties, dye application guides) and DALL-E models for generative image representation of botanical pigments.</p>

      <h4>Human-in-the-Loop Editorial CMS</h4>
      <p>To ensure high editorial quality, I built a custom administrator portal. Editors can review generated articles and images, make direct text edits, or submit conversational revision prompts to the AI engine to regenerate specific sections dynamically.</p>

      <h4>Outcome & Key Impact</h4>
      <p>Demonstrates a complete full-stack blueprint for human-in-the-loop AI publishing, showcasing how modern LLMs and generative image models can be embedded cleanly into an automated content management system.</p>
    `,
    tags: ["NaturallyHued.com", "Vue 3 / Vite", "OpenAI GPT / DALL-E", "Google Cloud Functions", "Firestore", "CMS Architecture"]
  },

  "dank-spider": {
    category: "Data Harvesting",
    title: "Autonomous Web Scraping & Market Data Pipeline",
    subtitle: "DankSpider.com",
    body: `
      <h4>Project Context & Objectives</h4>
      <p>Built <strong>DankSpider.com</strong> as a high-throughput, autonomous web crawling engine for large-scale enterprise data extraction, corporate metadata gathering, and market research intelligence.</p>

      <h4>Headless Browser Automation & Pipeline Design</h4>
      <p>The system utilizes Node.js and Puppeteer to orchestrate headless browser instances capable of bypassing bot-detection mechanisms, rendering dynamic JavaScript single-page applications, and extracting structured DOM data.</p>
      <p>It integrates Google Search APIs for seed URL discovery, stores extracted records in MongoDB document collections, and runs automated JSON-to-CSV transformation jobs for downstream quantitative processing.</p>

      <h4>Fault Tolerance & Reliability</h4>
      <p>To handle network disruptions and anti-scraping blocks during large collection runs, I implemented asynchronous worker pools featuring proxy rotation, intelligent rate throttling, and exponential backoff retry wrappers.</p>

      <h4>Outcome & Key Impact</h4>
      <p>Delivered an automated, hands-free web scraping pipeline capable of harvesting structured datasets from thousands of target domains reliably.</p>
    `,
    tags: ["DankSpider.com", "Puppeteer / Headless Chrome", "Node.js", "MongoDB", "ETL Pipelines", "Proxy Management"]
  },

  "slot-machine": {
    category: "Vue 3 & Audio API",
    title: "Interactive Web Audio & Canvas Slot Machine Engine",
    subtitle: "Vue 3 / Vuex Web Application",
    body: `
      <h4>Project Context & Objectives</h4>
      <p>Designed and engineered a feature-rich, web-based slot machine game utilizing Vue 3, Vuex 4 state management, Web Audio API, and CSS 3D reel perspective transformations.</p>

      <h4>Engineering Highlights & State Architecture</h4>
      <p>The application is built with a highly modular Vue 3 component architecture featuring <code class="mono-text">BaseReel</code>, <code class="mono-text">SymbolFace</code>, <code class="mono-text">TheCreditMeter</code>, <code class="mono-text">ThreeDButton</code>, and <code class="mono-text">TheBirdhouseAnimation</code>.</p>
      <p>A central Vuex state machine manages spin velocity, reel deceleration physics, symbol payline alignment, payout calculations, and credit meters. The audio subsystem utilizes low-latency Web Audio API buffers synchronized precisely to reel stop events and payout animations.</p>

      <h4>Outcome & Key Impact</h4>
      <p>Demonstrates advanced Vue 3 frontend state architecture, custom CSS 3D rendering performance, and Web Audio API integration for interactive multimedia web applications.</p>
    `,
    tags: ["Vue 3 / Vuex 4", "Web Audio API", "CSS 3D Transformations", "Game Physics State Machine", "Frontend Architecture"]
  },

  "articl-net": {
    category: "Healthcare Directory",
    title: "Medical Radiology Directory & AI Content Pipeline",
    subtitle: "Articl.net Knowledge Portal",
    body: `
      <h4>Project Context & Objectives</h4>
      <p>Developed <strong>Articl.net</strong>, an online reference directory and knowledge management portal specifically designed for medical radiology research papers and clinical literature.</p>

      <h4>Engineering Features & AI Categorization</h4>
      <p>The backend is built with Node.js and MongoDB delivering a high-performance RESTful API, paired with a responsive Vue.js frontend interface.</p>
      <p>Integrated natural language processing algorithms to automatically parse medical abstracts, categorize articles by anatomical sub-specialty (e.g., neuroradiology, musculoskeletal, thoracic), and extract key diagnostic indexing terms.</p>
      <p>Built a custom editorial CMS enabling radiologists to bookmark, annotate, and organize literature for clinical practice and academic research.</p>

      <h4>Outcome & Key Impact</h4>
      <p>Streamlined literature discovery for radiologists and medical researchers through structured AI categorization and clean full-stack web architecture.</p>
    `,
    tags: ["Articl.net", "Node.js / Express", "MongoDB", "Vue.js", "Medical NLP", "RESTful API"]
  }
};

function openProjectModal(projectId) {
  const data = projectCaseStudies[projectId];
  if (!data) return;

  const modal = document.getElementById("project-modal");
  const modalCategory = document.getElementById("modal-category");
  const modalTitle = document.getElementById("modal-title");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const modalBody = document.getElementById("modal-body");
  const modalTags = document.getElementById("modal-tags");

  if (modalCategory) modalCategory.textContent = data.category;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
  if (modalBody) modalBody.innerHTML = data.body;

  if (modalTags) {
    modalTags.innerHTML = data.tags
      .map((tag) => `<span class="tech-pill">${tag}</span>`)
      .join("");
  }

  if (modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
  }
}

function closeProjectModal(event) {
  if (event && event.stopPropagation) {
    event.stopPropagation();
  }
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scrolling
  }
}
