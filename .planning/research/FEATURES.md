# Feature Landscape

**Domain:** Personal portfolio website for Information Security professional (Kazuha aesthetic)
**Researched:** 2026-03-22

## Table Stakes

Features users expect. Missing = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|-------------|------------|-------|
| **Hero Section** | First impression — name, title, one-liner. Recruiters spend <10 seconds deciding to stay or leave. | Low | Must answer: Who are you? What do you do? Already planned in PROJECT.md. |
| **About / Story Section** | Hiring managers hire people, not skills. Personality and narrative build connection. | Low | Already planned as "Story" section. Keep concise — 2-3 paragraphs max. |
| **Skills / Arsenal Section** | Recruiters scan for keywords (SIEM, Burp Suite, Wireshark, Nmap). Tools listed without context don't help. | Low-Med | Already planned as "Arsenal". Use categories (Offensive, Defensive, DevOps). Include brief context for each tool. |
| **Contact Information** | Surprising how many portfolios make this hard. Email + LinkedIn must be visible without hunting. | Low | Social links already planned. Add a direct email link or copy-to-clipboard. |
| **Mobile Responsive** | 60%+ of recruiters browse on phones. Broken mobile = instant rejection. | Med | Tailwind responsive classes. Test on real devices. |
| **Fast Loading** | 53% of visitors abandon sites taking >3 seconds. Slow = unprofessional signal. | Med | Next.js Image optimization, lazy loading, CDN. Core Web Vitals targets: LCP <2.5s, CLS <0.1. |
| **Dark Mode Default** | Expected in 2026 for tech portfolios. Already planned. | Low | Already specified in PROJECT.md (#0a0a0a). |
| **Working Links** | Broken demo links are an instant red flag. Test everything before deploy. | Low | Automated link checking in CI or manual QA. |
| **Social Links (GitHub, LinkedIn, Email)** | Standard for any tech professional. Already planned. | Low | Already in requirements. |
| **Clear Navigation** | If recruiters can't find your work in 2 clicks, they leave. | Low | Fixed navbar already planned. Ensure smooth scroll to sections. |

## Differentiators

Features that set this portfolio apart. Not expected, but valued — competitive advantage.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Kazuha Aesthetic + Particle Effects** | Instantly memorable. Most portfolios are template clones. A cohesive visual theme with falling maple leaves is unique and demonstrates frontend skill. | High | tsParticles already planned. This is the #1 visual differentiator — lean into it hard. |
| **Glassmorphism Cards** | Modern, elegant look that fits the "wanderer" vibe. Shows attention to design detail. | Med | Already planned. Ensure backdrop-filter fallback for older browsers. |
| **i18n (Vietnamese/English)** | Signals global awareness and technical competence. Very few portfolios do this well. Shows i18n engineering skill. | Med | Already planned. Use next-intl or similar. Don't just Google Translate — make both versions authentic. |
| **Centralized Config (site.ts)** | Demonstrates clean architecture thinking. Mention it in the portfolio itself as a "meta" feature. | Low | Already planned. This is a soft signal of engineering maturity. |
| **Theme Toggle (Dark/Light)** | Accessibility consideration + shows polish. Not all portfolios bother. | Low | Already planned. Smooth transition animation adds delight. |
| **Smooth Scroll Animations (Framer Motion)** | Signals attention to UX detail. Recruiters notice polish. | Med | Already planned. Keep it subtle — 60fps on mobile is non-negotiable. |
| **Performance Metrics Display** | Show Lighthouse scores, load times, or Core Web Vitals on the site itself. Proves you practice what you preach. | Low | Consider a small "Built with performance in mind" badge showing live scores. |
| **Live Cursor / Visitor Count** | Engagement features that show real-time tech skills. Memorable but not essential. | High | Nice-to-have if time permits. Supabase for real-time data. Defer if it threatens deadline. |

### InfoSec-Specific Differentiators (Content-Level)

These aren't code features — they're content types that make an InfoSec portfolio stand out to cybersecurity recruiters specifically.

| Content Type | Why It Stands Out | Notes |
|-------------|-------------------|-------|
| **CTF Write-ups with Methodology** | Shows HOW you think, not just WHAT you know. Recruiters value methodology over results. | Include dead ends you hit. Document your thought process. Don't just post answers. |
| **Homelab Documentation** | Proves hands-on practice. 93% of cybersecurity hiring managers value this. | Architecture diagrams, tools used, what you learned. Even basic setups impress. |
| **Security Tool Scripts / Projects** | Signals you can BUILD, not just USE. Very few candidates do this. | Log parsers, recon scripts, automation tools. Even small ones count. Link to GitHub repos with clear READMEs. |
| **Certifications with Applied Context** | Everyone lists certs. Few explain how they APPLIED the knowledge. | "After earning Security+, I used the methodology to build X" > just listing "Security+". |

## Anti-Features

Features to explicitly NOT build. These actively harm the portfolio.

| Anti-Feature | Why Avoid | What to Do Instead |
|-------------|-----------|-------------------|
| **Wall of Technologies** | Listing 30+ technologies suggests exaggeration. Recruiters see through it. | List 8-12 tools you've actually built with. Categorize them. Provide context. |
| **Blog Section** | Scope creep. A blog needs ongoing content or it looks abandoned. PROJECT.md explicitly excludes this. | If writing is important, link to external posts (Medium, dev.to) from the Story section. Don't build a blog into the portfolio. |
| **Testimonials / Recommendations** | For a personal portfolio without clients, this feels fake or premature. | Link to LinkedIn recommendations instead. Let LinkedIn handle social proof. |
| **Overly Complex Animations** | 60fps on mobile is hard. Heavy animations hurt performance scores and battery life. Recruiters on phones will notice. | Particle effects already planned — cap particle count per device. Use Framer Motion for UI animations, not hero spectacles. |
| **Contact Form** | Adds backend complexity. Forms need spam protection, server handling, form validation. Against "static portfolio only" constraint. | Use mailto: links or direct email copy. LinkedIn message button. Keep it simple. |
| **Visitor Counter / Analytics Visible** | Showing "47 visitors" to a new portfolio signals low traffic. Looks worse than not showing it. | Use analytics internally (Vercel Analytics). Don't display counts unless they're impressive. |
| **Generic Stock Photos** | Stock photos scream "template." Especially bad for a portfolio that's supposed to be personal. | Use custom graphics, CSS art, or no images. The particle effects + glassmorphism ARE the visual identity. |
| **Every Project You've Ever Done** | Bloated portfolios dilute impact. Recruiters judge you by your weakest work. | Curate 3-5 strongest projects max. Quality over quantity always. |
| **"Coming Soon" Sections** | Signals incomplete work. Worse than not having the section at all. | Only ship sections that are complete. Remove placeholders before deploy. |
| **Auto-playing Audio/Sound** | Instant close for most visitors. Disrespectful of user context. | No sound effects. Particle visuals are enough atmosphere. |
| **Chatbot / AI Assistant** | Over-engineering for a portfolio. Adds complexity, maintenance, and potential for bad responses. | Your content IS the conversation. Make it clear and scannable instead. |

## Feature Dependencies

```
Navbar (fixed, glassmorphism)
  └─ Smooth scroll to sections
       └─ All sections must exist and have IDs

site.ts config
  └─ All text content flows from here
       └─ i18n translations also flow from config

tsParticles (maple leaves)
  └─ Must respect pointer-events (not block clicks on cards)
  └─ Performance tuning depends on device detection

Dark/Light theme
  └─ Glassmorphism cards need different blur/opacity per theme
  └─ Particle colors may need adjustment per theme

Framer Motion animations
  └─ Each section can animate independently
  └─ Scroll-triggered animations require IntersectionObserver
```

## MVP Recommendation

### Prioritize (Ship First)
1. **Hero Section** with name, title, particle effects — first impression
2. **Story Section** — who you are, your InfoSec journey
3. **Arsenal Section** — categorized skills with context (not a wall)
4. **Social Links** — GitHub, LinkedIn, Email in footer/navbar
5. **Mobile Responsive** — test on real devices
6. **Dark Mode** — default theme, glassmorphism cards

### Phase 2 (Polish)
7. **Gallery Section** — project showcase with case study depth (not screenshots)
8. **Values Section** — personal philosophy, what drives you
9. **i18n** — Vietnamese/English toggle
10. **Theme Toggle** — dark/light with smooth transition
11. **Scroll Animations** — Framer Motion entrance animations

### Defer (If Time Permits)
12. **Performance Metrics Badge** — meta feature showing you care about performance
13. **Visitor Count** — only if numbers are impressive
14. **Sound effects** — probably skip entirely

### Never Build
- Blog, contact form, testimonials, chatbot, "coming soon" sections

## Sources

- Learni Group (2026-03-07): "How to Build a Developer Portfolio Website in March 2026" — 78% of hiring managers prioritize custom portfolios
- StudentPerks (2026-03-15): Live projects + depth over breadth + technical writing are the 3 traits that stand out
- Curious Page (2026-02-23): 3 seconds to capture attention; 93% of hiring managers check candidate GitHub
- TechTimes (2026-03-11): Video walkthroughs increase recruiter engagement 42% over static screenshots
- Medium/Abdullah Javeed (2025-12-12): "500+ Cybersecurity Portfolios Reviewed" — generic projects = instant rejection
- HADESS (2026-02-28): Cybersecurity portfolio must include CTF write-ups, homelab docs, blog posts, tool projects
- Scale.jobs (2025-07-26): 85% of hiring managers value problem-solving above all; 80% want clean documented code
- LinkedIn/Luke Gough (2026-01-28): Role clarity and evidence over buzzwords matter for cybersecurity hiring
- FolioX (2026): Cybersecurity portfolio best practices — CTF write-ups, homelab, sanitized vuln assessments
