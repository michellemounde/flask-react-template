# List of Areas to edit

## Render - Phase 5: Ongoing Maintenance
The main limitation of the free Render Postgres database instance is that it will be deleted after 90 days. In order to keep your application up and running, you MUST create a new database instance before the 90 day period ends.

Set up calendar reminders for yourself to reset your Render Postgres database instance every 85 days so your application(s) will not experience any downtime.

Each time you get your calendar reminder, follow the steps below.
  1. Navigate to your Render Dashboard, click on your database instance, and click on either the "Delete Database" or "Suspend Database" button.
  2. Next, follow the instructions in Phase #3 above to create a new database instance.
  3. Finally, you will need to update the environment variables for EVERY application that was connected to the original database with the new database information. For each application:
    - Click on the application name from your Dashboard
    - Click on "Environment" in the left sidebar
    - Replace the value for DATABASE_URL with the new value from your new database instance, and then click "Save Changes"
    - At the top of the page, click "Manual Deploy", and choose "Clear build cache & deploy".
  4. After each application is updated with the new database instance and re-deployed, manually test each application to make sure everything still works and is appropriately seeded.

## Backend

### Testing routes with fetch
/*
const { csrfToken } = await fetch('/api/csrf/restore').then(res => res.json());

console.log(typeof csrfToken);
console.log(csrfToken);

fetch('/api/test', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
    },
    body: JSON.stringify({
      credential: "Demo-lition",
      password: "password"
    })
  })
  .then(res => res.json())
  .then(data => console.log(data));
*/

### .env && .flaskenv && env.py
- Go through and edit as needed

- Note: As you work to further develop your project, you may need to add more environment variables to your local .env file. Make sure you add these environment variables to the Render GUI as well for the next deployment.

### csrf
- cookieName

### database
- If there is an error when migrating, check your migration file and make changes.
- If there is no error when migrating, but you want to change the migration file afterwards, undo the migration first, change the file, then migrate again.

- If there is an error with seeding, check your seed file and make changes.\
- If there is no error in seeding but you want to change the seed file, remember to undo the seed first, change the file, then seed again.



## Frontend

### React
- edit public folder

### Flask-React
- No environment variables are needed to run this application in development, but be sure to set the REACT_APP_BASE_URL environment variable when you deploy!
