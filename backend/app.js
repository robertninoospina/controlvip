const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const subscriptionsRouter = require("./routes/subscriptions");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/subscriptions", subscriptionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
