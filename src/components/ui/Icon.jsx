import {
  FileText, ListChecks, Code2, Play, BugOff, TicketCheck, BarChart3, FileCheck2,
  Wrench, Fingerprint, ShieldCheck, GitBranch, Landmark, Building2, HeartPulse,
  Warehouse, Rocket, Layers, Search, PlugZap, SlidersHorizontal, TrendingUp,
  Clock, RefreshCw, ShieldAlert, Lock, Unlock, Info, Mail, Linkedin, Globe,
  MapPin, ArrowRight, ArrowLeft, ArrowUpRight, ChevronRight, Menu, X, Check,
  Plus
} from 'lucide-react'

const MAP = {
  FileText, ListChecks, Code2, Play, BugOff, TicketCheck, BarChart3, FileCheck2,
  Wrench, Fingerprint, ShieldCheck, GitBranch, Landmark, Building2, HeartPulse,
  Warehouse, Rocket, Layers, Search, PlugZap, SlidersHorizontal, TrendingUp,
  Clock, RefreshCw, ShieldAlert, Lock, Unlock, Info, Mail, Linkedin, Globe,
  MapPin, ArrowRight, ArrowLeft, ArrowUpRight, ChevronRight, Menu, X, Check,
  Plus
}

export default function Icon({ name, size = 18, className = '', ...props }) {
  const LucideIcon = MAP[name]
  if (!LucideIcon) return null
  return <LucideIcon size={size} className={className} {...props} />
}
