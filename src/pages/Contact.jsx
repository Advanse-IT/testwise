import { Mail, Linkedin, Globe, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import PageWrapper from '@/components/ui/PageWrapper'
import Reveal from '@/components/ui/Reveal'
import { Divider } from '@/components/ui/Divider'
import { SITE } from '@/lib/data'

const WHAT_TO_EXPECT = [
  { icon: 'Clock', label: '30 minutes', body: 'A focused discovery call — not a sales presentation. We ask about your environment, your team, and your quality goals.' },
  { icon: 'Search', label: 'Environment mapping', body: 'We walk through your current tools, processes, and compliance obligations to understand what a bespoke pipeline would involve.' },
  { icon: 'FileText', label: 'Clear next step', body: 'You leave the call with a clear sense of what an engagement would look like, what it would cost, and what you would get.' },
]

export default function Contact() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-16 px-6 lg:px-10 max-w-6xl mx-auto">
        <Reveal>
          <div className="eyebrow">Get in touch</div>
          <h1 className="text-display-xl text-snow mb-5 max-w-2xl">
            Start a conversation.
          </h1>
          <p className="text-body-lg text-mist font-light max-w-xl leading-relaxed">
            Every Testwise engagement begins with a discovery call. No pitch deck, no demos of a generic product. We map your environment and show you what a bespoke pipeline would look like for your team.
          </p>
        </Reveal>
      </section>

      <Divider />

      <section className="py-20 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact methods */}
          <div>
            <Reveal>
              <h2 className="text-display-sm text-snow mb-8">Contact directly</h2>
            </Reveal>

            <div className="flex flex-col gap-4">
              <Reveal delay={0.05}>
                <a href={`mailto:${SITE.email}`}
                  className="flex items-center gap-4 card card-hover p-5 group">
                  <div className="w-10 h-10 rounded-lg bg-teal-dim border border-teal/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-teal-bright"/>
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] text-fog uppercase tracking-widest font-medium mb-0.5">Email</div>
                    <div className="text-[14px] font-medium text-snow">{SITE.email}</div>
                  </div>
                  <ArrowUpRight size={14} className="text-fog group-hover:text-teal-bright transition-colors"/>
                </a>
              </Reveal>

              <Reveal delay={0.1}>
                <a href={SITE.linkedin} target="_blank" rel="noopener"
                  className="flex items-center gap-4 card card-hover p-5 group">
                  <div className="w-10 h-10 rounded-lg bg-teal-dim border border-teal/20 flex items-center justify-center flex-shrink-0">
                    <Linkedin size={16} className="text-teal-bright"/>
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] text-fog uppercase tracking-widest font-medium mb-0.5">LinkedIn</div>
                    <div className="text-[14px] font-medium text-snow">linkedin.com/in/sushruth007</div>
                  </div>
                  <ArrowUpRight size={14} className="text-fog group-hover:text-teal-bright transition-colors"/>
                </a>
              </Reveal>

              <Reveal delay={0.15}>
                <a href={SITE.parentUrl} target="_blank" rel="noopener"
                  className="flex items-center gap-4 card card-hover p-5 group">
                  <div className="w-10 h-10 rounded-lg bg-teal-dim border border-teal/20 flex items-center justify-center flex-shrink-0">
                    <Globe size={16} className="text-teal-bright"/>
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] text-fog uppercase tracking-widest font-medium mb-0.5">Advanse-IT</div>
                    <div className="text-[14px] font-medium text-snow">advanseit.com.au</div>
                  </div>
                  <ArrowUpRight size={14} className="text-fog group-hover:text-teal-bright transition-colors"/>
                </a>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex items-center gap-4 card p-5">
                  <div className="w-10 h-10 rounded-lg bg-raised border border-border flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-mist"/>
                  </div>
                  <div>
                    <div className="text-[11px] text-fog uppercase tracking-widest font-medium mb-0.5">Location</div>
                    <div className="text-[14px] text-snow">{SITE.location}</div>
                    <div className="text-[12px] text-fog mt-0.5">Available remotely across AU, NZ, and globally</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* What to expect */}
          <div>
            <Reveal>
              <h2 className="text-display-sm text-snow mb-8">What to expect</h2>
            </Reveal>
            <div className="flex flex-col gap-5">
              {WHAT_TO_EXPECT.map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-teal/25 bg-teal-dim flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[11px] font-bold text-teal-bright">{String(i+1).padStart(2,'0')}</span>
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-snow mb-1">{item.label}</div>
                      <p className="text-[13px] text-mist leading-relaxed font-light">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3} className="mt-10 card p-6">
              <div className="flex items-start gap-3">
                <Clock size={14} className="text-teal-bright mt-0.5 flex-shrink-0"/>
                <div>
                  <div className="text-[13px] font-medium text-snow mb-1">Typical response time</div>
                  <p className="text-[12px] text-mist font-light leading-relaxed">
                    Discovery calls are typically scheduled within two to three business days. For urgent engagements, note that in the subject line and we will prioritise accordingly.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
