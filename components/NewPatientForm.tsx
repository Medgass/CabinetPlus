import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Save,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface NewPatientFormProps {
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function NewPatientForm({ onClose, onSave }: NewPatientFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: '',
    telephone: '',
    email: '',
    adresse: '',
    ville: '',
    codePostal: '',
    numeroSecu: '',
    mutuelle: '',
    numeroPrincipal: '',
    contactUrgenceNom: '',
    contactUrgenceTel: '',
    contactUrgenceLien: '',
    medecinTraitant: '',
    groupeSanguin: '',
    poids: '',
    taille: '',
    notes: ''
  });

  const [allergies, setAllergies] = useState<string[]>([]);
  const [antecedents, setAntecedents] = useState<string[]>([]);
  const [newAllergie, setNewAllergie] = useState('');
  const [newAntecedent, setNewAntecedent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patientData = {
      ...formData,
      allergies,
      antecedents,
      dateCreation: new Date().toISOString()
    };

    if (onSave) {
      onSave(patientData);
    }
    
    toast.success('Patient ajouté avec succès');
    onClose();
  };

  const addAllergie = () => {
    if (newAllergie.trim()) {
      setAllergies([...allergies, newAllergie.trim()]);
      setNewAllergie('');
    }
  };

  const removeAllergie = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const addAntecedent = () => {
    if (newAntecedent.trim()) {
      setAntecedents([...antecedents, newAntecedent.trim()]);
      setNewAntecedent('');
    }
  };

  const removeAntecedent = (index: number) => {
    setAntecedents(antecedents.filter((_, i) => i !== index));
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
              <h2 className="text-white mb-1">Nouveau patient</h2>
              <p className="text-purple-100">Ajouter un nouveau patient au dossier médical</p>
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
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        placeholder="Dupont"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        placeholder="Jean"
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateNaissance">Date de naissance *</Label>
                      <Input
                        id="dateNaissance"
                        type="date"
                        value={formData.dateNaissance}
                        onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sexe">Sexe *</Label>
                      <Select value={formData.sexe} onValueChange={(value) => setFormData({ ...formData, sexe: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="homme">Homme</SelectItem>
                          <SelectItem value="femme">Femme</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telephone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Téléphone *
                      </Label>
                      <Input
                        id="telephone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jean.dupont@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adresse */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    Adresse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adresse">Rue</Label>
                    <Input
                      id="adresse"
                      placeholder="12 rue de la République"
                      value={formData.adresse}
                      onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="codePostal">Code postal</Label>
                      <Input
                        id="codePostal"
                        placeholder="75001"
                        value={formData.codePostal}
                        onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ville">Ville</Label>
                      <Input
                        id="ville"
                        placeholder="Paris"
                        value={formData.ville}
                        onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations médicales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-purple-600" />
                    Informations médicales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="numeroSecu">Numéro de sécurité sociale</Label>
                      <Input
                        id="numeroSecu"
                        placeholder="1 23 45 67 890 123 45"
                        value={formData.numeroSecu}
                        onChange={(e) => setFormData({ ...formData, numeroSecu: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mutuelle">Mutuelle</Label>
                      <Input
                        id="mutuelle"
                        placeholder="Nom de la mutuelle"
                        value={formData.mutuelle}
                        onChange={(e) => setFormData({ ...formData, mutuelle: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="groupeSanguin">Groupe sanguin</Label>
                      <Select value={formData.groupeSanguin} onValueChange={(value) => setFormData({ ...formData, groupeSanguin: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="poids">Poids (kg)</Label>
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
                      <Label htmlFor="taille">Taille (cm)</Label>
                      <Input
                        id="taille"
                        type="number"
                        placeholder="170"
                        value={formData.taille}
                        onChange={(e) => setFormData({ ...formData, taille: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="space-y-2">
                    <Label>Allergies connues</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ajouter une allergie..."
                        value={newAllergie}
                        onChange={(e) => setNewAllergie(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergie())}
                      />
                      <Button type="button" onClick={addAllergie} size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {allergies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {allergies.map((allergie, idx) => (
                          <Badge key={idx} variant="destructive" className="gap-1">
                            {allergie}
                            <button
                              type="button"
                              onClick={() => removeAllergie(idx)}
                              className="ml-1 hover:text-white/70"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Antécédents */}
                  <div className="space-y-2">
                    <Label>Antécédents médicaux</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ajouter un antécédent..."
                        value={newAntecedent}
                        onChange={(e) => setNewAntecedent(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAntecedent())}
                      />
                      <Button type="button" onClick={addAntecedent} size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {antecedents.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {antecedents.map((antecedent, idx) => (
                          <Badge key={idx} variant="outline" className="gap-1">
                            {antecedent}
                            <button
                              type="button"
                              onClick={() => removeAntecedent(idx)}
                              className="ml-1 hover:text-slate-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact d'urgence */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-purple-600" />
                    Contact d&apos;urgence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactUrgenceNom">Nom</Label>
                      <Input
                        id="contactUrgenceNom"
                        placeholder="Marie Dupont"
                        value={formData.contactUrgenceNom}
                        onChange={(e) => setFormData({ ...formData, contactUrgenceNom: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactUrgenceTel">Téléphone</Label>
                      <Input
                        id="contactUrgenceTel"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        value={formData.contactUrgenceTel}
                        onChange={(e) => setFormData({ ...formData, contactUrgenceTel: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactUrgenceLien">Lien</Label>
                      <Input
                        id="contactUrgenceLien"
                        placeholder="Épouse, Fils..."
                        value={formData.contactUrgenceLien}
                        onChange={(e) => setFormData({ ...formData, contactUrgenceLien: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes privées</Label>
                    <Textarea
                      id="notes"
                      placeholder="Notes personnelles sur le patient..."
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
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
              <Button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer patient
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}


