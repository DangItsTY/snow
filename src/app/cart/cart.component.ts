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
		this.getAllSubscribedItems();
	}
	
	getShopperInfo() {
		console.log("getting shopper information...");
		this.http
		  .get('http://localhost:8080/shopperInfo/' + this.userId)
		  .subscribe(res => {
			  console.log("got shopper info", res);
			  var results = res.json();
			  var result = results[0];
			  this.userModel = new User(result.firstname);
		  });
	}
	
	getAllSubscribedItems() {
		console.log("getting all subscribed items...");
		this.http
		  .get('http://localhost:8080/allSubscribedItems/' + this.userId)
		  .subscribe(res => {
			  console.log("got all items!");
			  console.log(res);
			  var results = res.json();
			  this.models = results.map((currentValue, index, array) => {
				  return new Item(currentValue.name, currentValue.description, "http://localhost:8080" + currentValue.image, currentValue.price);
			  });
		  });
	}
	
}