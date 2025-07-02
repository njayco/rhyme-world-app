import json
import re
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from collections import defaultdict

@dataclass
class RhymeResult:
    word: str
    phonetic: str
    suffix: str
    syllables: int
    similarity: float
    translation: Optional[Dict[str, str]] = None

class MultilingualRhymeEngine:
    def __init__(self):
        self.current_language = 'english'
        self.phonetic_mappings = self._initialize_phonetic_mappings()
        self.word_dictionaries = self._initialize_word_dictionaries()
        self.translations = self._initialize_translations()
        self.ui_translations = self._initialize_ui_translations()
    
    def _initialize_phonetic_mappings(self) -> Dict[str, Dict[str, str]]:
        return {
            'english': {
                # Vowel sounds
                'a': 'æ', 'ai': 'eɪ', 'ay': 'eɪ', 'au': 'ɔː', 'aw': 'ɔː',
                'e': 'ɛ', 'ea': 'iː', 'ee': 'iː', 'ei': 'eɪ', 'ey': 'eɪ',
                'i': 'ɪ', 'ie': 'iː', 'igh': 'aɪ', 'y': 'aɪ',
                'o': 'ɒ', 'oa': 'oʊ', 'oo': 'uː', 'ou': 'aʊ', 'ow': 'aʊ',
                'u': 'ʌ', 'ue': 'uː', 'ui': 'uː',
                
                # Consonant combinations
                'ch': 'tʃ', 'sh': 'ʃ', 'th': 'θ', 'ph': 'f', 'gh': 'f',
                'ck': 'k', 'ng': 'ŋ', 'qu': 'kw',
                
                # Complex endings
                'tion': 'ʃən', 'sion': 'ʃən', 'ture': 'tʃər', 'sure': 'ʃər',
                'ous': 'əs', 'ious': 'iəs', 'eous': 'iəs',
                'able': 'əbəl', 'ible': 'ɪbəl', 'ment': 'mənt',
                'ness': 'nəs', 'ful': 'fəl', 'less': 'ləs',
                
                # R-controlled vowels
                'ar': 'ɑːr', 'er': 'ər', 'ir': 'ər', 'or': 'ɔːr', 'ur': 'ər',
                
                # Silent letters
                'kn': 'n', 'wr': 'r', 'mb': 'm', 'bt': 't', 'gn': 'n'
            },
            
            'spanish': {
                # Spanish vowels (consistent)
                'a': 'a', 'á': 'a', 'e': 'e', 'é': 'e',
                'i': 'i', 'í': 'i', 'o': 'o', 'ó': 'o',
                'u': 'u', 'ú': 'u',
                
                # Diphthongs
                'ai': 'ai', 'ay': 'ai', 'au': 'au', 'ei': 'ei', 'ey': 'ei',
                'ie': 'ie', 'io': 'io', 'iu': 'iu', 'oi': 'oi', 'oy': 'oi',
                'ua': 'ua', 'ue': 'ue', 'ui': 'ui', 'uo': 'uo',
                
                # Special consonants
                'ch': 'tʃ', 'll': 'ʎ', 'ñ': 'ɲ', 'rr': 'r',
                'qu': 'k', 'gu': 'g', 'gü': 'gw',
                
                # Common endings
                'ción': 'sjon', 'sión': 'sjon', 'ando': 'ando', 'iendo': 'jendo',
                'mente': 'mente', 'oso': 'oso', 'osa': 'osa',
                'ito': 'ito', 'ita': 'ita', 'dad': 'dad', 'ura': 'ura'
            },
            
            'french': {
                # Nasal vowels
                'an': 'ɑ̃', 'am': 'ɑ̃', 'en': 'ɑ̃', 'em': 'ɑ̃',
                'in': 'ɛ̃', 'im': 'ɛ̃', 'yn': 'ɛ̃', 'ym': 'ɛ̃',
                'on': 'ɔ̃', 'om': 'ɔ̃', 'un': 'œ̃', 'um': 'œ̃',
                
                # Vowel combinations
                'ai': 'ɛ', 'ay': 'ɛ', 'au': 'o', 'eau': 'o',
                'ei': 'ɛ', 'eu': 'ø', 'œu': 'ø', 'ie': 'i',
                'oi': 'wa', 'oy': 'wa', 'ou': 'u', 'ui': 'ɥi',
                
                # Accented vowels
                'à': 'a', 'â': 'a', 'é': 'e', 'è': 'ɛ', 'ê': 'ɛ', 'ë': 'ɛ',
                'î': 'i', 'ï': 'i', 'ô': 'o', 'ò': 'ɔ',
                'ù': 'y', 'û': 'y', 'ü': 'y',
                
                # Consonant combinations
                'ch': 'ʃ', 'gn': 'ɲ', 'ph': 'f', 'qu': 'k', 'th': 't',
                
                # Common endings
                'tion': 'sjɔ̃', 'sion': 'sjɔ̃', 'ment': 'mɑ̃',
                'ance': 'ɑ̃s', 'ence': 'ɑ̃s', 'eux': 'ø', 'euse': 'øz',
                'able': 'abl', 'ible': 'ibl', 'age': 'aʒ', 'ure': 'yr'
            }
        }
    
    def _initialize_word_dictionaries(self) -> Dict[str, List[str]]:
        return {
            'english': [
                'cat', 'hat', 'bat', 'rat', 'mat', 'fat', 'sat', 'flat', 'chat', 'that',
                'day', 'way', 'say', 'play', 'stay', 'may', 'bay', 'ray', 'pay', 'lay',
                'light', 'night', 'right', 'sight', 'bright', 'fight', 'might', 'tight',
                'love', 'dove', 'above', 'shove', 'glove', 'move', 'prove', 'groove',
                'heart', 'start', 'part', 'art', 'smart', 'chart', 'dart', 'cart',
                'time', 'rhyme', 'climb', 'prime', 'crime', 'lime', 'dime', 'chime',
                'fire', 'tire', 'wire', 'hire', 'desire', 'inspire', 'require', 'entire',
                'nation', 'station', 'creation', 'education', 'information', 'celebration',
                'beautiful', 'wonderful', 'powerful', 'colorful', 'peaceful', 'helpful',
                'running', 'singing', 'dancing', 'walking', 'talking', 'working',
                'happiness', 'sadness', 'kindness', 'darkness', 'weakness', 'fitness',
                'water', 'daughter', 'quarter', 'shorter', 'porter', 'reporter',
                'house', 'mouse', 'spouse', 'blouse', 'grouse', 'rouse',
                'tree', 'free', 'see', 'be', 'me', 'we', 'key', 'tea', 'sea', 'bee'
            ],
            
            'spanish': [
                'amor', 'dolor', 'color', 'calor', 'honor', 'temor', 'rumor', 'humor',
                'corazón', 'canción', 'pasión', 'razón', 'ilusión', 'emoción', 'decisión',
                'verdad', 'ciudad', 'libertad', 'amistad', 'felicidad', 'realidad', 'soledad',
                'casa', 'masa', 'pasa', 'tasa', 'rasa', 'escasa', 'grasa',
                'vida', 'comida', 'bebida', 'salida', 'herida', 'medida', 'perdida',
                'día', 'alegría', 'melodía', 'poesía', 'fantasía', 'armonía', 'energía',
                'tiempo', 'viento', 'cuento', 'momento', 'asiento', 'aliento',
                'agua', 'fragua', 'lengua', 'antigua', 'yegua',
                'fuego', 'juego', 'luego', 'ruego', 'ciego', 'griego',
                'tierra', 'guerra', 'sierra', 'perra', 'yerra', 'cierra',
                'cielo', 'suelo', 'vuelo', 'duelo', 'abuelo', 'consuelo',
                'hermoso', 'famoso', 'gracioso', 'generoso', 'cariñoso', 'orgulloso',
                'bonito', 'pequeñito', 'ratito', 'poquito', 'solito', 'despacito',
                'cansado', 'enamorado', 'preocupado', 'ocupado', 'callado', 'mojado'
            ],
            
            'french': [
                'amour', 'jour', 'pour', 'tour', 'cour', 'four', 'lourd', 'sourd',
                'cœur', 'bonheur', 'malheur', 'douceur', 'chaleur', 'couleur', 'honneur',
                'vie', 'joie', 'voie', 'soie', 'oie', 'proie', 'foie',
                'temps', 'printemps', 'longtemps', 'champs', 'camps',
                'eau', 'beau', 'nouveau', 'cadeau', 'oiseau', 'bateau', 'château',
                'feu', 'peu', 'jeu', 'lieu', 'dieu', 'bleu', 'vœu', 'nœud',
                'air', 'chair', 'clair', 'pair', 'faire', 'taire', 'plaire',
                'mer', 'fer', 'ver', 'hier', 'fier', 'cher', 'amer',
                'main', 'pain', 'bain', 'gain', 'vain', 'train', 'grain',
                'bon', 'son', 'ton', 'don', 'mon', 'nom', 'pardon',
                'voyage', 'courage', 'message', 'passage', 'visage', 'nuage',
                'nation', 'passion', 'émotion', 'création', 'attention', 'question',
                'moment', 'vraiment', 'seulement', 'comment', 'souvent', 'lentement',
                'chance', 'danse', 'romance', 'france', 'enfance', 'distance',
                'heureux', 'amoureux', 'joyeux', 'merveilleux', 'généreux', 'courageux'
            ]
        }
    
    def _initialize_translations(self) -> Dict[str, Dict[str, Dict[str, str]]]:
        return {
            'english': {
                'spanish': {
                    'love': 'amor', 'heart': 'corazón', 'day': 'día', 'night': 'noche',
                    'light': 'luz', 'fire': 'fuego', 'water': 'agua', 'beautiful': 'hermoso',
                    'song': 'canción', 'dream': 'sueño', 'time': 'tiempo', 'life': 'vida',
                    'house': 'casa', 'cat': 'gato', 'dog': 'perro', 'sun': 'sol',
                    'moon': 'luna', 'sea': 'mar', 'sky': 'cielo', 'earth': 'tierra'
                },
                'french': {
                    'love': 'amour', 'heart': 'cœur', 'day': 'jour', 'night': 'nuit',
                    'light': 'lumière', 'fire': 'feu', 'water': 'eau', 'beautiful': 'beau',
                    'song': 'chanson', 'dream': 'rêve', 'time': 'temps', 'life': 'vie',
                    'house': 'maison', 'cat': 'chat', 'dog': 'chien', 'sun': 'soleil',
                    'moon': 'lune', 'sea': 'mer', 'sky': 'ciel', 'earth': 'terre'
                }
            },
            'spanish': {
                'english': {
                    'amor': 'love', 'corazón': 'heart', 'día': 'day', 'noche': 'night',
                    'luz': 'light', 'fuego': 'fire', 'agua': 'water', 'hermoso': 'beautiful',
                    'canción': 'song', 'sueño': 'dream', 'tiempo': 'time', 'vida': 'life',
                    'casa': 'house', 'gato': 'cat', 'perro': 'dog', 'sol': 'sun'
                },
                'french': {
                    'amor': 'amour', 'corazón': 'cœur', 'día': 'jour', 'noche': 'nuit',
                    'luz': 'lumière', 'fuego': 'feu', 'agua': 'eau', 'hermoso': 'beau'
                }
            },
            'french': {
                'english': {
                    'amour': 'love', 'cœur': 'heart', 'jour': 'day', 'nuit': 'night',
                    'lumière': 'light', 'feu': 'fire', 'eau': 'water', 'beau': 'beautiful',
                    'chanson': 'song', 'rêve': 'dream', 'temps': 'time', 'vie': 'life'
                },
                'spanish': {
                    'amour': 'amor', 'cœur': 'corazón', 'jour': 'día', 'nuit': 'noche',
                    'lumière': 'luz', 'feu': 'fuego', 'eau': 'agua', 'beau': 'hermoso'
                }
            }
        }
    
    def _initialize_ui_translations(self) -> Dict[str, Dict[str, str]]:
        return {
            'english': {
                'title': 'Multilingual Rhyme Finder',
                'perfect_rhymes': 'Perfect Rhymes',
                'slant_rhymes': 'Slant Rhymes',
                'cross_language_rhymes': 'Cross-Language Rhymes',
                'no_rhymes': 'No rhymes found',
                'syllables': 'syllables',
                'confidence': 'confidence'
            },
            'spanish': {
                'title': 'Buscador de Rimas Multilingüe',
                'perfect_rhymes': 'Rimas Perfectas',
                'slant_rhymes': 'Rimas Consonantes',
                'cross_language_rhymes': 'Rimas Entre Idiomas',
                'no_rhymes': 'No se encontraron rimas',
                'syllables': 'sílabas',
                'confidence': 'confianza'
            },
            'french': {
                'title': 'Chercheur de Rimes Multilingue',
                'perfect_rhymes': 'Rimes Parfaites',
                'slant_rhymes': 'Rimes Approximatives',
                'cross_language_rhymes': 'Rimes Inter-Langues',
                'no_rhymes': 'Aucune rime trouvée',
                'syllables': 'syllabes',
                'confidence': 'confiance'
            }
        }
    
    def get_phonetic_representation(self, word: str, language: str = 'english') -> str:
        """Convert word to phonetic representation"""
        mappings = self.phonetic_mappings[language]
        phonetic = word.lower()
        
        # Sort patterns by length (longest first) to avoid partial matches
        sorted_patterns = sorted(mappings.items(), key=lambda x: len(x[0]), reverse=True)
        
        # Apply phonetic transformations
        for pattern, sound in sorted_patterns:
            if pattern and sound:
                phonetic = re.sub(pattern, sound, phonetic)
        
        return phonetic
    
    def get_rhyming_suffix(self, phonetic_word: str, min_length: int = 2) -> str:
        """Extract rhyming suffix from phonetic representation"""
        suffix_length = min(max(min_length, 2), len(phonetic_word))
        return phonetic_word[-suffix_length:]
    
    def count_syllables(self, word: str, language: str = 'english') -> int:
        """Count syllables in a word"""
        lower_word = word.lower()
        
        if language == 'spanish':
            vowels = re.findall(r'[aeiouáéíóúü]', lower_word)
            if not vowels:
                return 1
            
            count = len(vowels)
            # Adjust for diphthongs
            diphthongs = re.findall(r'[aeiou][aeiou]', lower_word)
            if diphthongs:
                count -= len(diphthongs)
            return max(1, count)
        
        elif language == 'french':
            vowels = re.findall(r'[aeiouyàâéèêëïîôöùûü]', lower_word)
            if not vowels:
                return 1
            
            count = len(vowels)
            # Adjust for silent e at the end
            if lower_word.endswith('e') and count > 1:
                count -= 1
            return max(1, count)
        
        else:  # English (default)
            vowel_groups = re.findall(r'[aeiouy]+', lower_word)
            if not vowel_groups:
                return 1
            
            count = len(vowel_groups)
            # Adjust for silent e
            if lower_word.endswith('e') and count > 1:
                count -= 1
            return max(1, count)
    
    def calculate_similarity(self, phonetic1: str, phonetic2: str) -> float:
        """Calculate phonetic similarity between two words"""
        if phonetic1 == phonetic2:
            return 1.0
        
        longer = phonetic1 if len(phonetic1) > len(phonetic2) else phonetic2
        shorter = phonetic2 if len(phonetic1) > len(phonetic2) else phonetic1
        
        if len(longer) == 0:
            return 1.0
        
        # Calculate similarity from the end (most important for rhyming)
        matches = 0
        min_length = min(len(longer), len(shorter))
        
        for i in range(1, min_length + 1):
            if longer[-i:] == shorter[-i:]:
                matches = i
            else:
                break
        
        return matches / max(len(longer), len(shorter))
    
    def find_rhymes(self, input_word: str, language: str = 'english') -> Dict:
        """Find rhymes for a given word"""
        word_list = self.word_dictionaries[language]
        input_phonetic = self.get_phonetic_representation(input_word, language)
        input_suffix = self.get_rhyming_suffix(input_phonetic)
        input_syllables = self.count_syllables(input_word, language)
        
        perfect_rhymes = []
        slant_rhymes = []
        
        for word in word_list:
            if word.lower() == input_word.lower():
                continue
            
            word_phonetic = self.get_phonetic_representation(word, language)
            word_suffix = self.get_rhyming_suffix(word_phonetic)
            word_syllables = self.count_syllables(word, language)
            
            similarity = self.calculate_similarity(input_suffix, word_suffix)
            
            rhyme_data = RhymeResult(
                word=word,
                phonetic=word_phonetic,
                suffix=word_suffix,
                syllables=word_syllables,
                similarity=similarity,
                translation=self.get_translation(word, language)
            )
            
            if similarity >= 0.9:
                perfect_rhymes.append(rhyme_data)
            elif similarity >= 0.6:
                slant_rhymes.append(rhyme_data)
        
        # Sort by similarity and syllable count
        def sort_key(rhyme):
            return (-rhyme.similarity, abs(rhyme.syllables - input_syllables))
        
        perfect_rhymes.sort(key=sort_key)
        slant_rhymes.sort(key=sort_key)
        
        return {
            'perfect': perfect_rhymes,
            'slant': slant_rhymes,
            'input_analysis': {
                'word': input_word,
                'phonetic': input_phonetic,
                'suffix': input_suffix,
                'syllables': input_syllables
            }
        }
    
    def find_cross_language_rhymes(self, input_word: str, input_language: str) -> Dict:
        """Find cross-language rhymes"""
        cross_rhymes = {}
        languages = [lang for lang in ['english', 'spanish', 'french'] if lang != input_language]
        
        for target_language in languages:
            rhymes = self.find_rhymes(input_word, target_language)
            if rhymes['perfect'] or rhymes['slant']:
                cross_rhymes[target_language] = rhymes
        
        return cross_rhymes
    
    def get_translation(self, word: str, from_language: str, to_language: str = None) -> Optional[Dict[str, str]]:
        """Get translation of a word"""
        if to_language is None:
            # Return all available translations
            translations = {}
            available_languages = [lang for lang in ['english', 'spanish', 'french'] if lang != from_language]
            
            for lang in available_languages:
                translation = self.translations.get(from_language, {}).get(lang, {}).get(word.lower())
                if translation:
                    translations[lang] = translation
            
            return translations if translations else None
        
        return self.translations.get(from_language, {}).get(to_language, {}).get(word.lower())
    
    def get_ui_text(self, key: str) -> str:
        """Get UI text in current language"""
        return self.ui_translations.get(self.current_language, {}).get(key, key)
    
    def set_language(self, language: str):
        """Set current UI language"""
        if language in ['english', 'spanish', 'french']:
            self.current_language = language
    
    def find_all_rhymes(self, input_word: str, language: str = 'english') -> Dict:
        """Main function to find all types of rhymes"""
        print(f"\n=== {self.get_ui_text('title')} ===")
        print(f"Finding rhymes for: \"{input_word}\" ({language})")
        
        # Find rhymes in the same language
        same_language_rhymes = self.find_rhymes(input_word, language)
        
        # Find cross-language rhymes
        cross_language_rhymes = self.find_cross_language_rhymes(input_word, language)
        
        # Display results
        self.display_results(input_word, language, same_language_rhymes, cross_language_rhymes)
        
        return {
            'same_language': same_language_rhymes,
            'cross_language': cross_language_rhymes,
            'input_analysis': same_language_rhymes['input_analysis']
        }
    
    def display_results(self, input_word: str, language: str, same_language_rhymes: Dict, cross_language_rhymes: Dict):
        """Display results in a formatted way"""
        input_analysis = same_language_rhymes['input_analysis']
        
        print(f"\n--- Input Analysis ---")
        print(f"Word: {input_analysis['word']}")
        print(f"Phonetic: {input_analysis['phonetic']}")
        print(f"Rhyming Suffix: {input_analysis['suffix']}")
        print(f"Syllables: {input_analysis['syllables']}")
        
        # Display same-language rhymes
        print(f"\n--- {self.get_ui_text('perfect_rhymes')} ({language}) ---")
        if not same_language_rhymes['perfect']:
            print(self.get_ui_text('no_rhymes'))
        else:
            for i, rhyme in enumerate(same_language_rhymes['perfect'][:10], 1):
                translation = f" ({', '.join(rhyme.translation.values())})" if rhyme.translation else ''
                print(f"{i}. {rhyme.word}{translation} - {rhyme.syllables} {self.get_ui_text('syllables')} - {rhyme.similarity*100:.1f}% {self.get_ui_text('confidence')}")
        
        print(f"\n--- {self.get_ui_")
        
        print(f"\n--- {self.get_ui_text('slant_rhymes')} ({language}) ---")
        if not same_language_rhymes['slant']:
            print(self.get_ui_text('no_rhymes'))
        else:
            for i, rhyme in enumerate(same_language_rhymes['slant'][:10], 1):
                translation = f" ({', '.join(rhyme.translation.values())})" if rhyme.translation else ''
                print(f"{i}. {rhyme.word}{translation} - {rhyme.syllables} {self.get_ui_text('syllables')} - {rhyme.similarity*100:.1f}%")
        
        # Display cross-language rhymes
        print(f"\n--- {self.get_ui_text('cross_language_rhymes')} ---")
        if not cross_language_rhymes:
            print(self.get_ui_text('no_rhymes'))
        else:
            for target_lang, rhymes in cross_language_rhymes.items():
                print(f"\n{target_lang.upper()}:")
                
                if rhymes['perfect']:
                    print(f"  {self.get_ui_text('perfect_rhymes')}:")
                    for i, rhyme in enumerate(rhymes['perfect'][:5], 1):
                        translation = f" ({', '.join(rhyme.translation.values())})" if rhyme.translation else ''
                        print(f"    {i}. {rhyme.word}{translation} - {rhyme.similarity*100:.1f}%")
                
                if rhymes['slant']:
                    print(f"  {self.get_ui_text('slant_rhymes')}:")
                    for i, rhyme in enumerate(rhymes['slant'][:5], 1):
                        translation = f" ({', '.join(rhyme.translation.values())})" if rhyme.translation else ''
                        print(f"    {i}. {rhyme.word}{translation} - {rhyme.similarity*100:.1f}%")
    
    def batch_find_rhymes(self, words: List[str], language: str = 'english') -> Dict:
        """Batch process multiple words"""
        results = {}
        
        print(f"\n=== Batch Processing {len(words)} words ===")
        
        for i, word in enumerate(words):
            print(f"\nProcessing {i+1}/{len(words)}: {word}")
            results[word] = self.find_all_rhymes(word, language)
        
        return results
    
    def export_results(self, results: Dict, filename: str = 'rhyme_results.json'):
        """Export results to JSON"""
        # Convert RhymeResult objects to dictionaries for JSON serialization
        def convert_rhyme_result(obj):
            if isinstance(obj, RhymeResult):
                return {
                    'word': obj.word,
                    'phonetic': obj.phonetic,
                    'suffix': obj.suffix,
                    'syllables': obj.syllables,
                    'similarity': obj.similarity,
                    'translation': obj.translation
                }
            elif isinstance(obj, list):
                return [convert_rhyme_result(item) for item in obj]
            elif isinstance(obj, dict):
                return {key: convert_rhyme_result(value) for key, value in obj.items()}
            else:
                return obj
        
        serializable_results = convert_rhyme_result(results)
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(serializable_results, f, indent=2, ensure_ascii=False)
        
        print(f"Results exported to {filename}")


def run_examples():
    """Example usage and testing"""
    rhyme_engine = MultilingualRhymeEngine()
    
    print('=== Multilingual Rhyme Algorithm Demo ===\n')
    
    # Test in English
    print('Testing in English:')
    rhyme_engine.set_language('english')
    rhyme_engine.find_all_rhymes('love', 'english')
    
    # Test in Spanish
    print('\n' + '='*50)
    print('Testing in Spanish:')
    rhyme_engine.set_language('spanish')
    rhyme_engine.find_all_rhymes('amor', 'spanish')
    
    # Test in French
    print('\n' + '='*50)
    print('Testing in French:')
    rhyme_engine.set_language('french')
    rhyme_engine.find_all_rhymes('amour', 'french')
    
    # Batch processing example
    print('\n' + '='*50)
    print('Batch Processing Example:')
    rhyme_engine.set_language('english')
    batch_words = ['cat', 'time', 'heart']
    batch_results = rhyme_engine.batch_find_rhymes(batch_words, 'english')
    
    # Export results
    rhyme_engine.export_results(batch_results, 'batch_rhyme_results.json')
    
    return rhyme_engine


if __name__ == "__main__":
    # Run the examples
    engine = run_examples()
    
    # Interactive mode
    print('\n' + '='*50)
    print('Interactive Mode - Enter words to find rhymes (type "quit" to exit)')
    
    while True:
        try:
            word = input('\nEnter a word: ').strip()
            if word.lower() == 'quit':
                break
            
            if not word:
                continue
            
            language = input('Enter language (english/spanish/french) [english]: ').strip().lower()
            if language not in ['english', 'spanish', 'french']:
                language = 'english'
            
            engine.set_language(language)
            engine.find_all_rhymes(word, language)
            
        except KeyboardInterrupt:
            print('\nGoodbye!')
            break
        except Exception as e:
            print(f'Error: {e}')
