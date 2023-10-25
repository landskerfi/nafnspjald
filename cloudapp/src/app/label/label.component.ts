import { Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { Patron } from '../models/patron';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudAppRestService, CloudAppSettingsService } from '@exlibris/exl-cloudapp-angular-lib';
import { finalize, map } from 'rxjs/operators';
import { Settings } from '../models/settings';
import { PrintComponent } from '../print/print.component';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  
  loading = true;
  patron: Patron;
  settings: Settings;
  printComponent: ComponentRef<PrintComponent>;
  @ViewChild('iframe', { read: ElementRef }) iframe: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private restService: CloudAppRestService,
    private settingsService: CloudAppSettingsService,
    private vcref: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) { 
    this.patron = new Patron('','','','','');
  }

  ngOnInit(): void {
    this.restService.call<any>('/users/'+this.route.snapshot.paramMap.get('id'))
    .pipe(finalize(() => this.loading = false),
      map(result => { 
      this.patron.name = result.full_name,
      this.patron.polishName = result.last_name + ' ' + result.first_name,
      this.patron.kennitala = result.primary_id,
      //for polish cards
      this.patron.primaryId = result.primary_id,
      this.patron.strikamerki = result.user_identifier.filter(x => x.id_type.value == '01').pop().value
      }))
    .subscribe()
    
    this.settingsService.get().subscribe(settings => {
      this.settings = settings as Settings;
    });
    const componentFactory = this.resolver.resolveComponentFactory(PrintComponent);
    this.printComponent = this.vcref.createComponent(componentFactory);
  }

  printIframe():void {
    const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    const CIL_style = "<style>@media print {html, body {margin: 0px;}}</style>";
    doc.body.innerHTML = CIL_style;
    doc.body.appendChild(this.printComponent.location.nativeElement);
    this.iframe.nativeElement.contentWindow.print();
    this.router.navigate(['/']);
  }

}
