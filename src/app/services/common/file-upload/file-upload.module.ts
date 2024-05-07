import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from '../../../dialogs/dialog.module'


@NgModule({
  declarations: [
    FileUploadComponent

  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    DialogModule,
    MatDialogModule, MatButtonModule
  ],
  exports: [
    FileUploadComponent
  ]

})
export class FileUploadModule { }
