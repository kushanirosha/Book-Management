using System.Collections.Generic;
using System.Linq;
using BookManagementAPI.Models;

namespace BookManagementAPI.Repositories
{
    public static class BookRepository
    {
        private static List<Book> books = new List<Book>();

        public static List<Book> GetAllBooks() => books;

        public static Book GetBookById(int id) => books.FirstOrDefault(b => b.Id == id);

        public static void AddBook(Book book)
        {
            book.Id = books.Count > 0 ? books.Max(b => b.Id) + 1 : 1;
            books.Add(book);
        }

        public static void UpdateBook(Book book)
        {
            var existingBook = GetBookById(book.Id);
            if (existingBook != null)
            {
                existingBook.Title = book.Title;
                existingBook.Author = book.Author;
                existingBook.ISBN = book.ISBN;
                existingBook.PublicationDate = book.PublicationDate;
            }
        }

        public static void DeleteBook(int id)
        {
            var book = GetBookById(id);
            if (book != null)
            {
                books.Remove(book);
            }
        }
    }
}
