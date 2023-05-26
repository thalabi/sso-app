// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//
// To start ng serve in ssl mode, run:
// ng serve --ssl --ssl-key "C:\Users\Tarif Halabi\Downloads\site-private-key.pem" --ssl-cert "C:\Users\Tarif Halabi\Downloads\localhost-certificate.pem"
//

export const environment = {
    production: false,
    beRestServiceUrl: 'https://localhost:8446',
    // when adding or changing keycloak json, update auth-config.ts and auth-module-config.ts as well
    keycloak: {
        issuer: 'https://localhost:8083/realms/sso2-app',
        clientId: 'sso-app-fe',
        requireHttps: true,

        // prefixes of urls to send with Bearer token
        // prefixes have to be in lowerr case
        urlPrefixesWithBearerToken: ['https://localhost:8446/protected']
    },
    idle: {
        // times are in seconds
        inactivityTimer: '299',
        timeoutTimer: '1'
    }
};




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
