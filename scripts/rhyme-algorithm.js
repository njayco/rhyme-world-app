// Multilingual Rhyme Algorithm with Phonetic Analysis
// Supports English, Spanish, and French with cross-language translations

class MultilingualRhymeEngine {
  constructor() {
    this.currentLanguage = "english"
    this.translations = this.initializeTranslations()
    this.phoneticMappings = this.initializePhoneticMappings()
    this.wordDictionaries = this.initializeWordDictionaries()
    this.uiTranslations = this.initializeUITranslations()
  }

  // Initialize phonetic mappings for each language
  initializePhoneticMappings() {
    return {
      english: {
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

        // Consonant combinations
        ch: "tʃ",
        sh: "ʃ",
        th: "θ",
        ph: "f",
        gh: "f",
        ck: "k",
        ng: "ŋ",
        qu: "kw",

        // Complex endings
        tion: "ʃən",
        sion: "ʃən",
        ture: "tʃər",
        sure: "ʃər",
        ous: "əs",
        ious: "iəs",
        eous: "iəs",
        able: "əbəl",
        ible: "ɪbəl",
        ment: "mənt",
        ness: "nəs",
        ful: "fəl",
        less: "ləs",

        // R-controlled vowels
        ar: "ɑːr",
        er: "ər",
        ir: "ər",
        or: "ɔːr",
        ur: "ər",

        // Silent letters
        kn: "n",
        wr: "r",
        mb: "m",
        bt: "t",
        gn: "n",
      },

      spanish: {
        // Spanish vowels (consistent)
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
        ie: "ie",
        io: "io",
        iu: "iu",
        oi: "oi",
        oy: "oi",
        ua: "ua",
        ue: "ue",
        ui: "ui",
        uo: "uo",

        // Special consonants
        ch: "tʃ",
        ll: "ʎ",
        ñ: "ɲ",
        rr: "r",
        qu: "k",
        gu: "g",
        gü: "gw",

        // Common endings
        ción: "sjon",
        sión: "sjon",
        ando: "ando",
        iendo: "jendo",
        mente: "mente",
        oso: "oso",
        osa: "osa",
        ito: "ito",
        ita: "ita",
        dad: "dad",
        ura: "ura",
      },

      french: {
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

        // Consonant combinations
        ch: "ʃ",
        gn: "ɲ",
        ph: "f",
        qu: "k",
        th: "t",

        // Common endings
        tion: "sjɔ̃",
        sion: "sjɔ̃",
        ment: "mɑ̃",
        ance: "ɑ̃s",
        ence: "ɑ̃s",
        eux: "ø",
        euse: "øz",
        able: "abl",
        ible: "ibl",
        age: "aʒ",
        ure: "yr",
      },
    }
  }

  // Initialize word dictionaries for each language
  initializeWordDictionaries() {
    return {
      english: [
        // Common English words with various endings
        "cat",
        "hat",
        "bat",
        "rat",
        "mat",
        "fat",
        "sat",
        "flat",
        "chat",
        "that",
        "day",
        "way",
        "say",
        "play",
        "stay",
        "may",
        "bay",
        "ray",
        "pay",
        "lay",
        "light",
        "night",
        "right",
        "sight",
        "bright",
        "fight",
        "might",
        "tight",
        "love",
        "dove",
        "above",
        "shove",
        "glove",
        "move",
        "prove",
        "groove",
        "heart",
        "start",
        "part",
        "art",
        "smart",
        "chart",
        "dart",
        "cart",
        "time",
        "rhyme",
        "climb",
        "prime",
        "crime",
        "lime",
        "dime",
        "chime",
        "fire",
        "tire",
        "wire",
        "hire",
        "desire",
        "inspire",
        "require",
        "entire",
        "nation",
        "station",
        "creation",
        "education",
        "information",
        "celebration",
        "beautiful",
        "wonderful",
        "powerful",
        "colorful",
        "peaceful",
        "helpful",
        "running",
        "singing",
        "dancing",
        "walking",
        "talking",
        "working",
        "happiness",
        "sadness",
        "kindness",
        "darkness",
        "weakness",
        "fitness",
        "water",
        "daughter",
        "quarter",
        "shorter",
        "porter",
        "reporter",
        "house",
        "mouse",
        "spouse",
        "blouse",
        "grouse",
        "rouse",
        "tree",
        "free",
        "see",
        "be",
        "me",
        "we",
        "key",
        "tea",
        "sea",
        "bee",
      ],

      spanish: [
        // Common Spanish words
        "amor",
        "dolor",
        "color",
        "calor",
        "honor",
        "temor",
        "rumor",
        "humor",
        "corazón",
        "canción",
        "pasión",
        "razón",
        "ilusión",
        "emoción",
        "decisión",
        "verdad",
        "ciudad",
        "libertad",
        "amistad",
        "felicidad",
        "realidad",
        "soledad",
        "casa",
        "masa",
        "pasa",
        "tasa",
        "rasa",
        "escasa",
        "grasa",
        "vida",
        "comida",
        "bebida",
        "salida",
        "herida",
        "medida",
        "perdida",
        "día",
        "alegría",
        "melodía",
        "poesía",
        "fantasía",
        "armonía",
        "energía",
        "tiempo",
        "viento",
        "cuento",
        "momento",
        "asiento",
        "aliento",
        "agua",
        "fragua",
        "lengua",
        "antigua",
        "yegua",
        "fuego",
        "juego",
        "luego",
        "ruego",
        "ciego",
        "griego",
        "tierra",
        "guerra",
        "sierra",
        "perra",
        "yerra",
        "cierra",
        "cielo",
        "suelo",
        "vuelo",
        "duelo",
        "abuelo",
        "consuelo",
        "hermoso",
        "famoso",
        "gracioso",
        "generoso",
        "cariñoso",
        "orgulloso",
        "bonito",
        "pequeñito",
        "ratito",
        "poquito",
        "solito",
        "despacito",
        "cansado",
        "enamorado",
        "preocupado",
        "ocupado",
        "callado",
        "mojado",
      ],

      french: [
        // Common French words
        "amour",
        "jour",
        "pour",
        "tour",
        "cour",
        "four",
        "lourd",
        "sourd",
        "cœur",
        "bonheur",
        "malheur",
        "douceur",
        "chaleur",
        "couleur",
        "honneur",
        "vie",
        "joie",
        "voie",
        "soie",
        "oie",
        "proie",
        "foie",
        "temps",
        "printemps",
        "longtemps",
        "champs",
        "camps",
        "eau",
        "beau",
        "nouveau",
        "cadeau",
        "oiseau",
        "bateau",
        "château",
        "feu",
        "peu",
        "jeu",
        "lieu",
        "dieu",
        "bleu",
        "vœu",
        "nœud",
        "air",
        "chair",
        "clair",
        "pair",
        "faire",
        "taire",
        "plaire",
        "mer",
        "fer",
        "ver",
        "hier",
        "fier",
        "cher",
        "amer",
        "main",
        "pain",
        "bain",
        "gain",
        "vain",
        "train",
        "grain",
        "bon",
        "son",
        "ton",
        "don",
        "mon",
        "nom",
        "pardon",
        "voyage",
        "courage",
        "message",
        "passage",
        "visage",
        "nuage",
        "nation",
        "passion",
        "émotion",
        "création",
        "attention",
        "question",
        "moment",
        "vraiment",
        "seulement",
        "comment",
        "souvent",
        "lentement",
        "chance",
        "danse",
        "romance",
        "france",
        "enfance",
        "distance",
        "heureux",
        "amoureux",
        "joyeux",
        "merveilleux",
        "généreux",
        "courageux",
      ],
    }
  }

  // Initialize cross-language translations
  initializeTranslations() {
    return {
      english: {
        spanish: {
          love: "amor",
          heart: "corazón",
          day: "día",
          night: "noche",
          light: "luz",
          fire: "fuego",
          water: "agua",
          beautiful: "hermoso",
          song: "canción",
          dream: "sueño",
          time: "tiempo",
          life: "vida",
          house: "casa",
          cat: "gato",
          dog: "perro",
          sun: "sol",
          moon: "luna",
          sea: "mar",
          sky: "cielo",
          earth: "tierra",
          mountain: "montaña",
          river: "río",
          flower: "flor",
          tree: "árbol",
        },
        french: {
          love: "amour",
          heart: "cœur",
          day: "jour",
          night: "nuit",
          light: "lumière",
          fire: "feu",
          water: "eau",
          beautiful: "beau",
          song: "chanson",
          dream: "rêve",
          time: "temps",
          life: "vie",
          house: "maison",
          cat: "chat",
          dog: "chien",
          sun: "soleil",
          moon: "lune",
          sea: "mer",
          sky: "ciel",
          earth: "terre",
          mountain: "montagne",
          river: "rivière",
          flower: "fleur",
          tree: "arbre",
        },
      },
      spanish: {
        english: {
          amor: "love",
          corazón: "heart",
          día: "day",
          noche: "night",
          luz: "light",
          fuego: "fire",
          agua: "water",
          hermoso: "beautiful",
          canción: "song",
          sueño: "dream",
          tiempo: "time",
          vida: "life",
          casa: "house",
          gato: "cat",
          perro: "dog",
          sol: "sun",
          luna: "moon",
          mar: "sea",
          cielo: "sky",
          tierra: "earth",
        },
        french: {
          amor: "amour",
          corazón: "cœur",
          día: "jour",
          noche: "nuit",
          luz: "lumière",
          fuego: "feu",
          agua: "eau",
          hermoso: "beau",
          canción: "chanson",
          sueño: "rêve",
          tiempo: "temps",
          vida: "vie",
        },
      },
      french: {
        english: {
          amour: "love",
          cœur: "heart",
          jour: "day",
          nuit: "night",
          lumière: "light",
          feu: "fire",
          eau: "water",
          beau: "beautiful",
          chanson: "song",
          rêve: "dream",
          temps: "time",
          vie: "life",
          maison: "house",
          chat: "cat",
          chien: "dog",
          soleil: "sun",
          lune: "moon",
          mer: "sea",
          ciel: "sky",
          terre: "earth",
        },
        spanish: {
          amour: "amor",
          cœur: "corazón",
          jour: "día",
          nuit: "noche",
          lumière: "luz",
          feu: "fuego",
          eau: "agua",
          beau: "hermoso",
          chanson: "canción",
          rêve: "sueño",
          temps: "tiempo",
          vie: "vida",
        },
      },
    }
  }

  // Initialize UI translations
  initializeUITranslations() {
    return {
      english: {
        title: "Multilingual Rhyme Finder",
        inputLabel: "Enter a word to find rhymes:",
        languageLabel: "Select language:",
        searchButton: "Find Rhymes",
        perfectRhymes: "Perfect Rhymes",
        slantRhymes: "Slant Rhymes",
        crossLanguageRhymes: "Cross-Language Rhymes",
        noRhymes: "No rhymes found",
        syllables: "syllables",
        translation: "Translation",
        confidence: "Confidence",
        switchLanguage: "Switch to",
      },
      spanish: {
        title: "Buscador de Rimas Multilingüe",
        inputLabel: "Ingresa una palabra para encontrar rimas:",
        languageLabel: "Selecciona idioma:",
        searchButton: "Buscar Rimas",
        perfectRhymes: "Rimas Perfectas",
        slantRhymes: "Rimas Consonantes",
        crossLanguageRhymes: "Rimas Entre Idiomas",
        noRhymes: "No se encontraron rimas",
        syllables: "sílabas",
        translation: "Traducción",
        confidence: "Confianza",
        switchLanguage: "Cambiar a",
      },
      french: {
        title: "Chercheur de Rimes Multilingue",
        inputLabel: "Entrez un mot pour trouver des rimes:",
        languageLabel: "Sélectionnez la langue:",
        searchButton: "Trouver des Rimes",
        perfectRhymes: "Rimes Parfaites",
        slantRhymes: "Rimes Approximatives",
        crossLanguageRhymes: "Rimes Inter-Langues",
        noRhymes: "Aucune rime trouvée",
        syllables: "syllabes",
        translation: "Traduction",
        confidence: "Confiance",
        switchLanguage: "Passer à",
      },
    }
  }

  // Convert word to phonetic representation
  getPhoneticRepresentation(word, language = "english") {
    const mappings = this.phoneticMappings[language]
    let phonetic = word.toLowerCase()

    // Sort patterns by length (longest first) to avoid partial matches
    const sortedPatterns = Object.entries(mappings).sort(([a], [b]) => b.length - a.length)

    // Apply phonetic transformations
    for (const [pattern, sound] of sortedPatterns) {
      if (pattern && sound) {
        phonetic = phonetic.replace(new RegExp(pattern, "g"), sound)
      }
    }

    return phonetic
  }

  // Extract rhyming suffix from phonetic representation
  getRhymingSuffix(phoneticWord, minLength = 2) {
    // For rhyming, we typically look at the last 2-4 phonetic sounds
    const suffixLength = Math.min(Math.max(minLength, 2), phoneticWord.length)
    return phoneticWord.slice(-suffixLength)
  }

  // Count syllables in a word
  countSyllables(word, language = "english") {
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
    return Math.max(1, count)
  }

  // Calculate phonetic similarity between two words
  calculateSimilarity(phonetic1, phonetic2) {
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

  // Check if two words rhyme
  doWordsRhyme(word1, word2, language = "english", threshold = 0.7) {
    if (word1.toLowerCase() === word2.toLowerCase()) return false

    const phonetic1 = this.getPhoneticRepresentation(word1, language)
    const phonetic2 = this.getPhoneticRepresentation(word2, language)

    const suffix1 = this.getRhymingSuffix(phonetic1)
    const suffix2 = this.getRhymingSuffix(phonetic2)

    const similarity = this.calculateSimilarity(suffix1, suffix2)
    return similarity >= threshold
  }

  // Find rhymes for a given word
  findRhymes(inputWord, language = "english") {
    const wordList = this.wordDictionaries[language]
    const inputPhonetic = this.getPhoneticRepresentation(inputWord, language)
    const inputSuffix = this.getRhymingSuffix(inputPhonetic)
    const inputSyllables = this.countSyllables(inputWord, language)

    const perfectRhymes = []
    const slantRhymes = []

    for (const word of wordList) {
      if (word.toLowerCase() === inputWord.toLowerCase()) continue

      const wordPhonetic = this.getPhoneticRepresentation(word, language)
      const wordSuffix = this.getRhymingSuffix(wordPhonetic)
      const wordSyllables = this.countSyllables(word, language)

      const similarity = this.calculateSimilarity(inputSuffix, wordSuffix)

      const rhymeData = {
        word,
        phonetic: wordPhonetic,
        suffix: wordSuffix,
        syllables: wordSyllables,
        similarity,
        translation: this.getTranslation(word, language),
      }

      if (similarity >= 0.9) {
        perfectRhymes.push(rhymeData)
      } else if (similarity >= 0.6) {
        slantRhymes.push(rhymeData)
      }
    }

    // Sort by similarity (descending) and then by syllable count
    const sortRhymes = (rhymes) => {
      return rhymes.sort((a, b) => {
        if (Math.abs(a.similarity - b.similarity) < 0.1) {
          return Math.abs(a.syllables - inputSyllables) - Math.abs(b.syllables - inputSyllables)
        }
        return b.similarity - a.similarity
      })
    }

    return {
      perfect: sortRhymes(perfectRhymes),
      slant: sortRhymes(slantRhymes),
      inputAnalysis: {
        word: inputWord,
        phonetic: inputPhonetic,
        suffix: inputSuffix,
        syllables: inputSyllables,
      },
    }
  }

  // Find cross-language rhymes
  findCrossLanguageRhymes(inputWord, inputLanguage) {
    const crossRhymes = {}
    const languages = ["english", "spanish", "french"].filter((lang) => lang !== inputLanguage)

    for (const targetLanguage of languages) {
      const rhymes = this.findRhymes(inputWord, targetLanguage)
      if (rhymes.perfect.length > 0 || rhymes.slant.length > 0) {
        crossRhymes[targetLanguage] = rhymes
      }
    }

    return crossRhymes
  }

  // Get translation of a word
  getTranslation(word, fromLanguage, toLanguage = null) {
    if (!toLanguage) {
      // Return all available translations
      const translations = {}
      const availableLanguages = ["english", "spanish", "french"].filter((lang) => lang !== fromLanguage)

      for (const lang of availableLanguages) {
        const translation = this.translations[fromLanguage]?.[lang]?.[word.toLowerCase()]
        if (translation) {
          translations[lang] = translation
        }
      }

      return Object.keys(translations).length > 0 ? translations : null
    }

    return this.translations[fromLanguage]?.[toLanguage]?.[word.toLowerCase()] || null
  }

  // Get UI text in current language
  getUIText(key) {
    return this.uiTranslations[this.currentLanguage]?.[key] || key
  }

  // Set current UI language
  setLanguage(language) {
    if (["english", "spanish", "french"].includes(language)) {
      this.currentLanguage = language
    }
  }

  // Main function to find all types of rhymes
  findAllRhymes(inputWord, language = "english") {
    console.log(`\n=== ${this.getUIText("title")} ===`)
    console.log(`${this.getUIText("inputLabel")} "${inputWord}" (${language})`)

    // Find rhymes in the same language
    const sameLanguageRhymes = this.findRhymes(inputWord, language)

    // Find cross-language rhymes
    const crossLanguageRhymes = this.findCrossLanguageRhymes(inputWord, language)

    // Display results
    this.displayResults(inputWord, language, sameLanguageRhymes, crossLanguageRhymes)

    return {
      sameLanguage: sameLanguageRhymes,
      crossLanguage: crossLanguageRhymes,
      inputAnalysis: sameLanguageRhymes.inputAnalysis,
    }
  }

  // Display results in a formatted way
  displayResults(inputWord, language, sameLanguageRhymes, crossLanguageRhymes) {
    const { inputAnalysis } = sameLanguageRhymes

    console.log(`\n--- Input Analysis ---`)
    console.log(`Word: ${inputAnalysis.word}`)
    console.log(`Phonetic: ${inputAnalysis.phonetic}`)
    console.log(`Rhyming Suffix: ${inputAnalysis.suffix}`)
    console.log(`Syllables: ${inputAnalysis.syllables}`)

    // Display same-language rhymes
    console.log(`\n--- ${this.getUIText("perfectRhymes")} (${language}) ---`)
    if (sameLanguageRhymes.perfect.length === 0) {
      console.log(this.getUIText("noRhymes"))
    } else {
      sameLanguageRhymes.perfect.slice(0, 10).forEach((rhyme, index) => {
        const translation = rhyme.translation ? ` (${Object.values(rhyme.translation).join(", ")})` : ""
        console.log(
          `${index + 1}. ${rhyme.word}${translation} - ${rhyme.syllables} ${this.getUIText("syllables")} - ${(rhyme.similarity * 100).toFixed(1)}% ${this.getUIText("confidence")}`,
        )
      })
    }

    console.log(`\n--- ${this.getUIText("slantRhymes")} (${language}) ---`)
    if (sameLanguageRhymes.slant.length === 0) {
      console.log(this.getUIText("noRhymes"))
    } else {
      sameLanguageRhymes.slant.slice(0, 10).forEach((rhyme, index) => {
        const translation = rhyme.translation ? ` (${Object.values(rhyme.translation).join(", ")})` : ""
        console.log(
          `${index + 1}. ${rhyme.word}${translation} - ${rhyme.syllables} ${this.getUIText("syllables")} - ${(rhyme.similarity * 100).toFixed(1)}% ${this.getUIText("confidence")}`,
        )
      })
    }

    // Display cross-language rhymes
    console.log(`\n--- ${this.getUIText("crossLanguageRhymes")} ---`)
    if (Object.keys(crossLanguageRhymes).length === 0) {
      console.log(this.getUIText("noRhymes"))
    } else {
      for (const [targetLang, rhymes] of Object.entries(crossLanguageRhymes)) {
        console.log(`\n${targetLang.toUpperCase()}:`)

        if (rhymes.perfect.length > 0) {
          console.log(`  ${this.getUIText("perfectRhymes")}:`)
          rhymes.perfect.slice(0, 5).forEach((rhyme, index) => {
            const translation = rhyme.translation ? ` (${Object.values(rhyme.translation).join(", ")})` : ""
            console.log(`    ${index + 1}. ${rhyme.word}${translation} - ${(rhyme.similarity * 100).toFixed(1)}%`)
          })
        }

        if (rhymes.slant.length > 0) {
          console.log(`  ${this.getUIText("slantRhymes")}:`)
          rhymes.slant.slice(0, 5).forEach((rhyme, index) => {
            const translation = rhyme.translation ? ` (${Object.values(rhyme.translation).join(", ")})` : ""
            console.log(`    ${index + 1}. ${rhyme.word}${translation} - ${(rhyme.similarity * 100).toFixed(1)}%`)
          })
        }
      }
    }
  }

  // Batch process multiple words
  batchFindRhymes(words, language = "english") {
    const results = {}

    console.log(`\n=== Batch Processing ${words.length} words ===`)

    words.forEach((word, index) => {
      console.log(`\nProcessing ${index + 1}/${words.length}: ${word}`)
      results[word] = this.findAllRhymes(word, language)
    })

    return results
  }

  // Export results to JSON
  exportResults(results, filename = "rhyme_results.json") {
    const jsonData = JSON.stringify(results, null, 2)

    if (typeof window !== "undefined") {
      // Browser environment
      const blob = new Blob([jsonData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    } else {
      // Node.js environment
      const fs = require("fs")
      fs.writeFileSync(filename, jsonData)
      console.log(`Results exported to ${filename}`)
    }
  }
}

// Example usage and testing
function runExamples() {
  const rhymeEngine = new MultilingualRhymeEngine()

  console.log("=== Multilingual Rhyme Algorithm Demo ===\n")

  // Test in English
  console.log("Testing in English:")
  rhymeEngine.setLanguage("english")
  rhymeEngine.findAllRhymes("love", "english")

  // Test in Spanish
  console.log("\n" + "=".repeat(50))
  console.log("Testing in Spanish:")
  rhymeEngine.setLanguage("spanish")
  rhymeEngine.findAllRhymes("amor", "spanish")

  // Test in French
  console.log("\n" + "=".repeat(50))
  console.log("Testing in French:")
  rhymeEngine.setLanguage("french")
  rhymeEngine.findAllRhymes("amour", "french")

  // Batch processing example
  console.log("\n" + "=".repeat(50))
  console.log("Batch Processing Example:")
  rhymeEngine.setLanguage("english")
  const batchWords = ["cat", "time", "heart"]
  const batchResults = rhymeEngine.batchFindRhymes(batchWords, "english")

  // Export results (uncomment to use)
  // rhymeEngine.exportResults(batchResults, 'batch_rhyme_results.json');

  return rhymeEngine
}

// Run the examples
const engine = runExamples()

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MultilingualRhymeEngine }
}
