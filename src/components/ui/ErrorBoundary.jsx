import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background">
          <div className="max-w-md">
            <h1 className="text-[22px] font-semibold text-white mb-3">Something went wrong</h1>
            <p className="text-[15px] text-white/45 font-light mb-6 leading-relaxed">
              The page encountered an error. Please refresh and try again.
              If the issue persists, email us directly.
            </p>
            <a
              href="mailto:admin@advanseit.com.au"
              className="text-brand-teal hover:opacity-80 transition-opacity text-[14px]"
            >
              admin@advanseit.com.au
            </a>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary text-[14px] px-6 py-2.5"
              >
                Refresh page
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
