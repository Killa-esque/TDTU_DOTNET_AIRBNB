// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System;
using System.Collections.Generic;
using AirBnBWebApi.Core.Enums;

namespace AirBnBWebApi.Core.Entities;

public class Review
{
    public int Id { get; set; }
    public RatingEnum Rating { get; set; }
    public string Comment { get; set; }
    public DateTime ReviewDate { get; set; }
    public int PropertyId { get; set; }
    public int UserId { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
