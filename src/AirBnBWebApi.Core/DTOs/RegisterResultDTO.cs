// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace AirBnBWebApi.Api.DTOs;
public class RegisterResultDTO
{
    public bool Status { get; set; }
    public string Email { get; set; }
    public string FullName { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public string Message { get; set; }
}
