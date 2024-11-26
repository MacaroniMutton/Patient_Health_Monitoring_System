import unittest
from app import app, db, Prescription

class PrescriptionTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        app.config['TESTING'] = True
        cls.client = app.test_client()
        with app.app_context():
            db.create_all()

    @classmethod
    def tearDownClass(cls):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        db.session.begin_nested()

    def tearDown(self):
        db.session.rollback()
        self.app_context.pop()

    def test_create_prescription(self):
        response = self.client.post('/prescriptions', json={
            'patientName': 'John Doe',
            'medication': 'Med1',
            'dosage': '10mg',
            'frequency': 'Once daily'
        })
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data['patient_name'], 'John Doe')
        self.assertEqual(data['medication'], 'Med1')
        self.assertEqual(data['dosage'], '10mg')
        self.assertEqual(data['frequency'], 'Once daily')

    def test_get_prescriptions_by_patient_name(self):
        self.client.post('/prescriptions', json={
            'patientName': 'John Doe',
            'medication': 'Med1',
            'dosage': '10mg',
            'frequency': 'Once daily'
        })
        
        response = self.client.get('/prescriptions?patient_name=John Doe')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertGreater(len(data), 0)

    def test_update_prescription(self):
        response = self.client.post('/prescriptions', json={
            'patientName': 'John Doe',
            'medication': 'Med1',
            'dosage': '10mg',
            'frequency': 'Once daily'
        })
        prescription_id = response.get_json()['id']

        response = self.client.put(f'/prescriptions/{prescription_id}', json={
            'patientName': 'John Doe',
            'medication': 'Med1 Updated',
            'dosage': '15mg',
            'frequency': 'Twice daily'
        })
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['medication'], 'Med1 Updated')
        self.assertEqual(data['dosage'], '15mg')
        self.assertEqual(data['frequency'], 'Twice daily')

    def test_delete_prescription(self):
        response = self.client.post('/prescriptions', json={
            'patientName': 'John Doe',
            'medication': 'Med1',
            'dosage': '10mg',
            'frequency': 'Once daily'
        })
        prescription_id = response.get_json()['id']

        response = self.client.delete(f'/prescriptions/{prescription_id}')
        self.assertEqual(response.status_code, 204)

        response = self.client.get(f'/prescriptions/{prescription_id}')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()