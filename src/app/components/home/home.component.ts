import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HttpClient],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  searchQuery = '';
  displayedColumns: string[] = ['title', 'author', 'isbn', 'publicationDate', 'actions'];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => (this.books = data));
  }

  get filteredBooks(): Book[] {
    return this.books.filter((book) =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openAddBook(): void {
    this.router.navigate(['/add-book']);
  }

  editBook(book: Book): void {
    this.router.navigate(['/edit-book', book.id]);
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
  }
}
