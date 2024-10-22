// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using AirBnBWebApi.Api.Helpers;
using AirBnBWebApi.Api.DTOs;
using AirBnBWebApi.Services.Interfaces;
using AirBnBWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AirBnBWebApi.Api.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    // Đăng ký người dùng mới
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
    {
        if (!ModelState.IsValid)
        {
            return ResponseHelper.BadRequest("Invalid Data", ModelState);
        }

        // Gọi service để đăng ký người dùng mới
        var result = await _authService.Register(registerDto.Email, registerDto.FullName, registerDto.Password, registerDto.PhoneNumber);

        if (!result.Status)
        {
            return ResponseHelper.BadRequest(result.Message);
        }

        // Trả về thông tin đăng ký thành công với token
        return ResponseHelper.Success(new
        {
            result.Email,
            result.FullName,
            token = new
            {
                result.AccessToken,
                result.RefreshToken
            }
        }, result.Message);
    }

    // Đăng nhập người dùng
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
    {
        if (!ModelState.IsValid)
        {
            return ResponseHelper.BadRequest("Invalid Data", ModelState);
        }

        // Gọi service để đăng nhập người dùng
        var result = await _authService.Login(loginDto.Email, loginDto.Password);

        if (!result.Status)
        {
            return ResponseHelper.BadRequest(result.Message);
        }

        // Trả về thông tin người dùng và token đăng nhập
        return ResponseHelper.Success(new
        {
            user = new
            {
                result.User.Id,
                result.User.FullName,
                result.User.Email,
                result.User.PhoneNumber,
                result.User.IsHost,
                result.User.IsAdmin,
                result.User.isUser,
                result.User.Avatar
            },
            token = new
            {
                result.AccessToken,
                result.RefreshToken
            }
        }, "Login successful");
    }

    // // Làm mới token (refresh token)
    // [HttpPost("refresh-token")]
    // public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDTO refreshTokenDto)
    // {
    //     var result = await _authService.RefreshToken(refreshTokenDto.AccessToken, refreshTokenDto.RefreshToken);

    //     if (!result.Status)
    //     {
    //         return ResponseHelper.BadRequest(result.Message);
    //     }

    //     // Trả về token mới sau khi refresh
    //     return ResponseHelper.Success(new
    //     {
    //         token = new
    //         {
    //             result.AccessToken,
    //             result.RefreshToken
    //         }
    //     }, "Token refreshed successfully");
    // }

    // // Reset mật khẩu người dùng
    // [HttpPost("reset-password")]
    // public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDto)
    // {
    //     if (!ModelState.IsValid)
    //     {
    //         return ResponseHelper.BadRequest("Invalid Data", ModelState);
    //     }

    //     // Gọi service để reset mật khẩu
    //     var result = await _authService.ResetPassword(resetPasswordDto.Email, resetPasswordDto.Token, resetPasswordDto.NewPassword);

    //     if (!result.Status)
    //     {
    //         return ResponseHelper.BadRequest(result.Message);
    //     }

    //     // Trả về kết quả reset mật khẩu thành công
    //     return ResponseHelper.Success<object>(null, "Password reset successfully");
    // }
}
