using System;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace TimerTrigger
{
    public class DeleteUrlsTimer
    {
        private readonly ILogger _logger;
        private readonly HttpClient _httpClient = new HttpClient();
        public DeleteUrlsTimer(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<DeleteUrlsTimer>();
        }

        [Function("DeleteUrlsTimer")]
        public async Task Run(
        [TimerTrigger("0 0 * * * *")] TimerInfo timer,
        ILogger log)
        {
            log.LogInformation($"Cleanup started at {DateTime.Now}");

            var response = await _httpClient.DeleteAsync(
                "tinyurl-api-new-csfkcgdfdhakh5ab.centralindia-01.azurewebsites.net/api/url/cleanup");

            log.LogInformation($"Cleanup result: {response.StatusCode}");
        }

    }
}
