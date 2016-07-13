import { Component, OnInit, Input } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { HighlightDirective } from './attribute-directives/highlight.directive';

@Component({
  selector: 'my-app',
  template: `
    <h1 [hoHighlight]="color" [defaultColor]="'red'">{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Heroes']">Heroes</a>
      <input name="color" type="radio" (click)="color='lightgreen'">Green
      <input name="color" type="radio" (click)="color='yellow'">Yellow
      <input name="color" type="radio" (click)="color='cyan'">Cyan
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [
    HeroesComponent,
    ROUTER_DIRECTIVES,
    DashboardComponent,
    HeroDetailComponent,
    HighlightDirective
  ],
  providers: [
    HeroService,
    ROUTER_PROVIDERS
  ]
})

@RouteConfig([
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  }
])

export class AppComponent implements OnInit {
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  title = 'Tour of Heroes';
  public heroes: Hero[];
}
