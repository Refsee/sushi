import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods/goods.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-admin-goods',
  templateUrl: './admin-goods.component.html',
  styleUrls: ['./admin-goods.component.scss'],
})
export class AdminGoodsComponent implements OnInit {
  public isOpenForm: boolean = false;

  public adminGoods: Array<IGoodsResponse> = [];
  public adminCategories: Array<ICategoryResponse> = [];
  public formGoods!: FormGroup;
  public isEdit: boolean = false;

  private goodsEditId!: number;

  public isUploaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private goodsService: GoodsService,
    private uploadService: UploadService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.alLCategories();
    this.allGoods();
    this.initGoodsForm();
  }

  openFormAdd(): void {
    if (this.isOpenForm === true) {
      this.formGoods.reset();
    }
    this.isOpenForm = !this.isOpenForm;
  }

  initGoodsForm(): void {
    this.formGoods = this.fb.group({
      category: ['', Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1],
    });
  }

  allGoods(): void {
    this.goodsService.getAll().subscribe((data) => (this.adminGoods = data));
  }

  alLCategories(): void {
    this.categoryService
      .getAll()
      .subscribe((data) => (this.adminCategories = data));
  }

  addGoods(): void {
    if (this.isEdit) {
      this.goodsService
        .update(this.formGoods.value, this.goodsEditId)
        .subscribe(() => {
          this.allGoods();
          this.toastr.success('Product successfully updated');
        });
    } else {
      this.goodsService.create(this.formGoods.value).subscribe(() => {
        this.allGoods();
        this.toastr.success('Product successfully created');
      });
    }
    this.isEdit = false;
    this.formGoods.reset();
    this.isUploaded = false;
    this.openFormAdd();
  }

  editGoods(article: IGoodsResponse): void {
    this.formGoods.patchValue({
      category: article.category,
      name: article.name,
      path: article.path,
      ingredients: article.ingredients,
      weight: article.weight,
      price: article.price,
      imagePath: article.imagePath,
      count: [1],
    });
    this.openFormAdd();
    this.isEdit = true;
    this.goodsEditId = article.id;
    if (this.formGoods.get('imagePath')?.value) {
      this.isUploaded = true;
    }
  }

  deleteGoods(article: IGoodsResponse): void {
    this.goodsService.delete(article.id).subscribe(() => {
      this.allGoods();
      this.toastr.success('Product successfully deleted');
    });
    this.deleteImage(article.imagePath);
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadService
      .uploadFile('images/action', file.name, file)
      .then((data) => {
        this.formGoods.patchValue({
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
        this.formGoods.patchValue({
          imagePath: null,
        });
        if (this.isEdit) {
          this.goodsService
            .update(this.formGoods.value, this.goodsEditId)
            .subscribe(() => {
              this.allGoods();
            });
        }

        this.isUploaded = false;
      })
      .catch((e: any) => console.log(e));
  }

  imageByControl(control: string): string {
    return this.formGoods.get(control)?.value;
  }
}
