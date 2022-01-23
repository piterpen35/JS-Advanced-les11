import { Component, OnInit } from '@angular/core';

import { AuthorizeUser } from './shared/models/AuthorizeUser';
import { User } from './shared/interface/User';
import { Post } from './shared/interface/Post';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  auth = true;
  authorizUser: AuthorizeUser;
  posts: Post[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  authToggle(): void {
    this.auth = !this.auth;
  }

  authorizeUser(obj: User): boolean {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop) && obj[prop] === '' || obj[prop] === undefined) {
        return false;
      }
    }
    const { firstName, lastName, id } = obj;
    this.authorizUser = new AuthorizeUser(firstName, lastName, id);
  }

  updatePosts(posts: Post[]): void {
    this.posts = posts;
  }

  updateEditedPost(post: Post): void {
    this.posts.forEach((el, i) => {
      if (el.id === post.id) {
        this.posts[i] = post;
        return false;
      }
    });
  }

  addNewPost(post: Post): void {
    this.posts.unshift(post);
  }

  deletePost(post: Post): void {
    this.posts = this.posts.filter((el) => {
      return el.id !== post.id;
    });
  }

  deleteAllPosts(): void {
    this.posts.length = 0;
  }
}

