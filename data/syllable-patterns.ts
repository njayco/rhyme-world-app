// Comprehensive last syllable patterns for each language with their phonetic representations

export const englishSyllablePatterns = {
  // Single vowel syllables
  a: { phonetic: "æ", examples: ["spa", "bra", "ma", "pa"] },
  ay: { phonetic: "eɪ", examples: ["day", "way", "say", "play", "stay", "may", "bay", "ray", "pay", "lay"] },
  ee: { phonetic: "iː", examples: ["see", "bee", "free", "tree", "knee", "flee", "spree", "agree", "degree"] },
  i: { phonetic: "aɪ", examples: ["my", "by", "fly", "try", "cry", "dry", "sky", "high", "buy", "guy"] },
  o: { phonetic: "oʊ", examples: ["go", "no", "so", "pro", "flow", "grow", "show", "know", "throw", "glow"] },
  oo: { phonetic: "uː", examples: ["do", "to", "who", "blue", "true", "new", "few", "grew", "threw", "knew"] },

  // Consonant + vowel syllables
  ba: { phonetic: "bæ", examples: ["crab", "grab", "stab", "tab", "cab", "lab", "dab", "jab"] },
  be: { phonetic: "biː", examples: ["maybe", "baby", "crazy", "lazy", "hazy", "daisy"] },
  ca: { phonetic: "kæ", examples: ["back", "pack", "track", "crack", "black", "stack", "attack", "snack"] },
  da: { phonetic: "dæ", examples: ["bad", "mad", "sad", "had", "glad", "dad", "pad", "add"] },
  fa: { phonetic: "fæ", examples: ["half", "staff", "laugh", "graph", "craft", "draft"] },
  ga: { phonetic: "gæ", examples: ["bag", "tag", "flag", "drag", "brag", "rag", "sag", "wag"] },
  ha: { phonetic: "hæ", examples: ["hat", "cat", "bat", "rat", "mat", "fat", "sat", "flat"] },
  ja: { phonetic: "dʒæ", examples: ["jazz", "jam", "jab", "jack"] },
  ka: { phonetic: "kæ", examples: ["back", "pack", "track", "crack", "black", "stack"] },
  la: { phonetic: "læ", examples: ["lab", "lap", "last", "land", "lamp", "lad"] },
  ma: { phonetic: "mæ", examples: ["map", "man", "mad", "mat", "mass", "mask"] },
  na: { phonetic: "næ", examples: ["nap", "name", "nail", "navy", "nasty"] },
  pa: { phonetic: "pæ", examples: ["pat", "pan", "pad", "pack", "pass", "path"] },
  ra: { phonetic: "ræ", examples: ["rat", "ran", "rap", "rag", "ram", "rank"] },
  sa: { phonetic: "sæ", examples: ["sat", "sad", "sack", "sand", "sang", "sank"] },
  ta: { phonetic: "tæ", examples: ["tap", "tag", "tan", "task", "tax", "tack"] },
  va: { phonetic: "væ", examples: ["van", "vat", "vast", "valve"] },
  wa: { phonetic: "wæ", examples: ["wag", "wax", "was", "want", "wash"] },
  za: { phonetic: "zæ", examples: ["zap", "zag", "zip", "zone"] },

  // Complex ending syllables
  tion: { phonetic: "ʃən", examples: ["nation", "station", "creation", "education", "information", "celebration"] },
  sion: { phonetic: "ʃən", examples: ["mission", "vision", "decision", "precision", "division", "collision"] },
  ment: { phonetic: "mənt", examples: ["moment", "comment", "payment", "treatment", "movement", "agreement"] },
  ness: { phonetic: "nəs", examples: ["happiness", "sadness", "kindness", "darkness", "weakness", "fitness"] },
  able: { phonetic: "əbəl", examples: ["table", "stable", "capable", "notable", "portable", "suitable"] },
  ible: { phonetic: "ɪbəl", examples: ["terrible", "horrible", "incredible", "visible", "possible", "flexible"] },
  ful: { phonetic: "fəl", examples: ["beautiful", "wonderful", "powerful", "colorful", "helpful", "useful"] },
  less: { phonetic: "ləs", examples: ["hopeless", "helpless", "endless", "fearless", "careless", "harmless"] },
  ous: { phonetic: "əs", examples: ["famous", "serious", "curious", "nervous", "generous", "dangerous"] },
  ious: { phonetic: "iəs", examples: ["serious", "curious", "various", "previous", "obvious", "mysterious"] },
  eous: { phonetic: "iəs", examples: ["gorgeous", "courageous", "outrageous", "advantageous"] },
  ual: { phonetic: "uəl", examples: ["actual", "mutual", "annual", "manual", "visual", "sexual"] },
  ial: { phonetic: "iəl", examples: ["special", "social", "commercial", "financial", "material", "official"] },
  ive: { phonetic: "ɪv", examples: ["active", "native", "creative", "positive", "negative", "effective"] },
  age: { phonetic: "ɪdʒ", examples: ["message", "package", "damage", "manage", "storage", "courage"] },
  ure: { phonetic: "ər", examples: ["nature", "future", "picture", "culture", "feature", "measure"] },
  ture: { phonetic: "tʃər", examples: ["nature", "future", "picture", "culture", "feature", "adventure"] },
  sure: { phonetic: "ʃər", examples: ["measure", "pleasure", "treasure", "pressure", "leisure"] },

  // -ing endings
  ing: { phonetic: "ɪŋ", examples: ["running", "singing", "dancing", "walking", "talking", "working"] },
  ling: { phonetic: "lɪŋ", examples: ["feeling", "calling", "falling", "telling", "selling", "spelling"] },
  ning: { phonetic: "nɪŋ", examples: ["running", "winning", "beginning", "planning", "spinning"] },
  ring: { phonetic: "rɪŋ", examples: ["caring", "sharing", "wearing", "bearing", "tearing", "staring"] },
  sing: { phonetic: "sɪŋ", examples: ["missing", "kissing", "passing", "crossing", "pressing"] },
  ting: { phonetic: "tɪŋ", examples: ["sitting", "getting", "putting", "cutting", "hitting", "setting"] },

  // -ed endings
  ed: { phonetic: "d", examples: ["played", "stayed", "moved", "loved", "lived", "saved"] },
  ted: { phonetic: "təd", examples: ["wanted", "needed", "started", "created", "related", "located"] },
  ded: { phonetic: "dəd", examples: ["added", "ended", "handed", "landed", "banded", "sanded"] },
  ped: { phonetic: "pt", examples: ["stopped", "dropped", "stepped", "trapped", "wrapped", "clapped"] },
  ked: { phonetic: "kt", examples: ["walked", "talked", "worked", "looked", "cooked", "booked"] },

  // -er endings
  er: { phonetic: "ər", examples: ["water", "better", "never", "other", "mother", "father"] },
  ber: { phonetic: "bər", examples: ["number", "member", "remember", "September", "October", "November"] },
  der: { phonetic: "dər", examples: ["under", "wonder", "order", "border", "folder", "holder"] },
  ger: { phonetic: "gər", examples: ["finger", "anger", "danger", "hunger", "longer", "stronger"] },
  ker: { phonetic: "kər", examples: ["maker", "baker", "taker", "speaker", "worker", "marker"] },
  ler: { phonetic: "lər", examples: ["color", "dollar", "collar", "scholar", "popular", "regular"] },
  mer: { phonetic: "mər", examples: ["summer", "hammer", "grammar", "former", "warmer", "farmer"] },
  ner: { phonetic: "nər", examples: ["corner", "dinner", "winner", "manner", "owner", "partner"] },
  per: { phonetic: "pər", examples: ["paper", "super", "proper", "upper", "pepper", "copper"] },
  ter: { phonetic: "tər", examples: ["water", "better", "letter", "matter", "center", "winter"] },
  ver: { phonetic: "vər", examples: ["never", "ever", "over", "cover", "river", "silver"] },

  // -ly endings
  ly: { phonetic: "li", examples: ["really", "only", "early", "family", "finally", "usually"] },
  aly: { phonetic: "əli", examples: ["really", "totally", "actually", "finally", "usually", "especially"] },
  ely: { phonetic: "li", examples: ["completely", "immediately", "definitely", "absolutely", "extremely"] },
  ily: { phonetic: "ɪli", examples: ["family", "easily", "happily", "quickly", "simply", "really"] },
  oly: { phonetic: "əli", examples: ["holy", "slowly", "only", "lonely", "lovely"] },
  uly: { phonetic: "uli", examples: ["truly", "duly", "unruly"] },

  // Vowel + consonant endings
  ack: { phonetic: "æk", examples: ["back", "pack", "track", "crack", "black", "stack", "attack", "snack"] },
  eck: { phonetic: "ɛk", examples: ["check", "neck", "deck", "wreck", "speck", "trek"] },
  ick: { phonetic: "ɪk", examples: ["quick", "thick", "stick", "trick", "brick", "click", "pick", "sick"] },
  ock: { phonetic: "ɒk", examples: ["rock", "clock", "block", "shock", "stock", "knock", "lock", "dock"] },
  uck: { phonetic: "ʌk", examples: ["luck", "truck", "stuck", "duck", "buck", "muck", "suck", "chuck"] },

  and: { phonetic: "ænd", examples: ["hand", "land", "sand", "band", "stand", "grand", "brand", "command"] },
  end: { phonetic: "ɛnd", examples: ["end", "send", "bend", "tend", "mend", "spend", "blend", "defend"] },
  ind: { phonetic: "aɪnd", examples: ["mind", "find", "kind", "blind", "wind", "behind", "remind", "design"] },
  ond: { phonetic: "ɒnd", examples: ["pond", "bond", "fond", "beyond", "respond", "correspond"] },
  und: { phonetic: "ʌnd", examples: ["found", "sound", "round", "ground", "bound", "wound", "pound", "mound"] },

  ant: { phonetic: "ænt", examples: ["want", "plant", "grant", "can't", "chant", "slant"] },
  ent: { phonetic: "ɛnt", examples: ["went", "sent", "bent", "tent", "rent", "cent", "dent", "vent"] },
  int: { phonetic: "ɪnt", examples: ["hint", "mint", "print", "point", "joint", "paint", "faint", "saint"] },
  ont: { phonetic: "ɒnt", examples: ["front", "want", "font", "don't", "won't", "month"] },
  unt: { phonetic: "ʌnt", examples: ["hunt", "punt", "blunt", "grunt", "stunt", "front"] },

  art: { phonetic: "ɑːrt", examples: ["heart", "start", "part", "art", "smart", "chart", "dart", "cart"] },
  ert: { phonetic: "ɜːrt", examples: ["hurt", "shirt", "dirt", "skirt", "flirt", "alert", "expert", "desert"] },
  irt: { phonetic: "ɜːrt", examples: ["shirt", "dirt", "skirt", "flirt", "birth", "worth", "earth"] },
  ort: { phonetic: "ɔːrt", examples: ["short", "sport", "port", "sort", "fort", "court", "report", "support"] },
  urt: { phonetic: "ɜːrt", examples: ["hurt", "shirt", "dirt", "skirt", "flirt", "curt", "spurt"] },

  // Double consonant endings
  all: { phonetic: "ɔːl", examples: ["call", "fall", "wall", "ball", "tall", "small", "hall", "mall"] },
  ell: { phonetic: "ɛl", examples: ["tell", "well", "bell", "sell", "spell", "shell", "smell", "dwell"] },
  ill: { phonetic: "ɪl", examples: ["will", "still", "hill", "fill", "kill", "mill", "bill", "skill"] },
  oll: { phonetic: "oʊl", examples: ["roll", "poll", "toll", "doll", "control", "patrol", "enroll"] },
  ull: { phonetic: "ʊl", examples: ["full", "pull", "bull", "null", "skull", "hull"] },

  ass: { phonetic: "æs", examples: ["class", "pass", "glass", "grass", "mass", "bass", "last", "fast"] },
  ess: { phonetic: "ɛs", examples: ["less", "mess", "dress", "stress", "press", "guess", "bless", "chess"] },
  iss: { phonetic: "ɪs", examples: ["miss", "kiss", "this", "his", "dismiss", "bliss", "abyss"] },
  oss: { phonetic: "ɒs", examples: ["loss", "boss", "cross", "toss", "moss", "gloss", "across"] },
  uss: { phonetic: "ʌs", examples: ["bus", "plus", "thus", "fuss", "discuss", "focus"] },
}

export const spanishSyllablePatterns = {
  // Single vowel syllables
  a: { phonetic: "a", examples: ["casa", "masa", "pasa", "tasa", "rasa", "escasa"] },
  e: { phonetic: "e", examples: ["come", "nombre", "verde", "siempre", "gente", "mente"] },
  i: { phonetic: "i", examples: ["aquí", "así", "sí", "mi", "ti", "vi"] },
  o: { phonetic: "o", examples: ["como", "poco", "loco", "todo", "modo", "solo"] },
  u: { phonetic: "u", examples: ["tú", "su", "azul", "sur", "luz", "cruz"] },

  // Consonant + vowel syllables
  ba: { phonetic: "ba", examples: ["samba", "rumba", "bomba", "tumba", "comba"] },
  ca: { phonetic: "ka", examples: ["casa", "masa", "pasa", "tasa", "rasa", "barca"] },
  da: { phonetic: "da", examples: ["nada", "cada", "toda", "vida", "comida", "salida"] },
  fa: { phonetic: "fa", examples: ["sofa", "jirafa", "garrafa", "filosofa"] },
  ga: { phonetic: "ga", examples: ["llega", "paga", "juega", "entrega", "navega"] },
  ja: { phonetic: "xa", examples: ["caja", "baja", "paja", "trabaja", "viaja"] },
  la: { phonetic: "la", examples: ["sala", "bala", "mala", "escala", "gala"] },
  ma: { phonetic: "ma", examples: ["cama", "rama", "llama", "drama", "tema"] },
  na: { phonetic: "na", examples: ["cena", "pena", "arena", "antena", "cadena"] },
  pa: { phonetic: "pa", examples: ["papa", "mapa", "tapa", "copa", "sopa"] },
  ra: { phonetic: "ra", examples: ["para", "cara", "clara", "vara", "hora"] },
  sa: { phonetic: "sa", examples: ["mesa", "pesa", "besa", "empresa", "promesa"] },
  ta: { phonetic: "ta", examples: ["rata", "lata", "mata", "plata", "gata"] },
  va: { phonetic: "ba", examples: ["uva", "nueva", "llueva", "mueva", "prueba"] },
  za: { phonetic: "sa", examples: ["plaza", "raza", "taza", "caza", "abraza"] },

  // Common Spanish endings
  ción: { phonetic: "sjon", examples: ["nación", "canción", "pasión", "razón", "corazón", "ilusión"] },
  sión: { phonetic: "sjon", examples: ["misión", "visión", "decisión", "precisión", "división"] },
  ado: { phonetic: "ado", examples: ["cansado", "enamorado", "preocupado", "ocupado", "callado"] },
  ido: { phonetic: "ido", examples: ["perdido", "querido", "conocido", "divertido", "aburrido"] },
  ando: { phonetic: "ando", examples: ["cantando", "bailando", "caminando", "hablando", "estudiando"] },
  iendo: { phonetic: "jendo", examples: ["corriendo", "viviendo", "escribiendo", "durmiendo", "sintiendo"] },
  mente: { phonetic: "mente", examples: ["realmente", "solamente", "fácilmente", "rápidamente", "lentamente"] },

  // Adjective endings
  oso: { phonetic: "oso", examples: ["hermoso", "famoso", "gracioso", "generoso", "cariñoso"] },
  osa: { phonetic: "osa", examples: ["hermosa", "famosa", "graciosa", "generosa", "cariñosa"] },
  ito: { phonetic: "ito", examples: ["bonito", "pequeñito", "ratito", "poquito", "solito"] },
  ita: { phonetic: "ita", examples: ["bonita", "pequeñita", "ratita", "poquita", "solita"] },

  // Verb endings
  ar: { phonetic: "ar", examples: ["amar", "cantar", "bailar", "caminar", "hablar"] },
  er: { phonetic: "er", examples: ["comer", "beber", "correr", "leer", "ver"] },
  ir: { phonetic: "ir", examples: ["vivir", "escribir", "dormir", "salir", "venir"] },

  // Noun endings
  dad: { phonetic: "dad", examples: ["verdad", "ciudad", "libertad", "amistad", "felicidad"] },
  tad: { phonetic: "tad", examples: ["mitad", "voluntad", "facultad", "dificultad"] },
  ura: { phonetic: "ura", examples: ["altura", "dulzura", "ternura", "aventura", "cultura"] },
  eza: { phonetic: "esa", examples: ["belleza", "tristeza", "pureza", "nobleza", "riqueza"] },

  // Diphthong endings
  ia: { phonetic: "ja", examples: ["día", "alegría", "melodía", "poesía", "fantasía"] },
  io: { phonetic: "jo", examples: ["río", "frío", "mío", "tío", "brío"] },
  ua: { phonetic: "wa", examples: ["agua", "lengua", "antigua", "yegua", "fragua"] },
  ue: { phonetic: "we", examples: ["que", "fue", "sue", "hue", "cue"] },
  ai: { phonetic: "aj", examples: ["hay", "voy", "soy", "doy", "estoy"] },
  ei: { phonetic: "ej", examples: ["rey", "ley", "grey", "buey"] },
  oi: { phonetic: "oj", examples: ["hoy", "voy", "soy", "doy", "estoy"] },
  au: { phonetic: "aw", examples: ["auto", "causa", "pausa", "aula", "fauna"] },
  eu: { phonetic: "ew", examples: ["Europa", "neutro", "feudal", "eucalipto"] },

  // Consonant clusters
  ón: { phonetic: "on", examples: ["corazón", "canción", "pasión", "razón", "ilusión"] },
  án: { phonetic: "an", examples: ["están", "darán", "serán", "harán", "vendrán"] },
  ín: { phonetic: "in", examples: ["jardín", "violín", "calcetín", "patín", "festín"] },
  ún: { phonetic: "un", examples: ["algún", "ningún", "común", "según"] },

  // Final consonants
  al: { phonetic: "al", examples: ["igual", "real", "ideal", "final", "total"] },
  el: { phonetic: "el", examples: ["papel", "nivel", "hotel", "pastel", "cruel"] },
  il: { phonetic: "il", examples: ["fácil", "difícil", "útil", "inútil", "sutil"] },
  ol: { phonetic: "ol", examples: ["español", "caracol", "alcohol", "control", "patrol"] },
  ul: { phonetic: "ul", examples: ["azul", "baúl", "paúl", "raúl", "saúl"] },

  ar: { phonetic: "ar", examples: ["lugar", "hogar", "mar", "altar", "collar"] },
  er: { phonetic: "er", examples: ["mujer", "placer", "poder", "saber", "tener"] },
  ir: { phonetic: "ir", examples: ["vivir", "partir", "sentir", "dormir", "morir"] },
  or: { phonetic: "or", examples: ["amor", "dolor", "color", "calor", "honor"] },
  ur: { phonetic: "ur", examples: ["sur", "azur", "augur", "sulfur"] },

  as: { phonetic: "as", examples: ["casas", "masas", "pasas", "tasas", "rasas"] },
  es: { phonetic: "es", examples: ["comes", "nombres", "verdes", "siempres", "gentes"] },
  is: { phonetic: "is", examples: ["crisis", "tesis", "análisis", "síntesis", "génesis"] },
  os: { phonetic: "os", examples: ["ojos", "rojos", "pocos", "locos", "todos"] },
  us: { phonetic: "us", examples: ["virus", "campus", "corpus", "status", "bonus"] },
}

export const frenchSyllablePatterns = {
  // Single vowel syllables
  a: { phonetic: "a", examples: ["là", "ça", "ma", "ta", "sa", "va"] },
  e: { phonetic: "ə", examples: ["le", "me", "te", "se", "de", "ne"] },
  é: { phonetic: "e", examples: ["café", "été", "né", "blé", "clé", "thé"] },
  è: { phonetic: "ɛ", examples: ["très", "près", "après", "succès", "progrès"] },
  i: { phonetic: "i", examples: ["ici", "si", "qui", "mi", "ni", "pi"] },
  o: { phonetic: "o", examples: ["trop", "gros", "dos", "pot", "mot", "sot"] },
  u: { phonetic: "y", examples: ["tu", "su", "nu", "bu", "cu", "du"] },

  // Consonant + vowel syllables
  ba: { phonetic: "ba", examples: ["baba", "samba", "rumba", "bomba", "tomba"] },
  ca: { phonetic: "ka", examples: ["café", "cadeau", "caché", "caresse", "cascade"] },
  da: { phonetic: "da", examples: ["dada", "canada", "armada", "nevada", "pagoda"] },
  fa: { phonetic: "fa", examples: ["sofa", "alpha", "extra", "ultra", "opera"] },
  ga: { phonetic: "ga", examples: ["gala", "saga", "yoga", "omega", "mega"] },
  ja: { phonetic: "ʒa", examples: ["déjà", "raja", "ninja", "pyjama"] },
  la: { phonetic: "la", examples: ["là", "gala", "koala", "villa", "bella"] },
  ma: { phonetic: "ma", examples: ["mama", "drama", "trauma", "dogma", "asthma"] },
  na: { phonetic: "na", examples: ["banana", "cabana", "savana", "iguana", "piranha"] },
  pa: { phonetic: "pa", examples: ["papa", "tapa", "copa", "europa", "stampa"] },
  ra: { phonetic: "ra", examples: ["bra", "extra", "ultra", "zebra", "cobra"] },
  sa: { phonetic: "sa", examples: ["ça", "salsa", "pizza", "plaza", "visa"] },
  ta: { phonetic: "ta", examples: ["pasta", "fiesta", "siesta", "vista", "lista"] },
  va: { phonetic: "va", examples: ["va", "java", "lava", "guava", "diva"] },
  za: { phonetic: "za", examples: ["pizza", "plaza", "gaza", "ibiza"] },

  // Common French endings
  tion: { phonetic: "sjɔ̃", examples: ["nation", "passion", "émotion", "création", "attention"] },
  sion: { phonetic: "sjɔ̃", examples: ["mission", "vision", "décision", "précision", "division"] },
  ment: { phonetic: "mɑ̃", examples: ["moment", "vraiment", "seulement", "comment", "souvent"] },
  ance: { phonetic: "ɑ̃s", examples: ["chance", "danse", "romance", "france", "enfance"] },
  ence: { phonetic: "ɑ̃s", examples: ["silence", "patience", "présence", "absence", "science"] },

  // Adjective endings
  eux: { phonetic: "ø", examples: ["heureux", "amoureux", "joyeux", "merveilleux", "généreux"] },
  euse: { phonetic: "øz", examples: ["heureuse", "amoureuse", "joyeuse", "merveilleuse", "généreuse"] },
  able: { phonetic: "abl", examples: ["table", "stable", "capable", "notable", "portable"] },
  ible: { phonetic: "ibl", examples: ["terrible", "horrible", "incredible", "visible", "possible"] },

  // Verb endings
  er: { phonetic: "e", examples: ["aimer", "chanter", "danser", "rêver", "voler"] },
  ir: { phonetic: "ir", examples: ["partir", "finir", "choisir", "dormir", "sortir"] },
  re: { phonetic: "r", examples: ["être", "faire", "dire", "lire", "écrire"] },
  oir: { phonetic: "war", examples: ["voir", "savoir", "pouvoir", "vouloir", "devoir"] },

  // Past participle endings
  é: { phonetic: "e", examples: ["aimé", "chanté", "dansé", "rêvé", "volé"] },
  i: { phonetic: "i", examples: ["fini", "choisi", "parti", "sorti", "dormi"] },
  u: { phonetic: "y", examples: ["vu", "su", "pu", "voulu", "dû"] },

  // Noun endings
  age: { phonetic: "aʒ", examples: ["voyage", "courage", "message", "passage", "visage"] },
  ure: { phonetic: "yr", examples: ["nature", "culture", "aventure", "blessure", "mesure"] },
  eur: { phonetic: "ør", examples: ["cœur", "bonheur", "malheur", "douceur", "chaleur"] },
  euse: { phonetic: "øz", examples: ["danseuse", "chanteuse", "vendeuse", "coiffeuse"] },
  teur: { phonetic: "tør", examples: ["acteur", "docteur", "directeur", "professeur"] },
  trice: { phonetic: "tris", examples: ["actrice", "directrice", "institutrice"] },

  // Adverb endings
  ment: { phonetic: "mɑ̃", examples: ["vraiment", "seulement", "lentement", "doucement", "simplement"] },

  // Nasal vowel endings
  an: { phonetic: "ɑ̃", examples: ["grand", "blanc", "chant", "tant", "enfant"] },
  en: { phonetic: "ɑ̃", examples: ["vent", "dent", "cent", "sent", "ment"] },
  in: { phonetic: "ɛ̃", examples: ["fin", "vin", "pain", "main", "train"] },
  on: { phonetic: "ɔ̃", examples: ["bon", "son", "ton", "don", "mon"] },
  un: { phonetic: "œ̃", examples: ["un", "brun", "parfum", "commun"] },

  // Diphthong endings
  ai: { phonetic: "ɛ", examples: ["mai", "vrai", "jamais", "français", "anglais"] },
  au: { phonetic: "o", examples: ["beau", "nouveau", "cadeau", "oiseau", "bateau"] },
  eau: { phonetic: "o", examples: ["beau", "nouveau", "cadeau", "oiseau", "bateau"] },
  ei: { phonetic: "ɛ", examples: ["neige", "beige", "treize", "seize"] },
  eu: { phonetic: "ø", examples: ["peu", "jeu", "lieu", "dieu", "bleu"] },
  œu: { phonetic: "ø", examples: ["cœur", "sœur", "bœuf", "œuf", "nœud"] },
  oi: { phonetic: "wa", examples: ["moi", "toi", "roi", "loi", "foi"] },
  ou: { phonetic: "u", examples: ["vous", "nous", "tout", "bout", "goût"] },
  ui: { phonetic: "ɥi", examples: ["lui", "nuit", "fruit", "bruit", "suit"] },

  // Final consonant clusters
  ard: { phonetic: "ar", examples: ["regard", "retard", "hasard", "canard", "renard"] },
  ert: { phonetic: "ɛr", examples: ["vert", "ouvert", "expert", "concert", "désert"] },
  ort: { phonetic: "ɔr", examples: ["port", "sort", "fort", "mort", "sport"] },

  // Feminine endings
  elle: { phonetic: "ɛl", examples: ["belle", "nouvelle", "éternelle", "naturelle", "personnelle"] },
  ette: { phonetic: "ɛt", examples: ["petite", "chouette", "cigarette", "baguette", "omelette"] },
  esse: { phonetic: "ɛs", examples: ["princesse", "déesse", "maîtresse", "tendresse", "richesse"] },

  // Plural endings
  aux: { phonetic: "o", examples: ["beaux", "nouveaux", "cadeaux", "oiseaux", "bateaux"] },
  eux: { phonetic: "ø", examples: ["yeux", "cheveux", "jeux", "lieux", "dieux"] },

  // Technical/borrowed endings
  ique: { phonetic: "ik", examples: ["musique", "magique", "unique", "classique", "romantique"] },
  isme: { phonetic: "ism", examples: ["tourisme", "réalisme", "optimisme", "pessimisme"] },
  iste: { phonetic: "ist", examples: ["artiste", "touriste", "dentiste", "pianiste"] },
}

// Helper function to get all syllable patterns for a language
export function getSyllablePatterns(language: "english" | "spanish" | "french") {
  switch (language) {
    case "english":
      return englishSyllablePatterns
    case "spanish":
      return spanishSyllablePatterns
    case "french":
      return frenchSyllablePatterns
    default:
      return englishSyllablePatterns
  }
}

// Helper function to get phonetic representation of a syllable pattern
export function getPhoneticForPattern(pattern: string, language: "english" | "spanish" | "french"): string {
  const patterns = getSyllablePatterns(language)
  return patterns[pattern as keyof typeof patterns]?.phonetic || pattern
}
