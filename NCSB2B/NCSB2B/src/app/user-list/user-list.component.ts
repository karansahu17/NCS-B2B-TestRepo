import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Valid } from '../utility/validator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  constructor(
    private router: Router,
    private service: UserService,
    private dataValidator: Valid
  ) {
    //inject router
  }

  form = {
    id: 0,
    firstName: null,
    lastName: null,
    loginId: null,
    password: null,
    email: null,
    status: null,
    roleName: null,
    roleId: null,
    phone: null,
    alternateMobile: null,
    dob: null,
    gender: null,
    imagePath: null
  };

  message = '';
  userList = [];
  list = [];
  pageNo = 0;
  isEdit: boolean = false;
  PageCount: any = [];
  editMessage = '';
  deleteMessage = '';
  searchMessage = '';

  editForm = {
    id: 0,
    firstName: null,
    lastName: null,
    loginId: null,
    password: null,
    email: null,
    status: null,
    roleName: null,
    roleId: null,
    phone: null,
    alternateMobile: null,
    dob: null,
    gender: null,
    imagePath: null
  };

  previous() {
    this.pageNo--;
    if (this.pageNo < 0) {
      this.pageNo = 0;
    }
    this.search();
  }

  next() {
    this.pageNo++;
    this.search();
  }

  go(pg) {
    this.pageNo = pg;
    this.search();
  }

  initEditForm() {
    this.editForm.id = 0;
    this.editForm.firstName = '';
    this.editForm.lastName = '';
    this.editForm.loginId = '';
    this.editForm.password = '';
    this.editForm.email = '';
    this.editForm.status = '';
    this.editForm.roleName = '';
    this.editForm.roleId = '';
    this.editForm.phone = '';
    this.editForm.alternateMobile = '';
    this.editForm.dob = '';
    this.editForm.gender = '';
    this.editForm.imagePath = '';
    this.editMessage = '';
    this.deleteMessage = '';
    this.searchMessage = '';


  }

  ngOnInit() {
    this.search(); //Loads list
  }

   /**
   * Edit record
   *
   * @param id
   */
  edit(id: number) {
    this.initEditForm();
    var _self = this;
    this.editForm.id = id;
    if (this.editForm.id > 0) {
      this.isEdit = true;
      this.service.get(this.editForm.id, function(data) {
        _self.editForm = data.result.data;
      });
    } else {
      this.editForm.id = 0;
      this.isEdit = false;
    }
  }

  /**
   * Deletes a record
   * @param id
   */
  delete(id) {
    var _self = this;
    this.isEdit = true;
    this.service.delete(id, function(data) {
      _self.deleteMessage = 'Record has been deleted successfully';
      _self.search();
      setTimeout(() => {
        _self.deleteMessage = '';
      }, 3000);
    });
  }

  /**
   * Searches and get list
   */
  search() {
    var _self = this;
    this.service.searchPage(this.form, this.pageNo, function(data) {

      if (data.result.data.length > 0) {
        _self.list = data.result.data;
        _self.searchMessage = '';
      } else {
        _self.list = data.result.data;
        _self.searchMessage = 'No Record Found';
        setTimeout(() => {
          _self.searchMessage = '';
        }, 3000);
      }
    });
  }

  // search() {
  //   var _self = this;
  //   this.service.search(this.form, function(data) {
  //     //console.log('Ctl',data);
  //     _self.list = data.result.data;
  //   });
  // }
  save() {
    var _self = this;
    this.service.save(this.editForm, function(data) {
      if (_self.isEdit) {
        _self.editMessage = 'Record has been updated successfully';
      } else {
        _self.editMessage = 'Record has been saved successfully';
      }
      // _self.editMessage = "Record has been Saved Successfully";
      _self.editForm.id = data.result.data;
      console.log('Ctl', data);
      _self.search();
    });
  }

  validateAddRoleBt() {
    var flag = true;

    flag = flag && this.dataValidator.isNotNull(this.editForm.firstName);
    flag = flag && this.dataValidator.isNotNull(this.editForm.lastName);
    flag = flag && this.dataValidator.isNotNull(this.editForm.loginId);
    flag = flag && this.dataValidator.isNotNull(this.editForm.password);
    // flag = flag && this.dataValidator.isNotNull(this.editForm.email);
    flag = flag && this.dataValidator.isNotNull(this.editForm.status);
    flag = flag && this.dataValidator.isNotNull(this.editForm.roleName);
    // flag = flag && this.dataValidator.isNotNull(this.editForm.roleId);
    flag = flag && this.dataValidator.isNotNull(this.editForm.phone);
    // flag = flag && this.dataValidator.isNotNull(this.editForm.alternateMobile);
    flag = flag && this.dataValidator.isNotNull(this.editForm.dob);
    flag = flag && this.dataValidator.isNotNull(this.editForm.gender);
    flag = flag && this.dataValidator.isNotNull(this.editForm.imagePath);
    return flag;
  }
}
