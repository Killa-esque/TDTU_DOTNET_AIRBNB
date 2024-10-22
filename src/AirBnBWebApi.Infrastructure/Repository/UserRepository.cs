// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using AirBnBWebApi.Core.Entities;
using AirBnBWebApi.Infrastructure.Data;
using AirBnBWebApi.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;


namespace AirBnBWebApi.Infrastructure.Repository;
public class UserRepository : IUserRepository
{
    private readonly AirBnBDbContext _context;

    public UserRepository(AirBnBDbContext context)
    {
        _context = context;
    }

    // Lấy tất cả người dùng
    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users
            .Where(u => !u.IsDeleted) // Không lấy người dùng đã bị xóa
            .ToListAsync();
    }

    // Lấy người dùng theo ID
    public async Task<User> GetByIdAsync(Guid id)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);
    }

    // Lấy người dùng theo email
    public async Task<User> GetByEmailAsync(string email)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email && !u.IsDeleted);
    }

    // Kiểm tra xem người dùng có tồn tại không dựa trên email
    public async Task<bool> UserExistsAsync(string email)
    {
        return await _context.Users
            .AnyAsync(u => u.Email == email && !u.IsDeleted);
    }

    // Thêm mới người dùng
    public async Task<User> AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    // Cập nhật thông tin người dùng
    public async Task<User> UpdateAsync(User user)
    {
        // Tìm người dùng theo Id và đảm bảo rằng người dùng chưa bị xóa
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id && !u.IsDeleted);

        if (existingUser != null)
        {
            // Cập nhật các giá trị của người dùng
            _context.Entry(existingUser).CurrentValues.SetValues(user);

            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            // Trả về đối tượng người dùng đã được cập nhật
            return existingUser;
        }

        // Nếu không tìm thấy người dùng, trả về null hoặc có thể ném ngoại lệ tùy theo cách bạn muốn xử lý
        return null;
    }


    // Xóa người dùng (thực hiện logic xóa mềm)
    public async Task<bool> DeleteAsync(Guid id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);
        if (user != null)
        {
            user.IsDeleted = true; // Đánh dấu người dùng đã bị xóa (xóa mềm)
            await _context.SaveChangesAsync();
            return true;
        }

        return false; // Không tìm thấy người dùng để xóa
    }
}
