import useServiceWorker from '../hooks/useServiceWorker';
import Game from './Game';
import UpdateNotification from './UpdateNotification';

function App() {
  const serviceWorkerState = useServiceWorker();

  return (
    <div className="h-full flex items-center justify-center">
      <Game />
      {serviceWorkerState.hasUpdate && (
        <UpdateNotification onUpdate={serviceWorkerState.update} />
      )}
    </div>
  );
}

export default App;
