import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endpoint ="http://localhost:8080/Product/";

  constructor(private http: HttpClient) { }

  /**
   * Gets marksheet
   * 
   * @param id 
   * @param response 
   */
  get(id : number, response){
    this.http.get(this.endpoint +"get/" + id).subscribe((data) => {
      response(data);
      console.log("Get:", data);
    });
  }

  /**
   * Searches marksheet
   * 
   * @param response 
   */
  search(form,response){
    this.http.post(this.endpoint +"search", form).subscribe((data) => {
      response(data);
      console.log("Search", data);
    });
  }

  /**
   * Delets a marksheet
   * 
   * @param id 
   * @param response 
   */
  delete(id : number, response){
    this.http.get(this.endpoint +"delete/" + id).subscribe((data) => {
      response(data);
      console.log("Delete: " , data);
    });
  }

  /**
   * 
   * @param form Adds or updates a record 
   * @param response 
   */
  save(form, response){
    this.http.post(this.endpoint +"save", form).subscribe((data) => {
      response(data);
      console.log("Save", data);
    });
}
}
