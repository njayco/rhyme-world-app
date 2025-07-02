"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PronunciationButton } from "./pronunciation-button"
import { Volume2, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Language = "english" | "spanish" | "french"

export function PronunciationDemo() {
  const [demoWord, setDemoWord] = useState("hello")
  const [demoLanguage, setDemoLanguage] = useState<Language>("english")
  const [showInfo, setShowInfo] = useState(false)

  const commonWords = {
    english: ["hello", "world", "beautiful", "pronunciation", "rhythm", "poetry"],
    spanish: ["hola", "mundo", "hermoso", "pronunciación", "ritmo", "poesía"],
    french: ["bonjour", "monde", "beau", "pronunciation", "rythme", "poésie"],
  }

  return (
    <Card className="mb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-purple-600" />
              Pronunciation Demo
            </CardTitle>
            <CardDescription>Test the text-to-speech feature with any word</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(!showInfo)} className="text-purple-600">
            <Info className="h-4 w-4" />
          </Button>
        </div>

        {showInfo && (
          <Alert className="mt-3 bg-purple-50 border-purple-200">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Uses your browser's built-in text-to-speech engine. Different browsers and operating systems may have
              different voice quality and language support. Works best with Chrome, Safari, and Edge.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Word to pronounce</label>
            <Input
              placeholder="Enter any word..."
              value={demoWord}
              onChange={(e) => setDemoWord(e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select value={demoLanguage} onValueChange={(value: Language) => setDemoLanguage(value)}>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Pronounce</label>
            <div className="flex items-center gap-2">
              <PronunciationButton word={demoWord} language={demoLanguage} size="lg" variant="outline" />
              <span className="text-sm text-gray-600">"{demoWord}"</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Try these common words:</label>
          <div className="flex flex-wrap gap-2">
            {commonWords[demoLanguage].map((word) => (
              <Button
                key={word}
                variant="outline"
                size="sm"
                onClick={() => setDemoWord(word)}
                className="bg-white text-gray-700 hover:bg-purple-50"
              >
                {word}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
