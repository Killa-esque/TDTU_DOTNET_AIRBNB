// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Microsoft.AspNetCore.Mvc;
using AirBnBWebApi.Core.Entities;
using AirBnBWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AirBnBWebApi.Api.Helpers;
using AirBnBWebApi.Api.Indetity;

namespace AirBnBWebApi.Api.Controllers;
[Authorize(Policy = IdentityData.Policies.AdminPolicy)]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    // GET: /api/users
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        if (users == null || !users.Any())
        {
            return ResponseHelper.NotFound("No users found.");
        }
        return ResponseHelper.Success(users, "Users retrieved successfully.");
    }

    // GET: /api/users/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return ResponseHelper.NotFound($"User with ID {id} not found.");
        }
        return ResponseHelper.Success(user, "User retrieved successfully.");
    }

    // POST: /api/users
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO userDto)
    {
        if (!ModelState.IsValid)
        {
            return ResponseHelper.ValidationError("Invalid user data provided.", ModelState);
        }

        var createdUser = await _userService.CreateUserAsync(userDto);
        return ResponseHelper.Created(createdUser, "User created successfully.");
    }

    // PATCH: /api/users/{id}
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserDTO userDto)
    {
        if (!ModelState.IsValid)
        {
            return ResponseHelper.ValidationError("Invalid user data provided.", ModelState);
        }

        var updatedUser = await _userService.UpdateUserAsync(id, userDto);
        if (updatedUser == null)
        {
            return ResponseHelper.NotFound($"User with ID {id} not found.");
        }

        return ResponseHelper.Success(updatedUser, "User updated successfully.");
    }

    // DELETE: /api/users/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var deleted = await _userService.DeleteUserAsync(id);
        if (!deleted)
        {
            return ResponseHelper.NotFound($"User with ID {id} not found.");
        }

        return ResponseHelper.NoContent("User deleted successfully.");
    }

    // GET: /api/users/search/{TenNguoiDung}
    [HttpGet("search/{TenNguoiDung}")]
    public async Task<IActionResult> SearchUsers(string TenNguoiDung)
    {
        var users = await _userService.SearchUsersAsync(TenNguoiDung);
        if (users == null || !users.Any())
        {
            return ResponseHelper.NotFound($"No users found with name {TenNguoiDung}.");
        }

        return ResponseHelper.Success(users, "Search results retrieved successfully.");
    }

    // POST: /api/users/upload-avatar
    [HttpPost("upload-avatar")]
    public async Task<IActionResult> UploadAvatar([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return ResponseHelper.BadRequest("No file uploaded.");
        }

        var uploadResult = await _userService.UploadAvatarAsync(file);
        if (!uploadResult.Status)
        {
            return ResponseHelper.InternalServerError("Avatar upload failed.", uploadResult.ErrorMessage);
        }

        return ResponseHelper.Success(uploadResult.AvatarUrl, "Avatar uploaded successfully.");
    }
}
