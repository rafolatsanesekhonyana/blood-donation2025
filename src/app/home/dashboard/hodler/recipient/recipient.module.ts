import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipientPageRoutingModule } from './recipient-routing.module';

import { RecipientPage } from './recipient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipientPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RecipientPage]
})
export class RecipientPageModule {}
