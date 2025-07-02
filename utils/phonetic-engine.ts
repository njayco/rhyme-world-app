// Phonetic mapping for English sounds
const englishPhonetics: { [key: string]: string } = {
  // Vowel sounds
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
  i: "ɪ",
  ie: "iː",
  igh: "aɪ",
  y: "aɪ",
  o: "ɒ",
  oa: "oʊ",
  oo: "uː",
  ou: "aʊ",
  ow: "aʊ",
  u: "ʌ",
  ue: "uː",
  ui: "uː",

  // Consonant clusters
  ch: "tʃ",
  sh: "ʃ",
  th: "θ",
  ph: "f",
  gh: "f",
  ck: "k",
  ng: "ŋ",
  qu: "kw",

  // Silent letters patterns
  kn: "n",
  wr: "r",
  mb: "m",
  bt: "t",
}

const spanishPhonetics: { [key: string]: string } = {
  a: "a",
  e: "e",
  i: "i",
  o: "o",
  u: "u",
  á: "a",
  é: "e",
  í: "i",
  ó: "o",
  ú: "u",
  ñ: "ɲ",
  ll: "ʎ",
  rr: "r",
  ch: "tʃ",
  j: "x",
  g: "x",
  z: "s",
  c: "s",
}

const frenchPhonetics: { [key: string]: string } = {
  a: "a",
  à: "a",
  â: "a",
  e: "ə",
  é: "e",
  è: "ɛ",
  ê: "ɛ",
  ë: "ɛ",
  i: "i",
  î: "i",
  ï: "i",
  o: "o",
  ô: "o",
  ò: "ɔ",
  u: "y",
  ù: "y",
  û: "y",
  ü: "y",
  ou: "u",
  on: "ɔ̃",
  an: "ɑ̃",
  en: "ɑ̃",
  in: "ɛ̃",
  ch: "ʃ",
  j: "ʒ",
  gn: "ɲ",
  qu: "k",
}

// Comprehensive cross-language rhyme patterns for better matching
const crossLanguagePatterns: { [key: string]: { [key: string]: string[] } } = {
  english: {
    french: {
      // Suffix patterns
      ment: ["ment", "ant", "ent"], // English -ment matches French -ment, -ant, -ent
      tion: ["tion", "sion"], // English -tion matches French -tion, -sion
      sion: ["sion", "tion"], // English -sion matches French -sion, -tion
      able: ["able"], // English -able matches French -able
      ible: ["ible"], // English -ible matches French -ible
      ous: ["eux", "euse"], // English -ous matches French -eux, -euse
      ly: ["ment"], // English -ly matches French -ment (adverbs)
      ity: ["ité"], // English -ity matches French -ité
      ety: ["été"], // English -ety matches French -été
      ary: ["aire"], // English -ary matches French -aire
      ory: ["oire"], // English -ory matches French -oire
      ery: ["erie"], // English -ery matches French -erie
      ure: ["ure"], // English -ure matches French -ure
      age: ["age"], // English -age matches French -age
      ice: ["ice"], // English -ice matches French -ice
      ance: ["ance"], // English -ance matches French -ance
      ence: ["ence"], // English -ence matches French -ence
      ique: ["ique"], // English -ique matches French -ique

      // Vowel sound patterns
      ay: ["é", "ai", "ait"], // English -ay matches French -é, -ai, -ait
      ee: ["i", "ie"], // English -ee matches French -i, -ie
      oo: ["ou", "u"], // English -oo matches French -ou, -u
      ow: ["au", "eau"], // English -ow matches French -au, -eau
      ey: ["é", "ai"], // English -ey matches French -é, -ai

      // Consonant patterns
      er: ["er", "eur"], // English -er matches French -er, -eur
      or: ["eur", "or"], // English -or matches French -eur, -or
      ar: ["ar", "ard"], // English -ar matches French -ar, -ard
      ir: ["ir", "ire"], // English -ir matches French -ir, -ire
      ur: ["ur", "ure"], // English -ur matches French -ur, -ure

      // Common endings
      ing: ["ant", "ent"], // English -ing matches French -ant, -ent
      ed: ["é", "ée"], // English -ed matches French -é, -ée
      est: ["est"], // English -est matches French -est
      ness: ["esse"], // English -ness matches French -esse
      less: ["sans"], // English -less matches French sans (conceptual)
      ful: ["plein"], // English -ful matches French plein (conceptual)

      // Word endings
      at: ["at"], // English -at matches French -at
      et: ["et"], // English -et matches French -et
      it: ["it"], // English -it matches French -it
      ot: ["ot"], // English -ot matches French -ot
      ut: ["ut"], // English -ut matches French -ut
    },
    spanish: {
      // Suffix patterns
      tion: ["ción", "sión"], // English -tion matches Spanish -ción, -sión
      sion: ["sión", "ción"], // English -sion matches Spanish -sión, -ción
      ous: ["oso", "osa"], // English -ous matches Spanish -oso, -osa
      ly: ["mente"], // English -ly matches Spanish -mente
      able: ["able"], // English -able matches Spanish -able
      ible: ["ible"], // English -ible matches Spanish -ible
      ity: ["idad"], // English -ity matches Spanish -idad
      ety: ["edad"], // English -ety matches Spanish -edad
      ary: ["ario", "aria"], // English -ary matches Spanish -ario, -aria
      ory: ["orio", "oria"], // English -ory matches Spanish -orio, -oria
      ure: ["ura"], // English -ure matches Spanish -ura
      age: ["aje"], // English -age matches Spanish -aje
      ance: ["ancia"], // English -ance matches Spanish -ancia
      ence: ["encia"], // English -ence matches Spanish -encia
      ment: ["mento"], // English -ment matches Spanish -mento

      // Vowel sound patterns
      ay: ["ai", "ay"], // English -ay matches Spanish -ai, -ay
      ee: ["i"], // English -ee matches Spanish -i
      oo: ["u"], // English -oo matches Spanish -u
      ow: ["au"], // English -ow matches Spanish -au
      ey: ["ei"], // English -ey matches Spanish -ei

      // Consonant patterns
      er: ["er", "ar"], // English -er matches Spanish -er, -ar
      or: ["or"], // English -or matches Spanish -or
      ar: ["ar"], // English -ar matches Spanish -ar
      ir: ["ir"], // English -ir matches Spanish -ir
      ur: ["ur"], // English -ur matches Spanish -ur

      // Common endings
      ing: ["ando", "iendo"], // English -ing matches Spanish -ando, -iendo
      ed: ["ado", "ido"], // English -ed matches Spanish -ado, -ido
      est: ["est"], // English -est matches Spanish -est
      ness: ["eza"], // English -ness matches Spanish -eza

      // Word endings
      at: ["at"], // English -at matches Spanish -at
      et: ["et"], // English -et matches Spanish -et
      it: ["it"], // English -it matches Spanish -it
      ot: ["ot"], // English -ot matches Spanish -ot
      ut: ["ut"], // English -ut matches Spanish -ut

      // Spanish specific patterns
      on: ["ón"], // English -on matches Spanish -ón
      an: ["án"], // English -an matches Spanish -án
      in: ["ín"], // English -in matches Spanish -ín
    },
  },
  spanish: {
    english: {
      // Suffix patterns
      ción: ["tion", "sion"], // Spanish -ción matches English -tion, -sion
      sión: ["sion", "tion"], // Spanish -sión matches English -sion, -tion
      oso: ["ous"], // Spanish -oso matches English -ous
      osa: ["ous"], // Spanish -osa matches English -ous
      mente: ["ly"], // Spanish -mente matches English -ly
      able: ["able"], // Spanish -able matches English -able
      ible: ["ible"], // Spanish -ible matches English -ible
      idad: ["ity"], // Spanish -idad matches English -ity
      edad: ["ety", "age"], // Spanish -edad matches English -ety, -age
      ario: ["ary"], // Spanish -ario matches English -ary
      aria: ["ary"], // Spanish -aria matches English -ary
      orio: ["ory"], // Spanish -orio matches English -ory
      oria: ["ory"], // Spanish -oria matches English -ory
      ura: ["ure"], // Spanish -ura matches English -ure
      aje: ["age"], // Spanish -aje matches English -age
      ancia: ["ance"], // Spanish -ancia matches English -ance
      encia: ["ence"], // Spanish -encia matches English -ence
      mento: ["ment"], // Spanish -mento matches English -ment

      // Vowel patterns
      ai: ["ay", "eye"], // Spanish -ai matches English -ay, -eye
      ei: ["ey", "ay"], // Spanish -ei matches English -ey, -ay
      oi: ["oy"], // Spanish -oi matches English -oy
      au: ["ow"], // Spanish -au matches English -ow

      // Consonant patterns
      ar: ["ar", "er"], // Spanish -ar matches English -ar, -er
      er: ["er", "ar"], // Spanish -er matches English -er, -ar
      ir: ["ir", "eer"], // Spanish -ir matches English -ir, -eer
      or: ["or", "ore"], // Spanish -or matches English -or, -ore
      ur: ["ur", "ure"], // Spanish -ur matches English -ur, -ure

      // Common endings
      ando: ["ing"], // Spanish -ando matches English -ing
      iendo: ["ing"], // Spanish -iendo matches English -ing
      ado: ["ed"], // Spanish -ado matches English -ed
      ido: ["ed"], // Spanish -ido matches English -ed
      eza: ["ness"], // Spanish -eza matches English -ness

      // Word endings
      ón: ["on"], // Spanish -ón matches English -on
      án: ["an"], // Spanish -án matches English -an
      ín: ["in"], // Spanish -ín matches English -in
      és: ["ese"], // Spanish -és matches English -ese

      // Simple vowel endings
      a: ["a"], // Spanish -a matches English -a
      e: ["e", "ee"], // Spanish -e matches English -e, -ee
      i: ["ee", "i"], // Spanish -i matches English -ee, -i
      o: ["o", "ow"], // Spanish -o matches English -o, -ow
      u: ["oo", "u"], // Spanish -u matches English -oo, -u
    },
    french: {
      // Suffix patterns
      ción: ["tion"], // Spanish -ción matches French -tion
      sión: ["sion"], // Spanish -sión matches French -sion
      oso: ["eux"], // Spanish -oso matches French -eux
      osa: ["euse"], // Spanish -osa matches French -euse
      mente: ["ment"], // Spanish -mente matches French -ment
      idad: ["ité"], // Spanish -idad matches French -ité
      edad: ["âge"], // Spanish -edad matches French -âge
      ario: ["aire"], // Spanish -ario matches French -aire
      aria: ["aire"], // Spanish -aria matches French -aire
      orio: ["oire"], // Spanish -orio matches French -oire
      oria: ["oire"], // Spanish -oria matches French -oire
      ura: ["ure"], // Spanish -ura matches French -ure
      aje: ["age"], // Spanish -aje matches French -age
      ancia: ["ance"], // Spanish -ancia matches French -ance
      encia: ["ence"], // Spanish -encia matches French -ence

      // Vowel patterns
      ai: ["ai", "ait"], // Spanish -ai matches French -ai, -ait
      ei: ["ei"], // Spanish -ei matches French -ei
      oi: ["oi"], // Spanish -oi matches French -oi
      au: ["au", "eau"], // Spanish -au matches French -au, -eau

      // Consonant patterns
      ar: ["ar", "ard"], // Spanish -ar matches French -ar, -ard
      er: ["er", "eur"], // Spanish -er matches French -er, -eur
      ir: ["ir", "ire"], // Spanish -ir matches French -ir, -ire
      or: ["eur", "or"], // Spanish -or matches French -eur, -or
      ur: ["ur", "ure"], // Spanish -ur matches French -ur, -ure

      // Common endings
      ando: ["ant"], // Spanish -ando matches French -ant
      iendo: ["ent"], // Spanish -iendo matches French -ent
      ado: ["é"], // Spanish -ado matches French -é
      ido: ["i"], // Spanish -ido matches French -i

      // Word endings
      ón: ["on"], // Spanish -ón matches French -on
      án: ["an"], // Spanish -án matches French -an
      ín: ["in"], // Spanish -ín matches French -in

      // Simple vowel endings
      a: ["a"], // Spanish -a matches French -a
      e: ["e"], // Spanish -e matches French -e
      i: ["i"], // Spanish -i matches French -i
      o: ["o", "eau"], // Spanish -o matches French -o, -eau
      u: ["ou", "u"], // Spanish -u matches French -ou, -u
    },
  },
  french: {
    english: {
      // Suffix patterns
      ment: ["ment", "ly"], // French -ment matches English -ment, -ly
      tion: ["tion"], // French -tion matches English -tion
      sion: ["sion"], // French -sion matches English -sion
      eux: ["ous"], // French -eux matches English -ous
      euse: ["ous"], // French -euse matches English -ous
      able: ["able"], // French -able matches English -able
      ible: ["ible"], // French -ible matches English -ible
      ité: ["ity"], // French -ité matches English -ity
      été: ["ety"], // French -été matches English -ety
      aire: ["ary"], // French -aire matches English -ary
      oire: ["ory"], // French -oire matches English -ory
      erie: ["ery"], // French -erie matches English -ery
      ure: ["ure"], // French -ure matches English -ure
      age: ["age"], // French -age matches English -age
      ice: ["ice"], // French -ice matches English -ice
      ance: ["ance"], // French -ance matches English -ance
      ence: ["ence"], // French -ence matches English -ence
      ique: ["ique", "ic"], // French -ique matches English -ique, -ic

      // Vowel patterns
      é: ["ay", "ey"], // French -é matches English -ay, -ey
      ai: ["ay", "eye"], // French -ai matches English -ay, -eye
      ait: ["ay", "ate"], // French -ait matches English -ay, -ate
      i: ["ee"], // French -i matches English -ee
      ie: ["ee"], // French -ie matches English -ee
      ou: ["oo"], // French -ou matches English -oo
      u: ["oo"], // French -u matches English -oo
      au: ["ow"], // French -au matches English -ow
      eau: ["ow", "o"], // French -eau matches English -ow, -o
      oi: ["oy"], // French -oi matches English -oy

      // Consonant patterns
      er: ["er", "are"], // French -er matches English -er, -are
      eur: ["or", "er"], // French -eur matches English -or, -er
      ar: ["ar"], // French -ar matches English -ar
      ard: ["ard"], // French -ard matches English -ard
      ir: ["eer", "ir"], // French -ir matches English -eer, -ir
      ire: ["ire", "eer"], // French -ire matches English -ire, -eer
      or: ["or"], // French -or matches English -or

      // Common endings
      ant: ["ing", "ant"], // French -ant matches English -ing, -ant
      ent: ["ing", "ent"], // French -ent matches English -ing, -ent
      esse: ["ness"], // French -esse matches English -ness

      // Word endings
      on: ["on"], // French -on matches English -on
      an: ["an"], // French -an matches English -an
      in: ["in"], // French -in matches English -in
      est: ["est"], // French -est matches English -est

      // Simple vowel endings
      a: ["a"], // French -a matches English -a
      e: ["e"], // French -e matches English -e
      o: ["o"], // French -o matches English -o
    },
    spanish: {
      // Suffix patterns
      ment: ["mente"], // French -ment matches Spanish -mente
      tion: ["ción"], // French -tion matches Spanish -ción
      sion: ["sión"], // French -sion matches Spanish -sión
      eux: ["oso"], // French -eux matches Spanish -oso
      euse: ["osa"], // French -euse matches Spanish -osa
      ité: ["idad"], // French -ité matches Spanish -idad
      âge: ["edad"], // French -âge matches Spanish -edad
      aire: ["ario", "aria"], // French -aire matches Spanish -ario, -aria
      oire: ["orio", "oria"], // French -oire matches Spanish -orio, -oria
      ure: ["ura"], // French -ure matches Spanish -ura
      age: ["aje"], // French -age matches Spanish -aje
      ance: ["ancia"], // French -ance matches Spanish -ancia
      ence: ["encia"], // French -ence matches Spanish -encia

      // Vowel patterns
      ai: ["ai"], // French -ai matches Spanish -ai
      ait: ["ai"], // French -ait matches Spanish -ai
      ei: ["ei"], // French -ei matches Spanish -ei
      oi: ["oi"], // French -oi matches Spanish -oi
      au: ["au"], // French -au matches Spanish -au
      eau: ["au"], // French -eau matches Spanish -au
      ou: ["u"], // French -ou matches Spanish -u

      // Consonant patterns
      er: ["er", "ar"], // French -er matches Spanish -er, -ar
      eur: ["or"], // French -eur matches Spanish -or
      ar: ["ar"], // French -ar matches Spanish -ar
      ard: ["ardo"], // French -ard matches Spanish -ardo
      ir: ["ir"], // French -ir matches Spanish -ir
      ire: ["ir"], // French -ire matches Spanish -ir
      or: ["or"], // French -or matches Spanish -or

      // Common endings
      ant: ["ando"], // French -ant matches Spanish -ando
      ent: ["iendo"], // French -ent matches Spanish -iendo
      é: ["ado"], // French -é matches Spanish -ado
      i: ["ido"], // French -i matches Spanish -ido

      // Word endings
      on: ["ón"], // French -on matches Spanish -ón
      an: ["án"], // French -an matches Spanish -án
      in: ["ín"], // French -in matches Spanish -ín

      // Simple vowel endings
      a: ["a"], // French -a matches Spanish -a
      e: ["e"], // French -e matches Spanish -e
      o: ["o"], // French -o matches Spanish -o
    },
  },
}

// Add these enhanced phonetic patterns for complex words:
const complexEnglishPatterns: { [key: string]: string } = {
  // Multi-syllable endings
  iful: "ɪfəl",
  ible: "ɪbəl",
  able: "eɪbəl",
  ment: "mənt",
  tion: "ʃən",
  sion: "ʃən",
  ness: "nəs",
  less: "ləs",
  ous: "əs",
  eous: "iəs",
  ious: "iəs",
  uous: "uəs",
  ent: "ənt",
  ant: "ənt",
  ient: "iənt",
  ician: "ɪʃən",
  ology: "ɒlədʒi",
  ography: "ɒgrəfi",
  ometry: "ɒmətri",
  onomy: "ɒnəmi",
  archy: "ɑːki",
  ency: "ənsi",
  ancy: "ənsi",
  ity: "ɪti",
  ety: "əti",
  aty: "əti",
  ory: "əri",
  ary: "əri",
  ery: "əri",
  iry: "aɪri",
  ury: "əri",
  ly: "li",
  ally: "əli",
  ically: "ɪkəli",
  ously: "əsli",
  iously: "iəsli",
  eously: "iəsli",
  uously: "uəsli",
}

// Enhanced cross-language matching function
export function findCrossLanguageRhymes(
  inputWord: string,
  inputLanguage: "english" | "spanish" | "french",
  targetLanguage: "english" | "spanish" | "french",
): string[] {
  const patterns = crossLanguagePatterns[inputLanguage]?.[targetLanguage]
  if (!patterns) return []

  const matches: string[] = []
  const lowerInput = inputWord.toLowerCase()

  // Check each pattern
  for (const [inputPattern, targetPatterns] of Object.entries(patterns)) {
    if (lowerInput.endsWith(inputPattern)) {
      matches.push(...targetPatterns)
      break // Use the first matching pattern
    }
  }

  return matches
}

// Update the getPhoneticRepresentation function to handle complex patterns first:
export function getPhoneticRepresentation(word: string, language: "english" | "spanish" | "french"): string {
  const phonetics =
    language === "english" ? englishPhonetics : language === "spanish" ? spanishPhonetics : frenchPhonetics

  let phoneticWord = word.toLowerCase()

  // For English, handle complex patterns first
  if (language === "english") {
    for (const [pattern, sound] of Object.entries(complexEnglishPatterns)) {
      if (phoneticWord.endsWith(pattern)) {
        phoneticWord = phoneticWord.slice(0, -pattern.length) + sound
        break
      }
    }
  }

  // Apply basic phonetic transformations
  for (const [pattern, sound] of Object.entries(phonetics)) {
    phoneticWord = phoneticWord.replace(new RegExp(pattern, "g"), sound)
  }

  return phoneticWord
}

// Update getRhymingPattern to handle longer patterns for complex words:
export function getRhymingPattern(word: string, language: "english" | "spanish" | "french"): string {
  const phonetic = getPhoneticRepresentation(word, language)

  // For simple words like "cat", use shorter patterns
  if (word.length <= 4) {
    if (phonetic.length >= 2) {
      return phonetic.slice(-2)
    }
    return phonetic
  }

  // For complex words, use longer patterns (4-5 sounds)
  if (word.length > 8) {
    if (phonetic.length >= 5) {
      return phonetic.slice(-5)
    } else if (phonetic.length >= 4) {
      return phonetic.slice(-4)
    }
  }

  // Standard pattern extraction
  if (phonetic.length >= 3) {
    return phonetic.slice(-3)
  } else if (phonetic.length >= 2) {
    return phonetic.slice(-2)
  }
  return phonetic
}

export function doWordsRhyme(
  word1: string,
  word2: string,
  targetLanguage: "english" | "spanish" | "french",
  inputLanguage: "english" | "spanish" | "french" = "english",
): boolean {
  if (word1.toLowerCase() === word2.toLowerCase()) return false

  // Cross-language pattern matching
  if (inputLanguage !== targetLanguage) {
    const crossPatterns = findCrossLanguageRhymes(word1, inputLanguage, targetLanguage)
    for (const pattern of crossPatterns) {
      if (word2.toLowerCase().endsWith(pattern)) {
        return true
      }
    }
  }

  // Simple ending match for basic words
  const ending1 = word1.toLowerCase().slice(-2)
  const ending2 = word2.toLowerCase().slice(-2)

  if (ending1 === ending2 && word1.length <= 4) return true

  // Phonetic matching
  const pattern1 = getRhymingPattern(word1, inputLanguage)
  const pattern2 = getRhymingPattern(word2, targetLanguage)

  // Check for exact phonetic match
  if (pattern1 === pattern2) return true

  // Check for similar endings (allowing for slight variations)
  const similarity = calculateSimilarity(pattern1, pattern2)
  return similarity > 0.6 // Lower threshold for better matching
}

function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) return 1.0

  const editDistance = levenshteinDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
      }
    }
  }

  return matrix[str2.length][str1.length]
}
