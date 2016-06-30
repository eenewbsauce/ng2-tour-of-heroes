import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
//let R = require('ramda');
let R = require('ramda');
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  constructor(private http: Http) {}

  private heroesUrl = 'app/heroes';  // URL to web api

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  getHero(id) {
    return this.getHeroes()
      .then(heroes => R.find(hero => hero.id === id, heroes));
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
       .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
       .toPromise()
       .then(res => res.json().data)
       .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
       .put(url, JSON.stringify(hero), {headers: headers})
       .toPromise()
       .then(() => hero)
       .catch(this.handleError);
  }

  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

  save(hero: Hero): Promise<Hero>  {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
