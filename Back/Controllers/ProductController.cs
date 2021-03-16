using System;
using System.Threading.Tasks;
using Back.Model_Product;
using Back.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IRepository _repo;
        public ProductController(IRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous]
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repo.GetProductsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]        
        [Route("{Id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var result = await _repo.GetProductsAsyncById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Post([FromBody] Product Prod)
        {
            try
            {
                _repo.Add(Prod);
                if (await _repo.SaveChangesAsync())
                {
                    return Ok(Prod);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        [HttpPut]
        [Route("update/{Id}")]
        public async Task<IActionResult> Put(int Id, Product Prod)
        {
            try
            {
                var result = await _repo.GetProductsAsyncById(Id);
                if (result == null) return NotFound("Produto não encontrado."); //CASO O PRODUTO NN FOR ENCONTRADO, O METODO PARA AQUI.

                _repo.Update(Prod);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok(Prod);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("{Id}")]
        public async Task<IActionResult> delete(int Id)
        {
            try
            {
                var result = await _repo.GetProductsAsyncById(Id);
                if (result == null) return NotFound("Produto não encontrado."); //CASO O PRODUTO NN FOR ENCONTRADO, O METODO PARA AQUI.

                _repo.Delete(result);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok(new { Message = "Deletado" });
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}