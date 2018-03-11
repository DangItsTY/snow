import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'
import {Item} from '../newitem/newitem.component'

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent {
	models;
	userId;
	
	constructor(private http: Http) {

	}
  
	ngOnInit() {
		this.userId = sessionStorage.getItem("user");
		this.getAllItems();
	}
	
	getAllItems() {
		console.log("getting all items...");
		this.http
		  .get('http://localhost:8080/allItems')
		  .subscribe(res => {
			  console.log("got all items!");
			  var results = res.json();
			  this.models = results.map((currentValue, index, array) => {
				  return new Item(currentValue.name, currentValue.description, "http://localhost:8080" + currentValue.image, currentValue.price, 0, currentValue.id);
			  });
		  });
	}
	
	updateAmount(event, model) {
		var formData = new FormData();
		for (var key in model) {
			formData.append(key, model[key]);
		}
		this.http
		  .post('http://localhost:8080/subscribe/'+this.userId , formData)
		  .subscribe(res => {
			  console.log("subscribed!");
		  });
	}
}