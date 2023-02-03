import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VideoPlayerService } from '../services/video-player.service';



@Injectable({
  providedIn: 'root'
})
export class RekognitionGuard implements CanActivate {
  constructor(private router: Router,
    public videoPlayerService: VideoPlayerService,) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let rekognition =localStorage.getItem('rekognition')
      if (!rekognition) {
        return this.router.navigate(['']).then(() => false);
      }
    return true;
  }

}
