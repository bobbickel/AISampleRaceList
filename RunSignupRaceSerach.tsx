"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, SearchIcon, XIcon } from "lucide-react"

interface SearchFormProps {
  initialZipcode?: string
  initialDate?: string
}

export function SearchForm({ initialZipcode = "", initialDate = "" }: SearchFormProps) {
  const router = useRouter()
  const [zipcode, setZipcode] = useState(initialZipcode)
  const [date, setDate] = useState(initialDate)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (zipcode) params.set("zipcode", zipcode)
    if (date) params.set("date", date)

    router.push(`/?${params.toString()}`)
  }

  const handleClear = () => {
    setZipcode("")
    setDate("")
    router.push("/")
  }

  const hasFilters = zipcode || date

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Search Races</CardTitle>
        <CardDescription>Find races by location and date</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipcode" className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                Zipcode
              </Label>
              <Input
                id="zipcode"
                placeholder="Enter zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                Date
              </Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
            {hasFilters && (
              <Button type="button" variant="outline" onClick={handleClear}>
                <XIcon className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

