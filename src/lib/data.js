export const SITE = {
  name:        'Testwise',
  tagline:     'Autonomous QA, built around your stack.',
  sub:         'Every Testwise engagement is architected from scratch — your tools, your processes, your risk profile.',
  parent:      'Advanse-IT',
  parentUrl:   'https://advanseit.com.au',
  url:         'https://testwise.advanseit.com.au',
  email:       'hello@advanseit.com.au',
  linkedin:    'https://linkedin.com/in/sushruth007',
  personalSite:'https://sush.au',
  location:    'Brisbane, Queensland, Australia',
}

export const STAGES = [
  {
    id: 1, name: 'Requirement Analysis', tool: 'Your project management tool',
    icon: 'FileText',
    desc: 'Reads your sprint stories, epics, and acceptance criteria from your existing project management platform. Maps test scope, identifies gaps, and flags ambiguities — before a single test is written.',
  },
  {
    id: 2, name: 'Test Case Generation', tool: 'Claude AI',
    icon: 'ListChecks',
    desc: 'Generates comprehensive, structured test cases covering happy paths, edge cases, negative scenarios, and boundary conditions — calibrated to your domain, your team conventions, and your risk appetite.',
  },
  {
    id: 3, name: 'Test Automation', tool: 'Your test framework',
    icon: 'Code2',
    desc: 'Writes executable automation scripts in your chosen framework and language. No new tooling imposed. The pipeline works with what your team already uses.',
  },
  {
    id: 4, name: 'Test Execution', tool: 'Your CI/CD pipeline',
    icon: 'Play',
    desc: 'Triggers and manages the full test run inside your existing CI/CD infrastructure. Captures results, screenshots, trace logs, and performance metrics across all target environments.',
  },
  {
    id: 5, name: 'Defect Triage', tool: 'Claude AI',
    icon: 'BugOff',
    desc: 'Analyses every failure. Classifies defects by severity, category, and root cause. Links each issue back to the originating requirement. No manual investigation required.',
  },
  {
    id: 6, name: 'Issue Logging', tool: 'Your issue tracker',
    icon: 'TicketCheck',
    desc: 'Creates fully-formed defect tickets in your issue tracker — populated with steps to reproduce, severity, screenshots, environment details, and build references. Ready for developer action immediately.',
  },
  {
    id: 7, name: 'Test Reporting', tool: 'Your test management platform',
    icon: 'BarChart3',
    desc: 'Syncs results to your existing test management platform of choice. Maintains historical baselines, tracks coverage trends, and surfaces quality signals across sprints. Works with whatever platform your team already runs.',
  },
  {
    id: 8, name: 'Sign-off & Delivery', tool: 'Auto-delivered',
    icon: 'FileCheck2',
    desc: 'Generates a clear, auditable test summary — adapted to your reporting standards — and delivers it to the right stakeholders. Sprint QA closed. No human effort required.',
  },
]

export const GATE_MODES = {
  full:       { label: 'Fully Autonomous',      gates: [],              desc: 'All eight stages execute without human intervention. Maximum velocity, zero overhead.' },
  startup:    { label: 'Sign-off Gate',         gates: [8],             desc: 'Fully autonomous throughout, with a human release sign-off. One gate, maximum speed.' },
  enterprise: { label: 'Enterprise',            gates: [2, 8],          desc: 'Human review of generated test cases and final sign-off. Seventy-five percent autonomous.' },
  government: { label: 'Government / Regulated',gates: [1, 2, 5, 8],   desc: 'Four configurable gates satisfy change advisory board and audit trail requirements.' },
  regulated:  { label: 'High Compliance',       gates: [1, 2, 4, 5, 8],desc: 'Five gates with immutable approval log. Designed for APRA, TGA, and ISO-regulated environments.' },
}

export const BESPOKE_PILLARS = [
  {
    icon: 'Wrench',
    title: 'Built around your tools',
    body: 'No new platforms imposed. Testwise integrates with your existing project management, CI/CD, issue tracking, and test management stack — whatever you already run.',
  },
  {
    icon: 'Fingerprint',
    title: 'Calibrated to your domain',
    body: 'The AI is trained on your codebase, your domain language, and your team\'s testing conventions. Test cases read like your senior engineers wrote them.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Matched to your risk profile',
    body: 'Gate configuration is determined by your compliance obligations, release governance, and organisational risk appetite — not a product default.',
  },
  {
    icon: 'GitBranch',
    title: 'Evolves with your product',
    body: 'As your architecture, teams, and processes change, the pipeline adapts. Ongoing advisory ensures the system stays ahead of your product, not behind it.',
  },
]

export const VERTICALS = [
  {
    icon: 'Landmark',
    name: 'Government',
    gates: '4 approval gates',
    gateType: 'amber',
    body: 'DTA-aligned delivery with immutable audit trail per sprint. Approval gates satisfy change advisory board requirements, procurement governance, and public sector release standards.',
  },
  {
    icon: 'Building2',
    name: 'Financial Services',
    gates: 'APRA CPS 234 aligned',
    gateType: 'amber',
    body: 'Human oversight at defect triage and release sign-off. Automated evidence packaging for release governance. Immutable per-sprint audit record aligned to APRA and internal risk frameworks.',
  },
  {
    icon: 'HeartPulse',
    name: 'Healthcare & MedTech',
    gates: 'TGA validation support',
    gateType: 'amber',
    body: 'Start fully gated for clinical software validation. Approval gates can be retired progressively as the system earns demonstrated accuracy — documented, evidence-based, auditable.',
  },
  {
    icon: 'Warehouse',
    name: 'Logistics & Mining',
    gates: 'Zero-downtime QA',
    gateType: 'teal',
    body: '24×7 live system testing with full autonomy and a single release gate. Proven on complex warehouse automation software with multiple concurrent hardware integrations in production.',
  },
  {
    icon: 'Rocket',
    name: 'Digital Agencies',
    gates: 'Fully autonomous',
    gateType: 'teal',
    body: 'Eliminate the QA bottleneck on client delivery without adding headcount. Full autonomy, single sign-off gate, clean handover documentation per sprint. Protect your margins, accelerate delivery.',
  },
  {
    icon: 'Layers',
    name: 'SaaS & Product Teams',
    gates: 'Fully autonomous',
    gateType: 'teal',
    body: 'Continuous sprint-by-sprint autonomous coverage that compounds with every run. Ship every deployment with a complete, auditable quality record. No manual QA cycle, no release risk.',
  },
]

export const HOW_STEPS = [
  {
    num: '01',
    icon: 'Search',
    title: 'Discovery & architecture',
    body: 'We map your full environment — tech stack, tools, team structure, release cadence, and compliance obligations. The pipeline architecture is designed specifically for your context before a single line is written.',
  },
  {
    num: '02',
    icon: 'PlugZap',
    title: 'Integration & configuration',
    body: 'Testwise connects to your existing tools via OAuth and API — your project management, CI/CD, issue tracker, and test management platform. Nothing is ripped out. No new tooling mandated.',
  },
  {
    num: '03',
    icon: 'SlidersHorizontal',
    title: 'Gate configuration',
    body: 'We configure human approval gates based on your risk profile and compliance requirements. Start fully gated if needed. Gates are retired progressively as the system earns measurable trust.',
  },
  {
    num: '04',
    icon: 'Rocket',
    title: 'First autonomous sprint',
    body: 'The pipeline runs your first sprint end to end — requirements to sign-off — with your team observing. The output is reviewed, calibrated, and refined before handing control to the AI.',
  },
  {
    num: '05',
    icon: 'TrendingUp',
    title: 'Continuous optimisation',
    body: 'Ongoing advisory ensures the pipeline evolves with your product. Coverage expands, new story types are onboarded, and gate configuration is updated as your team and product mature.',
  },
]

export const PRICING = [
  {
    tier: 'Assessment',
    name: 'QA Maturity Audit',
    desc: 'A structured engagement to assess your current QA posture, tool landscape, and readiness for autonomous testing. Delivered as a prioritised roadmap and executive brief.',
    price: '3,500',
    cadence: 'Fixed fee · One week',
    featured: false,
    cta: 'Request an audit',
    features: [
      'Full QA maturity assessment',
      'Tool and process landscape review',
      'Automation coverage baseline',
      'AI pipeline readiness scoring',
      'Prioritised implementation roadmap',
      'Executive summary presentation',
    ],
  },
  {
    tier: 'Implementation',
    name: 'Bespoke Pipeline Build',
    desc: 'End-to-end design and deployment of your autonomous QA pipeline — architected around your stack, your team, and your risk profile. From discovery to first autonomous sprint.',
    price: '20,000',
    cadence: 'From · 2–3 week engagement',
    featured: true,
    badge: 'Core engagement',
    cta: 'Start a conversation',
    features: [
      'Full bespoke pipeline architecture',
      'Integration with your existing tool stack',
      'Custom gate configuration per risk profile',
      'AI calibration to your domain and codebase',
      'Team training and full documentation',
      'Supervised first autonomous sprint',
      'Handover and knowledge transfer',
    ],
  },
  {
    tier: 'Retainer',
    name: 'Ongoing Advisory',
    desc: 'Continuous pipeline evolution, gate optimisation, coverage expansion, and strategic QA advisory — ensuring the system stays ahead of your product.',
    price: '4,000',
    cadence: 'Per month · Cancel anytime',
    featured: false,
    cta: 'Start a retainer',
    features: [
      'Monthly pipeline health review',
      'Gate configuration updates',
      'New feature and story type onboarding',
      'Defect pattern and trend analysis',
      'Four hours strategic QA advisory',
      'Priority support channel',
    ],
  },
]

export const FAQS = [
  {
    q: 'Does Testwise work with our existing tools, or do we need to adopt new ones?',
    a: 'Testwise is built around your existing stack. Every engagement begins with a discovery phase to map your current tools — project management, CI/CD, issue tracking, test management — and the pipeline is architected to integrate with what you already use. We do not mandate new platforms or replace your existing investments.',
  },
  {
    q: 'How customised is the solution?',
    a: 'Fully. There is no standard product that gets installed. Every Testwise pipeline is designed from scratch for the client — calibrated to your domain language, your team\'s test conventions, your compliance obligations, and your release governance. The AI learns your codebase and your processes, not a generic template.',
  },
  {
    q: 'What does a human-in-the-loop approval gate mean in practice?',
    a: 'At any stage in the pipeline, you can require a person to review and approve the AI\'s output before the pipeline continues. When a gate fires, the pipeline pauses, notifies the designated approver through your existing communication tools, and resumes only on explicit approval. Gates can be toggled per sprint, per project, or permanently — and every approval is logged with a timestamp and approver identity.',
  },
  {
    q: 'How long does implementation take?',
    a: 'A typical bespoke build takes two to three weeks from discovery kick-off to the first supervised autonomous sprint. Week one covers integration and architecture. Week two covers AI calibration and gate configuration. Week three is the first fully supervised sprint run. Most clients reach a high-trust, stable configuration within four to six sprints thereafter.',
  },
  {
    q: 'Is this suitable for government or APRA-regulated environments?',
    a: 'Yes — the configurable gate architecture was designed specifically for regulated and risk-averse environments. You can enforce human approval at any combination of stages. Every gate action produces an immutable, timestamped approval record. We can configure the pipeline to align with DTA standards, APRA CPS 234, TGA validation requirements, or your internal risk governance framework.',
  },
  {
    q: 'Does Testwise replace our QA team?',
    a: 'No. Testwise automates the manual, repetitive stages of QA — requirement analysis, test case writing, script maintenance, execution, defect logging, and reporting. Your QA team — if you have one — is freed to focus on exploratory testing, complex edge cases, and strategic quality decisions. If you do not have a dedicated QA team, Testwise provides enterprise-grade coverage without the headcount.',
  },
  {
    q: 'What test management platforms do you support?',
    a: 'All of them. The test reporting and management integration is built to work with whatever platform your team already runs — whether that is Xray, Zephyr, TestRail, qTest, Azure Test Plans, or any other platform. If you have a custom or internal solution, we build the integration accordingly.',
  },
]

export const STATS = [
  { value: 8,    suffix: '',   label: 'Automated pipeline stages' },
  { value: 0,    suffix: '',   label: 'Manual touchpoints by default' },
  { value: 80,   suffix: '%+', label: 'Automation coverage in production' },
  { value: 1,    suffix: '',   label: 'Sprint to first autonomous run', prefix: '' },
]

export const PROOF = {
  quote: 'We moved from under 20% automation coverage to over 80% — and then eliminated the human QA loop entirely. Every sprint now runs autonomously. The team ships. Quality is maintained.',
  source: 'Delivered by the Testwise founder at a $6B global enterprise operating 24×7 warehouse and logistics automation systems across Australia. Active production deployment across multiple sprint teams.',
  metrics: [
    { value: '80%+', label: 'Automation coverage achieved' },
    { value:  '8',   label: 'Pipeline stages fully automated' },
    { value:  '0',   label: 'Manual QA touchpoints per sprint' },
    { value: '$6B',  label: 'Revenue scale of the production deployment' },
  ],
}
