import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  FileText, 
  Bell, 
  User, 
  LogOut,
  Clock,
  MapPin,
  Phone,
  Pill,
  Heart,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import type { User as UserType } from '../App';

interface DashboardPatientProps {
  user: UserType;
  onLogout: () => void;
}

export function DashboardPatient({ user, onLogout }: DashboardPatientProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const patientNotifications = notifications;
  const prochainRendezVous = {
    date: '28 novembre 2025',
    heure: '14:30',
    medecin: 'Dr. Sophie Durand',
    specialite: 'Médecin généraliste',
    adresse: '15 Rue de la Santé, 75014 Paris',
    motif: 'Consultation de suivi'
  };

  const ordonnancesEnCours = [
    { medicament: 'Doliprane 1000mg', posologie: '1 comprimé 3x/jour', validite: '15 jours restants' },
    { medicament: 'Amoxicilline 500mg', posologie: '1 gélule 2x/jour', validite: '3 jours restants' }
  ];

  const historique = [
    { date: '15 nov 2025', type: 'Consultation', medecin: 'Dr. Durand' },
    { date: '02 oct 2025', type: 'Analyses sanguines', medecin: 'Laboratoire Central' },
    { date: '18 sept 2025', type: 'Consultation', medecin: 'Dr. Durand' }
  ];

  const notifications = [
    { message: 'Rappel: RDV demain à 14:30', type: 'rappel' },
    { message: 'Résultats d\'analyses disponibles', type: 'info' },
    { message: 'Nouvelle ordonnance disponible', type: 'nouveau' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-slate-200 px-6 py-4"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                {user.prenom[0]}{user.nom[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-slate-900">{user.prenom} {user.nom}</h2>
              <p className="text-sm text-slate-600">Mon espace patient</p>
            </div>
          </div>
          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative" onClick={() => setNotificationsOpen(v => !v)}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="p-2 border-b text-sm font-medium">Notifications</div>
                  <div className="max-h-64 overflow-auto">
                    {patientNotifications.map((n, i) => (
                      <div key={i} className="px-3 py-2 hover:bg-slate-50 cursor-default">
                        <div className="text-sm text-slate-900">{n.message}</div>
                        <div className="text-xs text-slate-500">{n.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Prochain RDV - Featured */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-none shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-purple-100 mb-1">Prochain rendez-vous</p>
                  <h3 className="text-white mb-4">{prochainRendezVous.date} à {prochainRendezVous.heure}</h3>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-200" />
                  <span className="text-purple-50">{prochainRendezVous.medecin} - {prochainRendezVous.specialite}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-200" />
                  <span className="text-purple-50">{prochainRendezVous.adresse}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-200" />
                  <span className="text-purple-50">{prochainRendezVous.motif}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button className="bg-white text-purple-600 hover:bg-purple-50">
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler le cabinet
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Ordonnances en cours */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-purple-600" />
                  Ordonnances en cours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ordonnancesEnCours.map((ordo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-4 bg-purple-50 rounded-xl"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-slate-900">{ordo.medicament}</p>
                          <p className="text-sm text-slate-600">{ordo.posologie}</p>
                        </div>
                        <Badge variant="secondary">{ordo.validite}</Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Historique */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Historique médical
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historique.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                      <div className="w-12 text-sm text-slate-600">
                        {item.date}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900">{item.type}</p>
                        <p className="text-sm text-slate-600">{item.medecin}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        Voir
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Actions rapides */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Prendre RDV
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Mes documents
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Carnet de santé
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Mon profil
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-600" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notif, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                      <p className="text-sm text-slate-700 flex-1">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <motion.nav 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 md:hidden"
      >
        <div className="flex justify-around">
          {[
            { icon: Activity, label: 'Accueil' },
            { icon: Calendar, label: 'RDV' },
            { icon: FileText, label: 'Documents' },
            { icon: User, label: 'Profil' }
          ].map((item, index) => (
            <button key={index} className="flex flex-col items-center gap-1 text-slate-600 hover:text-purple-600">
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}
