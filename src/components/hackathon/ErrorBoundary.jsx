import React from 'react';

/**
 * Isolates the Hackathon feature so a rendering error inside it (bad API
 * response shape, a third-party lib throwing, etc.) can't take down the
 * rest of the marketing site around it.
 */
export class HackathonErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[HackathonErrorBoundary] caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
