import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoPlayerService } from '../../../services/video-player.service';
import * as toastFire from '../../../../assets/js/toast.js';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { loadingFireToast } from "../../../../assets/js/toast.js";
import { ApiService } from '../../../services/api.service';
import { environment } from '../../../../environments/environment';
import * as tmImage from '@teachablemachine/image';
/* import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom"; */
@Component({
  selector: 'app-image-document',
  templateUrl: './image-document.component.html',
  styleUrls: ['./image-document.component.scss']
})
export class ImageDocumentComponent implements OnInit {
  file: any;
  filesUploadFront:Array<any> = [];
  filesUploadBack:Array<any> = [];
  headersFront:any = {};
  preview:string = '';
  imageFront: boolean=true;
  documentsOk: boolean=false;
  numeroCedula:any='';
  token: any='';
  idValidacion: any;
  URL = '../../assets/model-json/';
  isIos = false;
  model: any;
  maxPredictions: any;
  webcam: tmImage.Webcam | undefined;
  labelContainer: HTMLElement | null | undefined;
    // fix when running demo in ios, video will be frozen;

  constructor(
    private apiService: ApiService,
    public videoPlayerService: VideoPlayerService,
    private sanitizer: DomSanitizer,
    private router: Router,) { }

  async ngOnInit() {
    if (window.navigator.userAgent.indexOf('iPhone') > -1 || window.navigator.userAgent.indexOf('iPad') > -1) {
      this.isIos = true;
    }
    /* Crear un usuario para generar luego el token*/
    //this.registro()

    /* verificar código */
    //this.verificarEmail();

    /* pedir nuevamente el código */
    //this.reSendCode()

    /* Login con el usuario creado */
    this.login()
  }

  /* async init() {
    const modelURL = this.URL + 'model.json';
    const metadataURL = this.URL + 'metadata.json';

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    const width = 200;
    const height = 200;
    this.webcam = new tmImage.Webcam(width, height, flip);
    await this.webcam.setup();// request access to the webcam
    await this.webcam.play();
    window.requestAnimationFrame(this.loop);

    if (this.isIos) {
        document.getElementById('webcam-container')!.appendChild(this.webcam.webcam) as HTMLVideoElement; // webcam object needs to be added in any case to make this work on iOS
        // grab video-object in any way you want and set the attributes
        const webCamVideo = document.getElementsByTagName('video')[0];
        webCamVideo.setAttribute("playsinline", "true"); // written with "setAttribute" bc. iOS buggs otherwise
        webCamVideo.muted = true;
        webCamVideo.style.width = width + 'px';
        webCamVideo.style.height = height + 'px';
    } else {
        document.getElementById("webcam-container")!.appendChild(this.webcam.canvas);
    }
    // append elements to the DOM
    this.labelContainer = document.getElementById('label-container');
    for (let i = 0; i < this.maxPredictions; i++) { // and class labels
        this.labelContainer!.appendChild(document.createElement('div'));
    }




}

  async loop() {
    document.addEventListener("DOMContentLoaded", function(this:any, event) {
      this.webcam!.update();
    });
     // update the webcam frame
    this.predict;
    window.requestAnimationFrame(this.loop);
}

// run the webcam image through the image model
  async predict() {
    // predict can take in an image, video or canvas html element
    let prediction:any;
    if (this.isIos) {
        prediction = await this.model.predict(this.webcam!.webcam);
    } else {
        prediction = await this.model.predict(this.webcam!.canvas);
    }
    for (let i = 0; i < this.maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
        this.labelContainer!.childNodes[i].textContent = classPrediction;
    }
} */

async login(){
  const body = {
    email: environment.ELOGIN,
    password: environment.PLOGIN
  }
  await this.apiService.post('login', body, '').subscribe(
    async (res: any) => {

      if (res.status == false) toastFire.toastFireError(res);
      else {
        this.token = res.data
        localStorage.setItem('token', `${this.token}`)

      }
    },
    (error: any) => {
      console.log('error enviando documento', error);
      toastFire.toastFireError(error);
    }
  );
}

async registro(){
  const data = {
    email:environment.ELOGIN,
    password:environment.PLOGIN,
    name:"demo",
    address: "direccion demo"
}
  await this.apiService.post('sign-up', data, '').subscribe(
    async (res: any) => {

      if (res.status == false) toastFire.toastFireError(res);
      else {
        console.log(res);


      }
    },
    (error: any) => {
      console.log('error enviando documento', error);
      toastFire.toastFireError(error);
    }
  );
}

async verificarEmail(){
  const verificar = {
      email:environment.ELOGIN,
      code: 123456
  }
  await this.apiService.post('confirm-code', verificar, '').subscribe(
    async (res: any) => {

      if (res.status == false) toastFire.toastFireError(res);
      else {
        console.log(res);


      }
    },
    (error: any) => {
      console.log('error enviando documento', error);
      toastFire.toastFireError(error);
    }
  );
}
async reSendCode(){
  const reSend = {
      email:environment.ELOGIN,
  }
  await this.apiService.post('resend-code', reSend, '').subscribe(
    async (res: any) => {

      if (res.status == false) toastFire.toastFireError(res);
      else {
        console.log(res);


      }
    },
    (error: any) => {
      console.log('error enviando documento', error);
      toastFire.toastFireError(error);
    }
  );
}



atras(){
  this.file = null;
  this.preview = '';
  $('#file').val('');
  this.documentsOk = false;
  this.imageFront = !this.imageFront;
  this.filesUploadFront = [];
}

async incomingfile(event:any) {

  this.file = event.target.files[0];

  this.extraerBase64(this.file).then((imagen:any) => {
    this.preview = imagen.base;
  })

}


async subirFrontal() {

    var image = this.urltoFile(this.preview, `image.jpg`, "image/jpg")
    image.then(async (img:any)=> {

      this.headersFront = {
        type: "FRONT",
        contentType: "image/jpg",
        extension: "jpg",
        documentType: "CC"
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+this.token
        })
      };
      const loading: any = loadingFireToast(
        'Cargando documento, por favor espere...'
      );

      await this.apiService.post(`add-dni-person/CC${this.numeroCedula}`, this.headersFront, httpOptions).subscribe(
        async (res: any) => {
          loading.close();
          console.log(res);


          if (res.status == false) toastFire.toastFireError(res);
          else {
            this.idValidacion = res.data.validationId;
            localStorage.setItem('validationId', this.idValidacion)
            const httpOptionsPut = {
              headers: new HttpHeaders({
                'Content-Type':"image/jpg",
              })
            };
            await this.apiService.put(res.data.uploadUrl, img, httpOptionsPut).subscribe(
              async (res: any) => {
                loading.close();

                //if (res.status == false) toastFire.toastFireError(res);
                //else {
                  //console.log(res);


                //}
              },
              (error: any) => {
                loading.close();
                console.log('error enviando documento', error);
                toastFire.toastFireError(error);
              }
            );

          }
        },
        (error: any) => {
          loading.close();
          console.log('error enviando documento', error);
          toastFire.toastFireError(error);
        }
      );

    });




  this.imageFront = false
  this.file = null;
  this.preview = '';
  $('#file').val('');
}

async SubirImgT(){
  var image = this.urltoFile(this.preview, `image.jpg`, "image/jpg")
    image.then(async (img:any)=> {
      this.headersFront = {
        type: "BACK",
        contentType: "image/jpg",
        extension: "jpg",
        documentType: "CC",
        validationId: `${this.idValidacion}`
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+this.token
        })
      };

      const loading: any = loadingFireToast(
        'Cargando documento, por favor espere...'
      );
      await this.apiService.post(`add-dni-person/CC${this.numeroCedula}`, this.headersFront, httpOptions).subscribe(
        async (res: any) => {
          loading.close();

            this.imageFront = false
            this.documentsOk = true;
            this.videoPlayerService.documentosOk = true;
            localStorage.setItem('documentOk', 'true');
            localStorage.setItem('cedula', `${this.numeroCedula}`)
          if (res.status == false) toastFire.toastFireError(res);
          else {
            const httpOptionsPut = {
              headers: new HttpHeaders({
                'Content-Type': "image/jpg",
              })
            };

            await this.apiService.put(res.data.uploadUrl, img, httpOptionsPut).subscribe(
              async (res: any) => {
                loading.close();

                /* if (res.status == false) toastFire.toastFireError(res);
                else {
                  console.log(res);


                } */
              },
              (error: any) => {
                loading.close();
                console.log('error enviando documento', error);
                toastFire.toastFireError(error);
              }
            );

          }
        },
        (error: any) => {
          loading.close();
          console.log('error enviando documento', error);
          toastFire.toastFireError(error);
        }
      );
    });




  //this.videoPlayerService.cargaDocOk = true;



}

urltoFile(url, filename, mimeType){
  return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename, {type:mimeType});})
  );
}

SubirDocumentos() {
  console.log(this.videoPlayerService.documentosOk);

  let data = new FormData();
  data.append('file', this.file);
  this.router.navigate(['pages/rekognition']);
  /* this.apiService.post('loans/pagos-unir', data).subscribe(
    (res: any) => {
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Archivos subidos con éxito.',
        });
        this.file = null;
        $('#file').val('');

      }
    },
    (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error.',
        timer: 2000,
      });
      console.log('error enviendo los documentos', error);
    }
  ); */
}

extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
  try {
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        base: reader.result
      });
    };
    reader.onerror = error => {
      resolve({
        base: null
      });
    };

  } catch (e) {

    return reject(e);
  }
})

}
