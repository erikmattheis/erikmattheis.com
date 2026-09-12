# erikmattheis.com

Personal resume and portfolio website for Erik Mattheis — Senior Full Stack Engineer & Quant Developer.

## Overview

A modern, responsive single-page web application featuring high-stakes engineering case studies, interactive AI agent simulations, and a modal drawer system for expanded 300+ word project deep dives.

## Features

- **High-Stakes Case Studies:** Interactive expandable cards covering real-world engineering challenges (Times Square billboard frame sync, BMW enterprise workstation rollouts, Firebell social crisis simulator).
- **Quant & AI Systems Showcase:** Dedicated sections highlighting LineTrader, DuckDB time-series bar caching (`@duckdb/node-api`), AWS S3 integration (`@aws-sdk/client-s3`), and human-in-the-loop AI email approval workflows.
- **Interactive AI Agent Simulator:** Live widget simulating trade signal generation and interactive email approval responses.
- **Modal Case Study Drawer:** Fast, slide-out drawer providing 300–500 word technical breakdowns for 9 featured projects.

## Project Structure

```
erikmattheis.com/
├── index.html     # Semantic HTML5 layout and modal drawer markup
├── styles.css     # Dark mode CSS styling, grid layouts, and drawer transitions
├── main.js        # Mobile nav, copy email, AI agent simulation, and modal controller
└── .gitignore     # Git ignore rules
```

## Local Development

Open `index.html` directly in any web browser or serve it using any static HTTP server (e.g. `npx serve .` or VS Code Live Server).
