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
    this.userService.getFollower();
  }

  ngAfterViewInit(): void {
    this.loadFollower();
  }

}
