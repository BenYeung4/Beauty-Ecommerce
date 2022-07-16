const router = require("express").Router();

//access the api files
const apiRoutes = require("./api");
router.use("/api", apiRoutes);

//in case of error, then state it, all else just return
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
