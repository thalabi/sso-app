export const environment = {
    production: true,
    beRestServiceUrl: '@beRestServiceUrl@',
    // when adding or changing keycloak json, update sso-config.ts as well
    keycloak: {
        issuer: '@keycloak-issuer@',
        clientId: '@keycloak-clientId@',
        requireHttps: true,

        // prefixes of urls to send with Bearer token
        // prefixes have to be in lowerr case
        urlPrefixesWithBearerToken: ['@keycloak-urlPrefixesWithBearerToken@']
    },
    idle: {
        // times are in seconds
        inactivityTimer: '@idle-inactivityTimer@',
        timeoutTimer: '@idle-timeoutTimer@'
    }
};
