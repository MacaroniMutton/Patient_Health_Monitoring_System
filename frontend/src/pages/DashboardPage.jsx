import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppSidebar from '../components/AppSidebar';
import PatientDashboard from '../components/PatientDashboard';
import DoctorDashboard from '../components/DoctorDashboard';

export default function DashboardPage() {
  const [role, setRole] = useState(null);
  const [activeSection, setActiveSection] = useState('vitals');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams.get('role');
    setRole(roleParam);
  }, [searchParams]);

  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar role={role} activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-y-auto bg-gray-100">
        {role === 'patient' ? (
          <PatientDashboard activeSection={activeSection} />
        ) : (
          <DoctorDashboard activeSection={activeSection} />
        )}
      </main>
    </div>
  );
}

