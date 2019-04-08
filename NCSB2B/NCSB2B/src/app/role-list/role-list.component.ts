import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Valid } from '../utility/validator';
import { RoleService } from './../role.service';
import { BaseCtl } from './BaseCtl';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent extends BaseCtl {

  constructor(
    private router: Router,
    private service: RoleService,
    private dataValidator: Valid
  ) {
    // inject router
    super();
  }
  form = {
// tslint:disable-next-line: quotemark
    name: '',
    discription: ''
  };

  editForm = {
    id: null,
    name: '',
    discription: ''
  };
  message = '';

  list = [];
  pageNo = 0;
  isEdit = false;
  PageCount: any = [];
  editMessage = '';
  deleteMessage = '';
  searchMessage = '';

  initEditForm() {
    this.editForm.id = null;
    this.editForm.name = '';
    this.editForm.discription = '';
    this.editMessage = '';

    this.deleteMessage = "";
  }
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

// tslint:disable-next-line: use-life-cycle-interface
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
    let _self = this;
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
    let _self = this;
    this.isEdit = true;
    // tslint:disable-next-line: only-arrow-functions
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
    this.service.searchPage(this.form, this.pageNo, function (data) {
      console.log(_self.form.name);
      if (data.result.data.length > 0) {
        _self.list = data.result.data;
        _self.searchMessage = "";

      } else {
        _self.list = data.result.data;
        _self.searchMessage = "No Record Found";
        setTimeout(() => {
          _self.searchMessage = "";
        }, 3000);
      }
    });
  }

  // search() {
  //   let _self = this;
  //   this.service.search(this.form, function(data) {
  //     // console.log('Ctl',data);
  //     _self.list = data.result.data;
  //   });
  // }
  save() {
    let _self = this;
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
    let flag = true;

    flag = flag && this.dataValidator.isNotNull(this.editForm.name);
    flag = flag && this.dataValidator.isNotNull(this.editForm.discription);

    return flag;
  }
}
