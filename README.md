# AI Chat Webpage 💬

A webpage based on Django and React.

The website allows users to input prompts to a chat bar an receives a response from the AI-model, running locally.

## Features 🪄
- *The frontend is based on React while the backend is based on Django.*
- *The AI-model provides responses to users via the Django backend API.*
- *The AI Model is meant to run locally over the server/machine.*
- *The webpage includes Login and Registration component for users.*  
    > *Only users that login/register would be able to use the AI prompt.*

## Current Progress 🚧
- Currently, I am working on integrating the front end prompt bar with the backend API for generative AI model.
- Also working on a fix for the prompt bar that fails to go active post login.

## Test Installation Steps ⏬
1. Clone the git repository
2. cd into the repo and run ```npm install```
2. Start the Postgre SQL Server as a service.
    > This project requires a Postgres server to work. Refer to the ```../backend/backend/settings.py``` file for configuration parameters and ```../backend/users/views.py``` for table headers.
4. Run a generative AI-model as a service over the server (Ollama etc.) and mention the model used in ```../backend/aichat/views.py```
3. cd into the **backend** directory and run ```pip install -r requirements.txt```
    > Ensure that python3 has been installed. Using a python virtual environment is highly recommended.
3. In the **backend** directory, run ```python3 manage.py runserver``` to start the backend server.
3. cd into the **frontend** directory and run ```npm install```
3. Start the frontend server using the command ```npm run dev```
7. Open the Webpage, login as a new user. You should be able to use the prompt post login.

Feel free to contribute to the project for fixes. ☕
