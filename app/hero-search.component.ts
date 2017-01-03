import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Hero} from "./hero";
import {Observable, Subject} from "rxjs";
import {HeroSearchService} from "./hero-search.service";

@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: 'hero-search.component.html',
  styleUrls: ['hero-search.component.css'],
  providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroSearchService: HeroSearchService,
              private router: Router) {
  }

  // Push search term into observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300) // 300ms內，不接收任何指令
      .distinctUntilChanged() // 忽略一樣的搜尋term
      .switchMap(term => term
        ? this.heroSearchService.search(term) // 有就搜
        : Observable.of<Hero[]>([])) // 沒就給空
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });

  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
