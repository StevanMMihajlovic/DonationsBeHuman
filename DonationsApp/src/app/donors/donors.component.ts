import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonorList } from '../models/donor-list.model';
import { DonorsService } from '../services/donors.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {

  donors: DonorList = new DonorList();
  categories: string[] = [];

  params = {
    page: 1,
    pageSize: 6,
    filter: { categories: undefined, minValue: 0, maxValue: 100000}
  }

  constructor(private service: DonorsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDonors();
    this.getCategories();
  }

  getDonors():void{
    if(this.params.filter.categories == ""){
      this.params.filter.categories = undefined;
    }
    this.service.getDonors(this.params).subscribe((data: DonorList) => {
      this.donors = data;
    })
  }

  getCategories():void{
    this.service.getCategories().subscribe( data => {
      this.categories = data;
    })
  }

  pageChange(newPage: number):void{
    this.params.page = newPage;
    this.getDonors();
  }

}
