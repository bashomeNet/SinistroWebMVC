using SinistroApp.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace SinistroWeb.MvcModelo.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            ViewBag.Message = "Início";
            
            // Chamada do token público
            var getToken = GeraToken.GeraTokenWebApi();
            if (getToken.Exception != null)
            {
                return RedirectToAction("Error", "Shared");
            }

            return View();
        }
    }
}
