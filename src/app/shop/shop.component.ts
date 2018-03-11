import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'
import {Item} from '../newitem/newitem.component'

@Component({
	selector: 'shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.css']
})
export class ShopComponent {
	models = [];
	userModel = new User();
	userId;
	
	constructor(private http: Http) {
	}
  
	ngOnInit() {
		this.userId = sessionStorage.getItem("user");
		this.getShopInfo();
		this.getAllShopItems();
	}
		
	getShopInfo() {
		console.log("getting shop information...");
		this.http
		  .get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/shopInfo/' + this.userId)
		  .subscribe(res => {
			  console.log("got shop info", res);
			  var results = res.json();
			  var result = results[0];
			  this.userModel = new User(result.firstname, result.storename);
		  });
	}
	
	getAllShopItems() {
		console.log("getting all shop items...");
		this.http
		  .get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/allShopItems/' + this.userId)
		  .subscribe(res => {
			  console.log("got all items!");
			  console.log(res);
			  var results = res.json();
			  this.models = results.map((currentValue, index, array) => {
				  return new Item(currentValue.name, currentValue.description, 'http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port") + currentValue.image, currentValue.price);
			  });
		  });
	}
}
export class User {

	constructor(
		public firstname?: string,
		public storename?: string
	) {  }

}
