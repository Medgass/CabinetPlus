import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Save,
  FileCheck,
  Printer,
  Search
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface CertificatFormProps {
  patient?: any;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function CertificatForm({ patient, onClose, onSave }: CertificatFormProps) {
  const [selectedPatient, setSelectedPatient] = useState(patient);
  const [searchPatient, setSearchPatient] = useState('');
  const [typeCertificat, setTypeCertificat] = useState('');
  const [contenu, setContenu] = useState('');
  const [duree, setDuree] = useState('');
  const [observations, setObservations] = useState('');

  const typesCertificat = [
    { value: 'arret_travail', label: 'Arrêt de travail', template: 'Je certifie avoir examiné ce jour [PATIENT] et lui prescris un arrêt de travail de [DUREE] pour raison médicale.' },
    { value: 'sport', label: 'Certificat médical sport', template: 'Je certifie avoir examiné ce jour [PATIENT] et atteste qu\'il/elle ne présente pas de contre-indication à la pratique du sport.' },
    { value: 'scolarite', label: 'Certificat de scolarité', template: 'Je certifie avoir examiné ce jour [PATIENT] et atteste qu\'il/elle peut reprendre la scolarité sans restriction.' },
    { value: 'aptitude', label: 'Certificat d\'aptitude', template: 'Je certifie avoir examiné ce jour [PATIENT] et atteste qu\'il/elle est apte à exercer son activité professionnelle.' },
    { value: 'contre_indication', label: 'Certificat de contre-indication', template: 'Je certifie avoir examiné ce jour [PATIENT] et atteste d\'une contre-indication médicale temporaire.' },
    { value: 'personnalise', label: 'Certificat personnalisé', template: '' }
  ];

  const handleTypeChange = (value: string) => {
    setTypeCertificat(value);
    const type = typesCertificat.find(t => t.value === value);
    if (type && selectedPatient) {
      let template = type.template;
      template = template.replace('[PATIENT]', `${selectedPatient.prenom} ${selectedPatient.nom}`);
      template = template.replace('[DUREE]', duree || '_____');
      setContenu(template);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient) {
      toast.error('Veuillez sélectionner un patient');
      return;
    }

    if (!typeCertificat) {
      toast.error('Veuillez sélectionner un type de certificat');
      return;
    }

    const certificatData = {
      patient: selectedPatient,
      type: typeCertificat,
      contenu,
      duree,
      observations,
      date: new Date().toISOString()
    };

    if (onSave) {
      onSave(certificatData);
    }
    
    toast.success('Certificat médical créé avec succès');
    onClose();
  };

  const handlePrint = () => {
    toast.info('Impression du certificat...');
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
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white mb-1">Certificat médical</h2>
              {selectedPatient && (
                <p className="text-green-100">
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
                      <Search className="w-5 h-5 text-green-600" />
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
                          Recherchez et sélectionnez un patient pour créer un certificat
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Type de certificat */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-green-600" />
                    Type de certificat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="typeCertificat">Sélectionner le type *</Label>
                    <Select value={typeCertificat} onValueChange={handleTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un type de certificat" />
                      </SelectTrigger>
                      <SelectContent>
                        {typesCertificat.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {typeCertificat === 'arret_travail' && (
                    <div className="space-y-2">
                      <Label htmlFor="duree">Durée de l&apos;arrêt *</Label>
                      <Input
                        id="duree"
                        placeholder="Ex: 3 jours, 1 semaine..."
                        value={duree}
                        onChange={(e) => {
                          setDuree(e.target.value);
                          if (contenu) {
                            setContenu(contenu.replace(/\[DUREE\]|_____/, e.target.value));
                          }
                        }}
                        required
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contenu du certificat */}
              {typeCertificat && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contenu du certificat</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contenu">Texte du certificat *</Label>
                      <Textarea
                        id="contenu"
                        rows={6}
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                        placeholder="Le contenu du certificat apparaîtra ici..."
                        required
                      />
                      <p className="text-xs text-slate-500">
                        Ce texte apparaîtra sur le certificat médical officiel
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="observations">Observations (optionnel)</Label>
                      <Textarea
                        id="observations"
                        rows={3}
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        placeholder="Observations ou remarques complémentaires..."
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Prévisualisation */}
              {typeCertificat && contenu && (
                <Card className="bg-slate-50">
                  <CardHeader>
                    <CardTitle>Prévisualisation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-8 rounded-lg border-2 border-slate-200 min-h-[400px]">
                      {/* En-tête */}
                      <div className="mb-8">
                        <h3 className="text-slate-900 text-center mb-2">CERTIFICAT MÉDICAL</h3>
                        <div className="text-sm text-slate-600">
                          <p>Dr. Martin</p>
                          <p>Médecin généraliste</p>
                          <p>123 Avenue des Champs</p>
                          <p>75008 Paris</p>
                          <p>Tel: 01 23 45 67 89</p>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      {/* Informations patient */}
                      {selectedPatient && (
                        <div className="mb-6">
                          <p className="text-sm text-slate-600 mb-2">Concernant:</p>
                          <p className="font-medium">{selectedPatient.prenom} {selectedPatient.nom}</p>
                          <p className="text-sm text-slate-600">
                            Né(e) le: {selectedPatient.dateNaissance || '12/05/1980'}
                          </p>
                        </div>
                      )}

                      {/* Contenu */}
                      <div className="my-8">
                        <p className="whitespace-pre-wrap leading-relaxed">{contenu}</p>
                      </div>

                      {/* Observations */}
                      {observations && (
                        <div className="my-6">
                          <p className="text-sm text-slate-600 mb-2">Observations:</p>
                          <p className="text-sm whitespace-pre-wrap">{observations}</p>
                        </div>
                      )}

                      <Separator className="my-6" />

                      {/* Date et signature */}
                      <div className="flex justify-between items-end mt-12">
                        <div>
                          <p className="text-sm text-slate-600">Fait à Paris</p>
                          <p className="text-sm text-slate-600">
                            Le {new Date().toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-slate-600 mb-8">Signature et cachet</p>
                          <div className="w-32 border-b border-slate-300"></div>
                          <p className="text-sm text-slate-600 mt-2">Dr. Martin</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
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
              <Button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
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


