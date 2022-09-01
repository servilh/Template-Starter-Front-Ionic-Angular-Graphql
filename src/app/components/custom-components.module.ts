import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicItemDetailComponent } from './dynamic-item-detail/dynamic-item-detail.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DynamicItemDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [DynamicItemDetailComponent]
})
export class CustomComponentsModule { }
