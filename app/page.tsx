"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Search, Copy, Trash2, Globe, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { enhancedTranslations } from "@/data/enhanced-translations"
import { findRhymesForWord, getEnhancedTranslation } from "@/utils/rhyme-finder"
import { extractLastSyllable, getSyllablePhonetic, countSyllables } from "@/utils/syllable-rhyme-engine"
import { AddRhyme } from "@/components/add-rhyme"
import { VotableRhyme } from "@/components/votable-rhyme"
import { PronunciationDemo } from "@/components/pronunciation-demo"
import { PronunciationButton } from "@/components/pronunciation-button"

type Language = "english" | "spanish" | "french"

interface RhymeResult {
  word: string
  translation?: string
  confidence?: number
  type?: string
  quality?: string
  syllables?: number
  lastSyllable?: string
  phoneticPattern?: string
  votes?: number
  isUserContributed?: boolean
}

interface FavoriteRhyme {
  word: string
  language: Language
  translation?: string
  timestamp: number
}

export default function RhymeWorld() {
  const [nativeLanguage, setNativeLanguage] = useState<Language>("english")
  const [rhymingLanguages, setRhymingLanguages] = useState<Language[]>(["english"])
  
  // Ensure at least one rhyming language is selected
  useEffect(() => {
    if (rhymingLanguages.length === 0) {
      setRhymingLanguages([nativeLanguage])
    }
  }, [rhymingLanguages.length, nativeLanguage])
  const [searchWord, setSearchWord] = useState("")
  const [rhymeResults, setRhymeResults] = useState<{ [key in Language]?: RhymeResult[] }>({})
  const [lyrics, setLyrics] = useState("")
  const [favorites, setFavorites] = useState<FavoriteRhyme[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showSyllableInfo, setShowSyllableInfo] = useState(false)
  const [userContributedRhymes, setUserContributedRhymes] = useState<{ [key: string]: RhymeResult[] }>({})
  const [rhymeVotes, setRhymeVotes] = useState<{ [key: string]: number }>({})
  const [useAIRhymes, setUseAIRhymes] = useState(false)
  const [aiRhymes, setAIRhymes] = useState<{ [key: string]: { perfect: any[]; near: any[] } } | null>(null)
  const [aiError, setAIError] = useState<string | null>(null)

  // Load favorites and votes from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("rhyme-world-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    const savedVotes = localStorage.getItem("rhyme-world-votes")
    if (savedVotes) {
      setRhymeVotes(JSON.parse(savedVotes))
    }
  }, [])

  // Save favorites and votes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("rhyme-world-favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("rhyme-world-votes", JSON.stringify(rhymeVotes))
  }, [rhymeVotes])

  const translations = enhancedTranslations

  const findRhymes = (word: string, language: Language): RhymeResult[] => {
    if (!word.trim()) return []

    const rhymes = findRhymesForWord(word, language, nativeLanguage, translations)

    return rhymes.map((rhyme) => ({
      word: rhyme.word,
      translation: rhyme.translation || getEnhancedTranslation(rhyme.word, language, nativeLanguage, translations),
      confidence: rhyme.confidence,
      type: rhyme.type,
      quality: rhyme.quality,
      syllables: rhyme.syllables,
      lastSyllable: rhyme.lastSyllable,
      phoneticPattern: rhyme.phoneticPattern,
      votes: rhymeVotes[`${word}-${language}-${rhyme.word}`] || 0,
      isUserContributed: false,
    }))
  }

  const handleSearch = async () => {
    if (!searchWord.trim()) {
      setRhymeResults({})
      setAIRhymes(null)
      setAIError(null)
      return
    }

    setIsSearching(true)
    setAIError(null)
    setAIRhymes(null)

    if (useAIRhymes) {
      try {
        const res = await fetch("/api/generate-rhymes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word: searchWord, languages: rhymingLanguages }),
        })
        const data = await res.json()
        if (res.ok) {
          setAIRhymes(data)
        } else {
          setAIError(data.error || "AI error")
        }
      } catch (e) {
        setAIError("Failed to fetch AI rhymes")
      }
      setIsSearching(false)
      return
    }

    const results: { [key in Language]?: RhymeResult[] } = {}

    rhymingLanguages.forEach((lang) => {
      const rhymes = findRhymes(searchWord, lang)

      // Add user contributed rhymes for this search word and language
      const key = `${searchWord}-${lang}`
      const userRhymes = userContributedRhymes[key] || []

      // Combine and sort by votes
      const allRhymes = [...rhymes, ...userRhymes].sort((a, b) => (b.votes || 0) - (a.votes || 0))

      if (allRhymes.length > 0) {
        results[lang] = allRhymes
      }
    })

    setRhymeResults(results)
    setIsSearching(false)
  }

  const addToFavorites = (word: string, language: Language, translation?: string) => {
    const newFavorite: FavoriteRhyme = {
      word,
      language,
      translation,
      timestamp: Date.now(),
    }

    // Check if already in favorites
    const exists = favorites.some((fav) => fav.word === word && fav.language === language)
    if (!exists) {
      setFavorites([...favorites, newFavorite])
    }
  }

  const removeFromFavorites = (word: string, language: Language) => {
    setFavorites(favorites.filter((fav) => !(fav.word === word && fav.language === language)))
  }

  const handleRhymeAdded = (word: string, language: Language, translation?: string) => {
    const newRhyme: RhymeResult = {
      word,
      translation,
      confidence: 1.0,
      type: "community",
      quality: "Community",
      syllables: countSyllables(word, language),
      lastSyllable: extractLastSyllable(word, language),
      phoneticPattern: getSyllablePhonetic(extractLastSyllable(word, language), language),
      votes: 0,
      isUserContributed: true,
    }

    const key = `${searchWord}-${language}`
    setUserContributedRhymes((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newRhyme],
    }))

    // Refresh search results to include the new rhyme
    handleSearch()
  }

  const handleVote = (word: string, language: Language, voteType: "up" | "down") => {
    const voteKey = `${searchWord}-${language}-${word}`
    const currentVotes = rhymeVotes[voteKey] || 0
    const newVotes = voteType === "up" ? currentVotes + 1 : currentVotes - 1

    setRhymeVotes((prev) => ({
      ...prev,
      [voteKey]: newVotes,
    }))

    // Update the results to reflect new vote counts and re-sort
    setRhymeResults((prev) => {
      const updated = { ...prev }
      if (updated[language]) {
        updated[language] = updated[language]!.map((rhyme) =>
          rhyme.word === word ? { ...rhyme, votes: newVotes } : rhyme,
        ).sort((a, b) => (b.votes || 0) - (a.votes || 0))
      }
      return updated
    })

    // Also update user contributed rhymes
    setUserContributedRhymes((prev) => {
      const key = `${searchWord}-${language}`
      if (prev[key]) {
        return {
          ...prev,
          [key]: prev[key].map((rhyme) => (rhyme.word === word ? { ...rhyme, votes: newVotes } : rhyme)),
        }
      }
      return prev
    })
  }

  const copyToLyrics = (word: string) => {
    setLyrics((prev) => prev + (prev ? " " : "") + word)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            RhymeWorld
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Community-driven multilingual rhyming dictionary. Find rhymes and vote on the best suggestions.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Find Your Rhymes
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSyllableInfo(!showSyllableInfo)}
                className="text-blue-600"
              >
                <Info className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>
              Enter any word to find rhymes and contribute your own suggestions
              {showSyllableInfo && searchWord && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm">
                  <p>
                    <strong>Syllable Analysis for "{searchWord}":</strong>
                  </p>
                  <p>Last Syllable: {extractLastSyllable(searchWord, nativeLanguage)}</p>
                  <p>
                    Phonetic Pattern:{" "}
                    {getSyllablePhonetic(extractLastSyllable(searchWord, nativeLanguage), nativeLanguage)}
                  </p>
                  <p>Total Syllables: {countSyllables(searchWord, nativeLanguage)}</p>
                </div>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="native-language">Your Native Language</Label>
                <Select value={nativeLanguage} onValueChange={(value: Language) => setNativeLanguage(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">🇺🇸 English</SelectItem>
                    <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                    <SelectItem value="french">🇫🇷 French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="rhyming-languages">Rhyming Languages</Label>
                <div className="flex gap-2 mt-2">
                  {(["english", "spanish", "french"] as Language[]).map((lang) => (
                    <Button
                      key={lang}
                      variant={rhymingLanguages.includes(lang) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (rhymingLanguages.includes(lang)) {
                          setRhymingLanguages(rhymingLanguages.filter((l) => l !== lang))
                        } else {
                          setRhymingLanguages([...rhymingLanguages, lang])
                        }
                      }}
                      className={rhymingLanguages.includes(lang) ? "bg-blue-600 text-white" : "bg-white text-gray-700"}
                    >
                      {getLanguageFlag(lang)} {getLanguageLabel(lang)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Input
                placeholder="Enter any word to find rhymes..."
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={!searchWord.trim() || isSearching}
                className="bg-blue-600 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
              <label className="flex items-center gap-1 ml-2 text-xs">
                <input
                  type="checkbox"
                  checked={useAIRhymes}
                  onChange={e => setUseAIRhymes(e.target.checked)}
                  className="accent-blue-600"
                />
                Use AI Rhymes
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Pronunciation Demo */}
        <PronunciationDemo />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rhyme Results */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{useAIRhymes ? "AI Rhymes" : "Community Rhymes"}</CardTitle>
                  <CardDescription>
                    {searchWord && (useAIRhymes
                      ? `AI-generated rhymes for "${searchWord}" in ${rhymingLanguages.map(l => getLanguageLabel(l)).join(', ')}`
                      : Object.keys(rhymeResults).length > 0 && `Rhymes for "${searchWord}" (sorted by votes)`)}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="bg-white text-gray-700"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Favorites ({favorites.length})
                </Button>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                {showFavorites ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Saved Rhymes</h4>
                      {favorites.length > 0 && (
                        <Button variant="outline" size="sm" onClick={clearFavorites} className="bg-white text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {favorites.length === 0 ? (
                      <p className="text-gray-500 text-sm">No favorites saved yet</p>
                    ) : (
                      favorites.map((fav, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{fav.word}</span>
                              <PronunciationButton word={fav.word} language={fav.language} />
                            </div>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {getLanguageFlag(fav.language)} {getLanguageLabel(fav.language)}
                            </Badge>
                            {fav.translation && <p className="text-xs text-gray-600">{fav.translation}</p>}
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => copyToLyrics(fav.word)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromFavorites(fav.word, fav.language)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isSearching ? (
                      <p className="text-gray-500 text-sm">Searching for rhymes...</p>
                    ) : useAIRhymes ? (
                      aiError ? (
                        <p className="text-red-500 text-sm">{aiError}</p>
                      ) : aiRhymes ? (
                        <div className="space-y-4">
                          {Object.entries(aiRhymes).map(([language, rhymes]) => (
                            <div key={language} className="border rounded-lg p-3">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                {getLanguageFlag(language as Language)} {getLanguageLabel(language as Language)}
                                <Badge variant="secondary" className="text-xs">
                                  {rhymes.perfect.length + rhymes.near.length} rhymes
                                </Badge>
                              </h4>
                              
                              {rhymes.perfect.length > 0 && (
                                <div className="mb-3">
                                  <h5 className="text-sm font-medium text-blue-700 mb-2">Perfect Rhymes</h5>
                                  <ul className="space-y-2">
                                    {rhymes.perfect.map((r, i) => (
                                      <li key={i} className="p-2 bg-blue-50 rounded text-sm">
                                        <span className="font-medium">{r.rhyme}</span>
                                        <span className="ml-2 text-xs text-gray-600">{r.example}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {rhymes.near.length > 0 && (
                                <div>
                                  <h5 className="text-sm font-medium text-purple-700 mb-2">Near Rhymes</h5>
                                  <ul className="space-y-2">
                                    {rhymes.near.map((r, i) => (
                                      <li key={i} className="p-2 bg-purple-50 rounded text-sm">
                                        <span className="font-medium">{r.rhyme}</span>
                                        <span className="ml-2 text-xs text-gray-600">{r.example}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">Enter a word and search to see AI rhymes.</p>
                      )
                    ) : (
                      Object.keys(rhymeResults).length === 0 ? (
                        <p className="text-gray-500 text-sm">
                          Enter any word to find rhymes and contribute your own suggestions
                        </p>
                      ) : (
                        Object.entries(rhymeResults).map(([language, results]) => (
                          <div key={language}>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              {getLanguageFlag(language as Language)} {getLanguageLabel(language as Language)}
                              <Badge variant="secondary" className="text-xs">
                                {results?.length} rhymes
                              </Badge>
                            </h4>
                            <div className="space-y-2">
                              {results?.map((result, index) => (
                                <VotableRhyme
                                  key={`${result.word}-${index}`}
                                  word={result.word}
                                  language={language as Language}
                                  translation={result.translation}
                                  isUserContributed={result.isUserContributed}
                                  initialVotes={result.votes || 0}
                                  quality={result.quality}
                                  type={result.type}
                                  syllables={result.syllables}
                                  lastSyllable={result.lastSyllable}
                                  phoneticPattern={result.phoneticPattern}
                                  showSyllableInfo={showSyllableInfo}
                                  onCopyToLyrics={copyToLyrics}
                                  onAddToFavorites={addToFavorites}
                                  onVote={handleVote}
                                />
                              ))}
                            </div>
                          </div>
                        ))
                      )
                    )}

                    {/* Add the AddRhyme component at the bottom */}
                    {searchWord && (
                      <AddRhyme
                        searchWord={searchWord}
                        searchLanguage={nativeLanguage}
                        onRhymeAdded={handleRhymeAdded}
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Lyric Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Multilingual Lyric Pad</CardTitle>
                <CardDescription>
                  Write your lyrics here. Click on rhymes to add them to your composition.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Start writing your multilingual lyrics here..."
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  className="min-h-96 resize-none"
                />
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">
                    Words: {lyrics.trim() ? lyrics.trim().split(/\s+/).length : 0}
                  </p>
                  <Button variant="outline" onClick={() => setLyrics("")} className="bg-white text-gray-700">
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>RhymeWorld - Community-driven multilingual rhyming dictionary</p>
        </div>
      </div>
    </div>
  )
}
