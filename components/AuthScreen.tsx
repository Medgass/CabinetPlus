import { useState } from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ResetPasswordForm } from './ResetPasswordForm';
import type { User } from '../App';
const logo = '/doctor-logo.svg';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

type AuthView = 'login' | 'signup' | 'reset';

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [view, setView] = useState<AuthView>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-8 px-6 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <img 
            src={logo} 
            alt="CabinetPlus Logo" 
            className="h-16 w-auto"
          />
        </div>
        <p className="text-slate-600">
          {view === 'login' && 'Connectez-vous à votre espace'}
          {view === 'signup' && 'Créez votre compte'}
          {view === 'reset' && 'Réinitialisez votre mot de passe'}
        </p>
      </motion.div>

      {/* Forms Container */}
      <div className="flex-1 px-6 pb-8">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-md mx-auto"
        >
          {view === 'login' && (
            <LoginForm 
              onLogin={onLogin}
              onNavigateSignup={() => setView('signup')}
              onNavigateReset={() => setView('reset')}
            />
          )}
          {view === 'signup' && (
            <SignupForm 
              onSignup={onLogin}
              onNavigateLogin={() => setView('login')}
            />
          )}
          {view === 'reset' && (
            <ResetPasswordForm 
              onNavigateLogin={() => setView('login')}
            />
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 text-center">
        <p className="text-slate-500 text-sm">
          © 2025 CabinetPlus - Gestion médicale sécurisée
        </p>
      </div>
    </div>
  );
}
