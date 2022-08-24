import { Injectable } from '@angular/core';
import {
  PushNotificationSchema,
  Token,
  ActionPerformed,
  PushNotifications,

} from '@capacitor/push-notifications';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Capacitor } from '@capacitor/core';
 
//const { PushNotifications } = Plugins;
 
@Injectable({
  providedIn: 'root'
})
export class FcmService {
  audio 
  notifications : Subject<PushNotificationSchema> = new Subject<PushNotificationSchema>()
  constructor(private router: Router) { }
 
  initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  playAudio() {
    if (environment.PLAY_AUDIO_ON_REQUEST == true) {
      this.audio = new Audio(environment.AUDIO_PATH);
      this.audio.play();
    }
  }

  stopAudio() {
    this.audio.pause();
  }
 
  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive == 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });
 
    PushNotifications.addListener(
      'registration',
      (data: Token) => {
        //console.log('My token: ' + JSON.stringify(data));
        localStorage.setItem('fcmId', data.value);

      }
    );
 
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });
 
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        this.playAudio();
        setTimeout(() => {
          this.stopAudio();
        },3000)
        this.notifications.next(notification);
        this.notifications = new Subject<PushNotificationSchema>()
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );
 
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
         // this.router.navigateByUrl(`/home/${data.detailsId}`);
          this.router.navigateByUrl('tabs/orders');
        }
      }
    );
  }
 
}