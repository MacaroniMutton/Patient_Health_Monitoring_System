import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to HealthMonitor</h1>
      <div className="space-x-4">
        <Link to="/patient-name" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          I'm a Patient
        </Link>
        <Link to="/dashboard?role=doctor" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          I'm a Doctor
        </Link>
      </div>
    </div>
  );
}

