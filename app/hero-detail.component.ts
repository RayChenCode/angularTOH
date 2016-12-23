import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {Location} from '@angular/common';
import {HeroService} from './hero.service';
import {Hero} from './hero';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit {
  ngOnInit(): void {
    this.activatedRoute.params
    /**
     * SwitchMap => operator [id] in the observable route parameter
     * 如果狂點狂getHero，switchMap會先把上一次的getHero請求取消。
     */
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      /**
       * 不需要unSubscribe這件事，當component被destroy時會自動unSubscribe
       */
      .subscribe(hero => this.hero = hero);
  }

  constructor(private heroService: HeroService,
              private location: Location,
              private activatedRoute: ActivatedRoute) {

  }

  goBack(): void {
    this.location.back();
  }

  @Input()
  hero: Hero;
}
