import { Component, OnInit } from '@angular/core';

import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <my-heroes [heroes]="heroes"></my-heroes>
  `,
  directives: [HeroesComponent],
  providers: [HeroService]
})

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
