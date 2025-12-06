import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Phone,
  Mail,
  UserPlus,
  Clock,
  LogOut,
  Search,
  Bell,
  CheckCircle,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import type { User } from "../App";
const logo = "/doctor-logo.svg";

interface DashboardSecretaireProps {
  user: User;
  onLogout: () => void;
}

export function DashboardSecretaire({
  user,
  onLogout,
}: DashboardSecretaireProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewRDV, setShowNewRDV] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifications = [
    { id: 1, title: 'Nouveau patient ajouté', time: '10m' },
    { id: 2, title: 'Rappel: RDV à 11:30 Sophie Rousseau', time: '2h' }
  ];
  const [newRDV, setNewRDV] = useState({
    patient: "",
    telephone: "",
    email: "",
    date: "",
    heure: "",
    motif: "",
  });
  const formValid = Boolean(newRDV.patient.trim() && newRDV.date && newRDV.heure);
  const [selectedRDV, setSelectedRDV] = useState<any>(null);
  const [showRDVDetails, setShowRDVDetails] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messageText, setMessageText] = useState("");

  const statsSecretaire = [
    {
      label: "RDV programmés",
      value: "24",
      icon: Calendar,
      color: "blue",
    },
    {
      label: "Appels en attente",
      value: "5",
      icon: Phone,
      color: "orange",
    },
    {
      label: "Nouveaux messages",
      value: "12",
      icon: Mail,
      color: "green",
    },
    {
      label: "Confirmations",
      value: "18",
      icon: CheckCircle,
      color: "purple",
    },
  ];

  const defaultRendezvous = [
    {
      heure: "08:30",
      patient: "Sophie Lebrun",
      statut: "confirmé",
      telephone: "06 12 34 56 78",
    },
    {
      heure: "09:00",
      patient: "Marc Petit",
      statut: "en attente",
      telephone: "06 23 45 67 89",
    },
    {
      heure: "09:30",
      patient: "Julie Martin",
      statut: "confirmé",
      telephone: "06 34 56 78 90",
    },
    {
      heure: "10:00",
      patient: "Pierre Durand",
      statut: "confirmé",
      telephone: "06 45 67 89 01",
    },
    {
      heure: "10:30",
      patient: "Emma Blanc",
      statut: "en attente",
      telephone: "06 56 78 90 12",
    },
  ];

  const [rendezvousAujourdhui, setRendezvousAujourdhui] = useState(() => {
    try {
      const fromStorage = localStorage.getItem("rendezvousAujourdhui");
      return fromStorage ? JSON.parse(fromStorage) : defaultRendezvous;
    } catch (e) {
      return defaultRendezvous;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("rendezvousAujourdhui", JSON.stringify(rendezvousAujourdhui));
    } catch (e) {
      // ignore
    }
  }, [rendezvousAujourdhui]);

  const tachesUrgentes = [
    {
      tache: "Rappeler Mme Dupont pour confirmation",
      priorite: "haute",
    },
    {
      tache: "Envoyer ordonnance à M. Bernard",
      priorite: "moyenne",
    },
    {
      tache: "Préparer dossier nouveau patient",
      priorite: "basse",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-slate-200 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="CabinetPlus Logo"
              className="h-10 w-auto"
            />
            <div>
              <h2 className="text-slate-900">
                {user.prenom} {user.nom}
              </h2>
              <p className="text-sm text-slate-600">
                Secrétaire médicale
              </p>
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
                    {notifications.map(n => (
                      <div key={n.id} className="px-3 py-2 hover:bg-slate-50 cursor-default">
                        <div className="text-sm text-slate-900">{n.title}</div>
                        <div className="text-xs text-slate-500">{n.time}</div>
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
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Rechercher un patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {statsSecretaire.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon
                      className={`w-5 h-5 text-${stat.color}-600`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rendez-vous du jour */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Rendez-vous du jour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rendezvousAujourdhui.map((rdv, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedRDV(rdv);
                        setShowRDVDetails(true);
                      }}
                    >
                      <div className="w-16 text-center">
                        <p className="text-green-600">
                          {rdv.heure}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900">
                          {rdv.patient}
                        </p>
                        <p className="text-sm text-slate-600">
                          {rdv.telephone}
                        </p>
                      </div>
                      <Badge
                        variant={
                          rdv.statut === "confirmé"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {rdv.statut}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RDV Details Dialog */}
          <Dialog open={showRDVDetails} onOpenChange={setShowRDVDetails}>
            <DialogContent className="max-w-md bg-white dark:bg-slate-900">
              <DialogHeader>
                <DialogTitle>Détails du rendez-vous</DialogTitle>
              </DialogHeader>
              {selectedRDV ? (
                <div className="space-y-3 pt-2">
                  <p className="text-sm text-slate-500">Heure: <strong className="text-slate-900">{selectedRDV.heure}</strong></p>
                  <p className="text-sm text-slate-500">Patient: <strong className="text-slate-900">{selectedRDV.patient}</strong></p>
                  <p className="text-sm text-slate-500">Téléphone: <strong className="text-slate-900">{selectedRDV.telephone}</strong></p>
                  <p className="text-sm text-slate-500">Statut: <Badge variant={selectedRDV.statut === 'confirmé' ? 'default' : 'secondary'}>{selectedRDV.statut}</Badge></p>
                  <div className="flex gap-2 pt-3">
                    <Button onClick={() => { setShowRDVDetails(false); setShowCallDialog(true); }} className="flex-1 justify-center">Passer un appel</Button>
                    <Button onClick={() => { setShowRDVDetails(false); setShowMessageDialog(true); setMessageText(`Bonjour ${selectedRDV.patient}, `); }} className="flex-1 justify-center" variant="outline">Envoyer un message</Button>
                  </div>
                </div>
              ) : (
                <p>Aucun rendez-vous sélectionné.</p>
              )}
            </DialogContent>
          </Dialog>

          {/* Call Dialog */}
          <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
            <DialogContent className="max-w-md bg-white dark:bg-slate-900">
              <DialogHeader>
                <DialogTitle>Passer un appel</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <p className="text-sm">Appeler:</p>
                <p className="text-lg font-medium">{selectedRDV?.patient ?? '—'}</p>
                <p className="text-sm text-slate-700">{selectedRDV?.telephone ?? '—'}</p>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setShowCallDialog(false)}>Annuler</Button>
                  <a className="no-underline" href={`tel:${selectedRDV?.telephone ?? ''}`}>
                    <Button onClick={() => { console.log('Calling', selectedRDV); setShowCallDialog(false); }}>Appeler</Button>
                  </a>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Message Dialog */}
          <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
            <DialogContent className="max-w-md bg-white dark:bg-slate-900">
              <DialogHeader>
                <DialogTitle>Envoyer un message</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                <p className="text-sm">À: <strong>{selectedRDV?.patient ?? '—'}</strong></p>
                <p className="text-sm text-slate-700">{selectedRDV?.telephone ?? ''}</p>
                <Textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} className="mt-1 min-h-[100px]" />
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setShowMessageDialog(false)}>Annuler</Button>
                  <Button onClick={() => { console.log('Message sent to', selectedRDV, messageText); setShowMessageDialog(false); setMessageText(''); }}>Envoyer</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Dialog open={showNewRDV} onOpenChange={setShowNewRDV}>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Nouveau rendez-vous
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-white dark:bg-slate-900">
                    <DialogHeader>
                      <DialogTitle>Créer un nouveau rendez-vous</DialogTitle>
                    </DialogHeader>
                    <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="patient">Nom du patient</Label>
                          <Input
                            id="patient"
                            placeholder="Nom et prénom"
                            value={newRDV.patient}
                            onChange={(e) =>
                              setNewRDV({ ...newRDV, patient: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="telephone">Téléphone</Label>
                          <Input
                            id="telephone"
                            placeholder="06 12 34 56 78"
                            value={newRDV.telephone}
                            onChange={(e) =>
                              setNewRDV({ ...newRDV, telephone: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor="email">Email (optionnel)</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="patient@example.com"
                          value={newRDV.email}
                          onChange={(e) =>
                            setNewRDV({ ...newRDV, email: e.target.value })
                          }
                          className="mt-1"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          L'email est facultatif mais utile pour envoyer une confirmation.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newRDV.date}
                          onChange={(e) =>
                            setNewRDV({ ...newRDV, date: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="heure">Heure</Label>
                        <Input
                          id="heure"
                          type="time"
                          value={newRDV.heure}
                          onChange={(e) =>
                            setNewRDV({ ...newRDV, heure: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor="motif">Motif</Label>
                        <Textarea
                          id="motif"
                          placeholder="Ex: consultation générale, suivi, vaccin..."
                          value={newRDV.motif}
                          onChange={(e) =>
                            setNewRDV({ ...newRDV, motif: e.target.value })
                          }
                          className="mt-1 min-h-[100px]"
                        />
                      </div>

                      <div className="sm:col-span-2 flex items-center justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowNewRDV(false)}>
                          Annuler
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          disabled={!formValid}
                          onClick={() => {
                            const rdvToAdd = {
                              heure: newRDV.heure || "--:--",
                              patient: newRDV.patient,
                              statut: "en attente",
                              telephone: newRDV.telephone || "",
                              email: newRDV.email || "",
                              date: newRDV.date || "",
                              motif: newRDV.motif || "",
                            };
                            setRendezvousAujourdhui((prev: any[]) => [rdvToAdd, ...prev]);
                            setShowNewRDV(false);
                            setNewRDV({
                              patient: "",
                              telephone: "",
                              email: "",
                              date: "",
                              heure: "",
                              motif: "",
                            });
                          }}
                        >
                          Créer
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Passer un appel
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer un message
                </Button>
              </CardContent>
            </Card>

            {/* Tâches urgentes */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Tâches urgentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tachesUrgentes.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          {item.tache}
                        </p>
                        <Badge
                          variant={
                            item.priorite === "haute"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs mt-1"
                        >
                          {item.priorite}
                        </Badge>
                      </div>
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
            { icon: Calendar, label: "Agenda" },
            { icon: Phone, label: "Appels" },
            { icon: Mail, label: "Messages" },
            { icon: UserPlus, label: "Nouveau" },
          ].map((item, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-1 text-slate-600 hover:text-green-600"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}
