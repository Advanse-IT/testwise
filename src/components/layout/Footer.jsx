import { Link } from 'react-router-dom'
import { Mail, Linkedin, Globe, MapPin } from 'lucide-react'
import { SITE } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-xs font-bold text-white">TW</div>
              <div>
                <div className="text-[15px] font-semibold tracking-tight text-snow">Test<span className="text-teal-bright">wise</span></div>
                <div className="text-[10px] text-fog tracking-widest uppercase mt-0.5">by {SITE.parent}</div>
              </div>
            </div>
            <p className="text-[13px] text-mist leading-relaxed max-w-xs">
              Bespoke autonomous QA, engineered around your stack, your team, and your compliance requirements.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-[12px] text-fog">
              <MapPin size={11}/> {SITE.location}
            </div>
          </div>

          {/* Product */}
          <div>
            <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-fog mb-4">Product</div>
            {[
              { to: '/pipeline',      label: 'The pipeline' },
              { to: '/how-it-works',  label: 'How it works' },
              { to: '/industries',    label: 'Industries' },
              { to: '/pricing',       label: 'Pricing' },
            ].map(l => (
              <Link key={l.to} to={l.to} className="block text-[13px] text-mist hover:text-snow transition-colors mb-2.5">{l.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-fog mb-4">Contact</div>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-[13px] text-mist hover:text-snow transition-colors mb-3">
              <Mail size={13}/>{SITE.email}
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener" className="flex items-center gap-2 text-[13px] text-mist hover:text-snow transition-colors mb-3">
              <Linkedin size={13}/>LinkedIn
            </a>
            <a href={SITE.parentUrl} target="_blank" rel="noopener" className="flex items-center gap-2 text-[13px] text-mist hover:text-snow transition-colors">
              <Globe size={13}/>{SITE.parent}
            </a>
          </div>
        </div>

        <div className="divider mb-6"/>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[12px] text-fog">© {new Date().getFullYear()} Advanse-IT Pty Ltd. All rights reserved.</p>
          <p className="text-[12px] text-fog">
            Testwise is a product of{' '}
            <a href={SITE.parentUrl} target="_blank" rel="noopener" className="text-teal-bright hover:opacity-80 transition-opacity">{SITE.parent}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
