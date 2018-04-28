import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'
import {Router} from '@angular/router'

@Component({
	selector: 'newitem',
	templateUrl: './newitem.component.html',
	styleUrls: ['./newitem.component.css']
})
export class NewitemComponent {	
	@ViewChild('fileInput') fileInput
	model;
	userId;
	
	constructor(private http: Http, private router: Router) {
	}
  
	ngOnInit() {
		this.userId = sessionStorage.getItem("user");
	}
	
	onSubmit() {
		var formData = new FormData();
		for (var key in this.model) {
			formData.append(key, this.model[key]);
		}
		this.http
		  .post('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/fileupload/'+this.userId , formData)
		  .subscribe(res => {
			  this.router.navigate(['/shop']);
		  });
	}
	
	addImageToForm() {
		this.model.image = this.fileInput.nativeElement.files[0];
		console.log(this.model);
	}
}
export class Item {
	name: string;
	description: string;
	image: string;
	price: string;
	quantity: number;
	id: number;
	status: string;
	state: number;
	by: any;
	rid: number;

	constructor(data) {
		this.name = data.name;
		this.description = data.description;
		this.image = 'http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port") + data.image;
		this.price = data.price;
		this.quantity = data.quantity;
		this.id = data.id;
		this.status = data.status;
		this.state = data.state;
		this.by = data.by ? new Date(data.by).toISOString().substring(0, 10) : data.by;
		this.rid = data.rid;
	}

}