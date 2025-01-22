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
      this.patron.name = this.preferredName(result.first_name,result.middle_name,result.last_name,result.pref_first_name,result.pref_middle_name,result.pref_last_name),
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

  preferredName(first_name: string, middle_name: string, last_name: string, pref_first_name: string, pref_middle_name: string, pref_last_name: string ){
  const names: string[] = [];

  if (pref_first_name) { names.push(pref_first_name) } else if (first_name) { names.push(first_name)};
  if (pref_middle_name) { names.push(pref_middle_name) } else if (middle_name) { names.push(middle_name)};
  if (pref_last_name) { names.push(pref_last_name)} else if (last_name) {names.push(last_name)};

  return names.join(" ");
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
