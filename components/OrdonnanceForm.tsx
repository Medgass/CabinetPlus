import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Save,
  Pill,
  Plus,
  Trash2,
  Printer,
  Search,
  FileText
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

interface OrdonnanceFormProps {
  patient?: any;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function OrdonnanceForm({ patient, onClose, onSave }: OrdonnanceFormProps) {
  const [selectedPatient, setSelectedPatient] = useState(patient);
  const [searchPatient, setSearchPatient] = useState('');
  const [medicaments, setMedicaments] = useState<Array<{
    nom: string;
    dosage: string;
    frequence: string;
    duree: string;
    quantite: string;
  }>>([
    { nom: '', dosage: '', frequence: '', duree: '', quantite: '' }
  ]);
  const [instructions, setInstructions] = useState('');
  const [validite, setValidite] = useState('3 mois');

  const medicamentsSuggestions = [
    { nom: 'Paracétamol', dosage: '1000mg' },
    { nom: 'Ibuprofène', dosage: '400mg' },
    { nom: 'Amoxicilline', dosage: '500mg' },
    { nom: 'Doliprane', dosage: '500mg' },
    { nom: 'Aspirine', dosage: '100mg' },
    { nom: 'Ventoline', dosage: '100µg' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient) {
      toast.error('Veuillez sélectionner un patient');
      return;
    }

    const ordonnanceData = {
      patient: selectedPatient,
      medicaments: medicaments.filter(m => m.nom.trim() !== ''),
      instructions,
      validite,
      date: new Date().toISOString()
    };

    if (onSave) {
      onSave(ordonnanceData);
    }
    
    toast.success('Ordonnance créée avec succès');
    onClose();
  };

  const addMedicament = () => {
    setMedicaments([...medicaments, { nom: '', dosage: '', frequence: '', duree: '', quantite: '' }]);
  };

  const removeMedicament = (index: number) => {
    setMedicaments(medicaments.filter((_, i) => i !== index));
  };

  const updateMedicament = (index: number, field: string, value: string) => {
    const updated = [...medicaments];
    updated[index] = { ...updated[index], [field]: value };
    setMedicaments(updated);
  };

  const handlePrint = () => {
    toast.info('Impression de l\'ordonnance...');
    // Logique d'impression
  };

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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white mb-1">Nouvelle ordonnance</h2>
              {selectedPatient && (
                <p className="text-purple-100">
                  {selectedPatient.prenom} {selectedPatient.nom} • {selectedPatient.age} ans
                </p>
              )}
            </div>
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

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[calc(90vh-200px)]">
            <div className="p-6 space-y-6">
              {/* Sélection patient si non fourni */}
              {!patient && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-purple-600" />
                      Sélectionner un patient
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Input
                        placeholder="Rechercher un patient par nom..."
                        value={searchPatient}
                        onChange={(e) => setSearchPatient(e.target.value)}
                      />
                      {!selectedPatient && (
                        <p className="text-sm text-slate-500">
                          Recherchez et sélectionnez un patient pour créer une ordonnance
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Date et validité */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Informations générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date de prescription</Label>
                      <Input
                        type="date"
                        value={new Date().toISOString().split('T')[0]}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="validite">Validité</Label>
                      <Input
                        id="validite"
                        placeholder="3 mois"
                        value={validite}
                        onChange={(e) => setValidite(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Médicaments */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="w-5 h-5 text-purple-600" />
                      Médicaments prescrits
                    </CardTitle>
                    <Button type="button" size="sm" onClick={addMedicament}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Suggestions rapides */}
                  <div className="flex flex-wrap gap-2 pb-3 border-b">
                    <p className="text-sm text-slate-600 w-full mb-2">Suggestions rapides:</p>
                    {medicamentsSuggestions.map((med, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="cursor-pointer hover:bg-purple-50"
                        onClick={() => {
                          const emptyIndex = medicaments.findIndex(m => !m.nom);
                          if (emptyIndex >= 0) {
                            updateMedicament(emptyIndex, 'nom', med.nom);
                            updateMedicament(emptyIndex, 'dosage', med.dosage);
                          } else {
                            setMedicaments([...medicaments, {
                              nom: med.nom,
                              dosage: med.dosage,
                              frequence: '',
                              duree: '',
                              quantite: ''
                            }]);
                          }
                        }}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {med.nom} {med.dosage}
                      </Badge>
                    ))}
                  </div>

                  {/* Liste des médicaments */}
                  {medicaments.map((med, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="font-medium">Médicament {index + 1}</span>
                        {medicaments.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMedicament(index)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-sm">Nom du médicament *</Label>
                          <Input
                            placeholder="Ex: Paracétamol"
                            value={med.nom}
                            onChange={(e) => updateMedicament(index, 'nom', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Dosage *</Label>
                          <Input
                            placeholder="Ex: 500mg"
                            value={med.dosage}
                            onChange={(e) => updateMedicament(index, 'dosage', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label className="text-sm">Fréquence *</Label>
                          <Input
                            placeholder="Ex: 3 fois/jour"
                            value={med.frequence}
                            onChange={(e) => updateMedicament(index, 'frequence', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Durée *</Label>
                          <Input
                            placeholder="Ex: 7 jours"
                            value={med.duree}
                            onChange={(e) => updateMedicament(index, 'duree', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Quantité</Label>
                          <Input
                            placeholder="Ex: 1 boîte"
                            value={med.quantite}
                            onChange={(e) => updateMedicament(index, 'quantite', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructions et recommandations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions pour le patient</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Ex: À prendre pendant les repas. Eviter l'alcool..."
                      rows={4}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Prévisualisation */}
              <Card className="bg-slate-50">
                <CardHeader>
                  <CardTitle>Prévisualisation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200">
                    <div className="text-center mb-6">
                      <h3 className="text-slate-900">ORDONNANCE MÉDICALE</h3>
                      <p className="text-sm text-slate-600">Dr. Martin • Médecin généraliste</p>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    {selectedPatient && (
                      <div className="mb-4">
                        <p className="text-sm text-slate-600">Patient:</p>
                        <p className="font-medium">{selectedPatient.prenom} {selectedPatient.nom}</p>
                        <p className="text-sm text-slate-600">{selectedPatient.age} ans</p>
                      </div>
                    )}
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-3">
                      {medicaments.filter(m => m.nom).map((med, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="font-medium">{idx + 1}. {med.nom} {med.dosage}</p>
                          {med.frequence && <p className="text-slate-600 ml-4">Fréquence: {med.frequence}</p>}
                          {med.duree && <p className="text-slate-600 ml-4">Durée: {med.duree}</p>}
                          {med.quantite && <p className="text-slate-600 ml-4">Quantité: {med.quantite}</p>}
                        </div>
                      ))}
                    </div>
                    
                    {instructions && (
                      <>
                        <Separator className="my-4" />
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Instructions:</p>
                          <p className="text-sm">{instructions}</p>
                        </div>
                      </>
                    )}
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between text-xs text-slate-600">
                      <p>Date: {new Date().toLocaleDateString('fr-FR')}</p>
                      <p>Validité: {validite}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-6 bg-slate-50">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="button" variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}


