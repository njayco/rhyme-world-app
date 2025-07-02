"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Copy, User } from "lucide-react"

type Language = "english" | "spanish" | "french"

interface UserContributedRhymeProps {
  word: string
  language: Language
  translation?: string
  isUserContributed?: boolean
  onCopyToLyrics: (word: string) => void
  onAddToFavorites: (word: string, language: Language, translation?: string) => void
}

export function UserContributedRhyme({
  word,
  language,
  translation,
  isUserContributed = false,
  onCopyToLyrics,
  onAddToFavorites,
}: UserContributedRhymeProps) {
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

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border-2 ${
        isUserContributed
          ? "bg-green-50 border-green-200 hover:bg-green-100"
          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium">{word}</span>

          {isUserContributed && (
            <Badge className="text-xs bg-green-100 text-green-800 border-green-300">
              <User className="h-3 w-3 mr-1" />
              Community
            </Badge>
          )}

          <Badge variant="outline" className="text-xs">
            {getLanguageFlag(language)} {getLanguageLabel(language)}
          </Badge>

          <Badge className="text-xs bg-blue-100 text-blue-800">Perfect</Badge>
        </div>

        {translation && <p className="text-xs text-gray-600 mt-1">{translation}</p>}

        {isUserContributed && <p className="text-xs text-green-600 mt-1">✓ Verified by phonetic analysis</p>}
      </div>

      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopyToLyrics(word)}
          title="Copy to lyrics"
          className="h-8 w-8 p-0"
        >
          <Copy className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddToFavorites(word, language, translation)}
          title="Add to favorites"
          className="h-8 w-8 p-0"
        >
          <Heart className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
