import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDocumentComponent } from './image-document/image-document.component';
import { RecoknitionComponent } from './recoknition/recoknition.component';
import {DocumentOkGuard} from '../../Guards/document-ok.guard';
import {RekognitionGuard} from '../../Guards/rekognition.guard';
import {FinalizacionProcesoComponent} from './finalizacion-proceso/finalizacion-proceso.component'
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'document',
    canActivate: [],
    component: ImageDocumentComponent,
    data: {
      title: 'document'
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
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
