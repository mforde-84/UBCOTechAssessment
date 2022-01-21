using Microsoft.AspNetCore.Mvc;
using UBCO.Core.Services.Translation;

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
        /// <param name="originalText"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Translate([FromBody] string originalText)
        {
            var translatedText = _translationService.Translate(originalText);
            return Ok(translatedText);
        }
    }
}
