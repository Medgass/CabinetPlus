import db from './db';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'patient' | 'medecin' | 'secretaire' | 'admin';
  createdAt: string;
}

export interface Patient extends User {
  medecin_id?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
}

export interface Consultation {
  id: string;
  patient_id: string;
  medecin_id: string;
  date: string;
  symptoms: string;
  diagnosis: string;
  prescription?: string;
  createdAt: string;
}

export interface Ordonnance {
  id: string;
  consultation_id: string;
  medicines: string[];
  instructions: string;
  createdAt: string;
}

export interface Certificat {
  id: string;
  patient_id: string;
  medecin_id: string;
  reason: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

// Users management
export const users = {
  create: (user: User) => {
    const id = `user_${Date.now()}`;
    const newUser = { ...user, id };
    db.set(`users:${id}`, newUser);
    return newUser;
  },

  get: (id: string) => {
    return db.get(`users:${id}`);
  },

  getByEmail: (email: string) => {
    const allUsers = db.getByPrefix('users:');
    const user = allUsers.data?.find((u: any) => u.value.email === email);
    return user?.value;
  },

  getAll: () => {
    return db.getByPrefix('users:');
  },

  update: (id: string, data: Partial<User>) => {
    const user = db.get(`users:${id}`);
    if (user.data) {
      const updated = { ...user.data, ...data };
      db.set(`users:${id}`, updated);
      return updated;
    }
    return null;
  },

  delete: (id: string) => {
    db.delete(`users:${id}`);
  },
};

// Consultations management
export const consultations = {
  create: (consultation: Omit<Consultation, 'id' | 'createdAt'>) => {
    const id = `consultation_${Date.now()}`;
    const newConsultation = { ...consultation, id, createdAt: new Date().toISOString() };
    db.set(`consultations:${id}`, newConsultation);
    return newConsultation;
  },

  get: (id: string) => {
    return db.get(`consultations:${id}`);
  },

  getByPatient: (patientId: string) => {
    return db.getByPrefix(`consultations:`)?.data?.filter(
      (c: any) => c.value.patient_id === patientId
    );
  },

  getByMedecin: (medecinId: string) => {
    return db.getByPrefix(`consultations:`)?.data?.filter(
      (c: any) => c.value.medecin_id === medecinId
    );
  },

  update: (id: string, data: Partial<Consultation>) => {
    const consultation = db.get(`consultations:${id}`);
    if (consultation.data) {
      const updated = { ...consultation.data, ...data };
      db.set(`consultations:${id}`, updated);
      return updated;
    }
    return null;
  },

  delete: (id: string) => {
    db.delete(`consultations:${id}`);
  },
};

// Ordonnances management
export const ordonnances = {
  create: (ordonnance: Omit<Ordonnance, 'id' | 'createdAt'>) => {
    const id = `ordonnance_${Date.now()}`;
    const newOrdonnance = { ...ordonnance, id, createdAt: new Date().toISOString() };
    db.set(`ordonnances:${id}`, newOrdonnance);
    return newOrdonnance;
  },

  get: (id: string) => {
    return db.get(`ordonnances:${id}`);
  },

  getByConsultation: (consultationId: string) => {
    return db.getByPrefix(`ordonnances:`)?.data?.filter(
      (o: any) => o.value.consultation_id === consultationId
    );
  },

  update: (id: string, data: Partial<Ordonnance>) => {
    const ordonnance = db.get(`ordonnances:${id}`);
    if (ordonnance.data) {
      const updated = { ...ordonnance.data, ...data };
      db.set(`ordonnances:${id}`, updated);
      return updated;
    }
    return null;
  },

  delete: (id: string) => {
    db.delete(`ordonnances:${id}`);
  },
};

// Certificats management
export const certificats = {
  create: (certificat: Omit<Certificat, 'id' | 'createdAt'>) => {
    const id = `certificat_${Date.now()}`;
    const newCertificat = { ...certificat, id, createdAt: new Date().toISOString() };
    db.set(`certificats:${id}`, newCertificat);
    return newCertificat;
  },

  get: (id: string) => {
    return db.get(`certificats:${id}`);
  },

  getByPatient: (patientId: string) => {
    return db.getByPrefix(`certificats:`)?.data?.filter(
      (c: any) => c.value.patient_id === patientId
    );
  },

  update: (id: string, data: Partial<Certificat>) => {
    const certificat = db.get(`certificats:${id}`);
    if (certificat.data) {
      const updated = { ...certificat.data, ...data };
      db.set(`certificats:${id}`, updated);
      return updated;
    }
    return null;
  },

  delete: (id: string) => {
    db.delete(`certificats:${id}`);
  },
};

// Export all
export default {
  users,
  consultations,
  ordonnances,
  certificats,
};
