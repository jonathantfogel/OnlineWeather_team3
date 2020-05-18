using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnlineWeather.Models;

namespace OnlineWeather.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult RequestWeatherData(bool windspeed = false, bool temp = true, bool precipitation = false) 
        {
            var result = WeatherData.Serialize(new WeatherData().Data);
            return Json(result);
        }
    }
}