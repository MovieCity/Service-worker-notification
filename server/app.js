const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
    publicKey: "BPcuV_W4ydMltMjJpBXT1lLAVkNkhnD61KQbIUxqWYOeBb6OaB9XEsp7H6zP_TSbjnTF6qdOn0wSeoGBqwiRUWE",
    privateKey: "TyJr2FetditQ0F1xsWvXkaTpRde89OM2lcfP-MDEdy4"
}

webpush.setVapidDetails(
    'mailto:eren.yeager.founding.titan.9@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatabse = [];


app.post("/save-subscription", (req, res) => {
    subDatabse.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    webpush.sendNotification(subDatabse[0], "https://ik.imagekit.io/Eren/Attack_on_Titan_Season_1.jpg?updatedAt=1739714374040");
    res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})
