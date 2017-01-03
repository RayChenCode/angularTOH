import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Location} from "@angular/common";
import {HeroService} from "./hero.service";
import {Hero} from "./hero";

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;

  ngOnInit(): void {
    /**
     * Routes path對應到時會產生此Component，
     * 把參數[id]拿來找英雄
     */
    this.activatedRoute.params
    /**
     * SwitchMap => operator [id] in the observable route parameter
     * 如果狂點狂getHero，switchMap會先把上一次的getHero請求取消。
     */
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      /**
       * 不需要unSubscribe這件事，當component被destroy時會自動unSubscribe
       */
      .subscribe(hero => {
        this.hero = hero
      });
  }

  constructor(private heroService: HeroService,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(hero => this.goBack());
  }

  goBack(): void {
    /**
     * Going back too far could take us out of the application.
     * That's acceptable in a demo. We'd guard against it in a real application,
     * perhaps with the CanDeactivate guard of below.
     *
     * https://angular.io/docs/ts/latest/api/router/index/CanDeactivate-interface.html
     */
    this.location.back();
  }
}
