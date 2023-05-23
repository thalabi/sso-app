To add oauth2 dependencies:
1. npm i angular-oauth2-oidc --save
2. npm i angular-oauth2-oidc-jwks --save

To get ng-idle dependency:
node_modules\.bin\ng add @ng-idle/core


To run in development, run:

node_modules\.bin\ng serve

To build, run
node_modules\.bin\ng build


keycloak
========
To start keycloak, run:

cd C:\keycloak-21.0.1\bin
kc start-dev --http-enabled=false --https-port=8083 --https-key-store-file="C:\ssl\localhost-certificate.p12"

To start keycloak and work on themes (disabling caching), run:
kc start-dev --http-enabled=false --https-port=8083 --https-key-store-file="C:\ssl\localhost-certificate.p12" --spi-theme-static-max-age=-1 --spi-theme-cache-themes=false --spi-theme-cache-templates=false

To access admin console in dev, run:
https://localhost:8083/
