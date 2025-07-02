"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Language = "english" | "spanish" | "french"

interface PronunciationButtonProps {
  word: string
  language: Language
  size?: "sm" | "md" | "lg"
  showLanguage?: boolean
  variant?: "default" | "ghost" | "outline"
}

export function PronunciationButton({
  word,
  language,
  size = "sm",
  showLanguage = false,
  variant = "ghost",
}: PronunciationButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!("speechSynthesis" in window)) {
      setIsSupported(false)
      return
    }

    // Load available voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      setAvailableVoices(voices)
    }

    // Load voices immediately
    loadVoices()

    // Also load when voices change (some browsers load them asynchronously)
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const getLanguageCode = (language: Language): string => {
    switch (language) {
      case "english":
        return "en"
      case "spanish":
        return "es"
      case "french":
        return "fr"
      default:
        return "en"
    }
  }

  const getLanguageFlag = (language: Language): string => {
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

  const findBestVoice = (targetLanguage: string): SpeechSynthesisVoice | null => {
    if (availableVoices.length === 0) return null

    // First, try to find a voice that exactly matches the language
    let voice = availableVoices.find((v) => v.lang.startsWith(targetLanguage))

    if (!voice) {
      // If no exact match, try to find a voice for the language family
      const languageFamily = targetLanguage.split("-")[0]
      voice = availableVoices.find((v) => v.lang.startsWith(languageFamily))
    }

    // Prefer local/offline voices if available
    if (voice) {
      const localVoice = availableVoices.find((v) => v.lang.startsWith(targetLanguage) && v.localService)
      if (localVoice) return localVoice
    }

    return voice || null
  }

  const speakWord = async () => {
    if (!isSupported || !word.trim()) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    setIsPlaying(true)

    try {
      const utterance = new SpeechSynthesisUtterance(word.trim())

      // Set language-specific properties
      const languageCode = getLanguageCode(language)
      utterance.lang = languageCode

      // Find the best voice for this language
      const bestVoice = findBestVoice(languageCode)
      if (bestVoice) {
        utterance.voice = bestVoice
      }

      // Configure speech parameters
      utterance.rate = 0.8 // Slightly slower for clarity
      utterance.pitch = 1.0
      utterance.volume = 0.8

      // Set up event handlers
      utterance.onend = () => {
        setIsPlaying(false)
      }

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error)
        setIsPlaying(false)
      }

      // Speak the word
      window.speechSynthesis.speak(utterance)
    } catch (error) {
      console.error("Error speaking word:", error)
      setIsPlaying(false)
    }
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
  }

  if (!isSupported) {
    return null // Don't render if not supported
  }

  const buttonSize = size === "lg" ? "default" : size === "md" ? "sm" : "sm"
  const iconSize = size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3 w-3"

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={variant}
        size={buttonSize}
        onClick={isPlaying ? stopSpeaking : speakWord}
        disabled={!word.trim()}
        title={`Pronounce "${word}" in ${language}`}
        className={`${size === "sm" ? "h-6 w-6 p-0" : ""}`}
      >
        {isPlaying ? <Loader2 className={`${iconSize} animate-spin`} /> : <Volume2 className={iconSize} />}
      </Button>

      {showLanguage && (
        <Badge variant="outline" className="text-xs">
          {getLanguageFlag(language)}
        </Badge>
      )}
    </div>
  )
}
