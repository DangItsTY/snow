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
		.get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/allItemsAndOwner')
		.subscribe(res => {
			console.log("got all items!");
			var results = res.json();
			results = results.map((currentValue, index, array) => {
				return new Item(currentValue);
			});
			
			this.models = [];
			for (var i = 0; i < results.length; i++) {
				var owner = results[i].owner;
				if (this.models[owner]) {
					this.models[owner].push(results[i]);
				} else {
					this.models[owner] = [results[i]];
				}
			}
			this.models = this.models.filter(function(value, index, array) {
				return true;
			});
		});
	}
	
	updateAmount(event, model) {
		if (model.stock == 0) {
			alert("out of stock!");
		} else {
			this.checkOutOfStock();
			var formData = new FormData();
			for (var key in model) {
				formData.append(key, model[key]);
			}
			this.http
			.post('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/subscribe/'+this.userId , formData)
			.subscribe(res => {
				console.log("subscribed!");
			});
		}
	}
}