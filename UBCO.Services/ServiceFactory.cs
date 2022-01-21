using Microsoft.Extensions.DependencyInjection;
using System;
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
