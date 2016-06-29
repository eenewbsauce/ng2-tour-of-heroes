import { Component, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css', 'app/hero-detail.component.css'],
  directives: [HeroDetailComponent],
  providers: [HeroService]
})
export class HeroesComponent {
  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
}
