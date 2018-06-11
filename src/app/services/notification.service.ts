import { Injectable } from '@angular/core';
import { CommonUtils } from '../utils/CommonUtils';
import { EndpointUrls } from '../constants/endpointUrls';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {
    this.init();
  }

  /**
   * init
   * Initialize Notification and Subscription Process
   */
  init() {
    this.subscribeNotifications().catch(err => {
      console.log("Service worker registration failed ", err);
    });
  }

  /**
   * subscribeNotifications
   */
  async subscribeNotifications() {
    let isUserSubscribed = await this.isUserAlreadySubscribed();

    if (!isUserSubscribed) {
      let register = await this.getServiceWorkerInstance();

      // Registering push
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: CommonUtils.urlBase64ToUint8Array(EndpointUrls.PUBLIC_VAPID_KEY)
      });

      // Send push notifications
      await fetch(EndpointUrls.NOTIFICATION_SERVICE, {
        'method': 'POST',
        'body': JSON.stringify(subscription),
        'headers': {
          'content-type': 'application/json'
        }
      });
    }
  }

  /**
   * isUserAlreadySubscribed
   */
  async isUserAlreadySubscribed() {
    let register = await this.getServiceWorkerInstance();
    let userSubscription = await register.pushManager.getSubscription();
    // return !!register.pushManager.getSubscription();
    return !(userSubscription === null);
  }

  /**
   * getServiceWorkerInstance
   */
  getServiceWorkerInstance() {
    if (this.isServiceWorkerSupported()) {
      let serviceWorkerInstance: Promise<ServiceWorkerRegistration> = navigator.serviceWorker.register('service-worker.js');
      return serviceWorkerInstance;
    }
  }

  /**
   * isServiceWorkerSupported
   */
  isServiceWorkerSupported() {
    return ('serviceWorker' in navigator);
  }
}
