import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {SampleUser} from "../../services/SampleData";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {clone} from "../../services/clone";
import {UserService} from "../../services/user.service";
import {ImageUploadDialogComponent} from "../dialogs/image-upload-dialog/image-upload-dialog.component";
import {WebcamImage} from "ngx-webcam";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {FollowDialogComponent} from "../dialogs/follow-dialog/follow-dialog.component";

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
              private readonly route: ActivatedRoute,
              private readonly userService: UserService,
              public dialog: MatDialog,
              public readonly notification: NotificationService) {

    //TODO: remove SampleUser
    this.iAmUser = this.auth.iAmUser || SampleUser;
    this.clonedIAmUser = clone(this.iAmUser);
  }

  ngOnInit(): void {
    console.log(this.router.url.split('/'))
    // subscribe to edit only if you are on your own profile page
    this.editForbidden = this.router.url.split('/')[1] !== 'profile';
    if(!this.editForbidden){
      this.edit = this.router.url.includes('edit');
      this.router.events.subscribe((val) => {
        this.edit = (val as NavigationEnd).url?.includes('edit');
      });
    } else {
      const routeParams = this.route.snapshot.paramMap;
      let username = routeParams.get('username');
      console.log(username);
      if(username)
        this.userService.getUser(username.trim()).then(user => {
          this.isMe = this.iAmUser.id == user.id;
          this.iAmUser = user;
        }, () => this.userNotFound = true
        ).then(() => {
          if (!this.userNotFound)
            this.refreshIsFollowing()
        });
    }

  }

  edit: boolean = false;
  editForbidden: boolean = false;
  isFollowing: boolean = false;
  userNotFound: boolean = false;
  isMe: boolean = false;


  saveChangesClicked() {
    let tempUser: User = clone(this.clonedIAmUser);
    Object.keys(this.iAmUser).forEach(key => {
      // @ts-ignore
      if(JSON.stringify(this.iAmUser[key]) == JSON.stringify(tempUser[key])){
        // @ts-ignore
        delete tempUser[key]
      }

    })
    this.isBusy = true;
    this.userService.updateUser(tempUser).then(user => {
      if(user){
        this.iAmUser = user;
        this.clonedIAmUser = clone(user);
        this.router.navigateByUrl('/profile');
      }
    }).finally(() => this.isBusy = false);
  }

  changedBanner(i: number) {
    this.clonedIAmUser.bannerImage = i;
  }

  getBannerUrl(): string {
    return this.edit ? this.BANNERS[this.clonedIAmUser.bannerImage!] : this.BANNERS[this.iAmUser.bannerImage!];
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
      (this.clonedIAmUser.profileImage?.base64 ?? this.clonedIAmUser.profileImage) : this.iAmUser.profileImage)
      || '/assets/img/default-user.png';
  }

  canSaveChanges(): boolean {
    return JSON.stringify(this.iAmUser) == JSON.stringify(this.clonedIAmUser);
  }

  getDateString(date?: Date | string) {
    if(typeof date == 'string')
      date = new Date(date)

    return date!.toLocaleDateString()
  }

  followClicked() {
    if(!this.isFollowing)
      this.userService.followUser(this.iAmUser.id!).then(() => {
        this.refreshIsFollowing();
        this.auth.iAmUser.followingNum! += 1;
        this.iAmUser.followerNum! += 1;
      });
    else
      this.userService.unfollowUser(this.iAmUser.id!).then(() =>{
        this.refreshIsFollowing();
        this.auth.iAmUser.followingNum! -= 1;
        this.iAmUser.followerNum! -= 1;
      });
  }

  private refreshIsFollowing() {
    this.userService.isFollowing(this.iAmUser.id!).then(isFollowing => {
      this.isFollowing = isFollowing;
    })
  }

  public openDialog(followTemp: string){
    const followDialog = this.dialog.open(FollowDialogComponent, {
      width: '40%',
      maxWidth: '',
      height:'70%',
      data: followTemp,
      autoFocus: false,
      panelClass: 'dialogFullSize'
    });
  }
}
