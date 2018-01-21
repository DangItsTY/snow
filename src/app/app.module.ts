import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule }   from '@angular/forms'

import { AppComponent } from './app.component'
import { NewitemComponent } from './newitem/newitem.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { AddhomeComponent } from './addhome/addhome.component'
import { CartComponent } from './cart/cart.component'

const appRoutes: Routes = [
	{
		path: 'newitem',
		component: NewitemComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{
		path: 'addhome',
		component: AddhomeComponent
	},
	{
		path: 'cart',
		component: CartComponent
	},
  /* { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent } */
];

@NgModule({
  declarations: [
    AppComponent,
	NewitemComponent,
	LoginComponent,
	SignupComponent,
	AddhomeComponent,
	CartComponent,
  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
	RouterModule.forRoot(
		appRoutes,
		//{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }