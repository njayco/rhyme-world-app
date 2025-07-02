"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Check, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Language = "english" | "spanish" | "french"

interface AddRhymeProps {
  searchWord: string
  searchLanguage: Language
  onRhymeAdded: (word: string, language: Language, translation?: string) => void
}

export function AddRhyme({ searchWord, searchLanguage, onRhymeAdded }: AddRhymeProps) {
  const [newRhyme, setNewRhyme] = useState("")
  const [rhymeLanguage, setRhymeLanguage] = useState<Language>("english")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success"; text: string } | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const getLanguageFlag = (language: Language) => {
    switch (language) {
      case "english":
        return "🇺🇸"
      case "spanish":
        return "🇪🇸"
      case "french":
        return "🇫🇷"
      default:
        return "🌍"
    }
  }

  const getLanguageLabel = (language: Language) => {
    switch (language) {
      case "english":
        return "English"
      case "spanish":
        return "Spanish"
      case "french":
        return "French"
      default:
        return language
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newRhyme.trim()) {
      setMessage({ type: "success", text: "Please enter a rhyme word" })
      return
    }

    if (newRhyme.toLowerCase().trim() === searchWord.toLowerCase().trim()) {
      setMessage({ type: "success", text: "Cannot add the same word as a rhyme" })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    // Simulate brief submission delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      // Add the rhyme directly without validation
      onRhymeAdded(newRhyme.trim(), rhymeLanguage)
      setMessage({ type: "success", text: "Rhyme added! Community can now vote on it." })
      setNewRhyme("")

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error adding rhyme:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearMessage = () => {
    setMessage(null)
  }

  return (
    <Card className="mt-4 border-dashed border-2 border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              Add a Rhyme
            </CardTitle>
            <CardDescription>
              Suggest a new rhyme for "{searchWord}" {getLanguageFlag(searchLanguage)}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-blue-600">
            <Info className="h-4 w-4" />
          </Button>
        </div>

        {isExpanded && (
          <Alert className="mt-3 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              All rhyme suggestions are added instantly and ranked by community votes. The community decides which
              rhymes are most helpful through upvotes and downvotes.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-rhyme">New Rhyme Word</Label>
              <Input
                id="new-rhyme"
                placeholder="e.g., daughter, water, quarter..."
                value={newRhyme}
                onChange={(e) => setNewRhyme(e.target.value)}
                disabled={isSubmitting}
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rhyme-language">Language</Label>
              <Select
                value={rhymeLanguage}
                onValueChange={(value: Language) => setRhymeLanguage(value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">🇺🇸 English</SelectItem>
                  <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="french">🇫🇷 French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <Badge variant="outline" className="mr-2">
                {getLanguageFlag(searchLanguage)} {searchWord}
              </Badge>
              →
              <Badge variant="outline" className="ml-2">
                {getLanguageFlag(rhymeLanguage)} {newRhyme || "..."}
              </Badge>
            </div>

            <Button
              type="submit"
              disabled={!newRhyme.trim() || isSubmitting}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rhyme
                </>
              )}
            </Button>
          </div>

          {message && (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  <AlertDescription>{message.text}</AlertDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={clearMessage} className="h-6 w-6 p-0">
                  ×
                </Button>
              </div>
            </Alert>
          )}
        </form>

        <div className="mt-4 pt-3 border-t border-blue-200">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Info className="h-3 w-3" />
            Community votes determine rhyme ranking. All suggestions are welcome!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
