// Import module
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
import { useEffect, useState } from 'react';
export const PusherNotification = () => {
    var beam = 'debug-interest-prueba';
    useEffect(() => {
        init()
        subscribe(beam)
    }, [])
    const init = (): void => {
        try {
            RNPusherPushNotifications.setInstanceId('615a3146-be29-4f8b-bdea-6474915b8d94');
            RNPusherPushNotifications.on("notification", handleNotification);
            //RNPusherPushNotifications.setOnSubscriptionsChangedListener(onSubscriptionsChanged);

        } catch (error) {
            console.log('Error al iniciar push notification');
        }
    };
    const handleNotification = (notification: any): void => {
        if (Platform.OS === "ios") {
            //getNotifications(dispatch);
            console.log("CALLBACK: handleNotification (ios)");
        } else {
            console.log("CALLBACK: handleNotification (android)");
        }
    };

    // Subscribe to an interest
    const subscribe = (interest: string): void => {
        try {
            RNPusherPushNotifications.subscribe(
                interest,
                (statusCode, response) => {
                    console.error(statusCode, response);
                },
                () => {
                    console.log(`CALLBACK: Subscribed to ${interest}`);
                }
            );
        } catch (error) {
            console.log('pusher-notification@subscribe');
        }
    };

    const onSubscriptionsChanged = (interests: string[]): void => {
        console.log("CALLBACK: onSubscriptionsChanged");
    }

    const unsubscribe = (interest: any, subscribeStatus: any) => {
        RNPusherPushNotifications.unsubscribe(
            interest,
            (statusCode: any, response: any) => { },
            () => {
                RNPusherPushNotifications.clearDeviceInterests()
            }
        );
    };
    return null
}