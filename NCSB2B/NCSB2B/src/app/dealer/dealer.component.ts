import { DealerService } from './../dealer.service';
import { Component, OnInit } from '@angular/core';
import { Valid } from '../utility/validator';
import { Router } from '@angular/router';
import { PartyService } from '../party.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
  form = {
    id: null,
    name: '',
    address: '',
    type: 'Dealer',
    phone: '',
    aadharNo: '',
    gstDetails: '',
    bankDeatails: '',
    licenseNo: '',
    ownerPhotograph: ''
  };

  editForm = {
    id: null,
    name: '',
    address: '',
    type: 'Dealer',
    phone: '',
    aadharNo: '',
    gstDetails: '',
    bankDeatails: '',
    licenseNo: '',
    ownerPhotograph: ''
  };
  message = '';

  list = [];
  pageNo = 0;
  isEdit = false;
  PageCount: any = [];
  editMessage = '';
  deleteMessage = '';
  searchMessage = '';

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
    this.editForm.id = null;
    this.editForm.name = '';
    this.editForm.address = '';
    this.editForm.type = 'Dealer';
    this.editForm.phone = '';
    this.editForm.aadharNo = '';
    this.editForm.gstDetails = '';
    this.editForm.bankDeatails = '';
    this.editForm.licenseNo = '';
    this.editForm.ownerPhotograph = '';
    this.editMessage = '';
    this.deleteMessage = '';
  }

  constructor(
    private router: Router,
    private service: PartyService,
    private dataValidator: Valid
  ) {
    // inject router
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
  dealerList = [];

  search() {
    let _self = this;
    this.service.searchPage(this.form, this.pageNo, function (data) {
      console.log(_self.form.name);
      if (data.result.data.length > 0) {
        _self.list = data.result.data;
        _self.dealerList = [];
        _self.list.forEach(ele => {
          if (_self.dataValidator.isNotNull(ele.type)) {
            if (ele.type == 'Dealer') {
              _self.dealerList.push(ele);
            }
          }
        });
        _self.searchMessage = '';
      } else {
        _self.dealerList = [];
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
    let _self = this;
    this.service.save(this.editForm, function (data) {
      if (_self.isEdit) {
        _self.editMessage = 'Record has been updated successfully';
      } else {
        _self.editMessage = 'Record has been saved successfully';
      }

      _self.editForm.id = data.result.data;
      console.log('Ctl', data);
      _self.search();
    });
  }

  validateAddRoleBt() {
    let flag = true;

    flag = flag && this.dataValidator.isNotNull(this.editForm.name);
    flag = flag && this.dataValidator.isNotNull(this.editForm.address);
    // flag = flag && this.dataValidator.isNotNull(this.editForm.type);
    flag = flag && this.dataValidator.isNotNull(this.editForm.phone);
    flag = flag && this.dataValidator.isNotNull(this.editForm.aadharNo);
    flag = flag && this.dataValidator.isNotNull(this.editForm.gstDetails);
    flag = flag && this.dataValidator.isNotNull(this.editForm.bankDeatails);
    flag = flag && this.dataValidator.isNotNull(this.editForm.licenseNo);
    flag = flag && this.dataValidator.isNotNull(this.editForm.ownerPhotograph);
    return flag;
  }
}
