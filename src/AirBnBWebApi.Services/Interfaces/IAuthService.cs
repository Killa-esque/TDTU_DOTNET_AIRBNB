// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System.Threading.Tasks;
using AirBnBWebApi.Api.DTOs;

namespace AirBnBWebApi.Services.Interfaces;

public interface IAuthService
{
    Task<RegisterResultDTO> Register(string email, string fullName, string password, string phoneNumber);
    Task<LoginResultDTO> Login(string email, string password);
    Task<OperationResultDTO> ResetPassword(string email, string token, string newPassword);
}
