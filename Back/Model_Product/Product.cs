using System;
using System.ComponentModel.DataAnnotations;

namespace Back.Model_Product
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Marca { get; set; }
        [Required]
        [MinLength(3)]
        public string Nome { get; set; }
        [Required]
        public double Preco { get; set; }
        public string Descricao { get; set; }

        public Product() { }

        public Product(int id, string marca, string nome, double preco, string descricao)
        {
            this.Id = id;
            this.Marca = marca;
            this.Nome = nome;
            this.Preco = preco;
            this.Descricao = descricao;

        }
        
    }
}
