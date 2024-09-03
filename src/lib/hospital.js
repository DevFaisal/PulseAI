const hospitals = [
  {
    id: "01",
    name: "City Hospital",
    location: "Downtown, Dubai, UAE",
    doctors: [
      {
        doctor_id: "D463",
        name: "Dr. Sarah Ali",
        specialization: "Cardiology",
        contact_info: {
          email: "sarah.ali@cityhospital.com",
          phone_number: "+971-50-987-6543",
          address: "Jumeirah, Dubai, UAE",
        },
        patients: [
          {
            patient_id: "P1243",
            name: "Ahmed Al Mansoori",
            dob: "1985-02-20",
            gender: "Male",
            contact_info: {
              email: "ahmed.mansoori@gmail.com",
              phone_number: "+971-50-123-4567",
              address: "Downtown, Dubai, UAE",
            },
            insurance_info: {
              insurance_name: "AXA",
              insurance_id: "7894561230",
              holder_name: "Ahmed Al Mansoori",
              relationship_to_insured: "Self",
            },
            vitals: {
              blood_pressure: {
                systolic: 135,
                diastolic: 88,
                unit: "mmHg",
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
              blood_glucose: {
                level: 6.2,
                unit: "mmol/L",
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
              heart_rate: {
                bpm: 72,
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
              body_temperature: {
                temperature: 37.0,
                unit: "°C",
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
              oxygen_saturation: {
                spO2: 98,
                unit: "%",
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
              respiratory_rate: {
                rate: 17,
                unit: "breaths/min",
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
            },
            medications: [
              {
                medication_name: "Amlodipine",
                dosage: "5mg",
                route: "Oral",
                status: "Active",
                prescribed_for_days: 30,
                note: "Take once daily",
              },
              {
                medication_name: "Aspirin",
                dosage: "81mg",
                route: "Oral",
                status: "Active",
                prescribed_for_days: 30,
                note: "Take once daily",
              },
            ],
            programs: [
              {
                program_name: "Cardiac Care",
                start_date: "2024-05-15",
                duration_in_months: 12,
                status: "Active",
                monitored_trackers: {
                  blood_pressure: {
                    systolic: 130,
                    diastolic: 85,
                    unit: "mmHg",
                  },
                  cholesterol: {
                    level: 180,
                    unit: "mg/dL",
                  },
                },
              },
              {
                program_name: "Diabetes Management",
                start_date: "2024-03-10",
                duration_in_months: 12,
                status: "Active",
                monitored_trackers: {
                  blood_glucose: {
                    level: 6.8,
                    unit: "mmol/L",
                  },
                  hba1c: {
                    level: 6.5,
                    unit: "%",
                  },
                },
              },
            ],
            conditions: ["Hypertension", "Type 2 Diabetes"],
            off_time: "2024-08-14T18:00:00Z",
            last_fellow_call: "2024-08-10T12:00:00Z",
            last_time_call_to_patient: "2024-08-13T09:00:00Z",
            assigned_doctor_id: "D463",
            alerts: [],
          },
        ],
      },
    ],
    patients: [
      {
        patient_id: "P1243",
        name: "Ahmed Al Mansoori",
        dob: "1985-02-20",
        gender: "Male",
        contact_info: {
          email: "ahmed.mansoori@gmail.com",
          phone_number: "+971-50-123-4567",
          address: "Downtown, Dubai, UAE",
        },
        insurance_info: {
          insurance_name: "AXA",
          insurance_id: "7894561230",
          holder_name: "Ahmed Al Mansoori",
          relationship_to_insured: "Self",
        },
        vitals: {
          blood_pressure: {
            systolic: 135,
            diastolic: 88,
            unit: "mmHg",
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
          blood_glucose: {
            level: 6.2,
            unit: "mmol/L",
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
          heart_rate: {
            bpm: 72,
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
          body_temperature: {
            temperature: 37.0,
            unit: "°C",
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
          oxygen_saturation: {
            spO2: 98,
            unit: "%",
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
          respiratory_rate: {
            rate: 17,
            unit: "breaths/min",
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
        },
        medications: [
          {
            medication_name: "Amlodipine",
            dosage: "5mg",
            route: "Oral",
            status: "Active",
            prescribed_for_days: 30,
            note: "Take once daily",
          },
          {
            medication_name: "Aspirin",
            dosage: "81mg",
            route: "Oral",
            status: "Active",
            prescribed_for_days: 30,
            note: "Take once daily",
          },
        ],
        programs: [
          {
            program_name: "Cardiac Care",
            start_date: "2024-05-15",
            duration_in_months: 12,
            status: "Active",
            monitored_trackers: {
              blood_pressure: {
                systolic: 130,
                diastolic: 85,
                unit: "mmHg",
              },
              cholesterol: {
                level: 180,
                unit: "mg/dL",
              },
            },
          },
          {
            program_name: "Diabetes Management",
            start_date: "2024-03-10",
            duration_in_months: 12,
            status: "Active",
            monitored_trackers: {
              blood_glucose: {
                level: 6.8,
                unit: "mmol/L",
              },
              hba1c: {
                level: 6.5,
                unit: "%",
              },
            },
          },
        ],
        conditions: ["Hypertension", "Type 2 Diabetes"],
        off_time: "2024-08-14T18:00:00Z",
        last_fellow_call: "2024-08-10T12:00:00Z",
        last_time_call_to_patient: "2024-08-13T09:00:00Z",
        assigned_doctor_id: "D463",
        alerts: [],
      },
    ],
  },
  {
    id: "02",
    name: "Sopore",
    location: "Downtown, Dubai, UAE",
    doctors: [
      {
        doctor_id: "D463",
        name: "Dr. Sarah Ali",
        specialization: "Cardiology",
        contact_info: {
          email: "sarah.ali@cityhospital.com",
          phone_number: "+971-50-987-6543",
          address: "Jumeirah, Dubai, UAE",
        },
        patients: [
          {
            patient_id: "P1243",
            name: "Ahmed Al Mansoori",
            dob: "1985-02-20",
            gender: "Male",
            contact_info: {
              email: "ahmed.mansoori@gmail.com",
              phone_number: "+971-50-123-4567",
              address: "Downtown, Dubai, UAE",
            },
            insurance_info: {
              insurance_name: "AXA",
              insurance_id: "7894561230",
              holder_name: "Ahmed Al Mansoori",
              relationship_to_insured: "Self",
            },
            vitals: {
              blood_pressure: {
                systolic: 135,
                diastolic: 88,
                unit: "mmHg",
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
              blood_glucose: {
                level: 6.2,
                unit: "mmol/L",
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
              heart_rate: {
                bpm: 72,
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
              body_temperature: {
                temperature: 37.0,
                unit: "°C",
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
              oxygen_saturation: {
                spO2: 98,
                unit: "%",
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
              respiratory_rate: {
                rate: 17,
                unit: "breaths/min",
                timestamp: "2024-08-13T08:30:00Z",
                status: "Normal",
              },
            },
            medications: [
              {
                medication_name: "Amlodipine",
                dosage: "5mg",
                route: "Oral",
                status: "Active",
                prescribed_for_days: 30,
                note: "Take once daily",
              },
              {
                medication_name: "Aspirin",
                dosage: "81mg",
                route: "Oral",
                status: "Active",
                prescribed_for_days: 30,
                note: "Take once daily",
              },
            ],
            programs: [
              {
                program_name: "Cardiac Care",
                start_date: "2024-05-15",
                duration_in_months: 12,
                status: "Active",
                monitored_trackers: {
                  blood_pressure: {
                    systolic: 130,
                    diastolic: 85,
                    unit: "mmHg",
                  },
                  cholesterol: {
                    level: 180,
                    unit: "mg/dL",
                  },
                },
              },
              {
                program_name: "Diabetes Management",
                start_date: "2024-03-10",
                duration_in_months: 12,
                status: "Active",
                monitored_trackers: {
                  blood_glucose: {
                    level: 6.8,
                    unit: "mmol/L",
                  },
                  hba1c: {
                    level: 6.5,
                    unit: "%",
                  },
                },
              },
            ],
            conditions: ["Hypertension", "Type 2 Diabetes"],
            off_time: "2024-08-14T18:00:00Z",
            last_fellow_call: "2024-08-10T12:00:00Z",
            last_time_call_to_patient: "2024-08-13T09:00:00Z",
            assigned_doctor_id: "D463",
            alerts: [],
          },
        ],
      },
    ],
    patients: [
      {
        patient_id: "P1243",
        name: "Ahmed Al Mansoori",
        dob: "1985-02-20",
        gender: "Male",
        contact_info: {
          email: "ahmed.mansoori@gmail.com",
          phone_number: "+971-50-123-4567",
          address: "Downtown, Dubai, UAE",
        },
        insurance_info: {
          insurance_name: "AXA",
          insurance_id: "7894561230",
          holder_name: "Ahmed Al Mansoori",
          relationship_to_insured: "Self",
        },
        vitals: {
          blood_pressure: {
            systolic: 135,
            diastolic: 88,
            unit: "mmHg",
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
          blood_glucose: {
            level: 6.2,
            unit: "mmol/L",
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
          heart_rate: {
            bpm: 72,
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
          body_temperature: {
            temperature: 37.0,
            unit: "°C",
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
          oxygen_saturation: {
            spO2: 98,
            unit: "%",
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
          respiratory_rate: {
            rate: 17,
            unit: "breaths/min",
            timestamp: "2024-08-13T08:30:00Z",
            status: "Normal",
          },
        },
        medications: [
          {
            medication_name: "Amlodipine",
            dosage: "5mg",
            route: "Oral",
            status: "Active",
            prescribed_for_days: 30,
            note: "Take once daily",
          },
          {
            medication_name: "Aspirin",
            dosage: "81mg",
            route: "Oral",
            status: "Active",
            prescribed_for_days: 30,
            note: "Take once daily",
          },
        ],
        programs: [
          {
            program_name: "Cardiac Care",
            start_date: "2024-05-15",
            duration_in_months: 12,
            status: "Active",
            monitored_trackers: {
              blood_pressure: {
                systolic: 130,
                diastolic: 85,
                unit: "mmHg",
              },
              cholesterol: {
                level: 180,
                unit: "mg/dL",
              },
            },
          },
          {
            program_name: "Diabetes Management",
            start_date: "2024-03-10",
            duration_in_months: 12,
            status: "Active",
            monitored_trackers: {
              blood_glucose: {
                level: 6.8,
                unit: "mmol/L",
              },
              hba1c: {
                level: 6.5,
                unit: "%",
              },
            },
          },
        ],
        conditions: ["Hypertension", "Type 2 Diabetes"],
        off_time: "2024-08-14T18:00:00Z",
        last_fellow_call: "2024-08-10T12:00:00Z",
        last_time_call_to_patient: "2024-08-13T09:00:00Z",
        assigned_doctor_id: "D463",
        alerts: [],
      },
    ],
  },
];

export default hospitals;
