import { EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
 

@Component({
  selector: 'app-popup-confirmation',
  templateUrl: './popup-confirmation.component.html',
  styleUrls: ['./popup-confirmation.component.css']

})
export class PopupConfirmationComponent implements OnInit {
  @Input()header='Confirmation';
  @Input()message=`This report will be sent to your registered email address,do you wish to continue?`
  @Input()show: boolean=false;
  @Output()hide=new EventEmitter<any>();

ngOnInit(){
  if(this.show){
    this.openDialog('0ms', '0ms');

  }
}
  constructor(public dialog: MatDialog) {}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
   const myCompDialog = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data:{'header':this.header,
    
      'message':this.message}
    });

    console.log(myCompDialog)
    myCompDialog.afterOpened().subscribe((res) => {
      // Trigger After Dialog Opened 
      console.log('After Opened', { res });
    });
    myCompDialog.beforeClosed().subscribe((res) => {
      // Trigger Before Dialog Closed 
      console.log('Before Closed', { res });
      console.log(myCompDialog)

    });
    myCompDialog.afterClosed().subscribe((confirmed:boolean) => {
      // Trigger After Dialog Closed 
      this.hide.emit(confirmed)
      console.log(confirmed);
      
    });
    
  }
 
}



@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  styleUrls: ['./popup-confirmation.component.css']

})
export class DialogAnimationsExampleDialog {
  Header='';
  Message=`
  `
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    console.log(this.dialogRef);
    this.Header=this.data.header
    this.Message=this.data.message

  }

  Yes(){
    this.dialogRef.close(true);
  }
  No(){
    this.dialogRef.close(false);
  }
}

