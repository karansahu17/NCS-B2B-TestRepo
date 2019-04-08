import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Valid } from '../utility/validator';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(
    private router: Router,
    private service: CartService,
    private dataValidator: Valid
  ) { }

  form = {
    id: null,
    productId: null,
    qty: '',
    userId: 0
  };

  formUser = {
    userName: ''
  };

  editForm = {
    id: null,
    productId: '',
    qty: '',
    userId: 2
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

  initEditForm() {
    this.editForm.id = 0;
    this.editForm.productId = '';
    this.editForm.qty = '';
    this.editForm.userId = 2;
    this.editMessage = '';
    this.deleteMessage = '';
    this.formUser.userName = 'Ankit Pare';
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

  ngOnInit() {
    this.search(); // Loads list
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

      this.service.get(this.editForm.id, function (data) {
        _self.editForm = data.result.data;

      });
    } else {
      this.formUser.userName = 'Ankit Pare';
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
    this.service.delete(id, function (data) {
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
    let _self = this;
    // tslint:disable-next-line: only-arrow-functions
    this.service.searchPage(this.form, this.pageNo, function (data) {
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
  //   let _self = this;
  //   this.service.search(this.form, function(data) {
  //     // console.log('Ctl',data);
  //     _self.list = data.result.data;
  //   });
  // }
  save() {
    this.form.userId = 2;
    let _self = this;
    this.service.save(this.editForm, function (data) {
      if (_self.isEdit) {
        _self.editMessage = 'Record has been updated successfully';
      } else {
        _self.editMessage = 'Record has been saved successfully';
      }
      _self.editForm.id = data.result.data;
      console.log('Ctl', _self.form.id);
      _self.search();
    });
  }

  validateAddCart() {
    let flag = true;

    flag = flag && this.dataValidator.isNotNull(this.formUser.userName);

    flag = flag && this.dataValidator.isNotNull(this.editForm.qty);

    return flag;
  }



}
