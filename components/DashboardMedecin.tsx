import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Clock,
  Search,
  Plus,
  Bell,
  Filter,
  Download,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Activity,
  Stethoscope,
  Pill,
  FileCheck,
  AlertCircle,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PatientDetail } from './PatientDetail';
import { ConsultationForm } from './ConsultationForm';
import { NewPatientForm } from './NewPatientForm';
import { OrdonnanceForm } from './OrdonnanceForm';
import { CertificatForm } from './CertificatForm';
import type { User } from '../App';
const logo = '/placeholder.png';

interface DashboardMedecinProps {
  user: User;
  onLogout: () => void;
}

export function DashboardMedecin({ user, onLogout }: DashboardMedecinProps) {
  const [activeTab, setActiveTab] = useState('accueil');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [showOrdonnanceForm, setShowOrdonnanceForm] = useState(false);
  const [showCertificatForm, setShowCertificatForm] = useState(false);

  const stats = [
    { label: 'Rendez-vous aujourd\'hui', value: '12', icon: Calendar, color: 'blue', trend: '+2' },
    { label: 'Patients actifs', value: '347', icon: Users, color: 'green', trend: '+15' },
    { label: 'Consultations ce mois', value: '89', icon: UserCheck, color: 'purple', trend: '+8%' },
    { label: 'Taux de satisfaction', value: '96%', icon: TrendingUp, color: 'orange', trend: '+2%' }
  ];

  const prochainRendezVous = [
    { 
      id: 1,
      heure: '09:00', 
      patient: 'Marie Leblanc', 
      age: 45,
      motif: 'Consultation générale',
      type: 'Première consultation',
      statut: 'confirmé',
      telephone: '06 12 34 56 78'
    },
    { 
      id: 2,
      heure: '09:30', 
      patient: 'Jean Dupont', 
      age: 62,
      motif: 'Suivi diabète',
      type: 'Suivi',
      statut: 'confirmé',
      telephone: '06 23 45 67 89'
    },
    { 
      id: 3,
      heure: '10:15', 
      patient: 'Claire Martin', 
      age: 34,
      motif: 'Résultats analyses',
      type: 'Consultation',
      statut: 'en attente',
      telephone: '06 34 56 78 90'
    },
    { 
      id: 4,
      heure: '11:00', 
      patient: 'Paul Bernard', 
      age: 58,
      motif: 'Contrôle tension',
      type: 'Suivi',
      statut: 'confirmé',
      telephone: '06 45 67 89 01'
    },
    { 
      id: 5,
      heure: '11:30', 
      patient: 'Sophie Rousseau', 
      age: 28,
      motif: 'Certificat médical',
      type: 'Consultation rapide',
      statut: 'confirmé',
      telephone: '06 56 78 90 12'
    }
  ];

  const patients = [
    {
      id: 1,
      nom: 'Leblanc',
      prenom: 'Marie',
      age: 45,
      dernierRdv: '15 nov 2025',
      prochainRdv: 'Aujourd\'hui 09:00',
      pathologies: ['Hypertension'],
      statut: 'actif'
    },
    {
      id: 2,
      nom: 'Dupont',
      prenom: 'Jean',
      age: 62,
      dernierRdv: '10 nov 2025',
      prochainRdv: 'Aujourd\'hui 09:30',
      pathologies: ['Diabète type 2', 'Cholestérol'],
      statut: 'actif'
    },
    {
      id: 3,
      nom: 'Martin',
      prenom: 'Claire',
      age: 34,
      dernierRdv: '05 nov 2025',
      prochainRdv: 'Aujourd\'hui 10:15',
      pathologies: [],
      statut: 'actif'
    },
    {
      id: 4,
      nom: 'Bernard',
      prenom: 'Paul',
      age: 58,
      dernierRdv: '01 nov 2025',
      prochainRdv: 'Aujourd\'hui 11:00',
      pathologies: ['Hypertension', 'Arthrose'],
      statut: 'actif'
    },
    {
      id: 5,
      nom: 'Rousseau',
      prenom: 'Sophie',
      age: 28,
      dernierRdv: '20 oct 2025',
      prochainRdv: 'Aujourd\'hui 11:30',
      pathologies: [],
      statut: 'actif'
    }
  ];

  const alertesMedicales = [
    { patient: 'Jean Dupont', alerte: 'Renouvellement ordonnance diabète', priorite: 'haute' },
    { patient: 'Marie Leblanc', alerte: 'Résultats analyses à vérifier', priorite: 'moyenne' },
    { patient: 'Paul Bernard', alerte: 'Vaccination grippe recommandée', priorite: 'basse' }
  ];

  const statsConsultations = [
    { mois: 'Juin', consultations: 78 },
    { mois: 'Juillet', consultations: 85 },
    { mois: 'Août', consultations: 72 },
    { mois: 'Sept', consultations: 92 },
    { mois: 'Oct', consultations: 88 },
    { mois: 'Nov', consultations: 89 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 md:pb-0">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageWithFallback 
              src={logo} 
              alt="CabinetPlus Logo" 
              className="h-8 md:h-10 w-auto"
            />
            <div className="hidden sm:block">
              <h2 className="text-slate-900">Dr. {user.prenom} {user.nom}</h2>
              <p className="text-sm text-slate-600">Médecin généraliste</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Button variant="ghost" onClick={onLogout} size="icon" className="md:w-auto md:px-4">
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline ml-2">Déconnexion</span>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full md:w-auto grid grid-cols-4 md:inline-flex">
            <TabsTrigger value="accueil" className="gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Accueil</span>
            </TabsTrigger>
            <TabsTrigger value="agenda" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Agenda</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Patients</span>
            </TabsTrigger>
            <TabsTrigger value="statistiques" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
          </TabsList>

          {/* Accueil Tab */}
          <TabsContent value="accueil" className="space-y-6">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
            >
              {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-lg">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                        <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">{stat.trend}</Badge>
                    </div>
                    <p className="text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-xs md:text-sm text-slate-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Prochains rendez-vous */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <Card className="border-none shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Prochains rendez-vous
                    </CardTitle>
                    <Button size="sm" variant="ghost">
                      Tout voir
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {prochainRendezVous.slice(0, 4).map((rdv, index) => (
                        <motion.div
                          key={rdv.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 text-center shrink-0">
                              <p className="text-blue-600">{rdv.heure}</p>
                            </div>
                            <Avatar className="w-10 h-10 shrink-0">
                              <AvatarFallback className="bg-blue-100 text-blue-700">
                                {rdv.patient.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-slate-900 truncate">{rdv.patient}, {rdv.age} ans</p>
                              <p className="text-sm text-slate-600 truncate">{rdv.motif}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-14 sm:ml-0">
                            <Badge variant={rdv.statut === 'confirmé' ? 'default' : 'secondary'}>
                              {rdv.statut}
                            </Badge>
                            <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              Voir
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {/* Quick Actions */}
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      onClick={() => setShowConsultationForm(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle consultation
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab('agenda')}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Gérer l'agenda
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setShowOrdonnanceForm(true)}
                    >
                      <Pill className="w-4 h-4 mr-2" />
                      Créer une ordonnance
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setShowCertificatForm(true)}
                    >
                      <FileCheck className="w-4 h-4 mr-2" />
                      Créer un certificat
                    </Button>
                  </CardContent>
                </Card>

                {/* Alertes médicales */}
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      Alertes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {alertesMedicales.map((alerte, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            alerte.priorite === 'haute' ? 'bg-red-500' :
                            alerte.priorite === 'moyenne' ? 'bg-orange-500' :
                            'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">{alerte.patient}</p>
                            <p className="text-xs text-slate-600">{alerte.alerte}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Agenda Tab */}
          <TabsContent value="agenda" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-none shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Planning du jour - 24 Novembre 2025</CardTitle>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Filter className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {prochainRendezVous.map((rdv, index) => (
                        <div 
                          key={rdv.id}
                          className="flex items-start gap-4 p-4 border-l-4 border-blue-500 bg-blue-50/50 rounded-r-xl hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <div className="w-16 shrink-0">
                            <p className="text-blue-700">{rdv.heure}</p>
                            <p className="text-xs text-slate-600">30 min</p>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <p className="text-slate-900">{rdv.patient}</p>
                                <p className="text-sm text-slate-600">{rdv.motif}</p>
                              </div>
                              <Badge>{rdv.type}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-600 mt-2">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {rdv.telephone}
                              </span>
                            </div>
                          </div>
                          <Button size="sm">Démarrer</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Créneaux disponibles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button className="w-full justify-start" variant="outline">
                        14:00 - 14:30
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        15:00 - 15:30
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        16:30 - 17:00
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-slate-600 mb-4">Temps de consultation moyen</p>
                      <p className="text-slate-900">25 min</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Mes patients</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Rechercher un patient..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button onClick={() => setShowNewPatientForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Nouveau
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patients.map((patient) => (
                    <motion.div
                      key={patient.id}
                      whileHover={{ scale: 1.01 }}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {patient.prenom[0]}{patient.nom[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-slate-900">{patient.prenom} {patient.nom}</p>
                            <p className="text-sm text-slate-600">{patient.age} ans</p>
                          </div>
                          <Badge variant="secondary">{patient.statut}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                          <span>Dernier RDV: {patient.dernierRdv}</span>
                          <span>•</span>
                          <span className="text-blue-600">Prochain: {patient.prochainRdv}</span>
                        </div>
                        {patient.pathologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {patient.pathologies.map((path, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {path}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-16 sm:ml-0">
                        <Button size="sm" variant="ghost">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Stethoscope className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistiques Tab */}
          <TabsContent value="statistiques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm">Consultations</p>
                      <p className="text-slate-900">89 ce mois</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm">Nouveaux patients</p>
                      <p className="text-slate-900">15 ce mois</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <FileCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm">Ordonnances</p>
                      <p className="text-slate-900">67 ce mois</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm">Satisfaction</p>
                      <p className="text-slate-900">96%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Évolution des consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statsConsultations.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="w-16 text-sm text-slate-600">{stat.mois}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-8 relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(stat.consultations / 100) * 100}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end pr-3"
                        >
                          <span className="text-white text-sm">{stat.consultations}</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Motifs de consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { motif: 'Consultation générale', nombre: 45, pourcentage: 51 },
                      { motif: 'Suivi chronique', nombre: 23, pourcentage: 26 },
                      { motif: 'Certificats', nombre: 12, pourcentage: 13 },
                      { motif: 'Urgences', nombre: 9, pourcentage: 10 }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">{item.motif}</span>
                          <span className="text-sm text-slate-600">{item.nombre}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.pourcentage}%` }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-blue-500 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Temps de travail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                      <div>
                        <p className="text-sm text-slate-600">Heures cette semaine</p>
                        <p className="text-slate-900">42h 30min</p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                      <div>
                        <p className="text-sm text-slate-600">Moyenne quotidienne</p>
                        <p className="text-slate-900">8h 30min</p>
                      </div>
                      <Activity className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <motion.nav 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 md:hidden z-40"
      >
        <div className="flex justify-around">
          {[
            { icon: Activity, label: 'Accueil', value: 'accueil' },
            { icon: Calendar, label: 'Agenda', value: 'agenda' },
            { icon: Users, label: 'Patients', value: 'patients' },
            { icon: BarChart3, label: 'Stats', value: 'statistiques' }
          ].map((item) => (
            <button 
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === item.value ? 'text-blue-600' : 'text-slate-600'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Modals */}
      <AnimatePresence>
        {selectedPatient && !showConsultationForm && (
          <PatientDetail
            patient={selectedPatient}
            onClose={() => setSelectedPatient(null)}
            onStartConsultation={() => setShowConsultationForm(true)}
          />
        )}
        
        {showConsultationForm && selectedPatient && (
          <ConsultationForm
            patient={selectedPatient}
            onClose={() => {
              setShowConsultationForm(false);
              setSelectedPatient(null);
            }}
            onSave={(data) => {
              console.log('Consultation saved:', data);
            }}
          />
        )}

        {showNewPatientForm && (
          <NewPatientForm
            onClose={() => setShowNewPatientForm(false)}
            onSave={(data) => {
              console.log('New patient saved:', data);
            }}
          />
        )}

        {showOrdonnanceForm && selectedPatient && (
          <OrdonnanceForm
            patient={selectedPatient}
            onClose={() => setShowOrdonnanceForm(false)}
            onSave={(data) => {
              console.log('Ordonnance saved:', data);
            }}
          />
        )}

        {showCertificatForm && selectedPatient && (
          <CertificatForm
            patient={selectedPatient}
            onClose={() => setShowCertificatForm(false)}
            onSave={(data) => {
              console.log('Certificat saved:', data);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
