import {Injectable} from "@angular/core";
import {Hero} from "./hero";
import {Http, Headers, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs";

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(response => hero)
      .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
    /**
     * The Angular http.get returns an RxJS Observable.
     * Observables are a powerful way to manage asynchronous data flows
     *
     * 1. http.get return [observable] result.
     * 2. RxJS convert [observable] to [promise].
     * 3. Passed that promise to caller.
     */

    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  };

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`app/heroes/?name=${term}`)
      .map((response: Response) => response.json().data as Hero[]);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => id === hero.id));
  }

  create(name: String): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log(response, response.json(), response.json().data);
        return response.json().data;
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        return null;
      })
      .catch(this.handleError);
  }
}
