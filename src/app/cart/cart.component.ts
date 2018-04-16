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
			  this.userModel = new User(result.firstname);
		  });
	}
	
	getAllRequestedItems() {
		console.log("getting all subscribed items...");
		this.http
		  .get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/getAllRequestedItems/' + this.userId)
		  .subscribe(res => {
			  console.log("got all items!");
			  console.log(res);
			  var results = res.json();
			  this.models = results.map((currentValue, index, array) => {
				  return new Item(currentValue.name, currentValue.description, 'http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port") + currentValue.image, currentValue.price, currentValue.amount, currentValue.id, currentValue.status);
			  });
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
	
}