import { Injectable } from '@angular/core';
let R = require('ramda');

import { HEROES } from './mock-heroes';
import { Hero } from './hero';

@Injectable()
export class HeroService {
  getHeroes() {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(() => resolve(HEROES), 2000) // 2 seconds
    );
  }

  getHero(id) {
    var matchingHero = R.find(hero => (hero.id === id), HEROES);
    return Promise.resolve(matchingHero);
  }
}
