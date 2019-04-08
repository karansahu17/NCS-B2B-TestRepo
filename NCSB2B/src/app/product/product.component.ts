import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  form = {
    "id": 1,
    "name": "",
    "size": "",
    "bagQuantity": ""
  };

  message = "";


  constructor(private aroute: ActivatedRoute, private router: Router, private service: ProductService) { }

  ngOnInit() {

    var _self = this;
    this.form.id = parseInt(this.aroute.snapshot.paramMap.get("id"));

    if (this.form.id > 0) {
      console.log("Calling to service ----------------");
      this.service.get(this.form.id, function (data) {
        _self.form = data.result.data;
      });
    }else{
      this.form.id =0;
    }

  }


  save() {
    var _self = this;
    this.service.save(this.form, function (data) {
      _self.message ="Product is saved";
      console.log('Ctl', data);
    });
  }

  search() {
    this.router.navigateByUrl('/productlist');
  }

}
