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
}