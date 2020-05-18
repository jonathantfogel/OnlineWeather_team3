using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace OnlineWeather.Models
{
    public class WeatherData
    {
        public DataTable Data { get; internal set; }
        private string DataType { get; }
        private string DataAttribute { get; }

        public WeatherData(string dataType = "t")
        {
            try
            {
                this.DataAttribute = WeatherAttribute.Attributes[dataType];
                this.DataType = dataType;
            }
            catch
            {
                new KeyNotFoundException($"Weather attribute \"{dataType}\" not found.");
            }
            
            this.Data = new DataTable();
            var dc = new DataColumn[4]
            {
                new DataColumn("Datum", typeof(string)),
                new DataColumn("Tid", typeof(string)),
                new DataColumn(WeatherAttribute.Attributes[dataType], typeof(string)),
                new DataColumn("Kvalitet", typeof(string))
            };
            Data.Columns.AddRange(dc);

            string csvData = File.ReadAllText($"{HttpContext.Current.Server.MapPath("~")}/Content/WeatherData/smhi-{dataType}.csv");

            var rows = csvData.Split(new char[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);
            for (int rowidx = 1; rowidx < rows.Count(); rowidx++)
            {
                if (!String.IsNullOrEmpty(rows[rowidx]))
                {
                    Data.Rows.Add();
                    int i = 0;

                    foreach (var cell in rows[rowidx].Split(';'))
                    {
                        Data.Rows[Data.Rows.Count - 1][i] = cell;
                        i++;
                    }
                }
            }
        }

        public static string Serialize(DataTable dt)
        {
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

            foreach (DataRow row in dt.Rows)
            {
                Dictionary<string, object> jsRow = new Dictionary<string, object>();

                foreach (DataColumn col in dt.Columns)
                {
                    jsRow.Add(col.ColumnName, row[col]);
                }
                rows.Add(jsRow);
            }
            return serializer.Serialize(rows);
        }


    }

    public class WeatherAttribute
    {
        public static Dictionary<string, string> Attributes = new Dictionary<string, string>()
        {
            { "t", "Lufttemperatur" },
            { "msl", "Lufttryck" }
        };
    }
}