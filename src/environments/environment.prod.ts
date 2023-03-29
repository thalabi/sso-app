export const environment = {
    production: false,
    keycloak: {
        issuer: "https://f104.kerneldc.com:8443/realms/sso2-app",
        redirectUri: "http://f104.kerneldc.com/sso2-app/",
        clientId: "sso2-app-fe",
        scope: "openid profile email",
        requireHttps: false,

        // prefixes have to be in lowerr case
        urlPrefixesWithBearerToken: ['http://f104.kerneldc.com/sso2-app/ping', 'http://f104.kerneldc.com/sso2-app/noBearerTokenPing']
    }
};
