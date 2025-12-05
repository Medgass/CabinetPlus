import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Save,
  FileText,
  Pill,
  Activity,
  AlertCircle,
  Plus,
  Trash2,
  Printer,
  Clock,
  Thermometer,
  Heart,
  Droplets,
  Weight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';

interface ConsultationFormProps {
  patient: any;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function ConsultationForm({ patient, onClose, onSave }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    motif: '',
    anamnese: '',
    examenClinique: '',
    diagnostic: '',
    conduiteTenir: '',
    notes: '',
    // Constantes
    temperature: '',
    tension: '',
    pouls: '',
    saturation: '',
    poids: '',
    taille: ''
  });

  const [medicaments, setMedicaments] = useState<Array<{
    nom: string;
    dosage: string;
    frequence: string;
    duree: string;
  }>>([]);

  const [analyses, setAnalyses] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const consultationData = {
      ...formData,
      medicaments,
      analyses,
      patientId: patient.id,
      date: new Date().toISOString()
    };

    if (onSave) {
      onSave(consultationData);
    }
    
    toast.success('Consultation enregistrée avec succès');
    onClose();
  };

  const addMedicament = () => {
    setMedicaments([...medicaments, { nom: '', dosage: '', frequence: '', duree: '' }]);
  };

  const removeMedicament = (index: number) => {
    setMedicaments(medicaments.filter((_, i) => i !== index));
  };

  const updateMedicament = (index: number, field: string, value: string) => {
    const updated = [...medicaments];
    updated[index] = { ...updated[index], [field]: value };
    setMedicaments(updated);
  };

  const [newAnalyse, setNewAnalyse] = useState('');
  
  const addAnalyse = () => {
    if (newAnalyse.trim()) {
      setAnalyses([...analyses, newAnalyse.trim()]);
      setNewAnalyse('');
    }
  };

  const removeAnalyse = (index: number) => {
    setAnalyses(analyses.filter((_, i) => i !== index));
  };

  const analysesPredefinis = [
    'Bilan sanguin complet',
    'Glycémie à jeun',
    'Bilan lipidique',
    'TSH',
    'ECBU',
    'NFS',
    'CRP',
    'Créatinine'
  ];

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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white mb-1">Nouvelle consultation</h2>
              <p className="text-blue-100">
                {patient.prenom} {patient.nom} • {patient.age} ans
              </p>
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
              {/* Constantes vitales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    Constantes vitales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature" className="flex items-center gap-2 text-sm">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        Température (°C)
                      </Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        placeholder="37.0"
                        value={formData.temperature}
                        onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tension" className="flex items-center gap-2 text-sm">
                        <Heart className="w-4 h-4 text-red-500" />
                        Tension
                      </Label>
                      <Input
                        id="tension"
                        placeholder="120/80"
                        value={formData.tension}
                        onChange={(e) => setFormData({ ...formData, tension: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pouls" className="flex items-center gap-2 text-sm">
                        <Activity className="w-4 h-4 text-pink-500" />
                        Pouls (bpm)
                      </Label>
                      <Input
                        id="pouls"
                        type="number"
                        placeholder="70"
                        value={formData.pouls}
                        onChange={(e) => setFormData({ ...formData, pouls: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saturation" className="flex items-center gap-2 text-sm">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        SpO2 (%)
                      </Label>
                      <Input
                        id="saturation"
                        type="number"
                        placeholder="98"
                        value={formData.saturation}
                        onChange={(e) => setFormData({ ...formData, saturation: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="poids" className="flex items-center gap-2 text-sm">
                        <Weight className="w-4 h-4 text-purple-500" />
                        Poids (kg)
                      </Label>
                      <Input
                        id="poids"
                        type="number"
                        step="0.1"
                        placeholder="70"
                        value={formData.poids}
                        onChange={(e) => setFormData({ ...formData, poids: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taille" className="text-sm">
                        Taille (cm)
                      </Label>
                      <Input
                        id="taille"
                        type="number"
                        placeholder="170"
                        value={formData.taille}
                        onChange={(e) => setFormData({ ...formData, taille: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations cliniques */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Informations cliniques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="motif">Motif de consultation *</Label>
                    <Input
                      id="motif"
                      placeholder="Ex: Consultation générale, Suivi..."
                      value={formData.motif}
                      onChange={(e) => setFormData({ ...formData, motif: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="anamnese">Anamnèse</Label>
                    <Textarea
                      id="anamnese"
                      placeholder="Histoire de la maladie, symptômes rapportés par le patient..."
                      rows={3}
                      value={formData.anamnese}
                      onChange={(e) => setFormData({ ...formData, anamnese: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="examenClinique">Examen clinique</Label>
                    <Textarea
                      id="examenClinique"
                      placeholder="Résultats de l'examen physique..."
                      rows={3}
                      value={formData.examenClinique}
                      onChange={(e) => setFormData({ ...formData, examenClinique: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diagnostic">Diagnostic *</Label>
                    <Textarea
                      id="diagnostic"
                      placeholder="Diagnostic principal et éventuels diagnostics secondaires..."
                      rows={2}
                      value={formData.diagnostic}
                      onChange={(e) => setFormData({ ...formData, diagnostic: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="conduiteTenir">Conduite à tenir</Label>
                    <Textarea
                      id="conduiteTenir"
                      placeholder="Traitement, recommandations, suivi..."
                      rows={2}
                      value={formData.conduiteTenir}
                      onChange={(e) => setFormData({ ...formData, conduiteTenir: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes privées</Label>
                    <Textarea
                      id="notes"
                      placeholder="Notes personnelles (non visibles sur les documents patients)..."
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Prescription */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="w-5 h-5 text-purple-600" />
                      Prescription
                    </CardTitle>
                    <Button type="button" size="sm" onClick={addMedicament}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter médicament
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {medicaments.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">
                      Aucun médicament prescrit
                    </p>
                  ) : (
                    medicaments.map((med, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <span className="text-sm font-medium">Médicament {index + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMedicament(index)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-sm">Nom du médicament</Label>
                            <Input
                              placeholder="Ex: Paracétamol"
                              value={med.nom}
                              onChange={(e) => updateMedicament(index, 'nom', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Dosage</Label>
                            <Input
                              placeholder="Ex: 500mg"
                              value={med.dosage}
                              onChange={(e) => updateMedicament(index, 'dosage', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Fréquence</Label>
                            <Input
                              placeholder="Ex: 3 fois par jour"
                              value={med.frequence}
                              onChange={(e) => updateMedicament(index, 'frequence', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Durée</Label>
                            <Input
                              placeholder="Ex: 7 jours"
                              value={med.duree}
                              onChange={(e) => updateMedicament(index, 'duree', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Examens complémentaires */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    Examens complémentaires
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Saisir un examen..."
                      value={newAnalyse}
                      onChange={(e) => setNewAnalyse(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAnalyse())}
                    />
                    <Button type="button" onClick={addAnalyse}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {analysesPredefinis.map((analyse, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() => setAnalyses([...analyses, analyse])}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {analyse}
                      </Badge>
                    ))}
                  </div>

                  {analyses.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Examens prescrits:</p>
                        <div className="space-y-2">
                          {analyses.map((analyse, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                              <span className="text-sm">{analyse}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAnalyse(idx)}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
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
              <Button type="button" variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer consultation
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}


