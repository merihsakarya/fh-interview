import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { DefaultLayoutComponent } from './default/default-layout.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';

const COMPONENTS = [
  DefaultLayoutComponent,
  SidebarComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class LayoutModule { }
