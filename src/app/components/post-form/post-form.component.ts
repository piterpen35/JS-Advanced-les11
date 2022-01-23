import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthorizeUser } from '../../shared/models/AuthorizeUser';
import { Post } from '../../shared/interface/Post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  @Input() authorizUser: AuthorizeUser;
  @Output() addNewPost = new EventEmitter<Post>();

  postIsHidden = true;

  postForm: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      postThema: new FormControl('', [Validators.required, Validators.minLength(6)]),
      postBody: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  createPost(): void {
    const data = {
      thema: this.postForm.controls.postThema.value,
      text: this.postForm.controls.postBody.value,
      creator: `${this.authorizUser.firstName} ${this.authorizUser.lastName}`,
      creatorId: this.authorizUser.userId
    };

    this.http.post('http://localhost:3000/api/post/create', data).subscribe(
      res => {
        this.postForm.reset();
        this.addNewPost.emit(res as Post);
        this.postIsHidden = !this.postIsHidden;
      },
      err => {
        alert(err);
      }
    );
  }

}
