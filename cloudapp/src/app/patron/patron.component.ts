import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { finalize, tap, map } from 'rxjs/operators';
import { Patron } from '../models/patron';


@Component({
  selector: 'app-patron',
  templateUrl: './patron.component.html',
  styleUrls: ['./patron.component.scss']
})
export class PatronComponent implements OnInit {
  patron: Patron;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private restService: CloudAppRestService,
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
    
  }

}
