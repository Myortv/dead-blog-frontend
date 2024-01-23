import {settings} from "../config/settings.js";


export class NotificationManager {
    constructor() {
        this.notificationAreas = new Map(); // Map to store different notification areas
    }

    addNotificationArea(areaId) {
        const area = document.getElementById(areaId);
        if (area) {
            this.notificationAreas.set(areaId, area);
        }
    }

    showNotification(message, areaId = 'default',  type = 'info') {
        const area = this.notificationAreas.get(areaId);
        if (!area) return;

        const notification = document.createElement('div');
        notification.innerHTML = message;
        notification.className = `notification ${type}`;

        area.appendChild(notification);

        setTimeout(() => {
            area.removeChild(notification);
        }, settings.notificaion_expire);
    }
}


export const notificationManager = new NotificationManager();
