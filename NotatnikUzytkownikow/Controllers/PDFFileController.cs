using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotatnikUzytkownikow.Models;
using PdfSharpCore;
using PdfSharpCore.Pdf;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace NotatnikUzytkownikow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDFFileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PDFFileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GeneratePDF()
        {
            var document = new PdfDocument();
            string cellStyle = "style='border:1px solid #777; padding:4px;'";

            string html = "<table style='margin:auto;display:block;border-collapse: collapse;border:1px solid #777;'><thead><tr>";
                   html += $"<th {cellStyle}>Imię</th>";
                   html += $"<th {cellStyle}>Nazwisko</th>";
                   html += $"<th {cellStyle}>Tytuł</th>";
                   html += $"<th {cellStyle}>Data urodzenia</th>";
                   html += $"<th {cellStyle}>Wiek</th>";
                   html += $"<th {cellStyle}>Płeć</th>";
                   html += $"<th {cellStyle}>Numer telefonu</th>";
                   html += $"<th {cellStyle}>Stanowisko</th>";
                   html += $"<th {cellStyle}>Numer buta</th>";

            html += "</tr></thead><tbody>";


            var users = _context.Users.ToList();

            foreach (var user in users)
            {
                string title = user.Gender.ToLower() == "kobieta" ? "Pani" : "Pan";

                string formattedDate = user.BirthDate.ToString("dd MMMM yyyy");

                // calculate age
                var today = DateTime.Today;
                var age = today.Year - user.BirthDate.Year;
                // Go back to the year in which the person was born in case of a leap year
                if (user.BirthDate.Date > today.AddYears(-age)) age--;

                html += $"<tr><td {cellStyle}>{user.FirstName}</td>";
                html += $"<td {cellStyle}>{user.LastName}</td>";
                html += $"<td {cellStyle}>{title}</td>";
                html += $"<td {cellStyle}>{formattedDate}</td>";
                html += $"<td {cellStyle}>{age}</td>";
                html += $"<td {cellStyle}>{user.Gender}</td>";
                html += $"<td {cellStyle}>{user.PhoneNumber}</td>";
                html += $"<td {cellStyle}>{user.Position}</td>";
                html += $"<td {cellStyle}>{user.ShoeNumber}</td></tr>";

            }

            html += "</tbody></table>";
            PdfGenerator.AddPdfPages(document, html, PageSize.A4);

            Byte[] res = null;
            using(MemoryStream ms = new MemoryStream())
            {
                document.Save(ms);
                res = ms.ToArray();
            }
            string fileName = $"{DateTime.Now.ToString("dd-MM-yyyy_HH-mm-ss")}.pdf";
            return File(res, "application/pdf", fileName);
        }
    }
}
