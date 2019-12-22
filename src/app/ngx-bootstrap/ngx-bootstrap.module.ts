import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


import { AccordionModule, AccordionConfig } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    TypeaheadModule.forRoot()
    // AccordionModule.forRoot(),
    // AlertModule.forRoot(),
    // CarouselModule.forRoot(),
    // CollapseModule.forRoot(),
    // BsDropdownModule.forRoot(),
    // TabsModule.forRoot()
  ],
  exports: [
    ModalModule,
    BsDatepickerModule,
    ButtonsModule,
    ProgressbarModule,
    TypeaheadModule
    // AccordionModule,
    // AlertModule,
    // CarouselModule,
    // CollapseModule,
    // BsDropdownModule,
    // TabsModule
  ],
  providers: [],
  bootstrap: []
})
export class NgXBootstrapModule {}
