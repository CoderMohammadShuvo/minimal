"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Truck } from "lucide-react"

interface DeliveryPartner {
  id: string
  name: string
  nameEn: string
  nameBn: string
  contactInfo: any
  serviceAreas: string[]
  isActive: boolean
  createdAt: string
}

export function DeliveryPartners() {
  const t = useTranslations("admin")
  const [partners, setPartners] = useState<DeliveryPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    nameBn: "",
    contactInfo: {
      phone: "",
      email: "",
      address: "",
    },
    serviceAreas: [""],
    isActive: true,
  })

  const fetchPartners = async () => {
    try {
      const response = await fetch("/api/delivery-partners")
      if (response.ok) {
        const data = await response.json()
        setPartners(data)
      }
    } catch (error) {
      console.error("Error fetching delivery partners:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/delivery-partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceAreas: formData.serviceAreas.filter((area) => area.trim()),
        }),
      })

      if (response.ok) {
        setIsDialogOpen(false)
        setFormData({
          name: "",
          nameEn: "",
          nameBn: "",
          contactInfo: { phone: "", email: "", address: "" },
          serviceAreas: [""],
          isActive: true,
        })
        fetchPartners()
      }
    } catch (error) {
      console.error("Error creating delivery partner:", error)
    }
  }

  const addServiceArea = () => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: [...prev.serviceAreas, ""],
    }))
  }

  const updateServiceArea = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.map((area, i) => (i === index ? value : area)),
    }))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading delivery partners...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            {t("deliveryPartners")}
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t("addPartner")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t("addDeliveryPartner")}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nameEn">{t("nameEnglish")}</Label>
                    <Input
                      id="nameEn"
                      value={formData.nameEn}
                      onChange={(e) => setFormData((prev) => ({ ...prev, nameEn: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nameBn">{t("nameBangla")}</Label>
                  <Input
                    id="nameBn"
                    value={formData.nameBn}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nameBn: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input
                      id="phone"
                      value={formData.contactInfo.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactInfo: { ...prev.contactInfo, phone: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contactInfo.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactInfo: { ...prev.contactInfo, email: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">{t("address")}</Label>
                  <Input
                    id="address"
                    value={formData.contactInfo.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, address: e.target.value },
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label>{t("serviceAreas")}</Label>
                  {formData.serviceAreas.map((area, index) => (
                    <Input
                      key={index}
                      value={area}
                      onChange={(e) => updateServiceArea(index, e.target.value)}
                      placeholder={t("enterServiceArea")}
                      className="mt-2"
                    />
                  ))}
                  <Button type="button" variant="outline" onClick={addServiceArea} className="mt-2 bg-transparent">
                    {t("addArea")}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">{t("active")}</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {t("cancel")}
                  </Button>
                  <Button type="submit">{t("create")}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("contact")}</TableHead>
              <TableHead>{t("serviceAreas")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{partner.name}</div>
                    <div className="text-sm text-gray-500">
                      {partner.nameEn} / {partner.nameBn}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{partner.contactInfo.phone}</div>
                    <div className="text-gray-500">{partner.contactInfo.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {partner.serviceAreas.slice(0, 2).map((area, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                    {partner.serviceAreas.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{partner.serviceAreas.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={partner.isActive ? "default" : "secondary"}>
                    {partner.isActive ? t("active") : t("inactive")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    {t("edit")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
