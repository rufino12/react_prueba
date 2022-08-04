// Import module
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
import { useEffect, useInsertionEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const PusherNotification = () => {
    const [subscribePusher, setSubscribePusher] = useState(false)

    var beam = 'debug-interest-prueba';
    useEffect(() => {
        init()
        if (!subscribePusher) {
            subscribe(beam)
            setSubscribePusher(true)
        }
    }, [])

    const init = (): void => {
        debugger
        try {
            RNPusherPushNotifications.setInstanceId('615a3146-be29-4f8b-bdea-6474915b8d94');
            RNPusherPushNotifications.on("notification", handleNotification);
            // RNPusherPushNotifications.setOnSubscriptionsChangedListener(onSubscriptionsChanged);

        } catch (error) {
            console.log('Error al iniciar push notification');
        }
    };
    const handleNotification = (notification: any): void => {
        debugger
        if (Platform.OS === "ios") {
            //getNotifications(dispatch);
            console.log("CALLBACK: handleNotification (ios)");
        } else {
            debugger
            console.log("CALLBACK: handleNotification (android)");
        }
    };

    // Subscribe to an interest
    const subscribe = (interest: string): void => {
        debugger
        try {
            RNPusherPushNotifications.subscribe(
                interest,
                (statusCode, response) => {
                    debugger
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
        debugger
        console.log("CALLBACK: onSubscriptionsChanged");
    }

    const unsubscribe = (interest: any, subscribeStatus: any) => {
        debugger
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