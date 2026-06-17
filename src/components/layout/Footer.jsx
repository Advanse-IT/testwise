import { Link } from 'react-router-dom'
import { Mail, Linkedin, Globe, MapPin } from 'lucide-react'
import { Separator } from '@/components/shadcn/separator'
import { LogoFull } from '@/components/ui/Logo'
import { SITE } from '@/lib/data'

const NAV = [
  { to:'/pipeline',      label:'The pipeline' },
  { to:'/how-it-works',  label:'How it works' },
  { to:'/industries',    label:'Industries'   },
  { to:'/pricing',       label:'Pricing'      },
  { to:'/contact',       label:'Contact'      },
]

const CONTACT = [
  { href:`mailto:${SITE.email}`, Icon:Mail,     label:SITE.email,                 external:false },
  { href:SITE.linkedin,           Icon:Linkedin, label:'Connect on LinkedIn',       external:true  },
  { href:SITE.parentUrl,          Icon:Globe,    label:SITE.parent,                external:true  },
]

export default function Footer() {
  return (
    <footer className="bg-[hsl(220_28%_9%)] border-t border-white/[0.07]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr] gap-12 mb-12">

          <div>
            <Link to="/" aria-label="Testwise home" className="inline-block mb-5">
              <LogoFull size={32}/>
            </Link>
            <p className="text-[15px] text-white/45 leading-relaxed max-w-xs font-light">
              Bespoke autonomous QA, engineered around your stack, your team, and your compliance requirements.
            </p>
            <div className="flex items-center gap-2 mt-5 text-[13px] text-white/30">
              <MapPin size={12}/> {SITE.location}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/25 mb-5">Product</div>
            <nav aria-label="Footer product navigation">
              {NAV.map(l => (
                <Link key={l.to} to={l.to}
                  className="block text-[15px] text-white/45 hover:text-white/80 transition-colors duration-150 mb-3 font-light">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/25 mb-5">Contact</div>
            {CONTACT.map(({ href, Icon, label, external }) => (
              <a key={label} href={href}
                {...(external ? { target:'_blank', rel:'noopener noreferrer' } : {})}
                className="flex items-center gap-2.5 text-[15px] text-white/45 hover:text-white/80 transition-colors duration-150 mb-4 font-light">
                <Icon size={14} className="text-brand-teal flex-shrink-0"/>
                {label}
              </a>
            ))}
          </div>
        </div>

        <Separator className="bg-white/[0.06] mb-7"/>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[13px] text-white/25">
            © {new Date().getFullYear()} Advanse-IT Pty Ltd. All rights reserved.
          </p>
          <p className="text-[13px] text-white/25">
            Testwise is a product of{' '}
            <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer"
              className="text-brand-teal/70 hover:text-brand-teal transition-colors">
              {SITE.parent}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
