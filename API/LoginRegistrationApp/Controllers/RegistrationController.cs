using LoginRegistrationApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Xml.Linq;

namespace LoginRegistrationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegistrationController(IConfiguration configuration)
        {
            _configuration = configuration;

        }

        [HttpPost]
        [Route("registration")]

        public string registration(Registration Registration)
        {

            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ToysCon").ToString());


            SqlCommand cmd = new SqlCommand("insert into userdetails(id, name, emailid, password) values('" + Registration.id + "','" + Registration.name + "' , '" + Registration.emailid + "' ,'" + Registration.password + "')", con);


            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i > 0)
            {
                return "Data Inserted";

            }
            else
            {
                return "error";
            }

        }

        [HttpGet]
        [Route("login")]

        public string Login([FromQuery(Name = "emailid")] string email, [FromQuery(Name = "password")] string password)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ToysCon").ToString());
            SqlDataAdapter adapter = new SqlDataAdapter("SELECT * FROM userdetails WHERE emailid = @Email AND password = @Password", con);

            // Add parameters to prevent SQL injection
            adapter.SelectCommand.Parameters.AddWithValue("@Email", email);
            adapter.SelectCommand.Parameters.AddWithValue("@Password", password); // nees to add hashing fro security purposes

            DataTable dt = new DataTable();
            adapter.Fill(dt);

            if (dt.Rows.Count > 0)
            {
                // Authentication successful
                return "User Excist";
            }
            else
            {
                // Authentication failed
                return "Invalid User";
            }
        }

    }
}
