const express = require("express");//to use express js framework
var cors = require("cors");//
const app = express();
const m = require("./mongodb"); // connect with mongodb
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
var crypto = require("crypto");//to decrypt the password
const key = "adnan-tech-programming-computers";
const algo = "aes-256-cbc";
app.post("/register", async (req, res) => {
    const result = await m.findOne({ email: req.body.email });
    if (result) {
        res.json({ message: 'Email Already Registered!!' });
    }
    else {
        const email = req.body.email;
        const password = req.body.password;

        var cipher = crypto.createCipher(algo, key); //encrypt the password
        var encrypted = cipher.update(password, "utf-8", "hex") //with format
            + cipher.final("hex");
        const data = {
            email: req.body.email,
            password: encrypted,
        }

        const User = await m.create({
            email: data.email,
            password: data.password
        });
        res.status(201).json({ message: 'Account created successfully!' });
    }

})
app.listen(5000);
