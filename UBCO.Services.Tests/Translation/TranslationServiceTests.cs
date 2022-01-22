using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using UBCO.Services.Translation;

namespace UBCO.Services.Tests.Translation
{
    [TestClass]
    public class TranslationServiceTests
    {
        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void Translate_EmptyString_ThrowsException()
        {
            // Arrange
            var service = GetService();
            var textToTranslate = string.Empty;

            // Act
            var translatedText = service.Translate(textToTranslate);

            // Assert
            Assert.IsNull(translatedText);
        }

        [TestMethod]
        public void Translate_ExampleText1_ReturnsTextCorrectlyTranslated()
        {
            // Arrange
            var service = GetService();
            var textToTranslate = "Hello World";
            var expectedResult = "UBCO Jeemmoo Xoosmf2";

            // Act
            var translatedText = service.Translate(textToTranslate);

            // Assert
            Assert.IsNotNull(translatedText);
            Assert.AreEqual(expectedResult, translatedText);
        }

        [TestMethod]
        public void Translate_ExampleText2_ReturnsTextCorrectlyTranslated()
        {
            // Arrange
            var service = GetService();
            var textToTranslate = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
            var expectedResult = "UBCO Mooseen iiqtuun foomoos tiiv aaneev, doopteedveevuus aafiiqiitdiiph eemiiv.8";

            // Act
            var translatedText = service.Translate(textToTranslate);

            // Assert
            Assert.IsNotNull(translatedText);
            Assert.AreEqual(expectedResult, translatedText);
        }

        private TranslationService GetService()
        {
            return new TranslationService();
        }
    }
}
