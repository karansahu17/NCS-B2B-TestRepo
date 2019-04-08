import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceUrl } from './app.component';
@Injectable({
  providedIn: 'root'
})
export class DealerService {
  endpoint =serviceUrl +"/Dealer/";

  constructor(private http: HttpClient) { }

  /**
   * Gets List
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
    this.http.post(this.endpoint +"search/", form).subscribe((data) => {
      response(data);
      console.log("Search", data);
    });
  }

  searchPage(form,pageNo,response){
    this.http.post(this.endpoint +"search/" + pageNo, form).subscribe((data) => {
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


  // Preload

  preload(response) {
    this.http.get(this.endpoint + "preload").subscribe((data) => {
      response(data);
      console.log("Search", data);
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
