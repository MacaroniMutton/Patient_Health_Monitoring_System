import { useState, useCallback } from 'react';
import VitalsMonitor from './VitalsMonitor';
import AlertsList from './AlertsList';
import PrescriptionList from './PrescriptionList';
import DoctorsList from './DoctorsList';

export default function PatientDashboard({ activeSection }) {
  const [alerts, setAlerts] = useState([]);

  const handleAlert = useCallback((message) => {
    setAlerts(prevAlerts => [
      { message, timestamp: new Date().toLocaleString() },
      ...prevAlerts.slice(0, 9)
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Patient Health Dashboard</h1>
      {activeSection === 'vitals' && <VitalsMonitor onAlert={handleAlert} />}
      {activeSection === 'alerts' && <AlertsList alerts={alerts} />}
      {activeSection === 'prescriptions' && <PrescriptionList />}
      {activeSection === 'doctors' && <DoctorsList />}
    </div>
  );
}

