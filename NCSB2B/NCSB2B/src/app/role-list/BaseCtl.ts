import { Component, OnInit } from '@angular/core';

export class BaseCtl implements OnInit {

  baseMessage = "Base Message";

  ngOnInit() {
    this.baseMessage = "Base Message 111";
  }

}
