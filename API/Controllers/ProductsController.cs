
using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  
    public  class ProductsController : BaseApiController
    {
        private readonly CenterMarketContext _context ;
        public ProductsController(CenterMarketContext context) 
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            //building our exprestion tree 
             var query = _context.Products
             .Sort(productParams.orderBy)
             .Search(productParams.SearchTerm)
             .Filter(productParams.Brands,productParams.Types)
             .AsQueryable();
              //here goeing to database and ask for products 
             var products = await PagedList<Product>.ToPagedList(
                query,productParams.PageNumber, productParams.PageSize);

                Response.AddPaginationHeader(products.MetaData);
              
                return products;
           
        }

        [HttpGet("{id}")] // api/products/1
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
           if(product == null) return NotFound();
           return product;
        }

        // return  a list of types and brands that are awalbe inside prodduct table 
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            // getting the uniq brand and type from the datatabase by using distinct
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            // to make tow filter on uning anonimose object 
            return Ok(new {brands, types});
        }

    }
}