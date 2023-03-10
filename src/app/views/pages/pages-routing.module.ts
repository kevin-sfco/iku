import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ImageDocumentComponent } from './image-document/image-document.component';
import { RecoknitionComponent } from './recoknition/recoknition.component';
import {DocumentOkGuard} from '../../Guards/document-ok.guard';
import {RekognitionGuard} from '../../Guards/rekognition.guard';
import {FinalizacionProcesoComponent} from './finalizacion-proceso/finalizacion-proceso.component'

const routes: Routes = [
  
  {
    path: 'document',
    canActivate: [],
    component: ImageDocumentComponent,
    data: {
      title: 'Image'
    }
  },
  {
    path: 'rekognition',
    canActivate: [DocumentOkGuard],
    component: RecoknitionComponent,
    data: {
      title: 'rekognition'
    }
  },
  {
    path: 'finalizacion',
    canActivate: [RekognitionGuard],
    component: FinalizacionProcesoComponent,
  },
  {
    path: '**',
    redirectTo: 'document',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
