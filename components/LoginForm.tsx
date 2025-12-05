import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Fingerprint, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import type { User, UserRole } from '../App';

interface LoginFormProps {
  onLogin: (user: User) => void;
  onNavigateSignup: () => void;
  onNavigateReset: () => void;
}

// Utilisateurs de démonstration
const DEMO_USERS = [
  {
    id: '1',
    email: 'medecin@cabinetplus.fr',
    password: 'medecin123',
    nom: 'Durand',
    prenom: 'Sophie',
    role: 'medecin' as UserRole
  },
  {
    id: '2',
    email: 'secretaire@cabinetplus.fr',
    password: 'secretaire123',
    nom: 'Martin',
    prenom: 'Julie',
    role: 'secretaire' as UserRole
  },
  {
    id: '3',
    email: 'patient@cabinetplus.fr',
    password: 'patient123',
    nom: 'Dubois',
    prenom: 'Pierre',
    role: 'patient' as UserRole
  }
];

export function LoginForm({ onLogin, onNavigateSignup, onNavigateReset }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 800));

    // Vérification des identifiants
    const user = DEMO_USERS.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      toast.success(`Bienvenue ${user.prenom} !`);
      onLogin({
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      });
    } else {
      toast.error('Email ou mot de passe incorrect');
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = () => {
    toast.info('Authentification biométrique non disponible sur le web. Utilisez les identifiants de démonstration.');
  };

  const fillDemoCredentials = (role: UserRole) => {
    const user = DEMO_USERS.find(u => u.role === role);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
      toast.success(`Identifiants ${role} pré-remplis`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              className="pl-10"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember" className="cursor-pointer">
              Se souvenir de moi
            </Label>
          </div>
          <button
            type="button"
            onClick={onNavigateReset}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Mot de passe oublié ?
          </button>
        </div>

        {/* Login Button */}
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Connexion...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              Se connecter
            </span>
          )}
        </Button>

        {/* Biometric Auth */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleBiometricAuth}
        >
          <Fingerprint className="w-5 h-5 mr-2" />
          Authentification biométrique
        </Button>

        {/* Demo Accounts */}
        <div className="pt-4 border-t">
          <p className="text-sm text-slate-600 mb-3 text-center">
            Comptes de démonstration :
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fillDemoCredentials('medecin')}
              className="text-xs"
            >
              Médecin
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fillDemoCredentials('secretaire')}
              className="text-xs"
            >
              Secrétaire
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fillDemoCredentials('patient')}
              className="text-xs"
            >
              Patient
            </Button>
          </div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-slate-600">
          Pas encore de compte ?{' '}
          <button
            type="button"
            onClick={onNavigateSignup}
            className="text-blue-600 hover:text-blue-700"
          >
            S'inscrire
          </button>
        </p>
      </form>
    </motion.div>
  );
}


