# Getting Started with App
Clone the repository using:
```
git clone https://github.com/BilalAli2402/WebsiteFYP.git
```
Follow the steps below to setup frontend and backend of the application:
## Frontend
To run frontend app locally, go inside the frontend folder and install node dependencies using the following command:
```
npm install
```

Then run the server using:
```
npm start
```

You have successfully configured the frontend server.
---
<br>


## Backend
To run the backend server and the database you need to first build the docker image of the backend app.

Build the image using:
```
docker build -t backend-app .
```

Then run the docker-compose.yml file by typing `docker compose up`

After the container are up and running, make sure the database is initialized. Execute the following commands to perform database migrations from django app:
```
docker-compose -f path/to/docker-compose.yml exec backend-app bash
python manage.py migrate
```

Now you have successfuly configured the backend server as well as the postgresdb.
---
<br>

Before you begin using the app, create 2 roles in the database by connecting it using psql:
```
docker exec -it <name-of-postgres-container> psql -U adminuser quizapp
INSERT INTO "Roles"(role_name) VALUES('User');
INSERT INTO "Roles"(role_name) VALUES('Admin');
```

---

Create a admin account by sending a request to `localhost:8081/api/signup` and following request body:
```
{
    "email": "example@email.com",
    "password": "password",
    "username": "username",
    "roles": [2]  //Admin
}
```

<br>
Now You can Use the app from the frontend by logging in as admin or signup as a user.
