import { Component, OnInit } from '@angular/core';
import { BlogEntryDTO, CategoryDTO, UserDTO } from '../../models/dto';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogEntries: BlogEntryDTO[] = [];
  pagedBlogEntries: BlogEntryDTO[] = [];
  categories: CategoryDTO[] = [];
  authors: UserDTO[] = [];
  selectedCategory: string = '';
  selectedAuthor: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  authorId: number | undefined;
  viewOption: string = 'myEntries';

  constructor(
    private blogEntryService: BlogService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private userService: UserService 
  ) {}

  ngOnInit(): void {
    this.authorId = Number(this.authService.getUserId()) ?? undefined;
    this.loadBlogEntries();
    this.loadCategories();
    this.loadAuthors(); 
  }

  loadBlogEntries(): void {
    if (this.viewOption === 'myEntries') {
      this.blogEntryService.getAllAuthorEntries(this.authorId ?? 0).subscribe(entries => {
        this.blogEntries = entries.sort((a, b) => <any>new Date(b.publicationDate) - <any>new Date(a.publicationDate));
        this.updatePagedEntries();
      });
    } else {
      this.blogEntryService.getAllEntries().subscribe(entries => {
        this.blogEntries = entries.sort((a, b) => <any>new Date(b.publicationDate) - <any>new Date(a.publicationDate));
        this.updatePagedEntries();
      });
    }
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadAuthors(): void { 
    this.userService.getAllUsers().subscribe(users => {
      this.authors = users;
    });
  }

  updatePagedEntries(): void {
    let filteredEntries = this.blogEntries;

    if (this.selectedCategory) {
      filteredEntries = filteredEntries.filter(entry => entry.categories.some(cat => cat.id === +this.selectedCategory));
    }

    if (this.selectedAuthor) {
      filteredEntries = filteredEntries.filter(entry => entry.author.id === +this.selectedAuthor);
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedBlogEntries = filteredEntries.slice(startIndex, startIndex + this.pageSize);
  }

  toggleView(): void {
    this.currentPage = 1;
    this.loadBlogEntries();
    this.updatePagedEntries();
  }

  filterEntries(): void {
    this.currentPage = 1;
    this.updatePagedEntries();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updatePagedEntries();
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.blogEntries.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }

  deleteEntry(entryId: number): void {
    this.blogEntryService.deleteEntry(entryId).subscribe(() => {
      this.loadBlogEntries();
    });
  }
}