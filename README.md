# Multilingual Rhyme Finder

A comprehensive algorithm that finds perfect rhymes and slant rhymes for any given word in English, Spanish, and French, with cross-language translation support and a beautiful web interface.

## Features

### Core Functionality
- **Perfect Rhymes**: Find words with exact phonetic ending matches
- **Slant Rhymes**: Discover words with similar but not identical phonetic patterns
- **Cross-Language Rhymes**: Find rhymes across different languages
- **Phonetic Analysis**: Advanced phonetic representation using IPA-like notation
- **Syllable Counting**: Accurate syllable counting for each language
- **Translation Support**: Built-in translations between English, Spanish, and French

### AI-Powered Rhyme Generation
- **OpenAI Integration**: Generate rhymes using ChatGPT API
- **Multilingual Support**: Generate rhymes in English, Spanish, and French simultaneously
- **Perfect & Near Rhymes**: AI generates both perfect and near rhymes with examples
- **Language Grouping**: Results are organized by language with clear visual separation
- **Example Sentences**: Each rhyme includes a contextual example sentence

### Supported Languages
- 🇺🇸 **English**: Comprehensive phonetic mapping with complex endings
- 🇪🇸 **Spanish**: Regular phonetic patterns with diphthong support
- 🇫🇷 **French**: Nasal vowels, silent letters, and accent handling

### Interface Options
- **Web Interface**: Beautiful, responsive HTML interface
- **JavaScript API**: Use in browser or Node.js applications
- **Python API**: Full-featured Python implementation
- **Command Line**: Interactive terminal interface

## Quick Start

### Web Interface
1. Open `index.html` in your browser
2. Enter any word in English, Spanish, or French
3. Select the language and click "Find Rhymes"
4. Explore perfect rhymes, slant rhymes, and cross-language matches

### AI Rhyme Generation
1. Start the development server: `pnpm dev`
2. Open `http://localhost:3000`
3. Enter a word and select one or more rhyming languages
4. Check "Use AI Rhymes" to enable OpenAI-powered generation
5. Click "Search" to get AI-generated rhymes grouped by language

### Setup AI Features
1. Create a `.env.local` file in the project root
2. Add your OpenAI API key: `OPENAI_API_KEY=sk-your-key-here`
3. Restart the development server

### JavaScript Usage
\`\`\`javascript
const { MultilingualRhymeEngine } = require('./scripts/rhyme-algorithm.js');

const engine = new MultilingualRhymeEngine();

// Find rhymes for "love" in English
const results = engine.findAllRhymes('love', 'english');

// Find rhymes for "amor" in Spanish
engine.setLanguage('spanish');
const spanishResults = engine.findAllRhymes('amor', 'spanish');

// Batch processing
const batchResults = engine.batchFindRhymes(['cat', 'time', 'heart'], 'english');
\`\`\`

### Python Usage
```python
from scripts.rhyme_algorithm import MultilingualRhymeEngine

engine = MultilingualRhymeEngine()

# Find rhymes for "amour" in French
engine.set_language('french')
results = engine.find_all_rhymes('amour', 'french')

# Batch processing
batch_words = ['chat', 'temps', 'cœur']
batch_results = engine.batch_find_rhymes(batch_words, 'french')

# Export results
engine.export_results(batch_results, 'french_rhymes.json')
