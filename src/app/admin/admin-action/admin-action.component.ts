import { Component, OnInit } from '@angular/core';
import {
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

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

  public uploadPercent!: number;

  constructor(
    private fb: FormBuilder,
    private actionService: ActionService,
    public storage: Storage
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
        });
    } else {
      this.actionService
        .create({ ...this.formAction.value, date: new Date() })
        .subscribe(() => {
          this.allAction();
        });
    }
    this.isEdit = false;
    this.formAction.reset();
    this.isUploaded = false;
    this.openFormAdd();
    this.uploadPercent = 0;
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
    this.actionService.delete(action.id).subscribe(() => this.allAction());
    this.deleteImage(action.imagePath);
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images/action', file.name, file)
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

  async uploadFile(folder: string, name: string, file: File): Promise<string> {
    const path: string = `${folder}/${name}`;
    let url: string = '';
    const storageRef = ref(this.storage, path);
    const task = uploadBytesResumable(storageRef, file);
    percentage(task).subscribe((data) => (this.uploadPercent = data.progress));
    await task;
    url = await getDownloadURL(storageRef);
    return Promise.resolve(url);
  }

  deleteImage(url: string): void {
    const task = ref(this.storage, url);
    deleteObject(task)
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.formAction.patchValue({
          imagePath: null,
        });

        this.actionService
          .update(this.formAction.value, this.actionEditId)
          .subscribe(() => {
            this.allAction();
          });
        this.isUploaded = false;
      })
      .catch((e: any) => console.log(e));
  }

  imageByControl(control: string): string {
    return this.formAction.get(control)?.value;
  }
}
