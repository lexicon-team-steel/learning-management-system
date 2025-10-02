using Microsoft.AspNetCore.Identity;

public static class IdentityResultExtensions
{
    public static IDictionary<string, string[]> ToErrorDictionary(this IdentityResult result)
    {
        return result.Errors
            .GroupBy(e => MapToField(e.Code))
            .ToDictionary(
                g => g.Key,
                g => g.Select(e => e.Description).ToArray()
            );
    }

    private static string MapToField(string code) => code switch
    {
        "RoleNotPermitted" => "Roles",
        "DuplicateUserName" => "UserName",
        "DuplicateEmail" => "Email",
        "PasswordTooShort" => "Password",
        _ => "general"
    };
}