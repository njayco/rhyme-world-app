"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Copy, User, ChevronUp, ChevronDown } from "lucide-react"
import { PronunciationButton } from "./pronunciation-button"

type Language = "english" | "spanish" | "french"

interface VotableRhymeProps {
  word: string
  language: Language
  translation?: string
  isUserContributed?: boolean
  initialVotes?: number
  quality?: string
  type?: string
  syllables?: number
  lastSyllable?: string
  phoneticPattern?: string
  showSyllableInfo?: boolean
  onCopyToLyrics: (word: string) => void
  onAddToFavorites: (word: string, language: Language, translation?: string) => void
  onVote: (word: string, language: Language, voteType: "up" | "down") => void
}

export function VotableRhyme({
  word,
  language,
  translation,
  isUserContributed = false,
  initialVotes = 0,
  quality,
  type,
  syllables,
  lastSyllable,
  phoneticPattern,
  showSyllableInfo = false,
  onCopyToLyrics,
  onAddToFavorites,
  onVote,
}: VotableRhymeProps) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)

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

  const getQualityColor = (quality?: string) => {
    switch (quality) {
      case "Excellent":
        return "bg-green-100 text-green-800"
      case "Very Good":
        return "bg-blue-100 text-blue-800"
      case "Good":
        return "bg-yellow-100 text-yellow-800"
      case "Fair":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type?: string) => {
    switch (type) {
      case "perfect":
        return "bg-emerald-100 text-emerald-800"
      case "near":
        return "bg-blue-100 text-blue-800"
      case "slant":
        return "bg-purple-100 text-purple-800"
      case "assonant":
        return "bg-indigo-100 text-indigo-800"
      case "cross-language":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleVote = (voteType: "up" | "down") => {
    let newVotes = votes

    // Remove previous vote if exists
    if (userVote === "up") newVotes -= 1
    if (userVote === "down") newVotes += 1

    // Apply new vote
    if (voteType === "up") {
      newVotes += 1
      setUserVote(userVote === "up" ? null : "up")
    } else {
      newVotes -= 1
      setUserVote(userVote === "down" ? null : "down")
    }

    setVotes(newVotes)
    onVote(word, language, voteType)
  }

  const getVoteColor = () => {
    if (votes > 0) return "text-green-600"
    if (votes < 0) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border ${
        isUserContributed
          ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-medium">{word}</span>
            <PronunciationButton word={word} language={language} />
          </div>

          {isUserContributed && (
            <Badge className="text-xs bg-blue-100 text-blue-800 border-blue-300">
              <User className="h-3 w-3 mr-1" />
              Community
            </Badge>
          )}

          <Badge variant="outline" className="text-xs">
            {getLanguageFlag(language)} {getLanguageLabel(language)}
          </Badge>

          {quality && <Badge className={`text-xs ${getQualityColor(quality)}`}>{quality}</Badge>}

          {type && <Badge className={`text-xs ${getTypeColor(type)}`}>{type}</Badge>}

          {syllables && (
            <Badge variant="outline" className="text-xs">
              {syllables} syl
            </Badge>
          )}

          {/* Vote display */}
          <Badge variant="outline" className={`text-xs ${getVoteColor()}`}>
            {votes > 0 ? `+${votes}` : votes} votes
          </Badge>
        </div>

        {translation && <p className="text-xs text-gray-600 mt-1">{translation}</p>}

        {showSyllableInfo && (
          <div className="text-xs text-blue-600 mt-1">
            <p>Last syllable: {lastSyllable}</p>
            <p>Phonetic: {phoneticPattern}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {/* Voting buttons */}
        <div className="flex flex-col items-center mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote("up")}
            className={`h-6 w-6 p-0 ${userVote === "up" ? "text-green-600 bg-green-100" : "text-gray-400"}`}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote("down")}
            className={`h-6 w-6 p-0 ${userVote === "down" ? "text-red-600 bg-red-100" : "text-gray-400"}`}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Action buttons */}
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
