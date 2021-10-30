import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DonorList } from '../models/donor-list.model';
import { Donor } from '../models/donor.model';

const baseURL = 'http://localhost:3000/api/donors';
const baseURL2 = 'http://localhost:3000/api/categories';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {

  constructor(private http: HttpClient) { }

  getDonors(params?:any): Observable<DonorList> {
    let queryParams = {}

    if(params) {
      queryParams = {
        params: new HttpParams()
        .set("page", params.page || "")
        .set("pageSize", params.pageSize || "")
        .set("filter", params.filter && JSON.stringify(params.filter) || "")
      }
    }

    return this.http.get(baseURL, queryParams).pipe(map((data: any) => {
      return new DonorList(data);
    }))
  }

  getCategories(): Observable<string[]> {
    return this.http.get(baseURL2).pipe(map((data: any) => {
      return data;
    }))
  }

  getOne(id :number) :Observable<Donor>{
		return this.http.get(`${baseURL}/${id}`).pipe(map(
			data => { return new Donor(data);}
		));
  }

  postNew(donor: Donor):Observable<Donor>{
		return this.http.post(baseURL, donor).pipe(map(
			data => { return new Donor(data);}
		));
  }

  updateDonor(donor: Donor):Observable<Donor>{
		return this.http.put(`${baseURL}/${donor._id}`, donor).pipe(map(
			data => { return new Donor(data);}
		));
  }

}
