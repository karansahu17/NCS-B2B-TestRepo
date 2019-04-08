import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  message = "";

  list = [];

  form = {
    "name": "",
  };

  constructor(private router: Router, private service: ProductService) { //inject router 
  }

  ngOnInit() {
    this.search(); //Loads list 
  }


  /**
    * Edit record 
    * 
    * @param id 
    */
  edit(id) {
    this.router.navigateByUrl('/product/' + id);
  }

  /**
   * Deletes a record
   * @param id 
   */
  delete(id) {
    var _self = this;
    this.service.delete(id, function (data) {
      _self.search();
    });
  }

  /**
   * Searches and get list
   */
  search() {
    var _self = this;
    this.service.search(this.form, function (data) {
      //console.log('Ctl',data);
      _self.list = data.result.data;
    });
  }

}
