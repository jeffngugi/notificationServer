import axios from 'axios'
import { config } from 'dotenv'
import express from 'express'
const router = express.Router()

const fcm_tokens = ['fdVoGBMpQiGpk6j5VyYYBs:APA91bFOghE61Hu5A5v0zgC7c_5Lt9iDd2D2q3zg-sPINkQo3GZwQH-5bMchQW-jtAWSWqUmVj5THKp_RT4SCCWneNMFZnow6AS1goknTtiJgYq7hDfvRAZY8nNvyFk86NOgY4XyXSLm']
const FIREBASE_API_KEY = 'key='+'AAAA2bfn518:APA91bEWpDm6nYXbiWfJe9XoO_eRqNnyEWpujla8rT5Qt-sVHESrnbG9vrzqidOtUEHo_7ZbIV9r1oqV-9-Iod6aLEyEoPtaYy6uUxx6_nCWC790Wzsq26hbg_4zYJbxF7gZ53yxACv1'

const headers  ={
    'Authorization': FIREBASE_API_KEY,
    'Content-Type':'application/json'
 }

 const firebaseUrl =  'https://fcm.googleapis.com/fcm/send';
 const notication_body = {
    registration_ids: fcm_tokens,
    notification: {
      title: 'Leave approved',
      body: 'Hello Geoffrey, your annual leave have been approved',
      vibrate: 1,
      sound: 1,
      show_in_foreground: true,
      priority: "high",
      content_available: true
    }
  };

  const notif_body = {
    registration_ids: fcm_tokens,
    notification: {
      title: 'EWA Submited',
      body: 'You EWa transacttion is succesfull',
      vibrate: 1,
      sound: 1,
      show_in_foreground: true,
      priority: "high",
      content_available: true,
    },
    data: {
      sender: `test@zemastore`,
      type: "notification",
    },
  };


router.post("/sendToAll", async (req, res)=>{
        await axios.post(
          firebaseUrl , 
          notif_body,
             {headers} )
             .then(resp =>{
                res.json({
                    status: 'success',
                    message: 'Notification sent successfully',
                    data: resp.data
                  })
             })
            .catch((error) => {
                console.error('Something went wrong', error);
            });
            
    } 
    );

    
        router.post("/sendToMany", async (req, res)=>{
       
        const options = {
            method: 'POST',
            url: firebaseUrl ,
            headers: {
              'Content-Type': 'application/json',
              Authorization: FIREBASE_API_KEY
            },
            data: notication_body
          };
    
          axios.request(options).then(function (r) {
             res.json({
              status: 'success',
              message: 'Notification sent successfully',
              data: res.data
            })
      
          }).catch(function (error) {
            return res.json({
      
              status: 'error',
              message: 'Notification not sent',
              data: error
            })
          });
        } );
    
        router.post("/sendToSingle", async (req, res)=>{
            const message = {
                notification: {
                  title: "Hello Jeff",
                  body: "Test single user notification",
                },
                data: {
                  sender: `test@zemastore`,
                  type: "notification",
                },
                to: 'fdVoGBMpQiGpk6j5VyYYBs:APA91bFOghE61Hu5A5v0zgC7c_5Lt9iDd2D2q3zg-sPINkQo3GZwQH-5bMchQW-jtAWSWqUmVj5THKp_RT4SCCWneNMFZnow6AS1goknTtiJgYq7hDfvRAZY8nNvyFk86NOgY4XyXSLm',
              };
            const options = {
                method: 'POST',
                url: firebaseUrl ,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: FIREBASE_API_KEY
                },
                data: message
              };
              axios.request(options).then(function (r) {
                 res.json({
                  status: 'success',
                  message: 'Notification sent successfully to singe',
                  data: res.data
                })
          
              }).catch(function (error) {
                return res.json({
          
                  status: 'error',
                  message: 'Notification not sent',
                  data: error
                })
              });
            } );

  

export default router;

// async saveFcmToken(req, res) {
//   try {
//       const { fcmToken } = req.body;
//       console.log("fcmToken = ", fcmToken);
//       const myId = req._id;
//       console.log("myId", myId);
//       const myUser = await UserRepository.saveUserFcmToken(myId, fcmToken);
//       return res.json({
//           user: myUser
//       })
//   } catch (err) {
//       return res.json({
//           error: true,
//           errorMessage: err
//       })
//   }
// }
// messaging()
//             .getToken()
//             .then(FCMtoken => {
//               console.log('token>>>>' + FCMtoken);
//               axios
//                 .post(
//                   INSERT_PUSH,
//                   {
//                     userId: getEncUserId(userDetails.userId),
//                     pushKeyString: FCMtoken,
//                     deviceType: 'android',
//                     deviceId: DeviceInfo.getDeviceId(),
//                   },
//                   {
//                     headers: {
//                       token: token,
//                     },
//                   },
//                 )
//                 .then(() => {});
//             });
//         }