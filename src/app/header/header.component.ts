import {Component, OnInit, ViewChild} from '@angular/core'
import {Router, NavigationStart} from '@angular/router'

@Component({
	selector: 'headercomponent',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	hidden: boolean;
	menuIsOpen: boolean;
	menuIsOpenClass: string;
	
	constructor(private router: Router) {
	}
  
	ngOnInit() {
		this.hidden = true;
		this.menuIsOpen = false;
		this.setMenuOpenClass();

		this.router.events.subscribe((change) => this.setHiddenState(change));
	}
	
	setMenuOpenState(open: boolean) {
		this.menuIsOpen = open ? true : false;
		this.setMenuOpenClass();
	}
	
	setMenuOpenClass() {
		this.menuIsOpenClass = this.menuIsOpen ? "menu-open" : "menu-close";
	}
	
	setHiddenState(change) {
		if (change instanceof NavigationStart) {
			if (change.url == "/shop" ||
				change.url == "/requests") {
				this.hidden = false;
			} else {
				this.hidden = true;
			}
		}
	}
}