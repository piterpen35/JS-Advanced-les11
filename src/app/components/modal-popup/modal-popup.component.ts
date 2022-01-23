import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {

  @Output() togglePopup = new EventEmitter<void>();
  @Output() removeAllPosts = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
