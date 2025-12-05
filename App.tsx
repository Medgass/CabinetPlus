import { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { DashboardMedecin } from './components/DashboardMedecin';
import { DashboardSecretaire } from './components/DashboardSecretaire';
import { DashboardPatient } from './components/DashboardPatient';

export type UserRole = 'medecin' | 'secretaire' | 'patient';

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Affichage du dashboard selon le rôle
  switch (user.role) {
    case 'medecin':
      return <DashboardMedecin user={user} onLogout={handleLogout} />;
    case 'secretaire':
      return <DashboardSecretaire user={user} onLogout={handleLogout} />;
    case 'patient':
      return <DashboardPatient user={user} onLogout={handleLogout} />;
    default:
      return <AuthScreen onLogin={handleLogin} />;
  }
}
