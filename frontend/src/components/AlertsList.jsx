import { AlertTriangle } from 'lucide-react';

function Alert({ message, timestamp }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold">Alert</h3>
        </div>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      <p className="text-gray-700">{message}</p>
    </div>
  );
}

export default function AlertsList({ alerts }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Alerts</h2>
      {alerts.length === 0 ? (
        <p>No recent alerts.</p>
      ) : (
        alerts.map((alert, index) => (
          <Alert key={index} message={alert.message} timestamp={alert.timestamp} />
        ))
      )}
    </div>
  );
}

