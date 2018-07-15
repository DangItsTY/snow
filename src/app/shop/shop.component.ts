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
			if (result == undefined) { alert("Oops! Something went wrong."); }
			else {
				this.userModel = new User(result.firstname, result.storename);
			}
		});
	}
	
	getAllShopItems() {
		console.log("getting all shop items...");
		this.http
		.get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/allShopItems/' + this.userId)
		.subscribe(res => {			
			console.log("got all items!");
			var results = res.json();
			results = results.map((currentValue, index, array) => {
				return new Item(currentValue);
			});
			
			var keys = results.map((value, index, array) => {
				if (value.category == null) {
					return "other";
				} else {
					return value.category;
				}
			});
			keys = keys.filter((value, index, array) => {
				return array.indexOf(value) === index;
			});
			
			this.models = [];
			for (var i = 0; i < results.length; i++) {
				var category = results[i].category;
				if (category == null) {
					category = "other";
				}
				category = keys.indexOf(category);
				
				if (this.models[category]) {
					this.models[category].push(results[i]);
				} else {
					this.models[category] = [results[i]];
				}
			}
			this.models = this.models.filter(function(value, index, array) {
				console.log(value);
				return true;
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
