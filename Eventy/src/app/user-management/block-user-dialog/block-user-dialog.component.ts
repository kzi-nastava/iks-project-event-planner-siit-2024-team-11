import { Component, Inject } from '@angular/core';
import { BlockUser } from '../model/users.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

export interface BlockUserData {
  title: string;
  message: string;
  blockUser: BlockUser
}

@Component({
  selector: 'app-block-user-dialog',
  templateUrl: './block-user-dialog.component.html',
  styleUrl: './block-user-dialog.component.css'
})
export class BlockUserDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<BlockUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BlockUserData,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  confirm() {
    this.userService.blockUser(this.data.blockUser).subscribe({
      next: () => {
        this.dialogRef.close();
        window.location.reload();
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          data : {
            title: "Error!",
            message: "Error while blocking an user!"
          }
        });
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
