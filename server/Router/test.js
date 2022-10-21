const express = require("express");
const {
    crawlGuildMaster,
    crawlGuildList,
    crawlUserInfo,
} = require("../service/crawlingSvc");
const router = express.Router();

router.use(express.json());
router.post("/crawlGuildMaster", async (req, res) => {
    const serverValue = req.body.serverValue;
    const inputValue = req.body.inputValue;
    res.setHeader("Access-Control-Allow-origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const result = await crawlGuildMaster(serverValue, inputValue);
    console.log(result);
    res.send(result);
});

router.post("/crawlGuildList", async (req, res) => {
    const result = [];
    const serverValue = req.body.serverValue;
    const inputValue = req.body.inputValue;
    const guildList = await crawlGuildList(serverValue, inputValue);
    res.setHeader("Access-Control-Allow-origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    for (let i = 1; i < 3; i++) {
        for (let j = 0; j < guildList[i].length; j++) {
            let a = await crawlUserInfo(guildList[i][j]);
            result.push(a);
        }
    }
    res.send(result);
});

module.exports = router;
