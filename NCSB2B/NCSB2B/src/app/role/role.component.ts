// import { RoleService } from './../role.service';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ActivatedRoute } from "@angular/router";



// @Component({
//   selector: 'app-role',
//   templateUrl: './role.component.html',
//   styleUrls: ['./role.component.css']
// })
// export class RoleComponent implements OnInit {


//   form = {
//     "id": 1,
//     "name": "",
//     "discription": ""
//   }

//   message = "";


//   constructor(private aroute: ActivatedRoute, private router: Router, private service: RoleService) { }

//   ngOnInit() {

//     var _self = this;
//     this.form.id = parseInt(this.aroute.snapshot.paramMap.get("id"));

//     if (this.form.id > 0) {
//       console.log("Calling to service ----------------");
//       this.service.get(this.form.id, function (data) {
//         _self.form = data.result.data;
//       });
//     }else{
//       this.form.id =0;
//     }

//   }


//   save() {
//     var _self = this;
//     this.service.save(this.form, function (data) {
//       _self.message ="Product is saved";
//       console.log('Ctl', data);
//     });
//   }

//   search() {
//     this.router.navigateByUrl('/rolelist');
//   }

// }
