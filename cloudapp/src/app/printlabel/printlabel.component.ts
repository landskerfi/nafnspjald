import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudAppRestService, CloudAppSettingsService } from '@exlibris/exl-cloudapp-angular-lib';
import { Patron } from '../models/patron';
import { Settings } from '../models/settings';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-printlabel',
  templateUrl: './printlabel.component.html',
  styleUrls: ['./printlabel.component.scss']
})
export class PrintlabelComponent implements OnInit {

 patron: Patron;
  settings: Settings;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private restService: CloudAppRestService,
    private settingsService: CloudAppSettingsService,
  ) { }

  ngOnInit(): void {
   //this.patronId = this.route.snapshot.paramMap.get('id');
   //console.log(this.patronId);
    this.restService.call<any>('/users/'+this.route.snapshot.paramMap.get('id'))
    .pipe(
      //finalize(()=>this.loading=false),
      map(result => { this.patron = new Patron(
      result.full_name,
      result.primary_id,
      result.user_identifier.filter(x => x.id_type.value == '01').pop().value
    )}))
    .subscribe(
      //result => console.log('result:', result),
    )
    
    this.settingsService.get().subscribe(settings => {
      this.settings = settings as Settings;
    });
  }
}
