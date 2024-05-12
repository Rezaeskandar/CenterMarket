using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        public TokenService(UserManager<User> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
            
        }

        public async Task<string> GenerateToken(User user)
        {
            //a claim is that the user says that they are or they have tex: ther email , roll or theirs username 
            var claims = new List<Claim> 
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name,user.UserName),
            };
            // rolls that user belongs to 
            var roles = await _userManager.GetRolesAsync(user); 
            foreach(var role in roles){
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            // SymmetricSecurityKey is the same key to sign in and same key to decript hte key 
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:TokenKey"]));
            // sign the key 
            // used HmacSha256 inseded of HmacSha512
            var creds =new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            //build the token 
            var tokenOtions = new JwtSecurityToken (
                issuer: null,
                audience: null,
                claims: claims,
                expires:DateTime.Now.AddDays(7),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(tokenOtions);
        }
    }
}