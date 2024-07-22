using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace E_Commerce.Repository
{
    public class EmailSenderRepository: IEmailSenderRepository
    {
        private readonly string? senderEmail;
        private readonly string? senderPassword;
        private readonly SmtpClient smtpClient;
        private readonly EcommerceDbContext _context;

        public EmailSenderRepository(IConfiguration configuration, EcommerceDbContext context)
        {
            _context = context;

            // Configurar el cliente SMTP
            senderEmail = configuration["SmtpSettings:SenderEmail"];
            senderPassword = configuration["SmtpSettings:SenderPassword"];

            smtpClient = new SmtpClient("smtp-mail.outlook.com", 587)
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(senderEmail, senderPassword)
            };
        }
        public async Task<Result> SendEmailAsync(string email, string subject, string message)
        {
            using (var mailMessage = new MailMessage(from: senderEmail, to: email, subject, message))
            {
                mailMessage.IsBodyHtml = true;
                await smtpClient.SendMailAsync(mailMessage);                
            }
            return Result.Success();
        }
        public async Task<Result<string>> SaveVerificationCode(string email)
        {
            var rng = new Random();
            string code = rng.Next(1000000, 9999999).ToString();
            var regis = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (regis == null) return Result<string>.Fail("Email no encontrado");
            regis.verificationCode = code;
            await _context.SaveChangesAsync();
            return Result<string>.Success(code);
        }
        public async Task<Result> CompareVerificationCode(string email, string code)
        {
            var regis = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if(regis == null) return Result.Fail("email no encontrado");
            if (regis.verificationCode != code)
            {
                return Result.Fail("Codigo incorrecto");
            }
            regis.verified = true;
            regis.verificationCode = null;
            await _context.SaveChangesAsync();
            return Result<string>.Success("codigo verificado correctamente");
            
        }
        public async Task<Result> PasswordRecovery(string email, string code, string newpassword)
        {
            var respons = CompareVerificationCode(email, code).Result;
            if (respons.IsSuccess)
            {
                var regisUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
                if (regisUser == null) return Result.Fail("usuario no encontrado");
                int id = regisUser.Id;
                var regisPassword = await _context.Passwords.FirstOrDefaultAsync(u => u.UserId == id);
                if (regisPassword == null) return Result.Fail("usuario no encontrado");
                var userhashedpassword = PasswordHasher.HashPassword(newpassword);
                regisPassword.PasswordHash = userhashedpassword;
                regisUser.verificationCode = null;
                await _context.SaveChangesAsync();
                return Result.Success();
            }
            return respons;

        } 
    }
}
