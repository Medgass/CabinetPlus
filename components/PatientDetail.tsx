import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Activity,
  Pill,
  Stethoscope,
  AlertCircle,
  Plus,
  Download,
  Edit,
  Clock,
  Weight,
  Ruler,
  Heart,
  Thermometer,
  Droplets,
  FileCheck
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface PatientDetailProps {
  patient: any;
  onClose: () => void;
  onStartConsultation: () => void;
}

export function PatientDetail({ patient, onClose, onStartConsultation }: PatientDetailProps) {
  const [activeTab, setActiveTab] = useState('info');

  const historiqueMedical = [
    {
      date: '15 Nov 2025',
      motif: 'Consultation générale',
      medecin: 'Dr. Martin',
      diagnostic: 'Hypertension artérielle',
      traitement: 'Amlodipine 5mg',
      notes: 'Tension: 145/95. Patient à revoir dans 1 mois.'
    },
    {
      date: '03 Oct 2025',
      motif: 'Suivi hypertension',
      medecin: 'Dr. Martin',
      diagnostic: 'Hypertension contrôlée',
      traitement: 'Continuation traitement',
      notes: 'Tension: 130/85. Bon contrôle.'
    },
    {
      date: '12 Sep 2025',
      motif: 'Contrôle annuel',
      medecin: 'Dr. Martin',
      diagnostic: 'RAS',
      traitement: 'Aucun',
      notes: 'Bilan sanguin normal. Vaccination à jour.'
    }
  ];

  const ordonnances = [
    {
      date: '15 Nov 2025',
      medicaments: ['Amlodipine 5mg - 1cp/jour', 'Aspirine 100mg - 1cp/jour'],
      duree: '3 mois'
    },
    {
      date: '03 Oct 2025',
      medicaments: ['Amlodipine 5mg - 1cp/jour'],
      duree: '1 mois'
    }
  ];

  const analyses = [
    {
      date: '10 Nov 2025',
      type: 'Bilan sanguin complet',
      resultats: [
        { nom: 'Glycémie', valeur: '0.95 g/L', normal: true },
        { nom: 'Cholestérol total', valeur: '1.85 g/L', normal: true },
        { nom: 'HDL', valeur: '0.55 g/L', normal: true },
        { nom: 'LDL', valeur: '1.15 g/L', normal: true },
        { nom: 'Triglycérides', valeur: '0.75 g/L', normal: true }
      ]
    },
    {
      date: '05 Sep 2025',
      type: 'Bilan rénal',
      resultats: [
        { nom: 'Créatinine', valeur: '9 mg/L', normal: true },
        { nom: 'Urée', valeur: '0.35 g/L', normal: true }
      ]
    }
  ];

  const vaccinations = [
    { vaccin: 'Grippe', date: '15 Oct 2025', rappel: 'Oct 2026' },
    { vaccin: 'Tétanos', date: '12 Mar 2023', rappel: 'Mar 2028' },
    { vaccin: 'COVID-19', date: '20 Juin 2024', rappel: 'Juin 2025' }
  ];

  const allergies = ['Pénicilline', 'Pollen'];
  const antecedents = ['Hypertension artérielle', 'Aucun antécédent chirurgical'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-white mb-1">{patient.prenom} {patient.nom}</h2>
                <p className="text-blue-100">{patient.age} ans • {patient.statut}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onStartConsultation}
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Nouvelle consultation
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Alertes */}
          {allergies.length > 0 && (
            <div className="bg-red-500/20 border border-red-300 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Allergies: {allergies.join(', ')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <ScrollArea className="h-[calc(90vh-200px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="info">Infos</TabsTrigger>
                <TabsTrigger value="historique">Historique</TabsTrigger>
                <TabsTrigger value="ordonnances">Ordonnances</TabsTrigger>
                <TabsTrigger value="analyses">Analyses</TabsTrigger>
                <TabsTrigger value="vaccinations">Vaccins</TabsTrigger>
              </TabsList>

              {/* Informations générales */}
              <TabsContent value="info" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Informations personnelles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>marie.leblanc@email.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>06 12 34 56 78</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>45 rue de la République, 75001 Paris</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Né(e) le 12/05/1980</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-600" />
                        Données vitales
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Weight className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">Poids</span>
                        </div>
                        <span className="font-medium">68 kg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">Taille</span>
                        </div>
                        <span className="font-medium">165 cm</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">Groupe sanguin</span>
                        </div>
                        <span className="font-medium">A+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">IMC</span>
                        </div>
                        <Badge variant="secondary">24.9</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      Antécédents et allergies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Allergies</p>
                      <div className="flex flex-wrap gap-2">
                        {allergies.map((allergie, idx) => (
                          <Badge key={idx} variant="destructive">{allergie}</Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium mb-2">Antécédents médicaux</p>
                      <div className="flex flex-wrap gap-2">
                        {antecedents.map((ant, idx) => (
                          <Badge key={idx} variant="outline">{ant}</Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium mb-2">Pathologies chroniques</p>
                      <div className="flex flex-wrap gap-2">
                        {patient.pathologies && patient.pathologies.length > 0 ? (
                          patient.pathologies.map((path: string, idx: number) => (
                            <Badge key={idx} variant="secondary">{path}</Badge>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">Aucune pathologie chronique</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Historique médical */}
              <TabsContent value="historique" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-slate-900">Consultations précédentes</h3>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
                {historiqueMedical.map((consultation, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-slate-900 mb-1">{consultation.motif}</p>
                          <p className="text-sm text-slate-600">{consultation.date} • {consultation.medecin}</p>
                        </div>
                        <Badge>{consultation.date}</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-2">
                          <span className="font-medium text-slate-700">Diagnostic:</span>
                          <span className="text-slate-600">{consultation.diagnostic}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-medium text-slate-700">Traitement:</span>
                          <span className="text-slate-600">{consultation.traitement}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-medium text-slate-700">Notes:</span>
                          <span className="text-slate-600">{consultation.notes}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          Voir détails
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Ordonnances */}
              <TabsContent value="ordonnances" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-slate-900">Ordonnances en cours</h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle ordonnance
                  </Button>
                </div>
                {ordonnances.map((ordonnance, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Pill className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-slate-900">Ordonnance du {ordonnance.date}</p>
                            <p className="text-sm text-slate-600">Durée: {ordonnance.duree}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                        {ordonnance.medicaments.map((med, medIdx) => (
                          <div key={medIdx} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            <span>{med}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Imprimer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Analyses */}
              <TabsContent value="analyses" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-slate-900">Résultats d&apos;analyses</h3>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Tout exporter
                  </Button>
                </div>
                {analyses.map((analyse, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-slate-900">{analyse.type}</p>
                            <p className="text-sm text-slate-600">{analyse.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {analyse.resultats.map((resultat, resIdx) => (
                          <div key={resIdx} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <span className="text-sm">{resultat.nom}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{resultat.valeur}</span>
                              {resultat.normal ? (
                                <Badge variant="secondary" className="bg-green-100 text-green-700">Normal</Badge>
                              ) : (
                                <Badge variant="destructive">Anormal</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Vaccinations */}
              <TabsContent value="vaccinations" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-slate-900">Carnet de vaccination</h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vaccinations.map((vaccination, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-slate-900 mb-1">{vaccination.vaccin}</p>
                            <p className="text-sm text-slate-600">Fait le {vaccination.date}</p>
                          </div>
                          <Badge variant="secondary">À jour</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mt-3">
                          <Clock className="w-4 h-4" />
                          <span>Rappel: {vaccination.rappel}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}
