import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LineItemService } from "./../line-item.service";
import { Valid } from "./../utility/validator";

@Component({
  selector: "app-line-item-list",
  templateUrl: "./line-item-list.component.html",
  styleUrls: ["./line-item-list.component.css"]
})
export class LineItemListComponent implements OnInit {
  constructor(
    private router: Router,
    private service: LineItemService,
    private dataValidator: Valid
  ) {
    // inject router
  }
  form = {
    dateTime: "",
    orderId: "",
    productId: "",
    quantity: ""
  };

  editForm = {
    id: 0,
    dateTime: "",
    orderId: "",
    productId: "",
    quantity: ""
  };

  message = "";

  list = [];
  pageNo = 0;
  isEdit: boolean = false;
  PageCount: any = [];
  editMessage = "";
  deleteMessage = "";
  searchMessage = "";

  initEditForm() {
    this.editForm.id = 0;
    this.editForm.dateTime = "";
    this.editForm.orderId = "";
    this.editForm.productId = "";
    this.editForm.quantity = "";
    this.editMessage = "";
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
      _self.deleteMessage = "Record has been deleted successfully";
      _self.search();
      setTimeout(() => {
        _self.deleteMessage = "";
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
    this.service.save(this.editForm, function (data) {
      if (_self.isEdit) {
        _self.editMessage = "Record has been updated successfully";
      } else {
        _self.editMessage = "Record has been saved successfully";
      }

      _self.editForm.id = data.result.data;
      console.log("Ctl", data);
      _self.search();
    });
  }

  validateAddRoleBt() {
    let flag = true;

    flag = flag && this.dataValidator.isNotNull(this.editForm.dateTime);
    flag = flag && this.dataValidator.isNotNull(this.editForm.orderId);
    flag = flag && this.dataValidator.isNotNull(this.editForm.productId);
    flag = flag && this.dataValidator.isNotNull(this.editForm.quantity);

    return flag;
  }
}
