// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
using System;
using System.Security.Claims;
using AirBnBWebApi.Core.DTOs;

namespace AirBnBWebApi.Services.Interfaces;

public interface IJwtService
{
    TokenPairResultDTO GenerateTokens(Guid userId, string email, bool isHost, bool isAdmin, bool isUser, string publicKey, string privateKey);
    ClaimsPrincipal? ValidateToken(string token, string secret);
}
