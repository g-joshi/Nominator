export class CommonUtils {
    /**
     * convertEnumToArray
     * @param _enum
     */
    public static convertEnumToArray(_enum) {
        return Object.keys(_enum).filter(key => (typeof _enum[key]) === 'number').map((value, index) => {
            return {
                value: _enum[value],
                name: value
            }
        });
    }

    /**
     * Method to replace URL Template params with object values
     * Example
     * url=/med/ecom/soldtos/{soldtos}/shiptos/{shiptos}/v1/productavailabilities
     * tempObject={'soldtos':'123','shiptos':'456'}
     * @param urlTemplate
     * @param tempObject
     */
    public static populateURLTemplate(urlTemplate: string = '', tempObject: any = {}) {
        let tempHTML = '';
        tempHTML += urlTemplate.replace(/{[^{}]+}/g, function (key: string) {
            return tempObject[key.replace(/[{}]+/g, '')] || '';
        });
        return tempHTML;
    }

    /**
     * urlBase64ToUint8Array
     * @param base64String
     */
    public static urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}