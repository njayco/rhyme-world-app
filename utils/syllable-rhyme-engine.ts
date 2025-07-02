import { getSyllablePatterns } from "@/data/syllable-patterns"

export interface SyllableRhymeResult {
  word: string
  lastSyllable: string
  phoneticPattern: string
  similarity: number
  syllableCount: number
  rhymeType: "perfect" | "near" | "slant" | "assonant"
}

// Extract the last syllable from a word based on language-specific rules
export function extractLastSyllable(word: string, language: "english" | "spanish" | "french"): string {
  const lowerWord = word.toLowerCase()

  if (language === "spanish") {
    return extractSpanishLastSyllable(lowerWord)
  } else if (language === "french") {
    return extractFrenchLastSyllable(lowerWord)
  } else {
    return extractEnglishLastSyllable(lowerWord)
  }
}

function extractEnglishLastSyllable(word: string): string {
  // Common English syllable patterns (longest first to avoid partial matches)
  const patterns = [
    // Complex endings
    "tion",
    "sion",
    "ture",
    "sure",
    "ment",
    "ness",
    "able",
    "ible",
    "ful",
    "less",
    "ous",
    "ious",
    "eous",
    "ual",
    "ial",
    "ive",
    "age",
    "ure",
    // -ing endings
    "ling",
    "ning",
    "ring",
    "sing",
    "ting",
    "ing",
    // -ed endings
    "ted",
    "ded",
    "ped",
    "ked",
    "ed",
    // -er endings
    "ber",
    "der",
    "ger",
    "ker",
    "ler",
    "mer",
    "ner",
    "per",
    "ter",
    "ver",
    "er",
    // -ly endings
    "aly",
    "ely",
    "ily",
    "oly",
    "uly",
    "ly",
    // Consonant clusters
    "ack",
    "eck",
    "ick",
    "ock",
    "uck",
    "and",
    "end",
    "ind",
    "ond",
    "und",
    "ant",
    "ent",
    "int",
    "ont",
    "unt",
    "art",
    "ert",
    "irt",
    "ort",
    "urt",
    "all",
    "ell",
    "ill",
    "oll",
    "ull",
    "ass",
    "ess",
    "iss",
    "oss",
    "uss",
    // Simple vowel endings
    "ay",
    "ee",
    "oo",
    // Single letters (fallback)
    "a",
    "e",
    "i",
    "o",
    "u",
    "y",
  ]

  for (const pattern of patterns) {
    if (word.endsWith(pattern)) {
      // For very short words, return the whole word
      if (word.length <= 3) return word

      // For longer words, extract the syllable
      const syllableStart = word.length - pattern.length

      // Look for consonant before the pattern to include in syllable
      let start = syllableStart
      while (start > 0 && !/[aeiou]/.test(word[start - 1])) {
        start--
      }

      return word.slice(Math.max(0, start))
    }
  }

  // Fallback: return last 2-3 characters
  return word.slice(-Math.min(3, word.length))
}

function extractSpanishLastSyllable(word: string): string {
  const patterns = [
    // Complex endings
    "ción",
    "sión",
    "ando",
    "iendo",
    "mente",
    // Adjective endings
    "oso",
    "osa",
    "ito",
    "ita",
    // Verb endings
    "ar",
    "er",
    "ir",
    // Noun endings
    "dad",
    "tad",
    "ura",
    "eza",
    // Diphthongs
    "ia",
    "io",
    "ua",
    "ue",
    "ai",
    "ei",
    "oi",
    "au",
    "eu",
    // Consonant + vowel
    "ón",
    "án",
    "ín",
    "ún",
    "al",
    "el",
    "il",
    "ol",
    "ul",
    "as",
    "es",
    "is",
    "os",
    "us",
    // Simple vowels
    "a",
    "e",
    "i",
    "o",
    "u",
  ]

  for (const pattern of patterns) {
    if (word.endsWith(pattern)) {
      if (word.length <= 3) return word

      const syllableStart = word.length - pattern.length
      let start = syllableStart

      // Include preceding consonant if it exists
      while (start > 0 && !/[aeiouáéíóúü]/.test(word[start - 1])) {
        start--
      }

      return word.slice(Math.max(0, start))
    }
  }

  return word.slice(-Math.min(3, word.length))
}

function extractFrenchLastSyllable(word: string): string {
  const patterns = [
    // Complex endings
    "tion",
    "sion",
    "ment",
    "ance",
    "ence",
    // Adjective endings
    "eux",
    "euse",
    "able",
    "ible",
    // Verb endings
    "er",
    "ir",
    "re",
    "oir",
    // Noun endings
    "age",
    "ure",
    "eur",
    "teur",
    "trice",
    // Nasal vowels
    "an",
    "en",
    "in",
    "on",
    "un",
    // Diphthongs
    "ai",
    "au",
    "eau",
    "ei",
    "eu",
    "œu",
    "oi",
    "ou",
    "ui",
    // Consonant clusters
    "ard",
    "ert",
    "ort",
    // Feminine endings
    "elle",
    "ette",
    "esse",
    // Plural endings
    "aux",
    "eux",
    // Technical endings
    "ique",
    "isme",
    "iste",
    // Simple vowels
    "é",
    "è",
    "à",
    "a",
    "e",
    "i",
    "o",
    "u",
  ]

  for (const pattern of patterns) {
    if (word.endsWith(pattern)) {
      if (word.length <= 3) return word

      const syllableStart = word.length - pattern.length
      let start = syllableStart

      // Include preceding consonant
      while (start > 0 && !/[aeiouyàâéèêëïîôöùûü]/.test(word[start - 1])) {
        start--
      }

      return word.slice(Math.max(0, start))
    }
  }

  return word.slice(-Math.min(3, word.length))
}

// Get phonetic representation of a syllable
export function getSyllablePhonetic(syllable: string, language: "english" | "spanish" | "french"): string {
  const patterns = getSyllablePatterns(language)

  // Try to find exact match first
  if (patterns[syllable as keyof typeof patterns]) {
    return patterns[syllable as keyof typeof patterns].phonetic
  }

  // Try to find pattern that syllable ends with
  const sortedPatterns = Object.keys(patterns).sort((a, b) => b.length - a.length)

  for (const pattern of sortedPatterns) {
    if (syllable.endsWith(pattern)) {
      return patterns[pattern as keyof typeof patterns].phonetic
    }
  }

  // Fallback: return the syllable itself
  return syllable
}

// Calculate phonetic similarity between two syllables
export function calculateSyllableSimilarity(
  syllable1: string,
  syllable2: string,
  language: "english" | "spanish" | "french",
): number {
  const phonetic1 = getSyllablePhonetic(syllable1, language)
  const phonetic2 = getSyllablePhonetic(syllable2, language)

  if (phonetic1 === phonetic2) return 1.0

  // Calculate similarity based on phonetic patterns
  const similarity = calculatePhoneticSimilarity(phonetic1, phonetic2)
  return similarity
}

function calculatePhoneticSimilarity(phonetic1: string, phonetic2: string): number {
  if (phonetic1 === phonetic2) return 1.0

  const longer = phonetic1.length > phonetic2.length ? phonetic1 : phonetic2
  const shorter = phonetic1.length > phonetic2.length ? phonetic2 : phonetic1

  if (longer.length === 0) return 1.0

  // Calculate similarity from the end (most important for rhyming)
  let matches = 0
  const minLength = Math.min(longer.length, shorter.length)

  for (let i = 1; i <= minLength; i++) {
    if (longer.slice(-i) === shorter.slice(-i)) {
      matches = i
    } else {
      break
    }
  }

  return matches / Math.max(longer.length, shorter.length)
}

// Count syllables in a word
export function countSyllables(word: string, language: "english" | "spanish" | "french"): number {
  const lowerWord = word.toLowerCase()

  if (language === "spanish") {
    // Spanish has more regular syllable patterns
    const vowels = lowerWord.match(/[aeiouáéíóúü]/g)
    if (!vowels) return 1

    let count = vowels.length

    // Adjust for diphthongs
    const diphthongs = lowerWord.match(/[aeiou][aeiou]/g)
    if (diphthongs) {
      count -= diphthongs.length
    }

    return Math.max(1, count)
  }

  if (language === "french") {
    // French syllable counting
    const vowels = lowerWord.match(/[aeiouyàâéèêëïîôöùûü]/g)
    if (!vowels) return 1

    let count = vowels.length

    // Adjust for silent e at the end
    if (lowerWord.endsWith("e") && count > 1) {
      count--
    }

    // Adjust for vowel combinations
    const combinations = lowerWord.match(/[aeiouy]{2,}/g)
    if (combinations) {
      count -= combinations.length
    }

    return Math.max(1, count)
  }

  // English syllable counting (default)
  const vowelGroups = lowerWord.match(/[aeiouy]+/g)
  if (!vowelGroups) return 1

  let count = vowelGroups.length

  // Adjust for silent e
  if (lowerWord.endsWith("e") && count > 1) {
    count--
  }

  // Adjust for common patterns
  if (lowerWord.match(/[aeiouy]{2,}/)) {
    const combinations = lowerWord.match(/[aeiouy]{2,}/g)!
    count -= combinations.length
  }

  return Math.max(1, count)
}

// Find rhymes based on last syllable matching
export function findSyllableRhymes(
  inputWord: string,
  wordList: string[],
  language: "english" | "spanish" | "french",
  minSimilarity = 0.7,
): SyllableRhymeResult[] {
  const inputSyllable = extractLastSyllable(inputWord, language)
  const inputPhonetic = getSyllablePhonetic(inputSyllable, language)
  const inputSyllableCount = countSyllables(inputWord, language)

  const results: SyllableRhymeResult[] = []

  for (const word of wordList) {
    if (word.toLowerCase() === inputWord.toLowerCase()) continue

    const wordSyllable = extractLastSyllable(word, language)
    const wordPhonetic = getSyllablePhonetic(wordSyllable, language)
    const wordSyllableCount = countSyllables(word, language)

    const similarity = calculateSyllableSimilarity(inputSyllable, wordSyllable, language)

    if (similarity >= minSimilarity) {
      let rhymeType: "perfect" | "near" | "slant" | "assonant" = "slant"

      if (similarity >= 0.95) {
        rhymeType = "perfect"
      } else if (similarity >= 0.85) {
        rhymeType = "near"
      } else if (similarity >= 0.75) {
        rhymeType = "slant"
      } else {
        rhymeType = "assonant"
      }

      results.push({
        word,
        lastSyllable: wordSyllable,
        phoneticPattern: wordPhonetic,
        similarity,
        syllableCount: wordSyllableCount,
        rhymeType,
      })
    }
  }

  return results.sort((a, b) => b.similarity - a.similarity)
}

// Get example words for a syllable pattern
export function getExamplesForSyllable(syllable: string, language: "english" | "spanish" | "french"): string[] {
  const patterns = getSyllablePatterns(language)

  if (patterns[syllable as keyof typeof patterns]) {
    return patterns[syllable as keyof typeof patterns].examples
  }

  // Try to find pattern that matches
  const sortedPatterns = Object.keys(patterns).sort((a, b) => b.length - a.length)

  for (const pattern of sortedPatterns) {
    if (syllable.endsWith(pattern)) {
      return patterns[pattern as keyof typeof patterns].examples
    }
  }

  return []
}
