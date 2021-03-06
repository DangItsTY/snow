import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'
import {Router} from '@angular/router'
declare var Quagga: any;

@Component({
	selector: 'newitem',
	templateUrl: './newitem.component.html',
	styleUrls: ['./newitem.component.css']
})
export class NewitemComponent {	
	@ViewChild('fileInput') fileInput
	@ViewChild('preview') preview;
	@ViewChild('barcodeInput') barcodeInput;
	model;
	userId;
	
	constructor(private http: Http, private router: Router) {
	}
  
	ngOnInit() {
		this.userId = sessionStorage.getItem("user");
		this.model = new Item({"name": null, "description": null, "category": null, "image": null, "price": null, "barcode": null, "stock": null});
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
		this.preview.nativeElement.src = URL.createObjectURL(this.model.image);
	}
	
	barcodeReader() {
		var tempSrc = URL.createObjectURL(this.barcodeInput.nativeElement.files[0]);
		Quagga.decodeSingle({
			decoder: {
				readers: ["code_128_reader"]
			},
			locate: true,
			src: tempSrc
		}, (result) => {
			if(result) {
				console.log("result", result);
				this.model.barcode = result.codeResult.code;
			} else {
				console.log("not detected");
			}
			URL.revokeObjectURL(tempSrc);
		});
	}
}
export class Item {
	name: string;
	description: string;
	category: string;
	image: string;
	price: string;
	quantity: number;
	id: number;
	status: string;
	state: number;
	by: any;
	rid: number;
	storename: string;
	owner: number;
	requestor: number;
	username: string;
	stock: number;
	promotionmsg: string;
	iid: number;
	uid: number;
	barcode: string;

	constructor(data) {
		this.name = data.name;
		this.description = data.description;
		this.category = data.category;
		this.image = 'http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port") + data.image;
		this.price = data.price;
		this.quantity = data.quantity;
		this.id = data.id;
		this.status = data.status;
		this.state = data.state;
		this.by = data.by ? new Date(data.by).toISOString().substring(0, 10) : data.by;
		this.rid = data.rid;
		this.storename = data.storename;
		this.owner = data.owner;
		this.requestor = data.requestor;
		this.username = data.username;
		this.stock = data.stock;
		this.promotionmsg = data.promotionmsg;
		this.iid = data.iid;
		this.uid = data.uid;
		this.barcode = data.barcode;
	}

}