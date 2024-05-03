import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ContactComponent } from './contact/contact.component';
import { FAQComponent } from './faq/faq.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, 
  ],
  declarations: [HomePage,ContactComponent,FAQComponent]
})
export class HomePageModule {}
