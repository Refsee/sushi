import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ref } from '@firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  public isOpenForm: boolean = false;
  public adminCategory: Array<ICategoryResponse> = [];
  public formCategory!: FormGroup;
  public isEdit: boolean = false;

  public isUploaded: boolean = false;

  private categoryEditId!: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private uploadService: UploadService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initCategoryForm();
    this.allCategories();
  }

  openFormAdd(): void {
    if (this.isOpenForm === true) {
      this.formCategory.reset();
    }
    this.isOpenForm = !this.isOpenForm;
  }

  initCategoryForm(): void {
    this.formCategory = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  allCategories(): void {
    this.categoryService
      .getAll()
      .subscribe((data) => (this.adminCategory = data));
  }

  addCategory(): void {
    if (this.isEdit) {
      this.categoryService
        .update(this.formCategory.value, this.categoryEditId)
        .subscribe(() => {
          this.allCategories();
          this.toastr.success('Product successfully updated');
        });
    } else {
      this.categoryService.create(this.formCategory.value).subscribe(() => {
        this.allCategories();
        this.toastr.success('Product successfully created');
      });
    }
    this.isEdit = false;
    this.formCategory.reset();
    this.isUploaded = false;
    this.openFormAdd();
  }

  editCategory(category: ICategoryResponse): void {
    this.formCategory.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
    });
    this.openFormAdd();
    this.isEdit = true;
    this.categoryEditId = category.id;
    if (this.formCategory.get('imagePath')?.value) {
      this.isUploaded = true;
    }
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.allCategories();
      this.toastr.success('Product successfully deleted');
    });
    this.deleteImage(category.imagePath);
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadService
      .uploadFile('images/action', file.name, file)
      .then((data) => {
        this.formCategory.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteImage(url: string): void {
    this.uploadService
      .deleteUploadFile(url)
      .then(() => {
        this.isUploaded = false;
        this.formCategory.patchValue({
          imagePath: null,
        });

        if (this.isEdit) {
          this.categoryService
            .update(this.formCategory.value, this.categoryEditId)
            .subscribe(() => {
              this.allCategories();
            });
        }
        this.isUploaded = false;
      })
      .catch((e: any) => console.log(e));
  }

  imageByControl(control: string): string {
    return this.formCategory.get(control)?.value;
  }
}
