using Microsoft.Extensions.DependencyInjection;
using UBCO.Core.Services.Translation;
using UBCO.Services.Translation;

namespace UBCO.Services
{
    public class ServiceFactory
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<ITranslationService, TranslationService>();
        }
    }
}
