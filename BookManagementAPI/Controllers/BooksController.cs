using Microsoft.AspNetCore.Mvc;
using BookManagementAPI.Models;
using BookManagementAPI.Repositories;
using System.Collections.Generic;

namespace BookManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetBooks()
        {
            return Ok(BookRepository.GetAllBooks());
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetBook(int id)
        {
            var book = BookRepository.GetBookById(id);
            if (book == null) return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public ActionResult AddBook([FromBody] Book book)
        {
            BookRepository.AddBook(book);
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateBook(int id, [FromBody] Book book)
        {
            if (id != book.Id) return BadRequest();

            var existingBook = BookRepository.GetBookById(id);
            if (existingBook == null) return NotFound();

            BookRepository.UpdateBook(book);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteBook(int id)
        {
            var existingBook = BookRepository.GetBookById(id);
            if (existingBook == null) return NotFound();

            BookRepository.DeleteBook(id);
            return NoContent();
        }
    }
}
