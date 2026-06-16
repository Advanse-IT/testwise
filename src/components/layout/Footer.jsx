import { Link } from 'react-router-dom'
import { Mail, Linkedin, Globe, MapPin } from 'lucide-react'
import { LogoFull } from '@/components/ui/Logo'
import { SITE } from '@/lib/data'

const NAV_LINKS = [
  { to: '/pipeline',      label: 'The pipeline' },
  { to: '/how-it-works',  label: 'How it works' },
  { to: '/industries',    label: 'Industries' },
  { to: '/pricing',       label: 'Pricing' },
  { to: '/contact',       label: 'Contact' },
]

const CONTACT_LINKS = [
  { href: `mailto:${SITE.email}`,    Icon: Mail,     label: SITE.email },
  { href: SITE.linkedin,             Icon: Linkedin,  label: 'LinkedIn', external: true },
  { href: SITE.parentUrl,            Icon: Globe,     label: SITE.parent, external: true },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" aria-label="Testwise home" className="inline-block mb-5">
              <LogoFull size={32}/>
            </Link>
            <p className="text-[15px] text-mist leading-relaxed max-w-xs font-light">
              Bespoke autonomous QA, engineered around your stack, your team, and your compliance requirements.
            </p>
            <div className="flex items-center gap-2 mt-5 text-[14px] text-fog">
              <MapPin size={13}/> {SITE.location}
            </div>
          </div>

          {/* Product */}
          <div>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-fog mb-5">Product</div>
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to}
                className="block text-[15px] text-mist hover:text-snow transition-colors mb-3 font-light">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-fog mb-5">Contact</div>
            {CONTACT_LINKS.map(({ href, Icon, label, external }) => (
              <a key={label} href={href}
                {...(external ? { target:'_blank', rel:'noopener noreferrer' } : {})}
                className="flex items-center gap-2.5 text-[15px] text-mist hover:text-snow transition-colors mb-4 font-light">
                <Icon size={14} className="text-teal flex-shrink-0"/>
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="divider mb-6"/>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[13px] text-fog">
            © {new Date().getFullYear()} Advanse-IT Pty Ltd. All rights reserved.
          </p>
          <p className="text-[13px] text-fog">
            Testwise is a product of{' '}
            <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer"
              className="text-teal hover:opacity-80 transition-opacity">
              {SITE.parent}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
