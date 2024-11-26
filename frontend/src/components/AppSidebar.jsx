import { Activity, Bell, FileText, UserIcon, ClipboardEdit } from 'lucide-react';

const patientItems = [
  { title: 'Vitals', icon: Activity },
  { title: 'Alerts', icon: Bell },
  { title: 'Prescriptions', icon: FileText },
  { title: 'Doctors', icon: UserIcon },
];

const doctorItems = [
  { title: 'Prescriptions', icon: ClipboardEdit },
];

export default function AppSidebar({ role, activeSection, setActiveSection }) {
  const items = role === 'patient' ? patientItems : doctorItems;

  return (
    <aside className="w-64 bg-white border-r">
      <div className="flex items-center justify-center py-4">
        {/* Inline SVG Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="h-8 w-auto text-blue-600"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
        </svg>
        <span className="ml-2 text-xl font-bold text-blue-600">HealthMonitor</span>
      </div>
      <nav className="mt-8">
        <div className="px-4">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {role === 'patient' ? 'Patient Dashboard' : 'Doctor Dashboard'}
          </h2>
          <div className="mt-2">
            {items.map((item) => (
              <button
                key={item.title}
                className={`mt-1 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md w-full ${
                  activeSection === item.title.toLowerCase()
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setActiveSection(item.title.toLowerCase())}
              >
                <item.icon className="mr-4 h-6 w-6" />
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
