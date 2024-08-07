﻿using E_Commerce.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using E_Commerce.Interfaces;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Cors;
using System.Net.Mail;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
            var respons = _repo.SaveVerificationCode(email);
            string codigo = respons.Result.Value;
            if (codigo == null) return BadRequest(respons.Result);
            const string subject = "Verificación correo";
            var body = _repo.generatebody("LincolnTech verificación de registro", "Codigo de verificación", codigo);

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
        [HttpPost("checkcode")]
        public async Task<IActionResult> Compare(CheckCodeDto data)
        {
            var respons = await _repo.CompareVerificationCode(data.Email, data.Code);
            if (respons.IsSuccess)
            {
                return Ok(respons);

            }
            return BadRequest(respons);

        }

        [AllowAnonymous]
        [HttpPost("passwordrecovery")]
        public async Task<IActionResult> PasswordRecovery([FromBody] ChangePasswordDto data)
        {
            var respons = await _repo.PasswordRecovery(data.Email, data.NewPassword);
            if (respons.IsSuccess)
            {
                return Ok(respons);

            }
            return BadRequest(respons);

        }
        [AllowAnonymous]
        [HttpPost("SendVerificationUrl")]
        public async Task<IActionResult> SendVerificationUrlAsync(SendUrlDto data)
        {
            string code = _repo.SaveVerificationCode(data.Email).Result.Value;
            if (code == null) return BadRequest(Result.Fail("Email no encontrado"));

            //var verificationLink = Url.Action("Compare", "EmailVerification", new { email, code}, Request.Scheme);
            var verificationLink = data.UrlPageVerification + $"?email={data.Email}&code={code}";
            var message = new MailMessage();
            var subject = "Account Verification";
            var body = _repo.generatebody("LincolnTech verificación de registro", "Codigo de verificación",
                $"Por favor verifica tu cuenta haciendo click en este link: <a href=\"{verificationLink}\">Verify Account</a>");

            try
            {
                await _repo.SendEmailAsync(data.Email, subject, body);
                return Ok(Result.Success());
            }
            catch (Exception ex)
            {
                return BadRequest(Result.Fail("Error al enviar el correo electronico: " + ex.Message));

            }

        }
        public class ChangePasswordDto
        {
            public required string Email { get; set; }
            public required string NewPassword { get; set; }

        }
        public class CheckCodeDto
        {
            public required string Email { get; set; }
            public required string Code { get; set; }

        }
        public class SendUrlDto
        {
            public required string Email { get; set; }
            public required string UrlPageVerification { get; set; }

        }
    }

}
     