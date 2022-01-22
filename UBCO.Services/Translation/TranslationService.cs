using System;
using System.Linq;
using System.Text;
using UBCO.Core.Services.Translation;

namespace UBCO.Services.Translation
{
    public class TranslationService : ITranslationService
    {
        const string TRANSLATION_PREFIX = "UBCO ";
        public string Translate(string phrase)
        {
            if (string.IsNullOrEmpty(phrase) || string.IsNullOrWhiteSpace(phrase))
            {
                throw new ArgumentNullException("You know I can't translate your ghost string");
            }
            return TransformPhraseToUblish(phrase);
        }

        private string TransformPhraseToUblish(string originalPhrase)
        {
            var wordCount = originalPhrase.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;
            var characters = originalPhrase.ToCharArray(); // convert string into char array to apply translation rules to each character individually
            var translatedPhrase = new StringBuilder();
            translatedPhrase.Append(TRANSLATION_PREFIX);

            foreach(var character in characters)
            {
                if (char.IsLetter(character))
                {
                    if (IsVowel(character))
                    {
                        translatedPhrase.Append($"{character}{character}"); // double vowels
                    }
                    else
                    {
                        if (character == 'Z' || character == 'z')
                            translatedPhrase.Append(TransformZLetter(character)); // treat 'z's separately
                        else
                        {
                            var nextLetter = (char)(character + 1);
                            var characterToAppend = IsVowel(nextLetter) ? (char)(character + 2) : nextLetter; // if next letter is a vowel, skip to next consonant
                            translatedPhrase.Append(characterToAppend);
                        }
                    }
                }
                else
                {
                    translatedPhrase.Append(character);
                }
            }
            translatedPhrase.Append(wordCount);
            return translatedPhrase.ToString();
        }

        private char TransformZLetter(char letter)
        {
            return char.IsUpper(letter) ? 'B' : 'b';
        }

        private bool IsVowel(char character)
        {
            return "aeiouAEIOU".Any(c => c == character);
        }
    }
}
