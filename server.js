const routes = require("./routes");
// import sequelize connection

const PORT = process.env.PORT || 3001;

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
