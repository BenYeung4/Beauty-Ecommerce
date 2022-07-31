# Beauty-Ecommerce
Group 3 Team Members - Our GitHub Profile

* Benjamin
https://github.com/BenYeung4

* Chris
https://github.com/chrispobrien

* Damaris
https://github.com/DamarisCanales

* Alejandro
https://github.com/Muzan67

# Deployed Application on Heroku
https://beauty-ecommerce.herokuapp.com/

# Github Repository of Beauty E-Commerce
https://github.com/BenYeung4/Beauty-Ecommerce

# Interactive Full-Stack Project: Project 02
Our group used what we’ve learned over the past six weeks as well as go back to previous lessons and technologies for reference 
and reinforce our skills. We developed to create a real-world Full-Stack application that we will be able to showcase to potential employers. Our team has designed and build an app using the MVC paradigm, we created our own server-side API, added user 
authentication, which connects to our database which lets us Create Read Update and Delete files.

The Module lessons and Challenge assignments have reinforced the importance of quality coding standards as well as providing 
us the tools and foundations to be able to connect our Front-End to our Back-End while continuing to follow best practices.

## User Story
```
As a consumer of Korean beauty and skincare products I am looking ro purchase 
a range of high end quality products. 

I am able to create an account which can store recently viewed items for display. 

As a consumer, once I make an account I am able to maintain the products in shopping cart for checkout.

```

## Project Requirement
```
Use Node.js and Express.js to create a RESTful API.

Use Handlebars.js as the templating engine.

Use MySQL and the Sequelize ORM for the database.

Have both GET and POST routes for retrieving and adding new data.

Be deployed using Heroku (with data).

Use at least one new library, package, or technology that we haven’t discussed.

Have a polished UI.

Be responsive.

Be interactive (i.e., accept and respond to user input).

Have a folder structure that meets the MVC paradigm.

Include authentication (express-session and cookies).

Protect API keys and sensitive information with environment variables.

Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).

Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

Finally, you must add your project to the portfolio that you created in Module 2.

```
## Technologies Used
- Model View Controller (MVC)
- via Handlebars.js as templating engine
- Node.js
- Express.js
- Express session, connect session sequelize
- Dotenv
- Bcrypt to hash user password at rest
- Object Oriented Programming(OOP)
- MySQL/Sequelize (Jaws DB when hosted by Heroku)
- Create Read Update Delete (CRUD) RESTful API for all four tables

## Screenshots of Beauty E-Commerce Website

- All Products
![All Products](https://user-images.githubusercontent.com/102841726/181080337-5c20ec0b-6ee4-455c-8522-45930c032183.png)


# Installs

```sh
git clone https://github.com/BenYeung4/Beauty-Ecommerce.git
cd beauty-ecommerce
npm i
```

create a .env file, enter the following with your database name, username, and password
DB_NAME='product_db'
DB_USER=''
DB_PASSWORD=''
SECRET = 

Create local database:

```sh
mysql -u root -p
source db/schema.sql
```

Ctrl-C to exit mysql

Seed database and start server:

```
npm run seed
npm start
```

Browse to http://localhost:3001/
