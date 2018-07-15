import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	
	constructor() { }
  
	ngOnInit() {
		this.loadData();
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
	
	loadData() {
		//sessionStorage.setItem("hostname", "192.168.1.2");
		//sessionStorage.setItem("hostname", "69.255.66.215");
		//sessionStorage.setItem("port", "8080");
		//sessionStorage.setItem("hostname", "108.31.106.35");
		//sessionStorage.setItem("hostname", "96.231.60.21");
		//sessionStorage.setItem("port", "169");
		
		//	for default local server
		sessionStorage.setItem("hostname", "localhost");
		sessionStorage.setItem("port", "3000");
	}

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
}
