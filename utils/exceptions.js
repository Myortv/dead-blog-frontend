import {notificationManager} from '../utils/notificaiotns.js'


export async function notificationWrapApiCall(
    apiFunction,
    exceptionsObject,
    ...args
) {
    try {
        const [response, body] = await apiFunction(...args);
        if (!response || !body) {
            return
        }
        if (!response.ok) {
            if (exceptionsObject.hasOwnProperty(body.id)) {
                notificationManager.showNotification(
                    exceptionsObject[body.id].message,
                    exceptionsObject[body.id].areaId,
                    exceptionsObject[body.id].type,
                );
                return null
            } else {
                console.error(body)
                throw new Error('Uncatched Bad HTTP status');
            }
        } else {
            if (exceptionsObject.hasOwnProperty('ok')) {
                notificationManager.showNotification(
                    exceptionsObject['ok'].message,
                    exceptionsObject['ok'].areaId,
                    exceptionsObject['ok'].type,
                );
            }        
            return body
        }
    } catch (error) {
        console.error(error);
        notificationManager.showNotification(
            exceptionsObject['_'].message,
            exceptionsObject['_'].areaId,
            exceptionsObject['_'].type,
        );
        return null
    }
}
