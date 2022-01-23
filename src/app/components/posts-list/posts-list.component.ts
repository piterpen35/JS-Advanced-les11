import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthorizeUser } from './../../shared/models/AuthorizeUser';
import { Post } from './../../shared/interface/Post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  @Input() authorizUser: AuthorizeUser;
  @Input() posts: Post[];
  @Output() updatePosts = new EventEmitter<Post[]>();
  @Output() updateEditedPost = new EventEmitter<Post>();
  @Output() deletePost = new EventEmitter<Post>();
  @Output() deleteAllPosts = new EventEmitter<Post>();

  creator: string;
  error: string;
  popup = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.http.get('http://localhost:3000/api/post/get-all-posts').subscribe(
      res => {
        this.updatePosts.emit(res as Post[]);
      },
      err => {
        this.error = err.error;
      }
    );
  }

  saveChanges(form: NgForm): void {
    const newValue = {
      thema: form.form.controls.thema.value,
      text: form.form.controls.text.value,
      date: form.form.controls.defaultDate.value,
      creator: `${this.authorizUser.firstName} ${this.authorizUser.lastName}`,
      creatorId: this.authorizUser.userId,
      id: form.form.controls.id.value
    };

    this.http.post('http://localhost:3000/api/post/edit-post', newValue).subscribe(
      res => {
        this.updateEditedPost.emit(res as Post);
      },
      err => {
        alert(err.error);
      }
    );
  }

  removePost(post: Post): void {
    this.http.post('http://localhost:3000/api/post/remove-post', post).subscribe(
      res => {
        if (res) {
          this.deletePost.emit(post);
        }
      },
      err => {
        alert(err.message);
      }
    );
  }
  togglePopup(): void {
    this.popup = !this.popup;
  }

  removeAllPosts(): void {
    this.http.delete('http://localhost:3000/api/post/remove-all-posts').subscribe(
      res => {
        if (res) {
          this.deleteAllPosts.emit();
        }
      }
    );
  }

}
