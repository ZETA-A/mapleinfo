const express = require("express");
const app = express();
const test = require("./Router/test");

app.use("/api", test);

const port = 4000;
app.listen(port, () => console.log(`${port} 포트가 개방되었습니다`));
