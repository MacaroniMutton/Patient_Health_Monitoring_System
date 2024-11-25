import { useState, useEffect } from 'react';
import { Activity, Droplet, Thermometer, Wind } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const NORMAL_RANGES = {
  heartRate: { min: 60, max: 100 },
  bloodPressure: { systolicMin: 90, systolicMax: 120, diastolicMin: 60, diastolicMax: 80 },
  temperature: { min: 97, max: 99 },
  oxygenSaturation: { min: 95, max: 100 },
};

function VitalSign({ icon: Icon, title, value, unit, data, dataKey, normalRange }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-sm text-gray-500">{unit}</p>
      <div className="h-24 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[normalRange.min, normalRange.max]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="text-sm">{`${payload[0].value} ${unit}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line type="monotone" dataKey={dataKey} stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function VitalsMonitor({ onAlert })
{
  const [vitals, setVitals] = useState({
    heartRate: { current: 0, data: [] },
    bloodPressure: { current: '0/0', data: [] },
    temperature: { current: 0, data: [] },
    oxygenSaturation: { current: 0, data: [] },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newVitals = {
        heartRate: Math.floor(Math.random() * (100 - 60 + 1) + 60),
        bloodPressure: {
          systolic: Math.floor(Math.random() * (140 - 110 + 1) + 110),
          diastolic: Math.floor(Math.random() * (90 - 70 + 1) + 70),
        },
        temperature: parseFloat((Math.random() * (99 - 97) + 97).toFixed(1)),
        oxygenSaturation: Math.floor(Math.random() * (100 - 95 + 1) + 95),
      };

      setVitals(prevVitals => {
        const time = new Date().toLocaleTimeString();
        const newState = {
          heartRate: {
            current: newVitals.heartRate,
            data: [...prevVitals.heartRate.data.slice(-19), { time, value: newVitals.heartRate }],
          },
          bloodPressure: {
            current: `${newVitals.bloodPressure.systolic}/${newVitals.bloodPressure.diastolic}`,
            data: [...prevVitals.bloodPressure.data.slice(-19), { time, systolic: newVitals.bloodPressure.systolic, diastolic: newVitals.bloodPressure.diastolic }],
          },
          temperature: {
            current: newVitals.temperature,
            data: [...prevVitals.temperature.data.slice(-19), { time, value: newVitals.temperature }],
          },
          oxygenSaturation: {
            current: newVitals.oxygenSaturation,
            data: [...prevVitals.oxygenSaturation.data.slice(-19), { time, value: newVitals.oxygenSaturation }],
          },
        };

        // Check for alerts
        if (newVitals.heartRate < NORMAL_RANGES.heartRate.min || newVitals.heartRate > NORMAL_RANGES.heartRate.max) {
          onAlert(`Abnormal heart rate: ${newVitals.heartRate} bpm`);
        }
        if (newVitals.bloodPressure.systolic < NORMAL_RANGES.bloodPressure.systolicMin || newVitals.bloodPressure.systolic > NORMAL_RANGES.bloodPressure.systolicMax) {
          onAlert(`Abnormal systolic blood pressure: ${newVitals.bloodPressure.systolic} mmHg`);
        }
        if (newVitals.bloodPressure.diastolic < NORMAL_RANGES.bloodPressure.diastolicMin || newVitals.bloodPressure.diastolic > NORMAL_RANGES.bloodPressure.diastolicMax) {
          onAlert(`Abnormal diastolic blood pressure: ${newVitals.bloodPressure.diastolic} mmHg`);
        }
        if (newVitals.temperature < NORMAL_RANGES.temperature.min || newVitals.temperature > NORMAL_RANGES.temperature.max) {
          onAlert(`Abnormal temperature: ${newVitals.temperature} °F`);
        }
        if (newVitals.oxygenSaturation < NORMAL_RANGES.oxygenSaturation.min) {
          onAlert(`Low oxygen saturation: ${newVitals.oxygenSaturation}%`);
        }

        return newState;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [onAlert]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <VitalSign
        icon={Activity}
        title="Heart Rate"
        value={vitals.heartRate.current}
        unit="bpm"
        data={vitals.heartRate.data}
        dataKey="value"
        normalRange={NORMAL_RANGES.heartRate}
      />
      <VitalSign
        icon={Droplet}
        title="Blood Pressure"
        value={vitals.bloodPressure.current}
        unit="mmHg"
        data={vitals.bloodPressure.data}
        dataKey="systolic"
        normalRange={{ min: NORMAL_RANGES.bloodPressure.systolicMin, max: NORMAL_RANGES.bloodPressure.systolicMax }}
      />
      <VitalSign
        icon={Thermometer}
        title="Temperature"
        value={vitals.temperature.current}
        unit="°F"
        data={vitals.temperature.data}
        dataKey="value"
        normalRange={NORMAL_RANGES.temperature}
      />
      <VitalSign
        icon={Wind}
        title="Oxygen Saturation"
        value={vitals.oxygenSaturation.current}
        unit="%"
        data={vitals.oxygenSaturation.data}
        dataKey="value"
        normalRange={NORMAL_RANGES.oxygenSaturation}
      />
    </div>
  );
}

