"use client"

import { NavHeader } from "@/components/nav-header"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Camera, Save, Loader2, User, Bell, Shield, AlertTriangle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

function ProfileContent() {
  {/* Profile Settings Function*/}

  const [name, setName] = useState("João Silva")
  const [username, setUsername] = useState("joaosilva")
  const [email, setEmail] = useState("joao@email.com")
  const [bio, setBio] = useState("Gamer apaixonado por RPGs e jogos indie. Sempre procurando as melhores ofertas.")
  
  const [isSaving, setIsSaving] = useState(false)
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    console.log({ name, username, email, bio })
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Perfil Público</h2>
        <p className="text-gray-400">Gerencie como você aparece para a comunidade.</p>
      </div>
      <Separator />
      
      <Card>
        <CardContent className="pt-6 space-y-8">

          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/10">

            {/* Avatar */}
            <div className="relative group cursor-pointer">
                <Avatar className="h-24 w-24 ring-4 ring-black/40">

                  <AvatarImage src="/diverse-user-avatars.png" />

                  <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">
                    {name ? name.slice(0, 2).toUpperCase() : "US"}
                  </AvatarFallback>
                </Avatar>

                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </div>
            </div>

            <div className="text-center sm:text-left">
                <h3 className="font-medium text-white">Sua Foto</h3>
                <p className="text-sm text-gray-400 mb-3">Isso será exibido no seu perfil.</p>
                <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 hover:text-white text-gray-300">
                    Alterar Foto
                </Button>
            </div>
          </div>

          <form onSubmit={handleSave} className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <Label className="text-gray-300">Nome de Usuário</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-black/20 border-white/10 text-white"/>
              </div>
              <div className="space-y-2">
                  <Label className="text-gray-300">Nome de Exibição</Label>
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} className="bg-black/20 border-white/10 text-white"/>
              </div>
            </div>

            <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input value={email} disabled className="bg-black/40 border-white/10 text-gray-400 cursor-not-allowed"/>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Bio</Label>
              <Textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                className="bg-black/20 border-white/10 text-white resize-none" 
                rows={4}
                maxLength={200}
              />

              <p className="text-xs text-gray-500 text-left">
                {bio.length}/200 caracteres
              </p>
            </div>
            
            <Button type="submit" disabled={isSaving} className="w-fit bg-blue-600 hover:bg-blue-700 text-white">
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
                Salvar Alterações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationsContent() {
  {/* Notification Settings Function*/}

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [priceAlerts, setPriceAlerts] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const isDisabled = !emailNotifications

  const handleSaveNotifications = async () => {
    setIsSaving(true)
    await new Promise(r => setTimeout(r, 800))
    console.log({ emailNotifications, priceAlerts, weeklyDigest })
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Notificações</h2>
        <p className="text-gray-400">Escolha o que chega no seu email.</p>
      </div>
      <Separator />
      
      <Card>
        <CardContent className="space-y-6">
              <div className="flex items-center justify-between">

                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificações por email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba emails sobre atividades importantes
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <Separator />

              <div className={`space-y-6 transition-opacity duration-300 ${isDisabled ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="price-alerts">Alertas de preço</Label>
                    <p className="text-sm text-muted-foreground">
                      Seja notificado quando jogos atingirem seu preço alvo
                    </p>
                  </div>
                  <Switch
                    id="price-alerts"
                    checked={!isDisabled && priceAlerts}
                    onCheckedChange={setPriceAlerts}
                    disabled={isDisabled}
                  />
                </div>
              </div>

              <Separator />

              <div className={`space-y-6 transition-opacity duration-300 ${isDisabled ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-digest">Resumo semanal</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba um resumo das melhores ofertas da semana
                    </p>
                  </div>
                  <Switch
                    id="weekly-digest"
                    checked={!isDisabled && weeklyDigest}
                    onCheckedChange={setWeeklyDigest}
                    disabled={isDisabled}
                  />
                </div>
              </div>
            </CardContent>
      </Card>
    </div>
  )
}

function SecurityContent() {
  {/* Security Settings Function*/}

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Segurança</h2>
        <p className="text-gray-400">Mantenha sua conta segura.</p>
      </div>
      <Separator />

      <Card>
        <CardHeader><CardTitle>Alterar Senha</CardTitle></CardHeader>
         <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha atual</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova senha</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Button variant="outline">Alterar Senha</Button>
            </CardContent>
          </Card>

          {/* Danger Zone Area */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
              <CardDescription>
                Ações irreversíveis relacionadas à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">Excluir Conta</Button>
            </CardContent>
      </Card>
    </div>
  )
}

export default function SettingsPage() {
  {/* Main PageArea Settings Function*/}

  const [activeTab, setActiveTab] = useState("profile")

  const menuItems = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "security", label: "Segurança", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-background text-white">

      <NavHeader />

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-bold mb-8">Configurações</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          <aside>
            <nav className="flex flex-col gap-1 sticky top-24">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 group",
                      isActive 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-500 group-hover:text-white")} />
                      {item.label}
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4 animate-in fade-in slide-in-from-left-2" />}
                  </button>
                )
              })}
            </nav>
          </aside>

          <main className="min-h-[500px]">
            {activeTab === "profile" && <ProfileContent />}
            {activeTab === "notifications" && <NotificationsContent />}
            {activeTab === "security" && <SecurityContent />}
          </main>

        </div>
      </div>
    </div>
  )
}