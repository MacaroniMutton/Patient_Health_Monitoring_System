from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///prescriptions.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Prescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(100), nullable=False)
    medication = db.Column(db.String(100), nullable=False)
    dosage = db.Column(db.String(50), nullable=False)
    frequency = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'patient_name': self.patient_name,
            'medication': self.medication,
            'dosage': self.dosage,
            'frequency': self.frequency
        }

@app.route('/prescriptions', methods=['GET', 'POST'])
def handle_prescriptions():
    if request.method == 'POST':
        data = request.json
        new_prescription = Prescription(
            patient_name=data['patientName'],
            medication=data['medication'],
            dosage=data['dosage'],
            frequency=data['frequency']
        )
        db.session.add(new_prescription)
        db.session.commit()
        return jsonify(new_prescription.to_dict()), 201
    else:
        patient_name = request.args.get('patient_name')
        if patient_name:
            prescriptions = Prescription.query.filter_by(patient_name=patient_name).all()
        else:
            prescriptions = Prescription.query.all()
        return jsonify([p.to_dict() for p in prescriptions])

@app.route('/prescriptions/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_prescription(id):
    prescription = Prescription.query.get_or_404(id)
    
    if request.method == 'GET':
        return jsonify(prescription.to_dict())
    
    elif request.method == 'PUT':
        data = request.json
        prescription.patient_name = data['patientName']
        prescription.medication = data['medication']
        prescription.dosage = data['dosage']
        prescription.frequency = data['frequency']
        db.session.commit()
        return jsonify(prescription.to_dict())
    
    elif request.method == 'DELETE':
        db.session.delete(prescription)
        db.session.commit()
        return '', 204

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))