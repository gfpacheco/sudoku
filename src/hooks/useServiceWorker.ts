import { useEffect, useState } from 'react';

import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

export interface ServiceWorkerState {
  hasUpdate: boolean;
  update: () => void;
}

let serviceWorkerState: ServiceWorkerState = {
  hasUpdate: false,
  update() {},
};

const setStates: React.Dispatch<React.SetStateAction<ServiceWorkerState>>[] =
  [];

serviceWorkerRegistration.register({
  onUpdate: registration => {
    serviceWorkerState = {
      hasUpdate: true,
      update() {
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      },
    };

    setStates.forEach(setState => setState(serviceWorkerState));
  },
});

export default function useServiceWorker() {
  const [state, setServiceWorkerState] = useState(serviceWorkerState);

  useEffect(() => {
    setStates.push(setServiceWorkerState);
    return () => {
      setStates.splice(setStates.indexOf(setServiceWorkerState), 1);
    };
  }, [setServiceWorkerState]);

  return state;
}
