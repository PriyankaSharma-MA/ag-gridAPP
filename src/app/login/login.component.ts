import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


import { environment } from '../../environments/environment';
import { Console } from '@angular/core/src/console';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  siteurl: string = environment.siteurl;
  foundationId: string;
  navigationPath: string;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.navigationPath = 'view'
  }

  login() {

    localStorage.setItem('foundationId', JSON.stringify(this.foundationId));
    this.router.navigate([this.navigationPath]);

  }

}