const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require ("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function(req){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/20a12eeddf";
    const options = {
        method: "POST",
        auth: "victor1:344aa298a9d3c03a6fba783396198098-us17"
    }

   const request = https.request(url, options, function(response){
       response.on("data", function(data){
           console.log(JSON.parse(data));
       }) 
    })

    request.write(jsonData);
    request.end();
})

// API KEY : 344aa298a9d3c03a6fba783396198098-us17
// List ID : 20a12eeddf

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});