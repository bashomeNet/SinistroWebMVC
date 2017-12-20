using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace SinistroWeb.MvcModelo.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Login()
        {
            ViewBag.Message = "Login";

            return View();
        }
    }
}
