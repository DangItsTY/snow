import {Component, OnInit, ViewChild} from '@angular/core'
import {Router, ActivatedRoute} from '@angular/router'

@Component({
	selector: 'headercomponent',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	hidden: boolean;
	menuIsOpen: boolean;
	menuIsOpenClass: string;
	
	constructor(private router: Router, private route: ActivatedRoute) {
	}
  
	ngOnInit() {
		//this.hidden = true;
		this.menuIsOpen = false;
		this.setMenuOpenClass();
		console.log(this.router);
		console.log(this.route);
		/*
		this.route.url.subscribe((change) => {
			console.log(change);
		});
		this.route.params.subscribe((change) => {
			console.log(change);
		});
		this.route.queryParams.subscribe((change) => {
			console.log(change);
		});
		this.route.fragment.subscribe((change) => {
			console.log(change);
		});
		this.route.data.subscribe((change) => {
			console.log(change);
		});
		*/
		this.router.events.subscribe((change) => {
			console.log(change);
		});
	}
	
	setMenuOpenState(open: boolean) {
		this.menuIsOpen = open ? true : false;
		this.setMenuOpenClass();
	}
	
	setMenuOpenClass() {
		this.menuIsOpenClass = this.menuIsOpen ? "menu-open" : "menu-close";
	}
}