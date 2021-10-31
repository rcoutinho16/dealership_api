Instructions:

    1. Install mongodb

    2. Create database (mongo shell):
        use dealership
    
    3: Create database user (mongo shell):
        db.createUser({
            user: "test",
            pwd: "test",
            roles: [ "readWrite", "dbAdmin" ] })

    4. Install application (regular shell):
        npm install
    
    5. Run server (regular shell):
        npm start