import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'

@Component({
	selector: 'cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent {
	model;
	
	constructor(private http: Http) {
		this.model = [
			{'image': 'assets/images/chocolate.jpg', 'label': 'Chocolate', 'state': 'normal'},
			{'image': 'assets/images/coffee.jpg', 'label': 'Coffee', 'state': 'normal'},
			{'image': 'assets/images/greentea.jpg', 'label': 'Green Tea', 'state': 'normal'},
			{'image': 'assets/images/mango.jpg', 'label': 'Mango', 'state': 'normal'}
		];
	}
  
	ngOnInit() {
		this.getAllItems();
	}
	
	getAllItems() {
		console.log("getting all items...");
		this.http
		  .get('http://localhost:8080/allitems')
		  .subscribe(res => {
			  console.log("got all items!");
			  console.log(res);
		  });
	}
}

/*
	ngOnInit() {
		var main_element = document.getElementById("list");
		var template_element = document.getElementById("template");
		var cartdata = [
			{'image': 'chocolate.jpg', 'label': 'Chocolate', 'state': 'normal'},
			{'image': 'coffee.jpg', 'label': 'Coffee', 'state': 'normal'},
			{'image': 'greentea.jpg', 'label': 'Green Tea', 'state': 'normal'},
			{'image': 'mango.jpg', 'label': 'Mango', 'state': 'normal'}
		];

		var shopdata = [
			{'image': 'pineapple.jpg', 'label': 'Pineapple', 'state': 'normal'},
			{'image': 'redbean.jpg', 'label': 'Red Bean', 'state': 'normal'},
			{'image': 'strawberry.jpg', 'label': 'Strawberry', 'state': 'normal'},
			{'image': 'taro.jpg', 'label': 'Taro', 'state': 'normal'},
			{'image': 'thaitea.jpg', 'label': 'Thai Tea', 'state': 'normal'}
		];
	}
	*/

	/* //	Builds
	function buildCart(data) {
		var element = document.getElementById("item-container");
		var target_element = document.getElementById("cartlist");
		var article_template = element.getElementsByTagName("article")[0];
		var data_template = {
			'image': '',
			'label': '',
			'state': 'normal'
		};
		
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
		
		for (var i = 0; i < data.length; i++) {
			var article = article_template.cloneNode(true);
			
			var image = article.getElementsByTagName('img')[0];
			image.src = data[i].image;
			
			var p = article.getElementsByTagName('p')[0];
			p.innerHTML = data[i].label;
			
			element.appendChild(article);
		}
		
		target_element.appendChild(element);
	}

	function buildShop(data) {
		var element = document.getElementById("item-container");
		var target_element = document.getElementById("shoplist");
		var article_template = element.getElementsByTagName("article")[0];
		var data_template = {
			'image': '',
			'label': '',
			'state': 'normal'
		};
		
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
		
		for (var i = 0; i < data.length; i++) {
			var article = article_template.cloneNode(true);
			
			var image = article.getElementsByTagName('img')[0];
			image.src = data[i].image;
			
			var p = article.getElementsByTagName('p')[0];
			p.innerHTML = data[i].label;
			
			element.appendChild(article);
		}
		
		target_element.appendChild(element);
	}

	//	Views
	function viewCartFromLoginsignup() {
		var oldView = document.getElementById("loginsignup");
		var target_element = document.getElementById("main");
		var element = document.getElementById("cart");
		
		template_element.appendChild(oldView);
		target_element.appendChild(element);
		
		buildCart(cartdata);
	}

	function viewCart() {
		var oldView = document.getElementById("shop");
		var target_element = document.getElementById("main");
		var element = document.getElementById("cart");
		
		template_element.appendChild(oldView);
		target_element.appendChild(element);
		
		buildCart(cartdata);
	}

	function viewShop() {
		var oldView = document.getElementById("cart");
		var target_element = document.getElementById("main");
		var element = document.getElementById("shop");
		
		template_element.appendChild(oldView);
		target_element.appendChild(element);
		
		buildShop(shopdata);
	} */