import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Patron } from '../models/patron';
import { Settings } from '../models/settings';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudAppRestService, CloudAppSettingsService } from '@exlibris/exl-cloudapp-angular-lib';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,

})
export class PrintComponent implements OnInit {

  patron: Patron;
  settings: Settings;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private restService: CloudAppRestService,
    private settingsService: CloudAppSettingsService,
  ) { }

  ngOnInit(): void {

    this.restService.call<any>('/users/'+this.route.snapshot.paramMap.get('id'))
    .pipe(
      map(result => { this.patron = new Patron(
      result.full_name,
      result.last_name + ' ' + result.first_name,
      result.primary_id,
      result.primary_id,
      result.user_identifier.filter(x => x.id_type.value == '01').pop().value
    )}))
    .subscribe()
    
    this.settingsService.get().subscribe(settings => {
      this.settings = settings as Settings;
    });
  }

}
