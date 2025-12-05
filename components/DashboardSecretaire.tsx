import { useState } from "react";
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
import type { User } from "../App";
const logo = "/placeholder.png";

interface DashboardSecretaireProps {
  user: User;
  onLogout: () => void;
}

export function DashboardSecretaire({
  user,
  onLogout,
}: DashboardSecretaireProps) {
  const [searchQuery, setSearchQuery] = useState("");

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

  const rendezvousAujourdhui = [
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
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
                      className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
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
                <Button className="w-full justify-start bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Nouveau rendez-vous
                </Button>
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
