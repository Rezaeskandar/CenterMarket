
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize (CenterMarketContext context, UserManager<User> UserManager)
        {
            if(!UserManager.Users.Any())
            {
                var user = new User 
                {
                    UserName = "rez",
                    Email = "rez@test.com"
                };

                await UserManager.CreateAsync(user,"Pa$$w0rd");
                await UserManager.AddToRoleAsync(user,"Member");

                  var admin = new User 
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await UserManager.CreateAsync(admin,"Pa$$w0rd");
                await UserManager.AddToRolesAsync(admin, new[] {"Member","Admin"});

            }

           

            // Look for any products.
            if (context.Products.Any()) return;   // DB has been seeded
            
                var products = new List<Product>
                {
                    // Phones
                    new Product
                    {
                        Name = "iPhone 13 Pro",
                        Description = "The iPhone 13 Pro features a 6.1-inch Super Retina XDR display with ProMotion, A15 Bionic chip, and a triple-camera system with advanced computational photography.",
                        Price = 99900,
                        PictureUrl = "/images/phones/iphone13pro.png",
                        Brand = "Apple",
                        Type = "Smartphone",
                        QuantityInStock = 50
                    },
                    new Product
                    {
                        Name = "Samsung Galaxy S21",
                        Description = "The Samsung Galaxy S21 comes with a 6.2-inch Dynamic AMOLED 2X display, Exynos 2100 processor, and a versatile triple-camera setup.",
                        Price = 79999,
                        PictureUrl = "/images/phones/galaxys21.png",
                        Brand = "Samsung",
                        Type = "Smartphone",
                        QuantityInStock = 75
                    },
                    // Laptops
                    new Product
                    {
                        Name = "MacBook Pro 16",
                        Description = "The MacBook Pro 16 features a 16-inch Retina display, M1 Pro chip, 16GB RAM, and 512GB SSD for exceptional performance.",
                        Price = 249900,
                        PictureUrl = "/images/laptops/macbookpro16.png",
                        Brand = "Apple",
                        Type = "Laptop",
                        QuantityInStock = 30
                    },
                    new Product
                    {
                        Name = "Dell XPS 13",
                        Description = "Dell XPS 13 comes with a 13.4-inch FHD+ display, Intel Core i7-1165G7, 16GB RAM, and 512GB SSD, known for its compact design and performance.",
                        Price = 139999,
                        PictureUrl = "/images/laptops/xps13.png",
                        Brand = "Dell",
                        Type = "Laptop",
                        QuantityInStock = 45
                    },
                    // Watches
                    new Product
                    {
                        Name = "Apple Watch Series 7",
                        Description = "Apple Watch Series 7 features a larger, always-on Retina display, advanced health monitoring, and powerful fitness tracking.",
                        Price = 39999,
                        PictureUrl = "/images/watches/applewatch7.png",
                        Brand = "Apple",
                        Type = "Smartwatch",
                        QuantityInStock = 100
                    },
                    new Product
                    {
                        Name = "Samsung Galaxy Watch 4",
                        Description = "Samsung Galaxy Watch 4 offers a sleek design, advanced health tracking, and seamless connectivity with Android devices.",
                        Price = 34999,
                        PictureUrl = "/images/watches/galaxywatch4.png",
                        Brand = "Samsung",
                        Type = "Smartwatch",
                        QuantityInStock = 120
                    },
                    // Tablets
                    new Product
                    {
                        Name = "iPad Pro 12.9",
                        Description = "iPad Pro 12.9 features a Liquid Retina XDR display, M1 chip, and support for Apple Pencil and Magic Keyboard.",
                        Price = 109999,
                        PictureUrl = "/images/tablets/ipadpro12.png",
                        Brand = "Apple",
                        Type = "Tablet",
                        QuantityInStock = 60
                    },
                    new Product
                    {
                        Name = "Samsung Galaxy Tab S7+",
                        Description = "Samsung Galaxy Tab S7+ offers a 12.4-inch Super AMOLED display, Snapdragon 865+ processor, and S Pen support.",
                        Price = 89999,
                        PictureUrl = "/images/tablets/galaxytabs7plus.png",
                        Brand = "Samsung",
                        Type = "Tablet",
                        QuantityInStock = 70
                    },
                    // Additional products
                    new Product
                    {
                        Name = "Google Pixel 6",
                        Description = "Google Pixel 6 offers a 6.4-inch AMOLED display, Google Tensor processor, and an advanced dual-camera system for stunning photos and videos.",
                        Price = 59999,
                        PictureUrl = "/images/phones/pixel6.png",
                        Brand = "Google",
                        Type = "Smartphone",
                        QuantityInStock = 80
                    },
                    new Product
                    {
                        Name = "Huawei MateBook X Pro",
                        Description = "Huawei MateBook X Pro features a 13.9-inch 3K display, Intel Core i7-1165G7, 16GB RAM, and 1TB SSD, known for its premium design and performance.",
                        Price = 149999,
                        PictureUrl = "/images/laptops/matebookxpro.png",
                        Brand = "Huawei",
                        Type = "Laptop",
                        QuantityInStock = 25
                    },
                    new Product
                    {
                        Name = "Garmin Forerunner 945",
                        Description = "Garmin Forerunner 945 is a high-end GPS smartwatch designed for athletes, with advanced performance metrics and long battery life.",
                        Price = 49999,
                        PictureUrl = "/images/watches/forerunner945.png",
                        Brand = "Garmin",
                        Type = "Smartwatch",
                        QuantityInStock = 50
                    },
                    new Product
                    {
                        Name = "Microsoft Surface Go 2",
                        Description = "Microsoft Surface Go 2 includes a 10.5-inch PixelSense display, Intel Pentium Gold processor, 8GB RAM, and 128GB SSD, designed for versatility and portability.",
                        Price = 54999,
                        PictureUrl = "/images/tablets/surfacego2.png",
                        Brand = "Microsoft",
                        Type = "Tablet",
                        QuantityInStock = 40
                    }
                };

            foreach (Product product in products)
            {
                context.Products.Add(product);
            }
            // / adds product as list to the context
            // context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}