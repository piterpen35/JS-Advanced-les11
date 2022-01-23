import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthorizeUser } from '../../shared/models/AuthorizeUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() authorizUser: AuthorizeUser;
  @Output() authToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {

  }

  logout(): void {
    this.authToggle.emit();
  }
}
