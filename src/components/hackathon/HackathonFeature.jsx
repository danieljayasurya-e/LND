import React, { useState } from 'react';
import { HackathonErrorBoundary } from './ErrorBoundary';
import { SnackbarProvider } from './Snackbar';
import { WelcomePopup } from './WelcomePopup';
import { HackathonPromo } from './HackathonPromo';
import { RegistrationDialog } from './RegistrationDialog';

/**
 * Single mount point for the whole Hackathon Registration feature:
 * auto-popup, promo section, and registration dialog all share one
 * dialog-open state and are isolated from the rest of the site by an
 * error boundary + their own snackbar provider.
 */
export function HackathonFeature() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <HackathonErrorBoundary>
      <SnackbarProvider>
        <WelcomePopup onRegisterClick={() => setDialogOpen(true)} />
        <HackathonPromo onRegisterClick={() => setDialogOpen(true)} />
        <RegistrationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      </SnackbarProvider>
    </HackathonErrorBoundary>
  );
}
