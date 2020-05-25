Warning:
  It is necessary to have Node.JS installed to run this project!

Installation:
- Download the content.
- Open the terminal
- Navigate to the root of the project
- Run "npm install" to install the dependencies locally.
- type "node src/index.js" and hit "ENTER"

Endpoints:
- Create User:
POST => {{url}}/users
BODY => (ex)
{
	"name": "usuario",
	"email": "usuario@teste.com",
	"password": "meuteste"
}

- Login User:
POST => {{url}}/users/login
BODY => (ex)
{
	"email": "usuario@teste.com",
	"password": "meuteste"
}

- Logout User:
POST => {{url}}/users/logout

- User's info:
GET => {{url}}/users/me

- Update User:
PATCH => {{url}}/users/me
BODY => (ex)
{
	"name": "usuario",
	"email": "usuario@teste.com",
	"password": "meuteste"
}

- Delete User:
DELETE => {{url}}/users/me

- Add User's favorite:
POST => {{url}}/users/favorite
BODY => (ex)
{
	"product":"77be5ad3-fa87-d8a0-9433-5dbcc3152fac"
}

- List Favorite Info:
GET => (ex) {{url}}/users/favorite/77be5ad3-fa87-d8a0-9433-5dbcc3152fac
