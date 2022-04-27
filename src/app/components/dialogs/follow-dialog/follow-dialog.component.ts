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
  friendList: User[] = [];

  tabsData = [
    {list: this.followerList, tabName: 'Follower'},
    {list: this.followingList, tabName: 'Following'},
    {list: this.friendList, tabName: 'basics.friends'}
  ];

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

  public loadFriends(){
    this.userService.getFriends(this.data.id).then(following => {
      this.friendList.push(...following);
    });
  }

  ngAfterViewInit(): void {
    this.loadFollower();
    this.loadFollowing();
    this.loadFriends();
  }

  changedTab(idx: number) {
    this.router.navigate([], { queryParams: { follow: idx} });
  }

  clickOnUser(username?: string){
    this.router.navigateByUrl('/search/user/' + (username == null ? '' : username));
    this.dialogRef.close();
  }

  async getUrl(el: HTMLDivElement, user: User): Promise<string> {

    const image = '/api/img/user/'+user.id;
    const defaultImage = '/assets/img/default-user.png';
    return await this.load(image)
      .then(() => {
        console.log("loaded")
        return `url('${image}')`
      })
      .catch(() => {
        console.log("error")
        return `url('${defaultImage}')`
      });

  }


  load(src: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', resolve);
      image.addEventListener('error', reject);
      image.src = src;
    });
  }


}
