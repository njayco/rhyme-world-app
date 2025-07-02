import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { word, languages } = await req.json()
  if (!word || !languages || !Array.isArray(languages) || languages.length === 0) {
    return NextResponse.json({ error: 'Missing word or languages array' }, { status: 400 })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
  }

  const languageNames = languages.map(lang => {
    switch(lang) {
      case 'english': return 'English'
      case 'spanish': return 'Spanish'
      case 'french': return 'French'
      default: return lang
    }
  }).join(', ')

  const prompt = `You are a multilingual rhyming expert. Provide perfect and near rhymes for the word "${word}" in the following languages: ${languageNames}.

For each language, return the results in this exact JSON format:
{
  "language": "Language Name",
  "perfect": [
    {"type": "perfect", "rhyme": "word", "example": "Example sentence using the rhyme"}
  ],
  "near": [
    {"type": "near", "rhyme": "word", "example": "Example sentence using the rhyme"}
  ]
}

Return an array of these language objects. No explanations, just the JSON array.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful multilingual rhyming assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', response.status, errorData)
      return NextResponse.json({ 
        error: 'OpenAI API error', 
        status: response.status,
        details: errorData 
      }, { status: 500 })
    }

    const data = await response.json()
    let content = data.choices?.[0]?.message?.content
    console.log('OpenAI response content:', content)
    
    // Remove code block markers if present
    if (content?.startsWith('```')) {
      content = content.replace(/^```json\s*|^```\s*|```$/g, '').trim()
    }
    
    let languageResults: any[] = []
    try {
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed)) {
        languageResults = parsed
      } else if (typeof parsed === 'object') {
        // If it's a single language result, wrap it in an array
        languageResults = [parsed]
      } else {
        languageResults = []
      }
    } catch (e) {
      console.error('Parse error:', e, 'Content:', content)
      return NextResponse.json({ error: 'Failed to parse OpenAI response', raw: content }, { status: 500 })
    }

    // Transform the results to match the expected format
    const results: { [key: string]: { perfect: any[], near: any[] } } = {}
    
    languageResults.forEach((langResult) => {
      if (langResult.language && (langResult.perfect || langResult.near)) {
        const langKey = langResult.language.toLowerCase()
        results[langKey] = {
          perfect: Array.isArray(langResult.perfect) ? langResult.perfect : [],
          near: Array.isArray(langResult.near) ? langResult.near : []
        }
      }
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Server error', details: String(error) }, { status: 500 })
  }
} 