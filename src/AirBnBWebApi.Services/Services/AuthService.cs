// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System;
using System.Threading.Tasks;
using AirBnBWebApi.Core.Entities;
using AirBnBWebApi.Infrastructure.Interfaces;
using AirBnBWebApi.Services.Interfaces;
using AirBnBWebApi.Api.DTOs;

namespace AirBnBWebApi.Services.Services;
public class AuthService : IAuthService
{
    private readonly IJwtService _jwtService;
    private readonly IKeyTokenService _keyTokenService;
    private readonly IUserRepository _userRepository;

    public AuthService(IJwtService jwtService, IKeyTokenService keyTokenService, IUserRepository userRepository)
    {
        _jwtService = jwtService;
        _keyTokenService = keyTokenService;
        _userRepository = userRepository;
    }

    // Tạo chuỗi ngẫu nhiên làm khóa (sử dụng cho các key public/private)
    private static string GenerateRandomHexString(int length)
    {
        byte[] randomBytes = new byte[length];
        using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
        }
        return BitConverter.ToString(randomBytes).Replace("-", "").ToLower();
    }

    // Xác thực mật khẩu người dùng
    private bool VerifyPassword(string password, string storedHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, storedHash);
    }

    // Đăng ký người dùng mới
    public async Task<RegisterResultDTO> Register(string email, string fullName, string password, string phoneNumber, bool isHost, bool isUser)
    {
        // Kiểm tra xem người dùng với email này đã tồn tại hay chưa
        if (await _userRepository.UserExistsAsync(email))
        {
            return new RegisterResultDTO
            {
                Status = false,
                Message = "Email is already in use."
            };
        }

        // Tạo người dùng mới
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            FullName = fullName,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            PhoneNumber = phoneNumber,
            IsHost = isHost,
            IsAdmin = false,
            isUser = isUser,
            IsDeleted = false,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        // Lưu người dùng mới vào cơ sở dữ liệu
        var addUserSuccess = await _userRepository.AddAsync(user);
        if (addUserSuccess == null)
        {
            return new RegisterResultDTO
            {
                Status = false,
                Message = "User registration failed. No changes were made."
            };
        }

        // Tạo khóa public và private cho người dùng
        string privateKey = GenerateRandomHexString(64);
        string publicKey = GenerateRandomHexString(64);

        // Tạo KeyToken cho người dùng và lưu vào cơ sở dữ liệu
        var (keyTokenStatus, code, keyToken) = await _keyTokenService.CreateKeyTokenAsync(user.Id, publicKey, privateKey);
        if (!keyTokenStatus || keyToken == null)
        {
            return new RegisterResultDTO
            {
                Status = false,
                Message = "KeyToken creation failed."
            };
        }

        // Tạo JWT accessToken và refreshToken
        var tokenPair = _jwtService.GenerateTokens(user.Id, user.Email, user.IsHost, user.IsAdmin, user.isUser, keyToken.PublicKey, keyToken.PrivateKey);

        // Trả về kết quả đăng ký thành công với JWT tokens
        return new RegisterResultDTO
        {
            Status = true,
            Email = user.Email,
            FullName = user.FullName,
            AccessToken = tokenPair.AccessToken,
            RefreshToken = tokenPair.RefreshToken,
            Message = "User registered successfully."
        };
    }

    // Đăng nhập người dùng
    public async Task<LoginResultDTO> Login(string email, string password)
    {
        var user = await _userRepository.GetByEmailAsync(email);

        if (user == null || !VerifyPassword(password, user.PasswordHash))
        {
            return new LoginResultDTO
            {
                Status = false,
                Message = "Email or password is incorrect"
            };
        }

        // Lấy publicKey và privateKey từ KeyToken của người dùng

        var userPrivateKey = await _keyTokenService.GetUserPrivateKeyAsync(user.Id);
        var userPublicKey = await _keyTokenService.GetUserPublicKeyAsync(user.Id);


        if (!userPrivateKey.status || !userPublicKey.status)
        {
            return new LoginResultDTO
            {
                Status = false,
                Message = "Failed to retrieve keys for user."
            };
        }

        // Tạo accessToken và refreshToken từ JwtService
        var tokenPair = _jwtService.GenerateTokens(user.Id, user.Email, user.IsHost, user.IsAdmin, user.isUser, userPublicKey.publicKey, userPrivateKey.privateKey);

        // Trả về kết quả đăng nhập thành công
        return new LoginResultDTO
        {
            Status = true,
            User = user,
            AccessToken = tokenPair.AccessToken,
            RefreshToken = tokenPair.RefreshToken,
        };
    }


    // Reset password (chưa triển khai)
    public Task<OperationResultDTO> ResetPassword(string email, string token, string newPassword)
    {
        throw new NotImplementedException();
    }

    public Task<RefreshTokenResultDTO> RefreshToken(string accessToken, string refreshToken)
    {
        throw new NotImplementedException();
    }
}
