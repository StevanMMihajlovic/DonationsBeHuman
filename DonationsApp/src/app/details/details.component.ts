import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Donor } from '../models/donor.model';
import { DonorsService } from '../services/donors.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  newDonor: Donor = new Donor();
  id:number = 0;
  categories: string[] = [];
  
  charity_date: NgbDateStruct = {
    day: 0,
    month: 0,
    year: 0
  };

  private dateToString = (newDate: NgbDateStruct) =>  `${newDate.year}-${newDate.month}-${newDate.day}T00:00:00:000Z`;

  constructor(private route: ActivatedRoute, private service: DonorsService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      if(this.id != undefined){
        this.getOne();
      }
      this.getCategories();
    });
  }

  getOne():void{
    this.service.getOne(this.id).subscribe((data: Donor) => {
      this.newDonor = data;
    });
  }

  getCategories():void{
    this.service.getCategories().subscribe( data => {
      this.categories = data;
    })
  }

  submitDonor():void{
    this.newDonor.charity_date = this.dateToString(this.charity_date);
    if(this.newDonor.name == "" || this.newDonor.charity_date == "" || this.newDonor.description.length < 10 || this.newDonor.categories == []){
      window.alert("Unsuccesfull add of new doner, form is not valid!");
      return;
    }
    //Moze i sa if this.newDonnor._id == 0 jer je _id prvog donora 1!
		if(this.id == undefined){
			this.service.postNew(this.newDonor).subscribe(
        data => {
        this.newDonor = new Donor();
        window.alert("Succesfull add of new doner!");
        this.router.navigate(['donors/']);
        },
        error => {
          console.log("error: " + error.statusText);
        }
      );
		} else {  
		  	this.service.updateDonor(this.newDonor).subscribe(
				  data => {
            this.newDonor = new Donor();
            window.alert("Succesfull update of existing doner!");
					  this.router.navigate(['donors/']);
				  },
				  error => {
					  console.log("error: " + error.statusText);
				  }
			  );
		}
  }

}
