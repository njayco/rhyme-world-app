// Universal phonetic engine that can handle any word in any language

// English IPA phonetic mappings (comprehensive)
const englishIPA: { [key: string]: string } = {
  // Vowel sounds (long patterns first)
  ough: "ʌf", // tough
  augh: "ɔːf", // laugh
  eigh: "eɪ", // eight
  tion: "ʃən", // nation
  sion: "ʃən", // mission
  ture: "tʃər", // nature
  sure: "ʃər", // measure
  ious: "iəs", // serious
  eous: "iəs", // gorgeous
  uous: "uəs", // continuous
  able: "əbəl", // table
  ible: "ɪbəl", // terrible
  ment: "mənt", // moment
  ness: "nəs", // happiness
  less: "ləs", // hopeless
  ful: "fəl", // beautiful
  ough: "oʊ", // though
  aigh: "eɪ", // straight
  ight: "aɪt", // light
  ough: "ʌf", // rough

  // Digraphs and trigraphs
  tch: "tʃ", // match
  dge: "dʒ", // bridge
  sch: "sk", // school
  psy: "saɪ", // psychology
  rhy: "raɪ", // rhyme
  wri: "raɪ", // write
  kno: "noʊ", // know
  gno: "noʊ", // gnome

  // Common patterns
  ph: "f", // phone
  gh: "f", // laugh
  ch: "tʃ", // chair
  sh: "ʃ", // ship
  th: "θ", // think
  ng: "ŋ", // sing
  qu: "kw", // queen
  ck: "k", // back
  dg: "dʒ", // edge
  mb: "m", // lamb
  kn: "n", // knee
  wr: "r", // write
  gn: "n", // sign
  bt: "t", // debt
  mn: "m", // autumn

  // Vowel combinations
  ai: "eɪ", // rain
  ay: "eɪ", // day
  au: "ɔː", // cause
  aw: "ɔː", // saw
  ea: "iː", // sea
  ee: "iː", // see
  ei: "eɪ", // vein
  ey: "eɪ", // they
  ie: "iː", // piece
  oa: "oʊ", // boat
  oo: "uː", // moon
  ou: "aʊ", // house
  ow: "aʊ", // cow
  ue: "uː", // blue
  ui: "uː", // fruit
  oy: "ɔɪ", // boy
  oi: "ɔɪ", // coin

  // Single vowels (context-dependent, simplified)
  a: "æ", // cat
  e: "ɛ", // bed
  i: "ɪ", // sit
  o: "ɒ", // hot
  u: "ʌ", // cup
  y: "aɪ", // my

  // R-controlled vowels
  ar: "ɑːr", // car
  er: "ər", // her
  ir: "ər", // sir
  or: "ɔːr", // for
  ur: "ər", // fur

  // Consonants
  b: "b",
  c: "k",
  d: "d",
  f: "f",
  g: "g",
  h: "h",
  j: "dʒ",
  k: "k",
  l: "l",
  m: "m",
  n: "n",
  p: "p",
  r: "r",
  s: "s",
  t: "t",
  v: "v",
  w: "w",
  x: "ks",
  z: "z",
}

// Spanish phonetic mappings
const spanishIPA: { [key: string]: string } = {
  // Vowels (Spanish has consistent vowel sounds)
  a: "a",
  á: "a",
  e: "e",
  é: "e",
  i: "i",
  í: "i",
  o: "o",
  ó: "o",
  u: "u",
  ú: "u",

  // Diphthongs
  ai: "ai",
  ay: "ai",
  au: "au",
  ei: "ei",
  ey: "ei",
  eu: "eu",
  ie: "ie",
  io: "io",
  iu: "iu",
  oi: "oi",
  oy: "oi",
  ou: "ou",
  ua: "ua",
  ue: "ue",
  ui: "ui",
  uo: "uo",

  // Special consonants
  ch: "tʃ",
  ll: "ʎ", // or "j" in some dialects
  ñ: "ɲ",
  rr: "r", // rolled r
  qu: "k",
  gu: "g", // before e, i
  gü: "gw",

  // Single consonants
  b: "b",
  c: "k",
  d: "d",
  f: "f",
  g: "g",
  h: "", // silent in Spanish
  j: "x",
  k: "k",
  l: "l",
  m: "m",
  n: "n",
  p: "p",
  r: "r",
  s: "s",
  t: "t",
  v: "b",
  w: "w",
  x: "ks",
  y: "j",
  z: "s",
}

// French phonetic mappings
const frenchIPA: { [key: string]: string } = {
  // Nasal vowels
  an: "ɑ̃",
  am: "ɑ̃",
  en: "ɑ̃",
  em: "ɑ̃",
  in: "ɛ̃",
  im: "ɛ̃",
  yn: "ɛ̃",
  ym: "ɛ̃",
  on: "ɔ̃",
  om: "ɔ̃",
  un: "œ̃",
  um: "œ̃",

  // Vowel combinations
  ai: "ɛ",
  ay: "ɛ",
  au: "o",
  eau: "o",
  ei: "ɛ",
  eu: "ø",
  œu: "ø",
  ie: "i",
  oi: "wa",
  oy: "wa",
  ou: "u",
  ui: "ɥi",

  // Accented vowels
  à: "a",
  â: "a",
  é: "e",
  è: "ɛ",
  ê: "ɛ",
  ë: "ɛ",
  î: "i",
  ï: "i",
  ô: "o",
  ò: "ɔ",
  ù: "y",
  û: "y",
  ü: "y",

  // Single vowels
  a: "a",
  e: "ə",
  i: "i",
  o: "o",
  u: "y",
  y: "i",

  // Consonant combinations
  ch: "ʃ",
  gn: "ɲ",
  ph: "f",
  qu: "k",
  th: "t",
  sch: "ʃ",

  // Single consonants
  b: "b",
  c: "k",
  d: "d",
  f: "f",
  g: "g",
  h: "", // often silent
  j: "ʒ",
  k: "k",
  l: "l",
  m: "m",
  n: "n",
  p: "p",
  r: "ʁ",
  s: "s",
  t: "t",
  v: "v",
  w: "w",
  x: "ks",
  z: "z",
}

export function getPhoneticMapping(language: "english" | "spanish" | "french"): { [key: string]: string } {
  switch (language) {
    case "english":
      return englishIPA
    case "spanish":
      return spanishIPA
    case "french":
      return frenchIPA
    default:
      return englishIPA
  }
}

export function convertToPhonetic(word: string, language: "english" | "spanish" | "french"): string {
  const mapping = getPhoneticMapping(language)
  let phonetic = word.toLowerCase()

  // Sort patterns by length (longest first) to avoid partial matches
  const sortedPatterns = Object.entries(mapping).sort(([a], [b]) => b.length - a.length)

  // Apply phonetic transformations
  for (const [pattern, sound] of sortedPatterns) {
    if (pattern && sound) {
      phonetic = phonetic.replace(new RegExp(pattern, "g"), sound)
    }
  }

  return phonetic
}

export function getPhoneticSuffix(word: string, language: "english" | "spanish" | "french", length = 3): string {
  const phonetic = convertToPhonetic(word, language)

  // For very short words, use the whole phonetic representation
  if (phonetic.length <= 2) return phonetic

  // For longer words, extract suffix based on word length and complexity
  if (word.length <= 4) {
    // Short words: use last 2-3 phonetic sounds
    return phonetic.slice(-Math.min(2, phonetic.length))
  } else if (word.length <= 8) {
    // Medium words: use last 3-4 phonetic sounds
    return phonetic.slice(-Math.min(3, phonetic.length))
  } else {
    // Long words: use last 4-5 phonetic sounds
    return phonetic.slice(-Math.min(length, phonetic.length))
  }
}

export function calculatePhoneticSimilarity(phonetic1: string, phonetic2: string): number {
  if (phonetic1 === phonetic2) return 1.0

  const longer = phonetic1.length > phonetic2.length ? phonetic1 : phonetic2
  const shorter = phonetic1.length > phonetic2.length ? phonetic2 : phonetic1

  if (longer.length === 0) return 1.0

  // Calculate similarity from the end (suffix matching)
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

// Enhanced pattern matching for any word
export function findPhoneticMatches(
  inputWord: string,
  wordList: string[],
  language: "english" | "spanish" | "french",
  minSimilarity = 0.6,
): Array<{ word: string; similarity: number; phoneticSuffix: string }> {
  const inputPhonetic = getPhoneticSuffix(inputWord, language)
  const matches: Array<{ word: string; similarity: number; phoneticSuffix: string }> = []

  for (const word of wordList) {
    if (word.toLowerCase() === inputWord.toLowerCase()) continue

    const wordPhonetic = getPhoneticSuffix(word, language)
    const similarity = calculatePhoneticSimilarity(inputPhonetic, wordPhonetic)

    if (similarity >= minSimilarity) {
      matches.push({
        word,
        similarity,
        phoneticSuffix: wordPhonetic,
      })
    }
  }

  return matches.sort((a, b) => b.similarity - a.similarity)
}

// Generate rhymes for any word using suffix patterns
export function generateUniversalRhymes(inputWord: string, language: "english" | "spanish" | "french"): string[] {
  const phonetic = convertToPhonetic(inputWord, language)
  const suffix = getPhoneticSuffix(inputWord, language)

  // Common rhyming patterns based on phonetic suffix
  const rhymePatterns: string[] = []

  // Generate variations of the suffix
  if (suffix.length >= 2) {
    // Try different suffix lengths
    for (let i = 2; i <= Math.min(4, suffix.length); i++) {
      const pattern = suffix.slice(-i)
      rhymePatterns.push(pattern)
    }
  }

  // Add phonetic variations (similar sounds)
  const variations = getPhoneticVariations(suffix, language)
  rhymePatterns.push(...variations)

  return [...new Set(rhymePatterns)] // Remove duplicates
}

function getPhoneticVariations(phonetic: string, language: "english" | "spanish" | "french"): string[] {
  const variations: string[] = []

  if (language === "english") {
    // English phonetic variations
    const englishVariations: { [key: string]: string[] } = {
      eɪ: ["aɪ", "eɪ"], // day/die
      iː: ["ɪ", "aɪ"], // see/sit/sigh
      uː: ["ʊ", "aʊ"], // moon/book/now
      ɔː: ["ɒ", "aʊ"], // saw/hot/how
      ər: ["ɑːr", "ɔːr"], // her/car/for
      ʃən: ["sən", "zən"], // -tion/-sion
      k: ["g", "tʃ"], // back/bag/batch
      t: ["d", "θ"], // cat/cad/math
      s: ["z", "ʃ"], // miss/fizz/wish
    }

    for (const [sound, vars] of Object.entries(englishVariations)) {
      if (phonetic.includes(sound)) {
        for (const variant of vars) {
          variations.push(phonetic.replace(sound, variant))
        }
      }
    }
  }

  return variations
}

// Syllable counting for any language
export function countSyllablesUniversal(word: string, language: "english" | "spanish" | "french"): number {
  const lowerWord = word.toLowerCase()

  if (language === "spanish") {
    // Spanish syllable counting (more regular)
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

  // Adjust for vowel combinations
  if (lowerWord.match(/[aeiouy]{2,}/)) {
    const combinations = lowerWord.match(/[aeiouy]{2,}/g)!
    count -= combinations.length
  }

  return Math.max(1, count)
}
