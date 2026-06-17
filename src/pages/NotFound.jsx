import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import PageWrapper from '@/components/ui/PageWrapper'

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="text-[96px] font-bold text-white/[0.04] mb-2 select-none leading-none">404</div>
        <h1 className="text-title-lg text-white mb-3">Page not found</h1>
        <p className="text-[16px] text-white/45 font-light mb-8 max-w-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild variant="secondary">
          <Link to="/"><ArrowLeft size={15}/> Back to home</Link>
        </Button>
      </div>
    </PageWrapper>
  )
}
