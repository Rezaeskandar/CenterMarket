using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    public class PagedList<T> : List<T>
    {
        public MetaData MetaData { get; set; }
        public PagedList(List<T> item, int count, int PageNumber, int PageSize)
        {
            MetaData = new MetaData
            {
                TotalCount = count,
               PageSize = PageSize,
               CurrentPage =PageNumber,
               TotalPages = (int)Math.Ceiling(count / (double)PageSize)
            };
        AddRange(item);
        }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
        {
            var count = await query.CountAsync(); 
            var items = await query.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items,count, pageNumber,pageSize);
        }
    }
}