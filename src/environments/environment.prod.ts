export const environment = {
    production: true,
    beRestServiceUrl: "https://api.kerneldc.com:8446",
    // when adding or changing keycloak json, update sso-config.ts as well
    keycloak: {
        issuer: "https://auth.kerneldc.com/realms/sso2-app",
        clientId: "sso-app-fe",
        requireHttps: true,

        // prefixes of urls to send with Bearer token
        // prefixes have to be in lowerr case
        urlPrefixesWithBearerToken: ["https://api.kerneldc.com:8446/ping"]
    },
    idle: {
        // times are in seconds
        inactivityTimer: 299,
        timeoutTimer: 1
    }
};
