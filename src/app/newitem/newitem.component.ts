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
	model = new Item()
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

	constructor(
		public name?: string,
		public description?: string,
		public image?: any,
		public price?: string,
		public amount?: number,
		public id?: number
	) {  }

}