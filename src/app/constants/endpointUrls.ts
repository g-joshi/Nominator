const endPointDomain = 'http://localhost:3000';

export class EndpointUrls {
    public static GET_SUPERVISEES = `${endPointDomain}/supervisees/{encOId}`;
    public static GET_SUPERVISEE_DETAILS = '/assets/mock/getSuperviseeDetails.json';


    public static GET_NOMINATIONS = `${endPointDomain}/nomination`;
    public static UPDATE_NOMINATION_STATUS = `${endPointDomain}/nomination/{id}`;
    public static DELETE_NOMINATION = `${endPointDomain}/nomination/{id}`;
    public static SUBMIT_NOMINATION = `${endPointDomain}/nomination`;
    public static EXPORT_NOMINATIONS = `${endPointDomain}/nomination/export`;

    public static GET_USERS = `${endPointDomain}/users`;
    public static ADD_USER = `${endPointDomain}/users`;
    public static UPDATE_USER = `${endPointDomain}/users/{id}`;
    public static DELETE_USER = `${endPointDomain}/users/{id}`;

    public static NOTIFICATION_SERVICE = `${endPointDomain}/subscribe`;
    public static PUBLIC_VAPID_KEY = 'BAMk7loC8oRci8CsezXqjk7H777nM08RbJsT8J87THq1Qgf7Udgv8awrjSZhYAOgWZRiucrCgowXzawDsZGYcHg';

    public static EMAIL_LINK = `${endPointDomain}/sendMail`;
}