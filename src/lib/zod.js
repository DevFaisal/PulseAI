import { z } from "zod";

const validatePatientSchema = async (data) => {
  const patientSchema = z.object({
    // General Information
    name: z.string().min(1, "Name is required"),
    age: z.number().positive("Age must be a positive number"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(1, "Address is required"),
    insurance_name: z.string().min(1, "Insurance name is required"),
    insurance_id: z.string().min(1, "Insurance ID is required"),
    relationship_to_insured: z
      .string()
      .min(1, "Relationship to insured is required"),
    symptoms: z.string().min(1, "Symptoms are required"),

    // Medical Information
    blood_pressure: z.string().min(1, "Blood pressure is required"),
    blood_glucose: z.string().min(1, "Blood glucose is required"),
    heart_rate: z.string().min(1, "Heart rate is required"),
    body_temperature: z.string().min(1, "Body temperature is required"),
    oxygen_saturation: z.string().min(1, "Oxygen saturation is required"),
    respiratory_rate: z.string().min(1, "Respiratory rate is required"),

    // Thresholds
    blood_pressure_threshold: z
      .string()
      .min(1, "Blood pressure threshold is required"),
    blood_glucose_threshold: z
      .string()
      .min(1, "Blood glucose threshold is required"),
    heart_rate_threshold: z.string().min(1, "Heart rate threshold is required"),
    body_temperature_threshold: z
      .string()
      .min(1, "Body temperature threshold is required"),
    oxygen_saturation_threshold: z
      .string()
      .min(1, "Oxygen saturation threshold is required"),
    respiratory_rate_threshold: z
      .string()
      .min(1, "Respiratory rate threshold is required"),
  });
  const { result, error } = patientSchema.safeParse(data);
  return { result, error };
};

export { validatePatientSchema };
