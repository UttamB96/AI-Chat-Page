** Postgres Setup **

1. Install PostgreSQL and initialize it.

2. Switch to postgres user

   > sudo -iu postgres

3. Start the PostgreSQL interactive terminal

   > psql

4. Create the user/role bot with a password

   > CREATE ROLE bot WITH LOGIN PASSWORD 'user@2025';

5. Create a database userdb owned by bot

   > CREATE DATABASE userdb OWNER bot;

6. Grant all privilges on database to bot

   > GRANT ALL PRIVILEGES ON DATABASE userdb TO bot;

7. Exit psql
   > \q
