// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AirBnBWebApi.Core.Entities;

namespace AirBnBWebApi.Services.Interfaces;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User> GetUserByIdAsync(Guid id);
    Task<User> CreateUserAsync(CreateUserDTO userDto);
    Task<User> UpdateUserAsync(Guid id, UpdateUserDTO userDto);
    Task<bool> DeleteUserAsync(Guid id);
    Task<IEnumerable<User>> SearchUsersAsync(string name);
    Task<(bool Status, string AvatarUrl, string ErrorMessage)> UploadAvatarAsync(IFormFile file);
}


