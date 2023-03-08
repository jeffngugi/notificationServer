const express = require("express");

const app = express();

const port = process.env.PORT || 8000;

app.use("/api/notification", require('./src/routes/api/notification'));

app.get("/api/notification/sendToAll", (req, res)=>{
    res.status(200).send({
        message: "Send to all is working",
      })
})


// when a random route is inputed
app.post("/jeff", (req, res) =>
  res.status(200).send({
    message: "Welcome to this API.",
  })
);


app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});