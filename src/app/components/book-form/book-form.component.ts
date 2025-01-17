import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  book: Book = { id: 0, title: '', author: '', isbn: '', publicationDate: '' };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.bookService.getBooks().subscribe((books) => {
        this.book = books.find((b) => b.id === +id) || this.book;
      });
    }
  }

  saveBook(): void {
    if (this.isEditMode) {
      this.bookService.updateBook(this.book).subscribe(() => this.navigateHome());
    } else {
      this.bookService.addBook(this.book).subscribe(() => this.navigateHome());
    }
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }
}
