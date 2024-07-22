using E_Commerce.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using E_Commerce.Interfaces;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Cors;
using System.Net.Mail;

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
        [HttpPost("sendcode")]
        public async Task<IActionResult> Send([FromBody] string email)
        {
            string codigo = _repo.SaveVerificationCode(email).Result.Value;
            if (codigo == null) return BadRequest(Result.Fail("Email no encontrado"));
            const string subject = "Verificación correo";
            var body = _repo.generatebody("LincolnTech verificación de registro", "Codigo de verificación",codigo);
           
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
        [HttpGet("checkcode")]
        public async Task<IActionResult> Compare([FromQuery] string email, [FromQuery] string code)
        {
            var respons = await _repo.CompareVerificationCode(email, code);
            if (respons.IsSuccess)
            {
                return Ok(respons);

            }
            return BadRequest(respons);

        }

        [AllowAnonymous]
        [HttpPost("passwordrecovery")]
        public async Task<IActionResult> PasswordRecovery([FromQuery] string email, [FromQuery] string code, [FromBody] string newPassword)
        {
            var respons = await _repo.PasswordRecovery(email, code, newPassword);
            if (respons.IsSuccess)
            {
                return Ok(respons);

            }
            return BadRequest(respons);

        }
        [AllowAnonymous]
        [HttpPost("SendVerificationUrl")]
        public async Task<IActionResult> SendVerificationUrlAsync(string email, string UrlPageVerification)
        {
            string code = _repo.SaveVerificationCode(email).Result.Value;
            if (code == null) return BadRequest(Result.Fail("Email no encontrado"));

            //var verificationLink = Url.Action("Compare", "EmailVerification", new { email, code}, Request.Scheme);
            var verificationLink = UrlPageVerification + $"?email={email}&code={code}";
            var message = new MailMessage();
            var subject = "Account Verification";
            var body = _repo.generatebody("LincolnTech verificación de registro", "Codigo de verificación",
                $"Por favor verifica tu cuenta haciendo click en este link: <a href=\"{verificationLink}\">Verify Account</a>");

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
    }

}
     