import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'
import {User} from '../shop/shop.component'
import {Item} from '../newitem/newitem.component'

@Component({
	selector: 'cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent {
	models;
	userModel = new User();
	userId;
	
	constructor(private http: Http) {

	}
  
	ngOnInit() {
		this.userId = sessionStorage.getItem("user");
		this.getShopperInfo();
		this.getAllRequestedItems();
	}
	
	getShopperInfo() {
		console.log("getting shopper information...");
		this.http
		.get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/shopperInfo/' + this.userId)
		.subscribe(res => {
			console.log("got shopper info", res);
			var results = res.json();
			var result = results[0];
			if (result == undefined) { alert("Oops! Something went wrong."); }
			else {
				this.userModel = new User(result.firstname);
			}
		});
	}
	
	getAllRequestedItems() {
		console.log("getting all subscribed items...");
		this.http
			.get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/getAllRequestedItems/' + this.userId)
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
				console.log(this.models);
			});
	}
	
	updateAmount(event, model) {
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
	
	setReceived(event, model) {
		var formData = new FormData();
		for (var key in model) {
			formData.append(key, model[key]);
		}
		console.log(model);
		this.http
			.post('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/setReceived/'+model.rid , formData)
			.subscribe(res => {
				console.log("successfully posted", res);
				this.getAllRequestedItems();
			});
	}
	
}