// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using AirBnBWebApi.Core.Entities;

namespace AirBnBWebApi.Api.DTOs;

public class LoginResultDTO
{
    public bool Status { get; set; }
    public string Message { get; set; }
    public User User { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}

