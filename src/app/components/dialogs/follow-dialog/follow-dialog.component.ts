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
    this.loadFollower();
  }

  _followerList: any;
  _followingList: any;

  private loadFollower(){
    this._followerList = this.userService.getFollower();
    this._followingList = this.userService.getFollowing();
  }

  ngAfterViewInit(): void {
    this.loadFollower();
  }


}
