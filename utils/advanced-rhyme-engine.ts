import { comprehensiveEnglishRhymes } from "@/data/comprehensive-english-rhymes"

export type RhymeType = "perfect" | "near" | "slant" | "eye" | "consonant" | "assonant"

export interface AdvancedRhymeResult {
  word: string
  type: RhymeType
  confidence: number
  syllables: number
  stressPattern?: string
  phoneticEnding: string
}

// Advanced phonetic representation with IPA-like notation
const advancedPhonetics: { [key: string]: string } = {
  // Vowels
  a: "æ",
  ai: "eɪ",
  ay: "eɪ",
  au: "ɔː",
  aw: "ɔː",
  e: "ɛ",
  ea: "iː",
  ee: "iː",
  ei: "eɪ",
  ey: "eɪ",
  er: "ər",
  i: "ɪ",
  ie: "iː",
  igh: "aɪ",
  ir: "ər",
  y: "aɪ",
  o: "ɒ",
  oa: "oʊ",
  oo: "uː",
  ou: "aʊ",
  ow: "aʊ",
  or: "ɔːr",
  u: "ʌ",
  ue: "uː",
  ui: "uː",
  ur: "ər",

  // Consonants
  ch: "tʃ",
  sh: "ʃ",
  th: "θ",
  ph: "f",
  gh: "f",
  ck: "k",
  ng: "ŋ",
  qu: "kw",
  x: "ks",

  // Silent letters
  kn: "n",
  wr: "r",
  mb: "m",
  bt: "t",
  gn: "n",

  // Complex endings
  tion: "ʃən",
  sion: "ʃən",
  ture: "tʃər",
  sure: "ʃər",
  ous: "əs",
  ious: "iəs",
  eous: "iəs",
  uous: "uəs",
  able: "əbəl",
  ible: "ɪbəl",
  ment: "mənt",
  ness: "nəs",
  ful: "fəl",
  less: "ləs",
  ly: "li",
  ty: "ti",
  cy: "si",
}

export function getAdvancedPhoneticRepresentation(word: string): string {
  let phonetic = word.toLowerCase()

  // Apply transformations in order of complexity (longest first)
  const sortedPatterns = Object.entries(advancedPhonetics).sort(([a], [b]) => b.length - a.length)

  for (const [pattern, sound] of sortedPatterns) {
    phonetic = phonetic.replace(new RegExp(pattern, "g"), sound)
  }

  return phonetic
}

export function countSyllables(word: string): number {
  const vowelGroups = word.toLowerCase().match(/[aeiouy]+/g)
  if (!vowelGroups) return 1

  let count = vowelGroups.length

  // Adjust for silent e
  if (word.toLowerCase().endsWith("e") && count > 1) {
    count--
  }

  // Adjust for common patterns
  if (word.toLowerCase().match(/[aeiouy]{2,}/)) {
    count -= word.toLowerCase().match(/[aeiouy]{2,}/g)!.length - 1
  }

  return Math.max(1, count)
}

export function getStressPattern(word: string): string {
  const syllableCount = countSyllables(word)

  // Simple heuristics for stress patterns
  if (syllableCount === 1) return "S"
  if (syllableCount === 2) {
    // Most 2-syllable nouns are trochee (Strong-weak)
    // Most 2-syllable verbs are iamb (weak-Strong)
    return word.match(/ing$|ed$|er$|ly$/) ? "wS" : "Sw"
  }
  if (syllableCount === 3) {
    // Common 3-syllable patterns
    if (word.match(/tion$|sion$/)) return "wSw"
    if (word.match(/ful$|less$/)) return "Sww"
    return "Sww" // Default dactyl
  }

  return "S" + "w".repeat(syllableCount - 1) // Default: stress first syllable
}

export function findAdvancedRhymes(inputWord: string): AdvancedRhymeResult[] {
  const results: AdvancedRhymeResult[] = []
  const inputPhonetic = getAdvancedPhoneticRepresentation(inputWord)
  const inputSyllables = countSyllables(inputWord)
  const inputStress = getStressPattern(inputWord)

  // Get phonetic ending (last 2-4 sounds for rhyming)
  const getPhoneticEnding = (phonetic: string, length = 3) => {
    return phonetic.slice(-Math.min(length, phonetic.length))
  }

  const inputEnding = getPhoneticEnding(inputPhonetic)

  // Search through comprehensive rhyme database
  for (const [pattern, words] of Object.entries(comprehensiveEnglishRhymes)) {
    for (const word of words) {
      if (word.toLowerCase() === inputWord.toLowerCase()) continue

      const wordPhonetic = getAdvancedPhoneticRepresentation(word)
      const wordEnding = getPhoneticEnding(wordPhonetic)
      const wordSyllables = countSyllables(word)
      const wordStress = getStressPattern(word)

      // Perfect rhyme: same ending sounds
      if (inputEnding === wordEnding) {
        results.push({
          word,
          type: "perfect",
          confidence: 1.0,
          syllables: wordSyllables,
          stressPattern: wordStress,
          phoneticEnding: wordEnding,
        })
        continue
      }

      // Near rhyme: similar ending sounds
      const similarity = calculatePhoneticSimilarity(inputEnding, wordEnding)
      if (similarity > 0.7) {
        results.push({
          word,
          type: "near",
          confidence: similarity,
          syllables: wordSyllables,
          stressPattern: wordStress,
          phoneticEnding: wordEnding,
        })
        continue
      }

      // Slant rhyme: consonant sounds match
      if (getConsonantPattern(inputEnding) === getConsonantPattern(wordEnding)) {
        results.push({
          word,
          type: "slant",
          confidence: 0.6,
          syllables: wordSyllables,
          stressPattern: wordStress,
          phoneticEnding: wordEnding,
        })
        continue
      }

      // Assonant rhyme: vowel sounds match
      if (getVowelPattern(inputEnding) === getVowelPattern(wordEnding)) {
        results.push({
          word,
          type: "assonant",
          confidence: 0.5,
          syllables: wordSyllables,
          stressPattern: wordStress,
          phoneticEnding: wordEnding,
        })
      }
    }
  }

  // Sort by confidence and type preference
  return results
    .sort((a, b) => {
      const typeOrder = { perfect: 5, near: 4, slant: 3, consonant: 2, assonant: 1, eye: 0 }
      if (a.type !== b.type) {
        return typeOrder[b.type] - typeOrder[a.type]
      }
      return b.confidence - a.confidence
    })
    .slice(0, 50) // Limit results
}

function calculatePhoneticSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) return 1.0

  let matches = 0
  for (let i = 0; i < shorter.length; i++) {
    if (longer[longer.length - shorter.length + i] === shorter[i]) {
      matches++
    }
  }

  return matches / longer.length
}

function getConsonantPattern(phonetic: string): string {
  return phonetic.replace(/[æeɪɔːɛiːaɪɒoʊaʊʌuːər]/g, "")
}

function getVowelPattern(phonetic: string): string {
  return phonetic.match(/[æeɪɔːɛiːaɪɒoʊaʊʌuːər]/g)?.join("") || ""
}

// Enhanced rhyme quality scoring
export function getRhymeQuality(rhyme: AdvancedRhymeResult, inputWord: string): string {
  const inputSyllables = countSyllables(inputWord)
  const syllableDiff = Math.abs(rhyme.syllables - inputSyllables)

  if (rhyme.type === "perfect" && syllableDiff === 0) return "Excellent"
  if (rhyme.type === "perfect" && syllableDiff <= 1) return "Very Good"
  if (rhyme.type === "near" && rhyme.confidence > 0.8) return "Good"
  if (rhyme.type === "slant" || rhyme.type === "assonant") return "Fair"

  return "Weak"
}
