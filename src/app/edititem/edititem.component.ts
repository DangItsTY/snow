import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'
import {Router, ActivatedRoute} from '@angular/router'
import {Item} from '../newitem/newitem.component'
declare var Quagga: any;
@Component({
	selector: 'edititem',
	templateUrl: './edititem.component.html'
})
export class EdititemComponent {	
	model;
	itemid;
	
	constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute) {
	}
  
	ngOnInit() {
		this.activatedRoute.params.subscribe((params) => {
			this.itemid = params['id'];
		});
		this.model = new Item({"name": null, "description": null, "category": null, "price": null, "stock": null});	
		this.getItem();
	}
	
	getItem() {
		console.log("getting item...");
		this.http
		.get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/item/'+this.itemid)
		.subscribe(res => {
			console.log("got item!");
			var results = res.json();
			results = results.map((currentValue, index, array) => {
				return new Item(currentValue);
			});
			this.model = results[0];
		});
	}
	
	onSubmit() {
		var formData = new FormData();
		for (var key in this.model) {
			formData.append(key, this.model[key]);
		}
		this.http
		  .post('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/edititem/'+this.itemid , formData)
		  .subscribe(res => {
			  this.router.navigate(['/shop']);
		  });
	}
}