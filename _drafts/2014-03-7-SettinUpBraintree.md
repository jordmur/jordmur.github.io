---
layout: post
title: Setting up Braintree Payments with Angular (Server-Side)
---
For my last project, I added store capabilities using Braintree payments, owned by Paypal. Although Braintree offered excellent docs through their [website](https://developers.braintreepayments.com/) which explain in detail the simple version of the process, I encountered several issues during development.

##Server-Side Setup

The server setup closely resembled what the Braintree docs outlined. You simply initialize the gateway with your vendor specific keys. In order to avoid sharing your keys, it's a good practice to hide those in an _*env_ file on the server which is then added to the .gitignore to prevent that sensitive information from being shared publicly.

```javascript
var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "XXXXXXXXXXXXX",
  publicKey: "XXXXXXXXXXXXX",
  privateKey: "XXXXXXXXXXXXX"
});
```

Now that the gateway is set up, the server needs to send a client token to the front-end. This enables the user to make purchases. I set this up in the same file as our gateway, like so:

``` javascript
module.exports.getClientToken = function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
};
```

Now that I am generating a client token, I need to connect this to the relevant API route so that when the client requests the token, they get the client token. Fortunately, using express, this is incredibly easy.

``` javascript
module.exports.checkout = function (req, res, callback) {
  var nonce = req.body.payment_method_nonce;
  var price = req.body.price;
  var id = req.body.id;
  // Use payment method nonce here
  gateway.transaction.sale({
    amount: price,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    console.log('******', result);
    if(err) {
      console.error(err);
    } else {
      callback(result.success);
    }
  });
};
```
