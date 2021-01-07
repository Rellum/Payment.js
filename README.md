# Payment.js Documentation

- More documentation can be found here: https://docs.fiserv.com/docs/payments/docs/
- A demo can be found [here](https://paymentjs.atelyr.com/prod)

## Getting Started

We only send webhooks to the URL you provide when registering [here](https://docs.firstdata.com/req/paymentjs). This URL must be accessible over HTTPS. This demo will assist you in generating an SSL certificate using Let's Encrypt and running the demo on HTTPS. 

### Set up

- A Ubuntu build on AWS works fine for this demo. Set one up, open ports 80 & 443. Make sure you assign an IP address or a custom domain name.
- Next you need to generate an SSL certificate. Follow this [tutorial](https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca)
- Please see the 'generateSSL' folder as we have provided the code there. 
- Simply, you generate your certificate, rename the folder `well-known` -> `.well-known`, update the file name inside `acme-challenge`, update the contents and run the index file inside `generateSSL`. Let's Encrypt will provide you with a certificate and then you're ready to run your server.
- Now navigate to config.json in the route and set your API keys which can be retrieved from [here](https://developer.firstdata.com/)
- In the same folder set your domain name without the prefix of http or https.
- Finally, run the command `sudo npm run build:and:start`
- Navigate to your URL such as [https://paymentjs.atelyr.com/prod](https://paymentjs.atelyr.com/prod) (not the uat or prod at the end). Now you are ready to try it out.


### Test Details

- Test card number: 5204740000001002
- Expiry year: 22
- Expiry month: 10
- CVV: 002


### Building the server

1. npm install
2. npm run build:server
3. npm run build:client
4. sudo npm start or npm run build:and:start

`sudo` is required to use HTTPS

- URL: https://localhost/{env}
- env: uat, prod

## Configuration

Gateway and Payment.js developer app credentials & domain are stored in config.json (https://docs.firstdata.com/req/paymentjs)

Note: for the webhook callback to work, an accessible webhook url needs to be registered in the developer app for PaymentJSv2.

## HTTPS
