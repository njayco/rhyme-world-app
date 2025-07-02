import { englishWords, spanishWords, frenchWords } from "@/data/comprehensive-dictionaries"
import { findSyllableRhymes, extractLastSyllable, getSyllablePhonetic, countSyllables } from "./syllable-rhyme-engine"

type Language = "english" | "spanish" | "french"

interface RhymeResult {
  word: string
  translation?: string
  confidence: number
  type?: string
  quality?: string
  syllables?: number
  lastSyllable?: string
  phoneticPattern?: string
}

export function findRhymesForWord(
  inputWord: string,
  language: Language,
  nativeLanguage: Language,
  translations: any,
): RhymeResult[] {
  const wordList = getWordList(language)

  // Use syllable-based rhyming
  const syllableRhymes = findSyllableRhymes(inputWord, wordList, language, 0.6)

  const results: RhymeResult[] = syllableRhymes.map((rhyme) => {
    const translation = getEnhancedTranslation(rhyme.word, language, nativeLanguage, translations)

    let quality = "Fair"
    if (rhyme.similarity >= 0.95) quality = "Excellent"
    else if (rhyme.similarity >= 0.85) quality = "Very Good"
    else if (rhyme.similarity >= 0.75) quality = "Good"

    return {
      word: rhyme.word,
      translation,
      confidence: rhyme.similarity,
      type: rhyme.rhymeType,
      quality,
      syllables: rhyme.syllableCount,
      lastSyllable: rhyme.lastSyllable,
      phoneticPattern: rhyme.phoneticPattern,
    }
  })

  // If we don't have enough results, try cross-language patterns
  if (results.length < 10 && language !== nativeLanguage) {
    const crossResults = findCrossLanguageSyllableRhymes(inputWord, nativeLanguage, language, wordList, translations)
    results.push(...crossResults)
  }

  // Remove duplicates and limit results
  const uniqueResults = results.filter((result, index, self) => index === self.findIndex((r) => r.word === result.word))

  return uniqueResults.slice(0, 30)
}

function findCrossLanguageSyllableRhymes(
  inputWord: string,
  inputLanguage: Language,
  targetLanguage: Language,
  wordList: string[],
  translations: any,
): RhymeResult[] {
  const inputSyllable = extractLastSyllable(inputWord, inputLanguage)
  const inputPhonetic = getSyllablePhonetic(inputSyllable, inputLanguage)

  const results: RhymeResult[] = []

  // Cross-language syllable pattern mapping
  const crossPatterns = getCrossLanguageSyllablePatterns(inputSyllable, inputLanguage, targetLanguage)

  for (const word of wordList) {
    const wordSyllable = extractLastSyllable(word, targetLanguage)

    for (const pattern of crossPatterns) {
      if (wordSyllable.includes(pattern) || word.toLowerCase().endsWith(pattern)) {
        const translation = getEnhancedTranslation(word, targetLanguage, inputLanguage, translations)

        results.push({
          word,
          translation,
          confidence: 0.8,
          type: "cross-language",
          quality: "Good",
          syllables: countSyllables(word, targetLanguage),
          lastSyllable: wordSyllable,
          phoneticPattern: getSyllablePhonetic(wordSyllable, targetLanguage),
        })
        break
      }
    }
  }

  return results.slice(0, 10)
}

function getCrossLanguageSyllablePatterns(syllable: string, fromLanguage: Language, toLanguage: Language): string[] {
  const patterns: string[] = []

  // Enhanced cross-language syllable mapping
  if (fromLanguage === "english" && toLanguage === "spanish") {
    if (syllable.includes("tion")) patterns.push("ción", "sión")
    if (syllable.includes("ment")) patterns.push("mento")
    if (syllable.includes("ous")) patterns.push("oso", "osa")
    if (syllable.includes("ly")) patterns.push("mente")
    if (syllable.includes("er")) patterns.push("ar", "er")
    if (syllable.includes("ing")) patterns.push("ando", "iendo")
    if (syllable.includes("ed")) patterns.push("ado", "ido")
  }

  if (fromLanguage === "english" && toLanguage === "french") {
    if (syllable.includes("tion")) patterns.push("tion", "sion")
    if (syllable.includes("ment")) patterns.push("ment")
    if (syllable.includes("ous")) patterns.push("eux", "euse")
    if (syllable.includes("ly")) patterns.push("ment")
    if (syllable.includes("er")) patterns.push("er", "eur")
    if (syllable.includes("ing")) patterns.push("ant", "ent")
    if (syllable.includes("ed")) patterns.push("é", "ée")
  }

  if (fromLanguage === "spanish" && toLanguage === "english") {
    if (syllable.includes("ción")) patterns.push("tion", "sion")
    if (syllable.includes("mento")) patterns.push("ment")
    if (syllable.includes("oso")) patterns.push("ous")
    if (syllable.includes("mente")) patterns.push("ly")
    if (syllable.includes("ando")) patterns.push("ing")
    if (syllable.includes("ado")) patterns.push("ed")
  }

  if (fromLanguage === "spanish" && toLanguage === "french") {
    if (syllable.includes("ción")) patterns.push("tion")
    if (syllable.includes("oso")) patterns.push("eux")
    if (syllable.includes("mente")) patterns.push("ment")
    if (syllable.includes("ando")) patterns.push("ant")
    if (syllable.includes("ado")) patterns.push("é")
  }

  if (fromLanguage === "french" && toLanguage === "english") {
    if (syllable.includes("tion")) patterns.push("tion")
    if (syllable.includes("ment")) patterns.push("ment", "ly")
    if (syllable.includes("eux")) patterns.push("ous")
    if (syllable.includes("ant")) patterns.push("ing")
    if (syllable.includes("é")) patterns.push("ed")
  }

  if (fromLanguage === "french" && toLanguage === "spanish") {
    if (syllable.includes("tion")) patterns.push("ción")
    if (syllable.includes("ment")) patterns.push("mente")
    if (syllable.includes("eux")) patterns.push("oso")
    if (syllable.includes("ant")) patterns.push("ando")
    if (syllable.includes("é")) patterns.push("ado")
  }

  return patterns
}

function getWordList(language: Language): string[] {
  switch (language) {
    case "english":
      return englishWords
    case "spanish":
      return spanishWords
    case "french":
      return frenchWords
    default:
      return []
  }
}

export function getEnhancedTranslation(
  word: string,
  fromLanguage: Language,
  toLanguage: Language,
  translations: any,
): string | undefined {
  // First try direct translation
  const directTranslation = translations[fromLanguage]?.[toLanguage]?.[word.toLowerCase()]
  if (directTranslation) return directTranslation

  // Try common word patterns and conjugations
  const baseWord = getBaseWord(word, fromLanguage)
  if (baseWord !== word) {
    const baseTranslation = translations[fromLanguage]?.[toLanguage]?.[baseWord]
    if (baseTranslation) return baseTranslation
  }

  return undefined
}

function getBaseWord(word: string, language: Language): string {
  const lowerWord = word.toLowerCase()

  if (language === "english") {
    // Remove common suffixes
    if (lowerWord.endsWith("ing")) return lowerWord.slice(0, -3)
    if (lowerWord.endsWith("ed")) return lowerWord.slice(0, -2)
    if (lowerWord.endsWith("s")) return lowerWord.slice(0, -1)
    if (lowerWord.endsWith("ly")) return lowerWord.slice(0, -2)
    if (lowerWord.endsWith("er")) return lowerWord.slice(0, -2)
    if (lowerWord.endsWith("est")) return lowerWord.slice(0, -3)
  } else if (language === "spanish") {
    // Remove common Spanish verb endings
    if (lowerWord.endsWith("ando")) return lowerWord.slice(0, -4) + "ar"
    if (lowerWord.endsWith("iendo")) return lowerWord.slice(0, -5) + "er"
    if (lowerWord.endsWith("ado")) return lowerWord.slice(0, -3) + "ar"
    if (lowerWord.endsWith("ido")) return lowerWord.slice(0, -3) + "er"
    if (lowerWord.endsWith("mente")) return lowerWord.slice(0, -5)
  } else if (language === "french") {
    // Remove common French verb endings
    if (lowerWord.endsWith("ant")) return lowerWord.slice(0, -3) + "er"
    if (lowerWord.endsWith("é")) return lowerWord.slice(0, -1) + "er"
    if (lowerWord.endsWith("ment")) return lowerWord.slice(0, -4)
    if (lowerWord.endsWith("tion")) return lowerWord.slice(0, -4)
  }

  return lowerWord
}
