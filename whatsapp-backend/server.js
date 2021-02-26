const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./dbMessages");
const Pusher = require("pusher");
const cors = require("cors");
const app = express();

const connection_url = `mongodb+srv://admin:xUDb50ueTexEIr6p@cluster0.p9wjg.mongodb.net/whatsappdb?retryWrites=true&w=majority`;

//MONGOOSE
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//PUSHER
const pusher = new Pusher({
  appId: "1162104",
  key: "3133dd1a024c8d8d34ef",
  secret: "5686761df36ca394731d",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB is connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

//MIDDLEWARES
app.use(express.json());

app.use(cors());

// API ROUTES
app.get("/", (req, res) => res.status(200).send("Hello world"));

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

const port = process.env.PORT || 9898;

app.listen(port, () => console.log(`Server is up and running at ${port}`));
