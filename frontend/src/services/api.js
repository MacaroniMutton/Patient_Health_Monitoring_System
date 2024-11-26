import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

export const getPrescriptions = async (patientName = '') => {
  try {
    const response = await api.get(`/prescriptions${patientName ? `?patient_name=${encodeURIComponent(patientName)}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    throw error;
  }
};

export const createPrescription = async (prescriptionData) => {
  try {
    const response = await api.post('/prescriptions', prescriptionData);
    return response.data;
  } catch (error) {
    console.error('Error creating prescription:', error);
    throw error;
  }
};

export const updatePrescription = async (id, prescriptionData) => {
  try {
    const response = await api.put(`/prescriptions/${id}`, prescriptionData);
    return response.data;
  } catch (error) {
    console.error('Error updating prescription:', error);
    throw error;
  }
};

export const deletePrescription = async (id) => {
  try {
    await api.delete(`/prescriptions/${id}`);
  } catch (error) {
    console.error('Error deleting prescription:', error);
    throw error;
  }
};

