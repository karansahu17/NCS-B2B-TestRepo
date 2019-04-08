import { Valid } from "./../utility/validator";
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form = {
    id: null,
    firstName: '',
    lastName: '',
    loginId: '',
    password: '',
    email: '',
    status: '',
    roleName: '',
    phone: '',
    alternateMobile: '',
    dob: '',
    gender: '',
    imagePath: ''
  };

  message = '';

  constructor(
    private aroute: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private dataValidator: Valid
  ) {}

  ngOnInit() {
    var _self = this;
    this.form.id = parseInt(this.aroute.snapshot.paramMap.get('id'));

    if (this.form.id > 0) {
      console.log('Calling to service ----------------');
      this.service.get(this.form.id, function(data) {
        _self.form = data.result.data;
      });
    } else {
      this.form.id = 0;
    }
  }

  save() {
    var _self = this;
    this.service.save(this.form, function(data) {
      _self.message = 'Record has been saved successfully';
      console.log('Ctl', data);
    });
  }

  search() {
    this.router.navigateByUrl('/userlist');
  }

  validateAddRoleBt() {
    let flag = true;

    flag = flag && this.dataValidator.isNotNull(this.form.firstName);
    flag = flag && this.dataValidator.isNotNull(this.form.lastName);
    flag = flag && this.dataValidator.isNotNull(this.form.loginId);
    flag = flag && this.dataValidator.isNotNull(this.form.phone);
    flag = flag && this.dataValidator.isNotNull(this.form.password);
    // flag = flag && this.dataValidator.isNotNull(this.form.email);
    flag = flag && this.dataValidator.isNotNull(this.form.status);
    flag = flag && this.dataValidator.isNotNull(this.form.roleName);
    flag = flag && this.dataValidator.isNotNull(this.form.phone);
    // flag = flag && this.dataValidator.isNotNull(this.form.alternateMobile);
    flag = flag && this.dataValidator.isNotNull(this.form.dob);
    flag = flag && this.dataValidator.isNotNull(this.form.gender);
    flag = flag && this.dataValidator.isNotNull(this.form.imagePath);
    return flag;
  }
}
