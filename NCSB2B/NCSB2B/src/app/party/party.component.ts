import { PartyService } from './../party.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Valid } from '../utility/validator';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  form = {
    id: null,
    name: '',
    address: '',
    type: '',
    phone: '',
    aadharNo: '',
    gstDetails: '',
    bankDeatails: '',
    licenseNo: '',
    ownerPhotograph: ''
  };

  message = '';

  constructor(
    private aroute: ActivatedRoute,
    private router: Router,
    private service: PartyService,
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
    this.router.navigateByUrl('/partylist');
  }

  validateAddRoleBt() {
    let flag = true;

    flag = flag && this.dataValidator.isNotNull(this.form.name);
    flag = flag && this.dataValidator.isNotNull(this.form.address);
    flag = flag && this.dataValidator.isNotNull(this.form.type);
    flag = flag && this.dataValidator.isNotNull(this.form.phone);
    flag = flag && this.dataValidator.isNotNull(this.form.aadharNo);
    flag = flag && this.dataValidator.isNotNull(this.form.gstDetails);
    flag = flag && this.dataValidator.isNotNull(this.form.bankDeatails);
    flag = flag && this.dataValidator.isNotNull(this.form.licenseNo);
    flag = flag && this.dataValidator.isNotNull(this.form.ownerPhotograph);
    return flag;
  }
}
