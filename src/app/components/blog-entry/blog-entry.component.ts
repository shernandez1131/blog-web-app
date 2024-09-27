import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CategoryService } from '../../services/category.service';
import { BlogEntryDTO, CategoryDTO } from '../../models/dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit {
  blogEntry: BlogEntryDTO = { id: 0, title: '', content: '', publicationDate: new Date(), authorId: 0, author: { firstName: '', lastName: '', email: '' }, categories: [] };
  categories: CategoryDTO[] = [];
  public authorId: number | undefined;

  constructor(
    private blogEntryService: BlogService, 
    private categoryService: CategoryService, 
    private authService: AuthService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    const entryId = this.route.snapshot.paramMap.get('id');
    this.authorId = Number(this.authService.getUserId()) ?? undefined;
    this.loadCategories(); // Load categories on init

    if (entryId && entryId != '0') {
      this.loadBlogEntry(+entryId);
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: CategoryDTO[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }

  loadBlogEntry(entryId: number) {
    this.blogEntryService.getEntry(entryId).subscribe(
      (data: BlogEntryDTO) => {
        this.blogEntry = data;
        this.blogEntry.author = { firstName: '', lastName: '', email: '' };
      },
      (error) => {
        console.error('Error loading blog entry', error);
      }
    );
  }

  saveBlogEntry() {
    this.blogEntry.authorId = this.authorId ?? 0;
    if (this.blogEntry.id != 0) {
      this.blogEntryService.updateEntry(this.blogEntry).subscribe(
        () => {
          this.blogEntry.categories.forEach((category) => {
            this.blogEntryService.associateEntryWithCategory(this.blogEntry.id ?? 0, category.id ?? 0).subscribe();
          })
          this.router.navigate(['/blogs']);
        },
        (error) => {
          console.error('Error updating blog entry', error);
        }
      );
    } else {
      this.blogEntryService.createEntry(this.blogEntry).subscribe(
        (response) => {
          this.blogEntry.categories.forEach((category) => {
            this.blogEntryService.associateEntryWithCategory(response.blogEntry.id, category.id ?? 0).subscribe();
          })
          this.router.navigate(['/blogs']);
        },
        (error) => {
          console.error('Error creating blog entry', error);
        }
      );
    }
  }
}
