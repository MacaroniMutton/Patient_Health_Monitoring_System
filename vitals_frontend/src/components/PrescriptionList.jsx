import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Pill } from 'lucide-react';

function PrescriptionItem({ name, dosage, frequency }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex items-center mb-2">
        <Pill className="h-5 w-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <p className="text-gray-700">Dosage: {dosage}</p>
      <p className="text-gray-700">Frequency: {frequency}</p>
    </div>
  );
}

export default function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchParams] = useSearchParams();
  const patientName = searchParams.get('name');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/prescriptions?patient_name=${encodeURIComponent(patientName)}`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    if (patientName) {
      fetchPrescriptions();
    }
  }, [patientName]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Current Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        prescriptions.map((prescription, index) => (
          <PrescriptionItem
            key={index}
            name={prescription.medication}
            dosage={prescription.dosage}
            frequency={prescription.frequency}
          />
        ))
      )}
    </div>
  );
}

