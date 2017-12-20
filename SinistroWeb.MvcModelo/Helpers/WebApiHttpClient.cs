using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace SinistroApp.Helpers
{
    public static class WebApiHttpClient
    {
        private static string WebApiBaseAddress = System.Configuration.ConfigurationManager.AppSettings["UserWebApiUrl"];

        public static HttpClient GetClient()
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(WebApiBaseAddress);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var session = HttpContext.Current.Session;
            if (session["token"] != null)
            {
                TokenResponse tokenResponse = getToken();
                client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("bearer", tokenResponse.AccessToken);
            }
            return client;
        }

        public static void storeToken(TokenResponse token)
        {
            var session = HttpContext.Current.Session;
            session["token"] = token;
        }

        public static TokenResponse getToken()
        {
            var session = HttpContext.Current.Session;
            return (TokenResponse)session["token"];
        }
    }

}