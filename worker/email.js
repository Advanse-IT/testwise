/**
 * Testwise — Branded HTML email templates
 *
 * generateRef()          — creates a unique reference number e.g. TW-2026-A4K9
 * buildInternalEmail()   — rich dark notification to admin@advanseit.com.au
 * buildConfirmationEmail()— polished client auto-reply with reference number
 */

// ── Reference number generator ───────────────────────────────
// Format: TW-YYYY-XXXXX  e.g. TW-2026-A4K9M
// Uppercase alphanumeric, no ambiguous chars (0/O, 1/I/L)
const SAFE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

export function generateRef() {
  const year   = new Date().getFullYear()
  const random = Array.from(
    { length: 5 },
    () => SAFE_CHARS[Math.floor(Math.random() * SAFE_CHARS.length)]
  ).join('')
  return `TW-${year}-${random}`
}

// ── HTML escaping ─────────────────────────────────────────────
function esc(str) {
  return String(str ?? '')
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;')
}

function nl2br(str) {
  return esc(str).replace(/\n/g, '<br/>')
}

// ── Shared design tokens (inline CSS values) ─────────────────
const T = {
  bgPage:    '#07101E',
  bgCard:    '#0C1220',
  bgCardAlt: '#0d1a2e',
  bgDark:    '#080e1a',
  teal:      '#22D3C3',
  tealDim:   'rgba(34,211,195,0.12)',
  tealBorder:'rgba(34,211,195,0.22)',
  snow:      '#EEF2F7',
  mist:      'rgba(238,242,247,0.55)',
  fog:       'rgba(238,242,247,0.25)',
  border:    'rgba(255,255,255,0.07)',
  borderTeal:'rgba(34,211,195,0.18)',
  amber:     '#F59E0B',
  font:      "Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif",
}

// ── Reusable partials ─────────────────────────────────────────
function topBar() {
  return `<tr><td style="height:3px;background:linear-gradient(90deg,${T.teal},rgba(34,211,195,0.35),transparent);font-size:0;line-height:0;">&nbsp;</td></tr>`
}

function logoRow(align = 'left') {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" ${align === 'center' ? 'align="center" style="margin:0 auto;"' : ''}>
    <tr>
      <td style="vertical-align:middle;padding-right:12px;">
        <img src="https://testwise.advanseit.com.au/favicon.svg" alt="Testwise logo" width="36" height="36"
          style="display:block;border:0;width:36px;height:36px;"/>
      </td>
      <td style="vertical-align:middle;">
        <div style="font-family:${T.font};font-size:19px;font-weight:700;letter-spacing:-0.3px;color:${T.snow};line-height:1.1;">
          Test<span style="color:${T.teal};">wise</span>
        </div>
        <div style="font-family:${T.font};font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${T.fog};margin-top:3px;">
          by Advanse-IT
        </div>
      </td>
    </tr>
  </table>`
}

function footerRow(centerText = false) {
  return `
  <tr>
    <td style="background:${T.bgDark};border-top:1px solid ${T.border};padding:22px 40px;border-radius:0 0 16px 16px;${centerText ? 'text-align:center;' : ''}">
      <p style="font-family:${T.font};font-size:12px;color:${T.fog};margin:0 0 5px;line-height:1.7;">
        <strong style="color:rgba(238,242,247,0.4);">Testwise</strong> by
        <a href="https://advanseit.com.au" style="color:rgba(34,211,195,0.55);text-decoration:none;">Advanse-IT</a>
        &nbsp;·&nbsp;
        <a href="https://testwise.advanseit.com.au" style="color:rgba(34,211,195,0.55);text-decoration:none;">testwise.advanseit.com.au</a>
        &nbsp;·&nbsp; Brisbane, Australia
      </p>
      <p style="font-family:${T.font};font-size:11px;color:rgba(238,242,247,0.15);margin:0;line-height:1.6;">
        You will not receive further automated emails from Testwise.
      </p>
    </td>
  </tr>`
}

function fieldBlock(label, value, options = {}) {
  const { highlight = false, isMessage = false } = options
  const borderLeft = isMessage ? `border-left:3px solid ${T.teal};border-radius:0 10px 10px 0;padding:18px 20px 18px 22px;` : `border-radius:10px;padding:16px 20px;`
  const border     = highlight ? `border:1px solid ${T.borderTeal};` : `border:1px solid ${T.border};`
  const labelColor = highlight ? `color:rgba(34,211,195,0.6);` : `color:${T.fog};`
  const valueColor = highlight ? `color:${T.teal};font-weight:600;` : `color:${T.snow};font-weight:500;`
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
    <tr>
      <td style="background:rgba(255,255,255,0.03);${border}${borderLeft}">
        <div style="font-family:${T.font};font-size:10px;font-weight:600;letter-spacing:0.11em;text-transform:uppercase;${labelColor}margin-bottom:5px;">${label}</div>
        <div style="font-family:${T.font};font-size:${isMessage ? '15px' : '16px'};${valueColor}line-height:1.65;font-weight:${isMessage ? '300' : '500'};">${isMessage ? nl2br(value) : esc(value)}</div>
      </td>
    </tr>
  </table>`
}

// ── PIPELINE STAGES VISUAL ────────────────────────────────────
function pipelineVisual(activeStage = -1) {
  const stages = ['REQ','TC','AUT','EXE','TRI','LOG','RPT','SIG']
  const cells  = stages.map((s, i) => {
    const active = i <= activeStage
    const last   = i === stages.length - 1
    return `<td align="center" style="padding:0 1px;">
      <div style="background:${last ? T.teal : active ? 'rgba(34,211,195,0.2)' : 'rgba(255,255,255,0.05)'};border:1px solid ${active ? T.tealBorder : 'rgba(255,255,255,0.07)'};border-radius:6px;padding:7px 3px;min-width:30px;">
        <div style="font-family:${T.font};font-size:9px;font-weight:700;letter-spacing:0.07em;color:${last ? T.bgCard : active ? T.teal : 'rgba(255,255,255,0.25)'};">${s}</div>
      </div>
    </td>`
  }).join(`<td style="padding:0 1px;"><div style="width:5px;height:1px;background:rgba(34,211,195,0.2);margin-top:12px;"></div></td>`)

  return `
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:24px;">
    <tr>${cells}</tr>
    <tr>
      <td colspan="15" style="padding-top:7px;text-align:center;">
        <div style="font-family:${T.font};font-size:10px;color:rgba(34,211,195,0.4);letter-spacing:0.09em;text-transform:uppercase;font-weight:500;">
          Autonomous QA · 8-Stage Pipeline
        </div>
      </td>
    </tr>
  </table>`
}

// ═════════════════════════════════════════════════════════════
// 1. INTERNAL NOTIFICATION
//    To: admin@advanseit.com.au
// ═════════════════════════════════════════════════════════════
export function buildInternalEmail({ name, email, company, service, message, ref, submittedAt }) {
  const firstName = name.split(' ')[0]
  const dateStr   = new Date(submittedAt || Date.now()).toLocaleString('en-AU', {
    timeZone: 'Australia/Brisbane', dateStyle: 'full', timeStyle: 'short',
  })
  const subject = `[${ref}] New enquiry — ${name}${company ? ` · ${company}` : ''}`

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${T.bgPage};font-family:${T.font};">

<!--[preheader]-->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;">
  [${ref}] ${esc(name)}${company ? ` — ${esc(company)}` : ''} is interested in ${service ? esc(service) : 'Testwise'}.
  &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${T.bgPage};">
  <tr>
    <td align="center" style="padding:28px 12px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
        style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;
               border:1px solid ${T.borderTeal};background:${T.bgCard};">

        <!-- TOP BAR -->
        ${topBar()}

        <!-- HEADER -->
        <tr>
          <td style="padding:32px 40px 28px;background:linear-gradient(160deg,${T.bgCardAlt} 0%,${T.bgCard} 100%);border-bottom:1px solid ${T.border};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>${logoRow()}</td>
                <td align="right" style="vertical-align:middle;">
                  <span style="display:inline-block;background:${T.tealDim};border:1px solid ${T.tealBorder};border-radius:99px;padding:5px 14px;font-family:${T.font};font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${T.teal};">
                    New Enquiry
                  </span>
                </td>
              </tr>
            </table>

            <!-- Heading -->
            <div style="margin-top:28px;">
              <div style="font-family:${T.font};font-size:26px;font-weight:700;color:${T.snow};letter-spacing:-0.5px;line-height:1.2;margin-bottom:6px;">
                ${esc(firstName)} wants to talk.
              </div>
              <div style="font-family:${T.font};font-size:14px;color:${T.mist};font-weight:300;">
                ${dateStr}
              </div>
            </div>

            <!-- Reference badge -->
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px;">
              <tr>
                <td style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:10px 18px;">
                  <span style="font-family:${T.font};font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${T.amber};">Reference</span>
                  <span style="font-family:${T.font};font-size:16px;font-weight:700;color:${T.amber};margin-left:12px;letter-spacing:0.05em;">${ref}</span>
                </td>
              </tr>
            </table>

            ${pipelineVisual(7)}
          </td>
        </tr>

        <!-- ENQUIRY FIELDS -->
        <tr>
          <td style="padding:32px 40px 8px;">
            <div style="font-family:${T.font};font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${T.teal};margin-bottom:18px;">
              Enquiry Details
            </div>
            ${fieldBlock('Name',    name)}
            ${fieldBlock('Email',   email,              { highlight:false })}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
              <tr>
                <td width="48%" style="background:rgba(255,255,255,0.03);border:1px solid ${T.border};border-radius:10px;padding:16px 20px;vertical-align:top;">
                  <div style="font-family:${T.font};font-size:10px;font-weight:600;letter-spacing:0.11em;text-transform:uppercase;color:${T.fog};margin-bottom:5px;">Company</div>
                  <div style="font-family:${T.font};font-size:15px;font-weight:500;color:${T.snow};">${esc(company || '—')}</div>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:rgba(34,211,195,0.05);border:1px solid ${T.borderTeal};border-radius:10px;padding:16px 20px;vertical-align:top;">
                  <div style="font-family:${T.font};font-size:10px;font-weight:600;letter-spacing:0.11em;text-transform:uppercase;color:rgba(34,211,195,0.55);margin-bottom:5px;">Service</div>
                  <div style="font-family:${T.font};font-size:15px;font-weight:600;color:${T.teal};">${esc(service || '—')}</div>
                </td>
              </tr>
            </table>
            ${fieldBlock('Message', message, { isMessage:true })}
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:4px 40px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:10px;background:${T.teal};">
                  <a href="mailto:${esc(email)}?subject=Re:%20[${ref}]%20Your%20Testwise%20enquiry"
                     style="display:inline-block;padding:13px 26px;font-family:${T.font};font-size:15px;font-weight:600;color:${T.bgCard};text-decoration:none;letter-spacing:-0.1px;">
                    Reply to ${esc(firstName)} &rarr;
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${footerRow()}
      </table>

    </td>
  </tr>
</table>
</body>
</html>`

  return { subject, html }
}

// ═════════════════════════════════════════════════════════════
// 2. CLIENT AUTO-REPLY CONFIRMATION
//    To: the person who submitted the form
//    Includes: reference number, what happens next, branded links
// ═════════════════════════════════════════════════════════════
export function buildConfirmationEmail({ name, email, company, service, message, ref }) {
  const firstName = name.split(' ')[0]
  const subject   = `[${ref}] Your Testwise enquiry is confirmed`

  const steps = [
    {
      n: '01',
      title: 'Enquiry received & reviewed',
      body:  `Your message is reviewed by our team — typically within a few hours. Use reference <strong style="color:${T.teal};">${ref}</strong> in any follow-up correspondence.`,
    },
    {
      n: '02',
      title: 'Discovery call scheduled',
      body:  'We will send you a calendar link to book a 30-minute discovery session at a time that works for you. No obligation, no sales pitch.',
    },
    {
      n: '03',
      title: 'Your pipeline designed',
      body:  'We map your environment, tools, and compliance requirements — and walk you through exactly what a bespoke Testwise pipeline would look like for your team.',
    },
  ]

  const links = [
    { href:'https://testwise.advanseit.com.au/pipeline',      label:'The Pipeline'  },
    { href:'https://testwise.advanseit.com.au/how-it-works',  label:'How It Works'  },
    { href:'https://testwise.advanseit.com.au/pricing',       label:'Pricing'       },
  ]

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${T.bgPage};font-family:${T.font};">

<!--[preheader]-->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;">
  Reference ${ref} — We've received your enquiry and will be in touch within 24 hours.
  &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${T.bgPage};">
  <tr>
    <td align="center" style="padding:28px 12px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
        style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;
               border:1px solid ${T.borderTeal};background:${T.bgCard};">

        <!-- TOP BAR -->
        ${topBar()}

        <!-- HERO HEADER -->
        <tr>
          <td style="padding:40px 40px 36px;text-align:center;background:linear-gradient(160deg,${T.bgCardAlt} 0%,${T.bgCard} 60%);border-bottom:1px solid ${T.border};">

            ${logoRow('center')}

            <!-- Glow ring + checkmark -->
            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:28px auto 22px;">
              <tr>
                <td style="width:76px;height:76px;border-radius:50%;text-align:center;vertical-align:middle;
                           background:radial-gradient(circle,rgba(34,211,195,0.15) 0%,transparent 70%);
                           border:2px solid rgba(34,211,195,0.35);">
                  <span style="font-size:34px;line-height:1;color:${T.teal};">&#10003;</span>
                </td>
              </tr>
            </table>

            <!-- Heading -->
            <div style="font-family:${T.font};font-size:28px;font-weight:700;color:${T.snow};letter-spacing:-0.6px;line-height:1.15;margin-bottom:10px;">
              You're all set, ${esc(firstName)}.
            </div>
            <div style="font-family:${T.font};font-size:16px;color:${T.mist};font-weight:300;line-height:1.65;max-width:400px;margin:0 auto 24px;">
              Your enquiry has been received. We will be in touch within 24 hours to arrange your discovery call.
            </div>

            <!-- Reference number pill — prominent -->
            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;">
              <tr>
                <td style="background:rgba(245,158,11,0.1);border:1.5px solid rgba(245,158,11,0.35);
                           border-radius:12px;padding:14px 28px;text-align:center;">
                  <div style="font-family:${T.font};font-size:11px;font-weight:600;letter-spacing:0.12em;
                              text-transform:uppercase;color:${T.amber};margin-bottom:6px;">
                    Your Reference Number
                  </div>
                  <div style="font-family:${T.font};font-size:28px;font-weight:800;color:${T.amber};
                              letter-spacing:0.08em;">
                    ${ref}
                  </div>
                  <div style="font-family:${T.font};font-size:12px;color:rgba(245,158,11,0.55);margin-top:5px;font-weight:300;">
                    Quote this in all correspondence with us
                  </div>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ENQUIRY SUMMARY -->
        <tr>
          <td style="padding:30px 40px 4px;">
            <div style="font-family:${T.font};font-size:11px;font-weight:600;letter-spacing:0.12em;
                        text-transform:uppercase;color:${T.teal};margin-bottom:16px;">
              Your Enquiry Summary
            </div>
            ${fieldBlock('Name', name)}
            ${fieldBlock('Email', email)}
            ${fieldBlock('Company', company || '—')}
            ${service ? fieldBlock('Service Interested In', service, { highlight:true }) : ''}
            ${fieldBlock('Message', message, { isMessage:true })}
          </td>
        </tr>

        <!-- PIPELINE VISUAL -->
        <tr>
          <td style="padding:4px 40px 30px;">
            ${pipelineVisual(7)}
          </td>
        </tr>

        <!-- WHAT HAPPENS NEXT -->
        <tr>
          <td style="padding:28px 40px;background:rgba(255,255,255,0.02);border-top:1px solid ${T.border};border-bottom:1px solid ${T.border};">
            <div style="font-family:${T.font};font-size:11px;font-weight:600;letter-spacing:0.12em;
                        text-transform:uppercase;color:${T.teal};margin-bottom:20px;">
              What Happens Next
            </div>

            ${steps.map(step => `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
              <tr>
                <td width="38" style="vertical-align:top;padding-top:1px;">
                  <div style="width:32px;height:32px;border-radius:50%;background:${T.tealDim};
                              border:1px solid rgba(34,211,195,0.25);text-align:center;line-height:32px;
                              font-family:${T.font};font-size:11px;font-weight:700;color:${T.teal};">
                    ${step.n}
                  </div>
                </td>
                <td style="vertical-align:top;padding-left:16px;">
                  <div style="font-family:${T.font};font-size:15px;font-weight:600;color:${T.snow};margin-bottom:4px;">
                    ${step.title}
                  </div>
                  <div style="font-family:${T.font};font-size:14px;color:${T.mist};font-weight:300;line-height:1.65;">
                    ${step.body}
                  </div>
                </td>
              </tr>
            </table>`).join('')}
          </td>
        </tr>

        <!-- QUICK LINKS -->
        <tr>
          <td style="padding:28px 40px;">
            <div style="font-family:${T.font};font-size:11px;font-weight:600;letter-spacing:0.12em;
                        text-transform:uppercase;color:rgba(34,211,195,0.6);margin-bottom:14px;">
              Explore Testwise
            </div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                ${links.map(l => `
                <td width="31%" align="center" style="padding:0 4px;">
                  <a href="${l.href}" style="display:block;background:rgba(255,255,255,0.03);
                     border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 8px;
                     text-decoration:none;transition:none;">
                    <div style="font-family:${T.font};font-size:13px;font-weight:500;
                                color:rgba(238,242,247,0.65);">${l.label}</div>
                  </a>
                </td>
                <td width="2%"></td>`).join('')}
              </tr>
            </table>
          </td>
        </tr>

        <!-- DIRECT CONTACT CTA -->
        <tr>
          <td style="padding:0 40px 32px;text-align:center;">
            <div style="font-family:${T.font};font-size:14px;color:${T.mist};margin-bottom:14px;font-weight:300;">
              Need to reach us directly? We're here.
            </div>
            <table role="presentation" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td style="border-radius:10px;background:${T.teal};">
                  <a href="mailto:hello@advanseit.com.au?subject=[${ref}]%20Follow-up"
                     style="display:inline-block;padding:13px 28px;font-family:${T.font};
                            font-size:15px;font-weight:600;color:${T.bgCard};text-decoration:none;">
                    hello@advanseit.com.au
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${footerRow(true)}
      </table>

    </td>
  </tr>
</table>
</body>
</html>`

  return { subject, html }
}
