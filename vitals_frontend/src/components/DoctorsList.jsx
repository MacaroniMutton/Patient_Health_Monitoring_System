import { UserIcon } from 'lucide-react';

const doctors = [
  { name: 'Dr. John Smith', specialty: 'Cardiologist', contact: '+1 (555) 123-4567' },
  { name: 'Dr. Emily Johnson', specialty: 'Pulmonologist', contact: '+1 (555) 987-6543' },
  { name: 'Dr. Michael Lee', specialty: 'Endocrinologist', contact: '+1 (555) 246-8135' },
];

function DoctorItem({ name, specialty, contact }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex items-center mb-2">
        <UserIcon className="h-5 w-5 text-green-500 mr-2" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <p className="text-gray-700">Specialty: {specialty}</p>
      <p className="text-gray-700">Contact: {contact}</p>
    </div>
  );
}

export default function DoctorsList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Medical Team</h2>
      {doctors.map((doctor, index) => (
        <DoctorItem key={index} {...doctor} />
      ))}
    </div>
  );
}

