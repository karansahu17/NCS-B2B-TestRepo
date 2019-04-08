import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Valid } from '../utility/validator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  constructor(
    private router: Router,
    private service: ProductService,
    private dataValidator: Valid
  ) {
    //inject router
  }
  form = {
    id: 0,
    name: '',
    bagQuantity: '',
    size: ''
  };

  message = '';

  list = [];
  pageNo = 0;
  isEdit: boolean = false;
  PageCount: any = [];
  editMessage = '';
  deleteMessage = '';
  searchMessage = '';

  editForm = {
    id: 0,
    name: '',
    bagQuantity: '',
    size: ''
  };

  addCartForm: any = {};

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
    this.editForm.name = '';
    this.editForm.bagQuantity = '';
    this.editForm.size = '';
    this.editMessage = "";
    this.deleteMessage = "";
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
      this.service.get(this.editForm.id, function (data) {
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
    var _self = this;
    this.service.searchPage(this.form, this.pageNo, function (data) {
      console.log(_self.form.name);
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
    this.service.save(this.editForm, function (data) {
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

    flag = flag && this.dataValidator.isNotNull(this.editForm.name);
    flag = flag && this.dataValidator.isNotNull(this.editForm.bagQuantity);
    flag = flag && this.dataValidator.isNotNull(this.editForm.size);
    return flag;
  }


  openAddCartModel(param: any) {
    console.log(this.addCartForm , "Open Add To Cart Model == ", param);
    this.addCartForm = {};
    this.addCartForm.productId = param.id;
    this.addCartForm.userId = 2;
    this.addCartForm.qty = 1;
  }

  cartAddedMessage: any;
  addToCart() {
    var _self = this;
    this.service.addProToCart(_self.addCartForm, function (data) {
      console.log("data.result.data ", data.result.data);
      _self.cartAddedMessage = "Product added successfully";
      setTimeout(() => {
        _self.cartAddedMessage = "";
      }, 4000);
    });
  }

  validateAddCart() {
    var flag = true;
    flag = flag && this.dataValidator.isNotNull(this.addCartForm.qty);
    return flag;
  }

}
