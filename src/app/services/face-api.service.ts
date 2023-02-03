import {EventEmitter, Injectable} from '@angular/core';
import { log } from 'console';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class FaceApiService {
  public globalFace: any;
  public modelsReady: boolean = false;
  private modelsForLoad = [
    faceapi.nets.ssdMobilenetv1.loadFromUri('../../assets/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models')
  ];

  cbModels: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.globalFace = faceapi;

    this.loadModels();
  }

  public loadModels = () => {
    Promise.all(this.modelsForLoad).then(() => {
      console.log(this.modelsForLoad);
      
      console.log('Modelos cargados!!');
      this.modelsReady = true;
      this.cbModels.emit(true);
    });
  };
}
