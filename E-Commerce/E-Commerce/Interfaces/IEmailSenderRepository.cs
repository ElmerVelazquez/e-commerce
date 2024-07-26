using E_Commerce.Utilities;

namespace E_Commerce.Interfaces
{
    public interface IEmailSenderRepository
    {
        Task<Result> SendEmailAsync(string email, string subject, string message);
        Task<Result<string>> SaveVerificationCode(string email);
        Task<Result> CompareVerificationCode(string email, string code);
        Task<Result> PasswordRecovery(string email, string newpassword);
        public string generatebody(string titulo, string subtitulo, string mensaje);
    }
}
