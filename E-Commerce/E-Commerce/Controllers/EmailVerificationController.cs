using E_Commerce.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using E_Commerce.Interfaces;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Cors;

namespace E_Commerce.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/emailverification")]
    [ApiController]
    public class EmailVerificationController : ControllerBase
    {
        private readonly IEmailSenderRepository _repo;
        public EmailVerificationController(IEmailSenderRepository repo)
        {
            _repo = repo;
        }
        [AllowAnonymous]
        [HttpPost("/sendcode")]
        public async Task<IActionResult> Send(string email)
        {
            string codigo = _repo.SaveVerificationCode(email).Result.Value;
            if (codigo == null) return BadRequest(Result.Fail("Email no encontrado"));
            const string subject = "Verificación correo";
            var body = @"
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f2f2f2;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #fff;
                                border: 1px solid #ccc;
                                border-radius: 5px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #333;
                                text-align: center;
                            }
                            p {
                                color: #666;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h1>LincolnTech verificación de registro</h1>
                            <p>Codigo de verificación:</p>
                            <p>"+codigo+@"</p>
                            <p>Si no has sido tú ignora este correo</p>
                        </div>
                    </body>
                    </html>
                ";
            try
            {
                await _repo.SendEmailAsync(email, subject, body);
                return Ok(Result.Success());
            }
            catch (Exception ex)
            {
                return BadRequest(Result.Fail("Error al enviar el correo electronico: " + ex.Message)); 
                    
            }          
            
        }
        [AllowAnonymous]
        [HttpPost("/compare/{code}")]
        public async Task<IActionResult> Compare([FromBody] string email,string code)
        {
            var respons = await _repo.CompareVerificationCode(email,code);
            if (respons.IsSuccess)
            {
                return Ok(respons);
               
            }
            return BadRequest(respons);

        }

        [AllowAnonymous]
         [HttpPost("/PasswordRecovery/{email}&{code}")]
        public async Task<IActionResult> PasswordRecovery(string email, string code, [FromBody] string newPassword)
        {
            var respons = await _repo.PasswordRecovery(email, code, newPassword);
            if (respons.IsSuccess)
            {
                return Ok(respons);

            }
            return BadRequest(respons);

        }

    }


}
