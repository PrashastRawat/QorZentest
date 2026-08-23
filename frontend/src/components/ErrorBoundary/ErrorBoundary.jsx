import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import './ErrorBoundary.css';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 1. Catch exception & log to console as requested
    console.error("Exception caught:", error, errorInfo);

    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback passed via props, or default clean UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary-container">
          <div className="error-boundary-card">
            <div className="error-badge-icon">
              <AlertTriangle size={28} />
            </div>

            <h2 className="error-title">Something went wrong</h2>
            <p className="error-description">
              An unexpected runtime error occurred while rendering this module. Our team has been notified.
            </p>

            {this.state.error && (
              <div className="error-log-box">
                <code>{this.state.error.toString()}</code>
              </div>
            )}

            <div className="error-actions">
              <button onClick={this.handleReset} className="btn-error-reload">
                <RefreshCw size={16} />
                <span>Reload Page & Try Again</span>
              </button>
              <a href="/" className="btn-error-home">
                <Home size={16} />
                <span>Return to Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
