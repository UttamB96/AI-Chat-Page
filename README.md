# AI Chat Webpage 💬

A webpage based on Django and React.

The website allows users to input prompts to a chat bar an receives a response from the AI-model, running locally.

## Features 🪄

- _The frontend is based on React while the backend is based on Django._
- _The AI foundational model provides responses to users via the Django backend API._
- _The AI Model is meant to run locally over the server/machine._
- _The webpage includes Login and Registration component for users._
  > _Only users that login would be able to use the AI prompt bar._

## Installation Steps ⏬

1. Clone the git repository
2. cd into the repo and run `npm install` inside the frontend folder.
3. Start the Postgre SQL Server as a service. Refer to the file named `postgres_setup.md` inside backend directory for setup steps.
   > This project requires a Postgres server to work. Refer to the `../backend/backend/settings.py` file for configuration parameters and `../backend/users/views.py` for table headers.
4. Run a generative AI-model as a service over the server (Ollama etc.) and mention the model used in `../backend/aichat/views.py`
5. cd into the **backend** directory and run `pip install -r requirements.txt`
   > Ensure that python3(3.9) has been installed. Using a python virtual environment is highly recommended.
6. In the **backend** directory, run `python3 manage.py runserver` to start the backend server.
7. cd into the **frontend** directory and run `npm install`
8. Start the frontend server using the command `npm run dev`
9. Open the Webpage, login as a new user. You should be able to use the prompt post login.

Feel free to contribute to the project for improvements/fixes. ☕
