import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FooterModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ImageDocumentComponent} from './image-document/image-document.component';
import {VideoPlayerComponent} from './video-player/video-player.component'
import { RecoknitionComponent } from './recoknition/recoknition.component';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../widgets/widgets.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    ImageDocumentComponent,
    RecoknitionComponent,
    VideoPlayerComponent,
    HomeComponent
],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    ButtonGroupModule,
    FormsModule,
    FooterModule,
    ReactiveFormsModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule
  ]
})
export class PagesModule {
}
