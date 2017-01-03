import {Hero} from "./hero";
import {Observable} from "rxjs";
/**
 * Created by ray.chen on 2017/1/3.
 */

export class HeroSearchService {

  search(term: string): Observable<Hero[]>{
    return Observable.of<Hero[]>([]);
  }
}
