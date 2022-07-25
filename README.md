# AuctionApp2022
AuctionApp is an e-commerce web application that provides consumer-to-consumer sales based entirely on bidding process. In order to run the application locally, user needs to set up the following environment variables on his desktop:
* JDBC_DATABASE_URL – which holds the url to the database without databse type, for example: //localhost:5432/auctionDatabase
* JDBC_DATABASE_USERNAME – username needed to access database
* JDBC_DATABASE_PASSWORD – password needed to access database  
Also, user has to have npm and maven installed on his desktop.
To run the backend part of the application, user needs to go to backend directory and do following commands in his terminal: mvn clean install, java -jar target/auction-0.0.1-SNAPSHOT.jar. User needs to run the backend part of the app before he runs frontend in order to be able to get data from database. 
To run the frontend part of the application, user needs to go to frontend directory and run npm start. Locally, fronted is ran on localhost:3000 and backend is ran on localhost:8080. There are following routes in this project:
FRONTEND:
* Localhost:3000/ - landing page of the application
* Localhost:3000/shop/all – shop page which features all of the products 
* Localhost:3000/shop/:category – filtered shop page with products only from certain category
* Localhost:3000/privacy – static page Privacy and Policy
* Localhost:3000/terms – static page Terms and Conditions
* Localhost:3000/aboutUs – static page About Us
* Localhost:3000/product/:productid- detailed information about product   
All of backend routes can be seen on localhost:8080/swagger-ui.html
Application is also deployed on Heroku. Deployed frontend URL is: https://auctionapp2022.herokuapp.com/, and deployed backend URL is: https://auctionbackend2022.herokuapp.com/ 

