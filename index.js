const ipfsApi = require('ipfs-api');
const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://musicx-46c2d.firebaseio.com'
});
const databaseRef = admin.database().ref('ipfs');
const express = require('express');

const fs = require('fs');
const ipfs = ipfsApi('0.0.0.0');
const port = 5002;
const app = express();

const request = require('request');



app.get('/', (req,res)=>{
    if(req.query.hash) request('http://127.0.0.1:8080/ipfs/'+req.query.hash).pipe(res);
    else res.sendFile(__dirname+'/index.html')
});

app.listen(port, '0.0.0.0', ()=>{
    console.log('[SERVER] Listening on port '+port);
  });


  function sendData(err,data,req,res) {
    if(err) {
        res.status(500).json({ err });
        console.log(err);
    } else {
        res.status(200).json(data);
        console.log(new Date(), req.url);
    }
}