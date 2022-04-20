import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-follow-dialog',
  templateUrl: './follow-dialog.component.html',
  styleUrls: ['./follow-dialog.component.scss']
})
export class FollowDialogComponent implements OnInit, AfterViewInit {

  constructor(
    private readonly userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: {tab: number, id: string},
    private readonly router: Router,
    public dialogRef: MatDialogRef<FollowDialogComponent>) { }

  ngOnInit(): void {
  }

  followerList: User[] = [];
  followingList: User[] = [];

  public loadFollower(){
    this.userService.getFollower(this.data.id).then(follower => {
      this.followerList.push(...follower);
    });
  }

  public loadFollowing(){
    this.userService.getFollowing(this.data.id).then(following => {
      this.followingList.push(...following);
    });
  }

  ngAfterViewInit(): void {
    this.loadFollower();
    this.loadFollowing();
  }

  changedTab(idx: number) {

  }

  clickOnUser(username?: string){
    this.router.navigateByUrl('/search/user/' + (username == null ? '' : username));
    this.dialogRef.close();
  }

}
