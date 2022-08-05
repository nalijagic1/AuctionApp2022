# AuctionApp2022
AuctionApp is an e-commerce web application that provides consumer-to-consumer sales based entirely on bidding process. In order to run the application locally, user needs to set up the following environment variables on his desktop:
* **JDBC_DATABASE_URL** – which holds the url to the database without databse type, for example: //localhost:5432/auctionDatabase
* **JDBC_DATABASE_USERNAME** – username needed to access database
* **JDBC_DATABASE_PASSWORD** – password needed to access database
* **JWT_SECRET** - secret key needed to generate JWT token
* **JWT_EXPIRATION** - duration of JWT token
<!-- -->
User has to have npm and maven installed on his desktop.  
To run the backend part of the application, user needs to go to backend directory and do following commands in his terminal:  
```
mvn clean install. 
java -jar target/auction-0.0.1-SNAPSHOT.jar
```
User needs to run the backend part of the app before he runs frontend in order to be able to get data from database. 
To run the frontend part of the application, user needs to go to frontend directory and run npm start. Locally, fronted is ran on http://localhost:3000 and backend is ran on http://localhost:8080. All beckend routes can be sean on http://localhost:8080/swagger-ui.html.
 Application is also deployed on Heroku.  
 Frontend URL: https://auctionapp2022.herokuapp.com/  
 Backend URL: https://auctionbackend2022.herokuapp.com/ 

