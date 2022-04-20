import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-follow-dialog',
  templateUrl: './follow-dialog.component.html',
  styleUrls: ['./follow-dialog.component.scss']
})
export class FollowDialogComponent implements OnInit, AfterViewInit {

  constructor(
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
  }

  followerList: User[] = [];
  followingList: User[] = [];

  private loadFollower(){
    this._followerList = this.userService.getFollower();
    this._followingList = this.userService.getFollowing();
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
