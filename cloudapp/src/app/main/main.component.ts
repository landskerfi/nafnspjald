import { Observable  } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloudAppRestService, CloudAppEventsService, Request, HttpMethod, 
  Entity, RestErrorResponse, AlertService } from '@exlibris/exl-cloudapp-angular-lib';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  selectedEntity: Entity;

  entities$: Observable<Entity[]> = this.eventsService.entities$
  .pipe(
    tap(() => this.clear()),
    map(entities => { return entities.filter(e => e.type == 'USER')}),
  );

  constructor(
    private eventsService: CloudAppEventsService,
    private router: Router 
  ) { }

  entitySelected(event: MatRadioChange) {
    this.router.navigate([this.selectedEntity.link]);
  }

  clear() {
    this.selectedEntity = null;
  }
}