# Adonis API application

This API was created using AdonisJS bolierplate, served via its CLI command and
it comes pre-configured with:

- Bodyparser
- Authentication
- CORS
- Lucid ORM
- Migrations and seeds

## Running the project

Manually clone the project and run `npm install`.

After having everything downloaded, go to your project folder and run 
`adonis serve --dev`

If you don't have AdonisJS CLI installed you may have to run through
`./node_modules/.bin/adonis serve --dev`

### Requirements

#### Database

You'll need a relational database installed. It can be MySQL, PostgreSQL or slite.

Check `.env.example` to see how to configure your enviromental variables.

Pay special attention to `DB_CONNECTION` variable. Here's where you tell which 
database you're using. You can either set with sqlite, mysql or pg (for PostgreSQL).

You'll also need other libraries depending on which database you use.

- `npm i --save sqlite3` (for sqlite)
- `npm i --save mysql` (for mysql or mariadb)
- `npm i --save pg` (for postgresql)

#### Sentry

This project is also using [Sentry](https://sentry.io) for error reporting.

You'll also need to configure your sentry DSN (create an account to have one).

`SENTRY_DSN`.

#### Email

We also send some emails in this API. In your env variables you'll need to set
four things:

- `MAIL_PORT`
- `MAIL_HOST`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`

I recommend you use [Mailtrap](https://mailtrap.io) while you are testing.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Project description

This an API that enables you to create an user. After creating this user, you'are 
able to create projects, create tasks for projects and assign this task for another 
user.

## API endpoints

Here, I'll show all endpoints for this API, that will enable you to fully use it:

### Creating a new user

Send a `POST` request to `/user` with the following JSON structure:

```json
{
	"username": ,
	"email": ,
	"password": ,
	"password_confirmation":
}
```

### Signing in with the user

Send a `GET` request to `/sessions`, with the following:

```json
{
	"email": ,
	"password": 
}
```

When you signin you'll receive a `Bearer token`. You'll need this token to send
any request related to Project and Task creation.

### Recovering the password

If, by any reason, you forgot the password, you won't be able to directly access
the database and look for the password, because it's encrypted. So you'll need to
go through the normal process of a mere mortal using your system.

First, request a password recovery by sending a `POST` request to `/passwords` with:

```json
{
  "email": "email@here.com"
}
```

After that, you'll receive an email with a link. Grab the `token` that is after
`paswords/`.

Having that token, to finally update the password, send a `PUT` request to
`passwords/TOKEN_HERE` with the following JSON body:

```json
  {
    "password": "123",
	  "password_confirmation": "123"
  }
```

> Frow now on, every request described here will require you to send 
> the Bearer token

### Creating a new project

Send a `POST` request to `/projects`, with the following:

```json
{
	"title": "Second React Project",
	"description": "Second react project comment"
}
```

### Listing all projects

If you want to see the list of all projects, send a `GET` request to 
`/projects`.

There's pagination feature implemented, and if you want to filter the posts
by page, send a patameter within the request url: `/projects?page=PAGE_NUMBER_HERE`.

There's no need for a JSON body in this request.

### Showing only a specific project

You can list only one project by sending a `GET` request to `projects/PROJECT_ID_HERE`.

No need for a body as well.

### Updating project

You can also update a project with a `PUT` request and the body:

```json
{
	"title": "First React Project, edited",
	"description": "First react project fucking edited comment"
}
```

### Deleting a project

Simply delete a project by informing its ID in the `DELETE` request URL
`projects/PROJECT_ID`.

### Creating tasks for a project

`POST` request to `projects/PROJECT_ID/tasks, with the following:

```json
{
	"title": "First task #300",
	"description": "This is the first task",
	"due_date": "2019-02-22 19:00:00",
	"user_id": "2",
	"file_id": "4"
}
```

### Listing all task

Just as we did to list all projects, send `GET` request to `/projects/PROJECT_ID/tasks`.
Pagination **isn't** implemented for listing tasks

### Showing a specific tasks

Send a `GET` request for `/projects/PROJECT_ID/tasks/TASK_ID`

### Updating a task

Send a `PUT` request `/projects/PROJECT_ID/tasks/TASK_ID` with the body:

```json
{
	"title": "First task #1, edited title",
	"description": "This is the first task",
	"due_date": "2019-02-22 19:00:00",
	"user_id": "2",
	"file_id": "4"
}
```


