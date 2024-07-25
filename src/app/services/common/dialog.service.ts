import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';



@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogParametres: Partial< DialogParameter>): void {
    const dialogRef = this.dialog.open(dialogParametres.componentType, {
      width: dialogParametres.options?.width,
      height: dialogParametres.options?.height,
      position: dialogParametres.options?.position,
      data: dialogParametres.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParametres.data) {
        dialogParametres.afterClosed()
      }
    });
  }
}

export class DialogParameter {
  componentType: ComponentType<any>
  data: any;
  afterClosed: () => void;
  options?: Partial<DialogOptions> = new DialogOptions;
}
export class DialogOptions {
  width?: string="250px";
  height?: string;
  position?: DialogPosition;
}
