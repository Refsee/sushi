import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-admin-action',
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.scss'],
})
export class AdminActionComponent implements OnInit {
  public isOpenForm: boolean = false;
  public adminAction: Array<IActionResponse> = [];
  public formAction!: FormGroup;
  public isEdit: boolean = false;

  private actionEditId!: number;

  public isUploaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private actionService: ActionService,
    private uploadService: UploadService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initActionForm();
    this.allAction();
  }

  openFormAdd(): void {
    if (this.isOpenForm === true) {
      this.formAction.reset();
    }
    this.isOpenForm = !this.isOpenForm;
  }

  initActionForm(): void {
    this.formAction = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }
  allAction(): void {
    this.actionService.getAll().subscribe((data) => (this.adminAction = data));
  }

  addAction(): void {
    if (this.isEdit) {
      this.actionService
        .update(
          { ...this.formAction.value, date: new Date() },
          this.actionEditId
        )
        .subscribe(() => {
          this.allAction();
          this.toastr.success('Product successfully updated');
        });
    } else {
      this.actionService
        .create({ ...this.formAction.value, date: new Date() })
        .subscribe(() => {
          this.allAction();
          this.toastr.success('Product successfully created');
        });
    }
    this.isEdit = false;
    this.formAction.reset();
    this.isUploaded = false;
    this.openFormAdd();
  }

  editAction(action: IActionResponse): void {
    this.formAction.patchValue({
      name: action.name,
      title: action.title,
      description: action.description,
      imagePath: action.imagePath,
    });
    this.openFormAdd();
    this.isEdit = true;
    this.actionEditId = action.id;
    if (this.formAction.get('imagePath')?.value) {
      this.isUploaded = true;
    }
  }

  deleteAction(action: IActionResponse): void {
    this.actionService.delete(action.id).subscribe(() => {
      this.allAction();
      this.toastr.success('Product successfully deleted');
    });
    this.deleteImage(action.imagePath);
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadService
      .uploadFile('images/action', file.name, file)
      .then((data) => {
        this.formAction.patchValue({
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
        this.formAction.patchValue({
          imagePath: null,
        });

        if (this.isEdit) {
          this.actionService
            .update(this.formAction.value, this.actionEditId)
            .subscribe(() => {
              this.allAction();
            });
        }

        this.isUploaded = false;
      })
      .catch((e: any) => console.log(e));
  }

  imageByControl(control: string): string {
    return this.formAction.get(control)?.value;
  }
}
