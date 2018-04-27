import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'
import {Item} from '../newitem/newitem.component'

@Component({
	selector: 'requests',
	templateUrl: './requests.component.html',
	styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
	models = [];
	userModel = new User();
	userId;
	
	constructor(private http: Http) {
	}
  
	ngOnInit() {
		this.userId = sessionStorage.getItem("user");
		this.getShopInfo();
		this.getRequests();
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
	
	getRequests() {
		console.log("getting all requests...");
		this.http
		  .get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/requests/' + this.userId)
		  .subscribe(res => {
			  console.log("got all requests!");
			  console.log(res);
			  var results = res.json();
			  this.models = results.map((currentValue, index, array) => {
				  currentValue.image = 'http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+currentValue.image;
				  if (currentValue.by) {
					var byDate = new Date(currentValue.by);
					var byDateString = byDate.toISOString().substring(0, 10);
					currentValue.by = byDateString;
				  }
				  return currentValue;
			  });
			  console.log(this.models);
		  });
	}
	
	setBy(event, model) {
		var formData = new FormData();
		for (var key in model) {
			formData.append(key, model[key]);
		}
		console.log(model);
		this.http
			.post('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/setBy/'+model.rid , formData)
			.subscribe(res => {
				console.log("successfully posted", res);
				this.getRequests();
			});
	}
}
export class User {

	constructor(
		public firstname?: string,
		public storename?: string
	) {  }

}
