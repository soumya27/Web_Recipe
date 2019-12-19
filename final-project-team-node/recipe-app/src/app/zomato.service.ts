import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ZomatoService {

  private url_search = "https://developers.zomato.com/api/v2.1/search";

  constructor(private httpClient: HttpClient) { }

  getLocationDetails(id: number, category: String) {
    return this.httpClient.get(this.url_search, {
      params: new HttpParams().set("entity_id", id.toString()).set("entity_type", "city").set("q", category.toString())
    })
  }
}
