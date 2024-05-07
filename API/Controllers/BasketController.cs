using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly CenterMarketContext _context ;
        public BasketController(CenterMarketContext context)
        {
            _context = context;
            
        }

        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBsket();

            if (basket == null) return NotFound();
            return MapBaskeTotDto(basket);
        }

       

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity){
            // get the basket || // create the basket 
            var basket = await RetriveBsket();
            if(basket == null) basket = CreateBasket();

            // get the product 
            var product =await _context.Products.FindAsync(productId);
            if(product == null) return BadRequest(new ProblemDetails{Title ="Product Not Found"});


            // add the item 
            basket.AddItem(product,quantity);
            
            // save the changes 
            var result =await _context.SaveChangesAsync() >0;
           if(result) return CreatedAtRoute("GetBasket", MapBaskeTotDto(basket));

           return BadRequest(new ProblemDetails{Title ="Problem saving item to basket"});
        }

       

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity){
            // get the basket 
            var basket = await RetriveBsket();

            //remove the item 
            if (basket== null ) return NotFound(); 
            basket.RemoveItem(productId,quantity);
            // save the changes 
            var result = await _context.SaveChangesAsync()>0;
 
            if(result) return Ok();
            
            return BadRequest(new ProblemDetails{Title = "Problem removing item from the the basket"}); 
        }

        
        private async Task<Basket> RetriveBsket()
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
 
         private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires= DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            var basket =new Basket {BuyerId =buyerId};
            _context.Baskets.Add(basket); 
            return basket;
        }

         private BasketDto MapBaskeTotDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity


                }).ToList()
            };
        }

    }
}