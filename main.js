document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Copy Email Functionality
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-btn-text');

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', () => {
      const email = 'erik@mattheis.org';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyText.textContent;
        copyText.textContent = 'Copied to Clipboard!';
        copyBtn.style.backgroundColor = 'var(--color-success)';
        copyBtn.style.color = '#000';

        setTimeout(() => {
          copyText.textContent = originalText;
          copyBtn.style.backgroundColor = '';
          copyBtn.style.color = '';
        }, 2500);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  }

  // Quant AI Agent Simulation Data
  const signals = [
    {
      symbol: 'AAPL',
      action: 'BUY LIMIT @ $224.50',
      actionClass: 'text-success',
      stopLoss: '$221.10 (-1.5%)',
      target: '$231.00 (+2.9%)',
      rationale: '3-timeframe EMA compression + unusual volume spike (+180%).',
      subject: '[ACTION REQUIRED] Trade Signal Approval - AAPL Breakout'
    },
    {
      symbol: 'NVDA',
      action: 'SELL SHORT @ $128.80',
      actionClass: 'text-danger',
      stopLoss: '$131.20 (+1.8%)',
      target: '$122.00 (-5.2%)',
      rationale: 'RSI divergence on 1H chart + macro liquidity sweep.',
      subject: '[ACTION REQUIRED] Short Hedge Trigger - NVDA Volatility'
    },
    {
      symbol: 'SPY',
      action: 'REBALANCE / TRIM 15%',
      actionClass: 'text-warning',
      stopLoss: 'N/A (Portfolio Risk Model)',
      target: 'Reduce Delta Exposure to 0.4',
      rationale: 'Systemic risk index crossed 0.72 threshold prior to FOMC release.',
      subject: '[ACTION REQUIRED] Risk Model Adjustment - SPY Portfolio'
    }
  ];

  let currentSignalIdx = 0;
  const simTriggerBtn = document.getElementById('sim-trigger-btn');
  const emailSubject = document.getElementById('email-subject');
  const emailTime = document.getElementById('email-time');
  const emailBody = document.getElementById('email-body');

  if (simTriggerBtn) {
    simTriggerBtn.addEventListener('click', () => {
      currentSignalIdx = (currentSignalIdx + 1) % signals.length;
      const sig = signals[currentSignalIdx];

      emailSubject.textContent = sig.subject;
      emailTime.textContent = 'Just Now';

      const tradeBox = emailBody.querySelector('.trade-summary-box');
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
      const statusEl = document.getElementById('agent-response-status');
      if (statusEl) {
        statusEl.style.display = 'none';
        statusEl.textContent = '';
      }
    });
  }
});

// Handle Human Decision in Agent Simulator
function handleAgentDecision(action) {
  const statusEl = document.getElementById('agent-response-status');
  if (!statusEl) return;

  statusEl.style.display = 'block';

  if (action === 'APPROVED') {
    statusEl.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
    statusEl.style.border = '1px solid var(--color-success)';
    statusEl.style.color = 'var(--color-success)';
    statusEl.innerHTML = `✓ <strong>Order Confirmed:</strong> Token dispatched to broker API. Trade execution verified.`;
  } else if (action === 'REJECTED') {
    statusEl.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
    statusEl.style.border = '1px solid var(--color-danger)';
    statusEl.style.color = 'var(--color-danger)';
    statusEl.innerHTML = `✕ <strong>Order Canceled:</strong> Agent standing down. Parameters logged for backtest fine-tuning.`;
  } else if (action === 'ADJUST') {
    statusEl.style.backgroundColor = 'rgba(245, 158, 11, 0.15)';
    statusEl.style.border = '1px solid var(--color-warning)';
    statusEl.style.color = 'var(--color-warning)';
    statusEl.innerHTML = `⚙ <strong>Parameters Opening:</strong> Lowering position sizing by 50% & setting trailing stop.`;
  }
}
