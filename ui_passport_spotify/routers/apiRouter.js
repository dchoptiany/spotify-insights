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

//Route handling  user's data collector request
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

//Route handling user's data sketches request 
router.get("/dataSketches", (req, res) => {
  const apiEndpoint = req.query.endpoint;
  const startDate = req.query.startdate;
  const endDate = req.query.enddate;

  const jsonQuery = JSON.stringify({
    "start_date": startDate,
    "end_date": endDate
  });

  dataCollectorAction(apiEndpoint, jsonQuery)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(404).send(json);
    });
});

router.get("/dataSketchesCombo", (req, res) => {
  const apiEndpoint = req.query.endpoint;
  const startDate = req.query.startdate;
  const endDate = req.query.enddate;
  const arrayJson = req.query.array;

  const array = JSON.parse(arrayJson);




  const jsonQuery = JSON.stringify({
    "start_date": startDate,
    "end_date": endDate,
    "data" : array
  });

  dataCollectorAction(apiEndpoint, jsonQuery)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(404).send(jsonQuery);
    });
});
 

module.exports = router
    