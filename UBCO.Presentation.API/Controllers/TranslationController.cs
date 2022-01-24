using Microsoft.AspNetCore.Mvc;
using UBCO.Core.Services.Translation;
using UBCO.Core.Services.Translation.Models;

namespace UBCO.Presentation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslationController : ControllerBase
    {
        private readonly ITranslationService _translationService;

        public TranslationController(ITranslationService translationService)
        {
            _translationService = translationService;
        }

        /// <summary>
        /// Translate a given string of text
        /// </summary>
        /// <param name="sourceText"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Translate([FromBody] TranslationSourceText sourceText)
        {
            var translatedText = _translationService.Translate(sourceText.Text);
            return Ok(translatedText);
        }
    }
}