import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {SampleUser} from "../../services/SampleData";
import {NavigationEnd, Router} from "@angular/router";
import {clone} from "../../services/clone";
import {UserService} from "../../services/user.service";
import {ImageUploadDialogComponent} from "../dialogs/image-upload-dialog/image-upload-dialog.component";
import {WebcamImage} from "ngx-webcam";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  iAmUser: User;
  clonedIAmUser: User;
  isBusy = false;
  //TODO: uncomment the other line, comment this
  //BANNERS: string[] = new Array(10).fill('').map((value, i) => `/assets/img/banner/banner-1.jpg`);
  BANNERS: string[] = new Array(10).fill('').map((value, i) => `/assets/img/profileBg/bg-${i}.jpg`);

  constructor(private translate: TranslateService,
              private readonly auth: AuthenticationService,
              private readonly router: Router,
              private readonly userService: UserService,
              public dialog: MatDialog,
              public readonly notification: NotificationService) {

    //TODO: remove SampleUser
    this.iAmUser = this.auth.iAmUser || SampleUser;
    this.clonedIAmUser = clone(this.iAmUser);
  }

  ngOnInit(): void {
    this.edit = this.router.url.includes('edit');
    this.router.events.subscribe((val) => {
      this.edit = (val as NavigationEnd).url?.includes('edit');
    });
  }

  edit: boolean = false;


  saveChangesClicked() {
    let tempUser: User = clone(this.clonedIAmUser);
    this.iAmUser = tempUser;
    this.router.navigateByUrl('/profile');
    this.auth.iAmUser = tempUser;
  }

  changedBanner(i: number) {
    this.clonedIAmUser.bannerImage = i;
  }

  getBannerUrl(i: number = 0): string {
    return this.BANNERS[i];
  }

  isBannerChecked(i: number): boolean {
    console.log(this.clonedIAmUser.bannerImage)
    return this.clonedIAmUser.bannerImage == i;
  }

  cancelClicked() {
    this.clonedIAmUser = clone(this.iAmUser);
    this.router.navigateByUrl('/profile');
  }

  chooseImageClicked(fileInput: HTMLInputElement) {
    const uploadDialog = this.dialog.open(ImageUploadDialogComponent, {
      autoFocus: false,
      data: {fileInput: fileInput}
    });

    uploadDialog.afterClosed().subscribe((value: WebcamImage) => {
      if(value?.imageAsDataUrl){
        this.clonedIAmUser.profileImage = {base64: value.imageAsDataUrl};
      }

    })
  }

  onFileChanged(event: any) {
    console.log(event)

    //bigger than 5 MB
    if(event.target.files[0].size > 5 * 2**20){
      this.notification.error('imageError.header','imageError.msg')
      return;
    }


    let url: any;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => { // called once readAsDataURL is completed
      url = _event.target?.result;
      this.clonedIAmUser.profileImage = {file: event.target.files[0], base64: url};
    }


  }

  getProfileImage(): string {
    return (this.edit ?
      (this.clonedIAmUser.profileImage?.base64 ?? this.clonedIAmUser.profileImage) : (this.iAmUser.profileImage?.base64 ?? this.iAmUser.profileImage))
      || '/assets/img/default-user.png';
  }

  canSaveChanges(): boolean {
    return JSON.stringify(this.iAmUser) == JSON.stringify(this.clonedIAmUser);
  }

}
