using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SinistroApp.Helpers
{
    public class GeraToken
    {
        private static string username = System.Configuration.ConfigurationManager.AppSettings["UserToken"];
        private static string password = System.Configuration.ConfigurationManager.AppSettings["PasswordToken"];

        //
        // POST: /GeraTokenWebApi - Público
        [HttpPost] //Tipo da requisição.
        [AllowAnonymous] //Permite que usuários anônimos acessem o método. Para solicitação do controller via json.
        //[ValidateAntiForgeryToken] //Protege a aplicação no caso de solicitações http maliciosas.
        public static async Task<Boolean> GeraTokenWebApi()
        {
            try
            {

                var client = WebApiHttpClient.GetClient();
                HttpContent content = new StringContent(
                "username=" + username + "&password=" + password + "&grant_type=password",
                System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
                HttpResponseMessage response = client.PostAsync("/Token", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    TokenResponse tokenResponse = await response.Content.ReadAsAsync<TokenResponse>();
                    WebApiHttpClient.storeToken(tokenResponse);
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                throw new ArgumentException("Erro na geração do token de autenticação do Web Api." + ex.Message);
            }
        }
    }
}