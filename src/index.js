import express from "express";
import config from "dotenv";
import bodyParser from "body-parser";
import notificationRoutes from '../src/routes/api/notification'
config.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use("/api/notification", notificationRoutes);
app.post("/api/notificatisson/sendToAll", (req, res)=>{
    
    var notification =  {
        'title':'Title of the notification',
        'text':'THis is a notication sent from the notification server '
    }


var fcm_tokens = ['fdVoGBMpQiGpk6j5VyYYBs:APA91bFOghE61Hu5A5v0zgC7c_5Lt9iDd2D2q3zg-sPINkQo3GZwQH-5bMchQW-jtAWSWqUmVj5THKp_RT4SCCWneNMFZnow6AS1goknTtiJgYq7hDfvRAZY8nNvyFk86NOgY4XyXSLm'];
var notication_body = {
    'notificatio':notification,
    'registration_ids': fcm_tokens,
     
}
    fetch('https://fcm.googleapis.com/fcm/send',{
         'method':'POST',
         'headers':{
            'Authorization': 'key='+'AAAA2bfn518:APA91bEWpDm6nYXbiWfJe9XoO_eRqNnyEWpujla8rT5Qt-sVHESrnbG9vrzqidOtUEHo_7ZbIV9r1oqV-9-Iod6aLEyEoPtaYy6uUxx6_nCWC790Wzsq26hbg_4zYJbxF7gZ53yxACv1',
            'Content-Type':'application/json'
         },
         'body':JSON.stringify(notication_body)
    })
    .then(()=>{
        res.status(200).send('Notification sent successfully')
    }).catch((err) =>{
        res.status(400).send('Notification sent successfully')
    })

} );

app.post("/jeff", (req, res) =>
  res.status(200).send({
    message: "Jeff ngugi API works fine.",
  })
);

// when a random route is inputed
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to this API.",
  })
);
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
export default app;