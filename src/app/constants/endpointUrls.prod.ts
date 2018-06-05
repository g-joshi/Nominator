const endPointDomain = 'http://localhost:3000';

export class EndpointUrls {
    public static GET_SUPERVISEES = '/assets/mock/getSupervisees.json';
    public static GET_SUPERVISEE_DETAILS = '/assets/mock/getSuperviseeDetails.json';

    public static GET_NOMINATIONS = `${endPointDomain}/nomination`;
    public static UPDATE_NOMINATION_STATUS = `${endPointDomain}/nomination/{id}`;
    public static SUBMIT_NOMINATION = `${endPointDomain}/nomination`;

    public static GET_USERS = `${endPointDomain}/users`;
    public static ADD_USER = `${endPointDomain}/users`;
    public static UPDATE_USER = `${endPointDomain}/users/{id}`;
    public static DELETE_USER = `${endPointDomain}/users/{id}`;
}