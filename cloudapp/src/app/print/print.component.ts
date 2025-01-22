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
      // result.full_name,
      this.preferredName(result.first_name,result.middle_name,result.last_name,result.pref_first_name,result.pref_middle_name,result.pref_last_name),
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

  preferredName(first_name: string, middle_name: string, last_name: string, pref_first_name: string, pref_middle_name: string, pref_last_name: string ){
  const names: string[] = [];

  if (pref_first_name) { names.push(pref_first_name) } else if (first_name) { names.push(first_name)};
  if (pref_middle_name) { names.push(pref_middle_name) } else if (middle_name) { names.push(middle_name)};
  if (pref_last_name) { names.push(pref_last_name)} else if (last_name) {names.push(last_name)};

  return names.join(" ");
 }
}
