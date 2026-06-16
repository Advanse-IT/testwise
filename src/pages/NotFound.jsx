import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageWrapper from '@/components/ui/PageWrapper'

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="text-[80px] font-bold text-surface mb-4 select-none">404</div>
        <h1 className="text-display-md text-snow mb-3">Page not found</h1>
        <p className="text-body-md text-mist font-light mb-8 max-w-sm">The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn-primary inline-flex"><ArrowLeft size={15}/> Back to home</Link>
      </div>
    </PageWrapper>
  )
}
