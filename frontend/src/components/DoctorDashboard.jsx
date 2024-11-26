import { useState, useEffect } from 'react';
import { getPrescriptions, createPrescription, updatePrescription, deletePrescription } from '../services/api';

export default function DoctorDashboard() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    medication: '',
    dosage: '',
    frequency: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const data = await getPrescriptions();
      setPrescriptions(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setError('Failed to fetch prescriptions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePrescription(editingId, newPrescription);
      } else {
        await createPrescription(newPrescription);
      }
      setNewPrescription({ patientName: '', medication: '', dosage: '', frequency: '' });
      setEditingId(null);
      fetchPrescriptions();
    } catch (error) {
      console.error('Error saving prescription:', error);
      setError('Failed to save prescription. Please try again.');
    }
  };

  const handleEdit = (prescription) => {
    setNewPrescription(prescription);
    setEditingId(prescription.id);
  };

  const handleDelete = async (id) => {
    try {
      await deletePrescription(id);
      fetchPrescriptions();
    } catch (error) {
      console.error('Error deleting prescription:', error);
      setError('Failed to delete prescription. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading prescriptions...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Prescription' : 'Create New Prescription'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="patientName"
              type="text"
              placeholder="Patient Name"
              value={newPrescription.patientName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="medication"
              type="text"
              placeholder="Medication"
              value={newPrescription.medication}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="dosage"
              type="text"
              placeholder="Dosage"
              value={newPrescription.dosage}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="frequency"
              type="text"
              placeholder="Frequency"
              value={newPrescription.frequency}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {editingId ? 'Update' : 'Create'} Prescription
            </button>
          </div>
        </form>
      </div>
      <div className="space-y-4">
        {prescriptions.map(prescription => (
          <div key={prescription.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h3 className="text-xl font-bold mb-2">{prescription.patient_name}</h3>
            <p><strong>Medication:</strong> {prescription.medication}</p>
            <p><strong>Dosage:</strong> {prescription.dosage}</p>
            <p><strong>Frequency:</strong> {prescription.frequency}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEdit(prescription)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(prescription.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

