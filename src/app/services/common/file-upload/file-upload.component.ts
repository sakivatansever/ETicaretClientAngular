
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileSystemDirectoryEntry,FileSystemFileEntry,NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from '../../ui/customer-toastr.service';
import { HttpclientService } from '../httpclient.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpclientService,
    private alertifyService: AlertifyService, private customToastrService: CustomerToastrService, private dialog: MatDialog) {


  }


  @Input() options: Partial<FileUploadOptions>

  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });

    }
    this.openDialog(() => {
      this.httpClientService.post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({ "responseType": "blob" })
      }, fileData).subscribe(data => {

        const message: string = "Dosyalar başarıyla yüklenmiştir."; // message değişkenini bu blok içinde tanımlıyoruz

        if (this.options.isAdminPage) {
          this.alertifyService.message(message, { dismissOther: true, messageType: MessageType.Success, position: Position.TopRight })
        }
        else {
          this.customToastrService.message(message, "Başarılı", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight
          })
        }

      }, (errorResponse: HttpErrorResponse) => {

        const message: string = "Dosyalar yüklenirken beklenmeyen bir hata meydana geldi."; // message değişkenini bu blok içinde tanımlıyoruz

        if (this.options.isAdminPage) {
          this.alertifyService.message(message, { dismissOther: true, messageType: MessageType.Error, position: Position.TopRight })
        }
        else {
          this.customToastrService.message(message, "Başarısız", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight
          })
        }


      })
})
    
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '250px',
      data: FileUploadDialogState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == FileUploadDialogState.Yes) {
        afterClosed();
      }
    });
  }

}


export enum FileUploadDialogState {

  Yes,
  No
}


export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false



}


