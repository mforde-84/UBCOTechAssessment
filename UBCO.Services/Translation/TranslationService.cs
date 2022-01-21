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

            var wordCount = phrase.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;
            var characters = phrase.ToCharArray();
            var translatedPhrase = new StringBuilder();
            translatedPhrase.Append(TRANSLATION_PREFIX);
            // use regex for this?
            // handle numbers?
            foreach(var character in characters)
            {
                if (IsVowel(character))
                {
                    translatedPhrase.Append($"{character}{character}");
                } else
                {
                    if (Char.IsLetter(character))
                    {
                        if (character == 'z')
                        {
                            translatedPhrase.Append('b');
                        } else
                        {
                            translatedPhrase.Append(IsVowel((char)(character + 1)) ? 
                                (char)(character + 2) : 
                                (char)(character + 1));
                        }
                    }
                    else
                    {
                        translatedPhrase.Append(character);
                    }
                }
            }
            translatedPhrase.Append(wordCount);
            return translatedPhrase.ToString();
        }

        private bool IsVowel(char character)
        {
            return "aeiouAEIOU".Any(c => c == character);
        }
    }
}
