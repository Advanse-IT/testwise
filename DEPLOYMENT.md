# Testwise — Complete Deployment Guide
## Cloudflare Pages (React app) + Cloudflare Worker (email API)

---

## PART 1 — Push code to GitHub

### Step 1 — Create a GitHub repository

1. Go to https://github.com/new
2. Name it `testwise` (or `testwise-site`)
3. Set to **Private**
4. Do NOT initialise with README (you already have code)
5. Click **Create repository**

### Step 2 — Push the code

Open a terminal in the folder where you unzipped the project:

```bash
cd testwise           # the folder containing package.json
git init
git add .
git commit -m "Initial Testwise site"
git branch -M main
git remote add origin https://github.com/Advanse-IT/testwise.git
git push -u origin main
```

> **Note:** The `worker/wrangler.toml` file is in `.gitignore` intentionally.
> Only `worker/wrangler.toml.deploy` gets committed. This prevents Cloudflare
> Pages from detecting the Worker config and trying to deploy it as a Worker.

---

## PART 2 — Deploy the React app to Cloudflare Pages

### Step 3 — Connect to Cloudflare Pages

1. Log in to https://dash.cloudflare.com
2. Click **Workers & Pages** in the left sidebar
3. Click **Create application**
4. Click **Pages** tab → **Connect to Git**
5. Authorise Cloudflare to access your GitHub account
6. Select the `testwise` repository
7. Click **Begin setup**

### Step 4 — Configure build settings

Fill in exactly as follows:

| Setting | Value |
|---------|-------|
| **Project name** | `testwise` |
| **Production branch** | `main` |
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(leave blank)* |

> ⚠️ **Critical:** Leave **Root directory** blank. Do NOT enter `worker/`.
> The deploy command field should also be **blank** — do not enter `wrangler deploy`.

### Step 5 — Add environment variable

Still on the setup page, expand **Environment variables (advanced)**:

| Variable name | Value | Environment |
|---------------|-------|-------------|
| `VITE_CONTACT_API_URL` | `https://testwise-contact.YOUR_ACCOUNT.workers.dev/submit` | Production |

> You'll fill in the exact Worker URL after completing Part 3.
> For now you can add a placeholder and update it later.

Click **Save and Deploy**.

The first deploy will take 2–3 minutes. You'll see the build log run `npm run build` and succeed.

### Step 6 — Add custom domain

Once deployed:

1. In your Pages project → **Custom domains** tab
2. Click **Set up a custom domain**
3. Enter: `testwise.advanseit.com.au`
4. Cloudflare will add the DNS record automatically if `advanseit.com.au` is on the same Cloudflare account
5. SSL is provisioned automatically — no action needed

---

## PART 3 — Deploy the Contact Form Worker

The Worker runs separately from Pages. It receives form submissions and sends emails.

### Step 7 — Install Wrangler CLI (on your local machine)

```bash
npm install -g wrangler
```

Verify:
```bash
wrangler --version
# Should print: ⛅️ wrangler X.X.X
```

### Step 8 — Login to Cloudflare

```bash
wrangler login
```

This opens a browser window. Log in with your Cloudflare account. You'll see:
```
Successfully logged in.
```

### Step 9 — Create the KV namespace (rate limiting)

```bash
cd worker
wrangler kv namespace create CONTACT_KV
```

Output will look like:
```
🌀 Creating namespace with title "testwise-contact-CONTACT_KV"
✅ Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "CONTACT_KV", id = "abc123def456abc123def456abc123de" }
```

**Copy that id value** — you need it in the next step.

### Step 10 — Create your local wrangler.toml

```bash
cd worker
cp wrangler.toml.deploy wrangler.toml
```

Now open `worker/wrangler.toml` and replace `PASTE_YOUR_KV_NAMESPACE_ID_HERE` with the id from Step 9:

```toml
[[kv_namespaces]]
binding = "CONTACT_KV"
id      = "abc123def456abc123def456abc123de"    ← your actual id here
```

> ⚠️ `worker/wrangler.toml` is in `.gitignore` — it will never be committed to GitHub.
> Only your local machine needs this file.

### Step 11 — Set secrets (credentials stored encrypted in Cloudflare)

Run each command and enter the value when prompted:

```bash
wrangler secret put SMTP_USER
# When prompted, enter: admin@advanseit.com.au

wrangler secret put NOTIFY_TO
# When prompted, enter: admin@advanseit.com.au

wrangler secret put SMTP_PASS
# When prompted, enter: (your email account password for admin@advanseit.com.au)
```

> Secrets are encrypted and stored by Cloudflare. They never appear in your code,
> your git history, or your logs.

### Step 12 — Install Worker dependencies

```bash
cd worker
npm install
```

### Step 13 — Deploy the Worker

```bash
wrangler deploy
```

Output will look like:
```
⛅️ wrangler 3.x.x
Uploaded testwise-contact (1.23 sec)
Published testwise-contact (0.45 sec)
  https://testwise-contact.YOUR_ACCOUNT.workers.dev
```

**Copy that URL** — e.g. `https://testwise-contact.abc123.workers.dev`

### Step 14 — Update the Pages environment variable

1. Go to Cloudflare dashboard → **Workers & Pages** → `testwise` (Pages project)
2. Click **Settings** → **Environment variables**
3. Edit `VITE_CONTACT_API_URL` and set it to:
   ```
   https://testwise-contact.YOUR_ACCOUNT.workers.dev/submit
   ```
   (add `/submit` to the end of your Worker URL)
4. Click **Save**
5. Go to **Deployments** → click **Retry deployment** (or push a new commit)
   so the Pages build picks up the new env variable

---

## PART 4 — Set up email DNS (MailChannels authorisation)

This allows MailChannels (Cloudflare's free email relay) to send emails as `@advanseit.com.au`.

### Step 15 — Add MailChannels DNS TXT record

1. Go to Cloudflare dashboard → **DNS** for `advanseit.com.au`
2. Click **Add record**
3. Fill in:

| Field | Value |
|-------|-------|
| Type | `TXT` |
| Name | `_mailchannels` |
| Content | `v=mc1` |
| TTL | Auto |

4. Click **Save**

> This tells MailChannels: "This domain authorises MailChannels to send email on its behalf."
> Without this record, emails will be rejected.

### Step 16 — Add SPF record (if not already present)

Check if you have an existing SPF record (Type: TXT, Name: `@` containing `v=spf1`).

- **If no SPF exists**, add:

| Field | Value |
|-------|-------|
| Type | `TXT` |
| Name | `@` |
| Content | `v=spf1 include:relay.mailchannels.net ~all` |

- **If SPF already exists**, add `include:relay.mailchannels.net` to it:

```
v=spf1 include:mail.advanseit.com.au include:relay.mailchannels.net ~all
```

---

## PART 5 — Test everything end-to-end

### Step 17 — Test the Worker directly

```bash
curl -X POST https://testwise-contact.YOUR_ACCOUNT.workers.dev/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your@email.com",
    "company": "Test Co",
    "service": "Discovery call — not sure yet",
    "message": "This is a test submission to verify the worker is operational.",
    "botcheck": ""
  }'
```

Expected response:
```json
{"success": true, "ref": "TW-2026-A4K9M"}
```

You should receive two emails within 1–2 minutes:
1. Internal notification at `admin@advanseit.com.au`
2. Confirmation at `your@email.com` with the reference number

### Step 18 — Test through the live website

1. Go to `https://testwise.advanseit.com.au/contact`
2. Fill in the form and submit
3. The success panel should appear showing your reference number (e.g. `TW-2026-H7QN3`)
4. Check `admin@advanseit.com.au` for the internal notification
5. Check the submitter's email for the branded confirmation

---

## PART 6 — Ongoing deployments

### Deploying React app updates

Just push to `main`:
```bash
git add .
git commit -m "Update: description of change"
git push
```
Cloudflare Pages automatically rebuilds and deploys within 2 minutes.

### Deploying Worker updates

```bash
cd worker
wrangler deploy
```

Worker updates deploy in seconds — no downtime.

### Build settings summary (Cloudflare Pages dashboard)

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(blank)* |
| Deploy command | *(blank — leave empty)* |
| Node version | `20` |

---

## Troubleshooting

### "wrangler.toml detected — deploying as Worker"
**Cause:** Cloudflare Pages found `worker/wrangler.toml` in the repo.
**Fix:** The file is now named `wrangler.toml.deploy` in the repo. Make sure you haven't
accidentally committed `worker/wrangler.toml` — check `.gitignore` includes it.

### "2 vulnerabilities" in npm audit
**Fixed:** Vite updated to v8 in this build. Run `npm audit` — should show 0 vulnerabilities.

### Emails not arriving
1. Check the `_mailchannels` TXT DNS record is saved
2. Test the Worker directly with curl (Step 17)
3. Check Worker logs: Cloudflare dashboard → Workers & Pages → `testwise-contact` → **Logs**
4. Emails may land in spam initially — add `admin@advanseit.com.au` to your contacts

### "CONTACT_API_NOT_CONFIGURED" error on contact form
`VITE_CONTACT_API_URL` is not set or the Pages project wasn't redeployed after setting it.
Go to Pages → Settings → Environment variables, set the value, then trigger a new deployment.

### Reference number appears in form but no emails
The Worker received the submission but MailChannels rejected it — usually the `_mailchannels`
TXT record hasn't propagated yet (can take up to 48 hours). Test again after DNS propagates.

---

## File structure reference

```
testwise/                          ← React app root (Cloudflare Pages)
├── src/
│   ├── pages/Contact.jsx          ← Form → calls VITE_CONTACT_API_URL
│   └── ...
├── package.json                   ← build: "vite build"
├── vite.config.js                 ← Vite 8 compatible config
├── .gitignore                     ← worker/wrangler.toml excluded
├── .env.example                   ← copy to .env.local for local dev
└── worker/                        ← Cloudflare Worker (deployed separately)
    ├── index.js                   ← Worker entry point
    ├── email.js                   ← Email templates + generateRef()
    ├── package.json               ← wrangler devDependency
    ├── wrangler.toml.deploy       ← Template — copy to wrangler.toml locally
    ├── wrangler.toml              ← GITIGNORED — your local copy with real KV id
    └── .dev.vars                  ← GITIGNORED — local secrets for wrangler dev
```
