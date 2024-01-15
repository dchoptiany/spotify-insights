const router = require("express").Router();
const passport = require("passport");
const { makeSpotifyApiRequest, dataCollectorAction } = require('./../controllers/apiActions');

router.get("/api_data", (req, res) => {
    if (req.user) {
        const accessToken = req.user.accessToken;
        const apiEndpoint = req.headers.endpoint;

        makeSpotifyApiRequest(apiEndpoint, accessToken)
        .then((userData) => {
          console.log( userData);
          res.redirect('http://aws_hostname:3000');
        })
        .catch((error) => {
          res.redirect('/error');
        });
    }

    })


router.get("/dataCollector", (req,res) =>{
  if(req.user){
        const accessToken = req.user.accessToken;
        const apiEndpoint = req.headers.endpoint;
        const expiry = req.user.expiry;

        jsonData= JSON.stringify({
         
            "access_token" : accessToken,
            "token_type" : "Bearer",
            "expires_in" : expiry
          
        })
        
        dataCollectorAction(apiEndpoint,jsonData).then((data)=>{
          res.status(200)
          res.json(data)
        })
        .catch((error) => {
          res.status(404)
          res.redirect('/error');
        });

  }

})    


router.get("/dataSketches", (req,res) =>{
        const apiEndpoint = req.headers.endpoint;
        const startDate = req.headers.startDate;
        const endDate = req.headers.endDate;


        const jsonData= JSON.stringify({
            "start_date" : startDate,
            "end_date" : endDate
          
        })
        
        dataCollectorAction(apiEndpoint,jsonData).then((data)=>{
          res.status(200)
          res.json(data)
        })
        .catch((error) => {
          res.send("Błąd tutaj")
          res.send(apiEndpoint)
          res.status(404)
          res.redirect('/error');
        });

  

})  

module.exports = router
    