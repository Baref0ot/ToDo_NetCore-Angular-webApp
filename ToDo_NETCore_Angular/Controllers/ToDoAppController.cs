using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Data.SqlClient;


namespace ToDo_NETCore_Angular.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoAppController : ControllerBase {

        // data fields
        private IConfiguration _configuration;

        // setting up dependency injection
        public ToDoAppController(IConfiguration configuration) {
            _configuration = configuration; 
        }

        [HttpGet]
        [Route("GetNotes")]
        public JsonResult GetNotes() {

            // create quick query
            string query = "select * from dbo.notes";
            DataTable table = new DataTable();

            // get connection db details
            string sqlDatasource = _configuration.GetConnectionString("ToDoAppConnection");

            // setup SqlDataReader
            SqlDataReader myReader;

            using(SqlConnection myConnection = new SqlConnection(sqlDatasource)) {
                myConnection.Open();

                using(SqlCommand myCommand = new SqlCommand(query, myConnection)) {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConnection.Close();   
                }
            }

            return new JsonResult(table);
        }// end GetNotes


        [HttpPost]
        [Route("AddNote")]
        public JsonResult AddNote([FromForm] string newNote) {

            // create quick query
            string query = "insert into dbo.notes values(@newNote)";
            DataTable table = new DataTable();

            // get connection db details
            string sqlDatasource = _configuration.GetConnectionString("ToDoAppConnection");

            // setup SqlDataReader
            SqlDataReader myReader;

            using (SqlConnection myConnection = new SqlConnection(sqlDatasource)) {
                myConnection.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myConnection)) {
                    myCommand.Parameters.AddWithValue("@newNote",newNote);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConnection.Close();
                }
            }

            return new JsonResult("New note successfully Added.");
        }// end AddNote


        [HttpDelete]
        [Route("DeleteNote")]
        public JsonResult DeleteNote(int id) {

            // create quick query
            string query = "delete from dbo.notes where id=@id";
            DataTable table = new DataTable();

            // get connection db details
            string sqlDatasource = _configuration.GetConnectionString("ToDoAppConnection");

            // setup SqlDataReader
            SqlDataReader myReader;

            using (SqlConnection myConnection = new SqlConnection(sqlDatasource)) {
                myConnection.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myConnection)) {
                    myCommand.Parameters.AddWithValue("@id", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConnection.Close();
                }
            }

            return new JsonResult("Note successfully Deleted.");
        }// end DeleteNote
    }
}
