namespace E_Commerce.Utilities
{
    public class Result
    {
        public bool IsSuccess { get; }
        public string ErrorMessage { get; }

        protected Result(bool isSuccess, string errorMessage)
        {
            IsSuccess = isSuccess;
            ErrorMessage = errorMessage;
        }

        public static Result Success()
        {
            return new Result(true, null);
        }

        public static Result Fail(string errorMessage)
        {
            return new Result(false, errorMessage);
        }
    }

    public class Result<T> : Result
    {
        public T Value { get; }

        protected Result(bool isSuccess, T value, string errorMessage)
            : base(isSuccess, errorMessage)
        {
            Value = value;
        }

        public static Result<T> Success(T value)
        {
            return new Result<T>(true, value, null);
        }

        public static new Result<T> Fail(string errorMessage)
        {
            return new Result<T>(false, default, errorMessage);
        }
    }
}
