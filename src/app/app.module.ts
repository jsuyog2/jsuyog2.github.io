import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/header/header.component';
import { Section00Component } from './component/home/section00/section00.component';
import { Section01Component } from './component/home/section01/section01.component';
import { Section02Component } from './component/home/section02/section02.component';
import { Section03Component } from './component/home/section03/section03.component';
import { Section04Component } from './component/home/section04/section04.component';
import { Section05Component } from './component/home/section05/section05.component';
import { Section06Component } from './component/home/section06/section06.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ScrollSpyDirective } from './services/scroll-spy.directive';
import { AnimateCountDirective } from './directive/animate-count.directive';
import { ParallaxItemDirective } from './directive/parallax-item.directive';
import { ParallaxScreenComponent } from './layout/parallax-screen/parallax-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    Section00Component,
    Section01Component,
    Section02Component,
    Section03Component,
    Section04Component,
    Section05Component,
    Section06Component,
    FooterComponent,
    ScrollSpyDirective,
    AnimateCountDirective,
    ParallaxItemDirective,
    ParallaxScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    AnimateOnScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
