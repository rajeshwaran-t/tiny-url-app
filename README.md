**Tiny URL Web Application**
**TRUMPF Metamation – Full Stack Assessment**
**Project Overview**
This project is a Tiny URL Web Application developed as part of the TRUMPF Metamation Full Stack assessment.
The application allows users to:
•	Generate short URLs from long URLs
•	View public URLs
•	Track the number of clicks
•	Search and delete URLs
•	Copy short URLs to clipboard
The application is built using ASP.NET Core Minimal API for the backend and a web-based frontend UI.
________________________________________
**Technology Stack**
Frontend
•	HTML
•	CSS
•	JavaScript
Backend
•	ASP.NET Core (.NET)
•	API
Database
•	SQL Server
Cloud / DevOps
•	Microsoft Azure
•	GitHub
•	GitHub Actions (CI/CD)
________________________________________
**Features**
Create Short URL
Users can submit a long URL and generate a 6-character short URL.
Public URL List
All public URLs are listed in the UI.
Private URL
Users can mark a URL as Private while submitting it.
Click Tracking
The application records the total number of clicks for each short URL.
Search & Delete
Users can search URLs and delete them.
Copy to Clipboard
Users can easily copy the generated short URL.
________________________________________
**Backend API**
The backend is implemented using ASP.NET Core API.
Example endpoints:
Create URL
POST /api/urls
Get URLs
GET /api/urls
Delete URL
DELETE /api/urls/{id}
Redirect to original URL
GET /{shortCode}
________________________________________
**Database**
The project uses SQL for storing URLs.
Fields stored in database:
•	Id
•	OriginalUrl
•	ShortCode
•	IsPrivate
•	ClickCount
•	CreatedAt
________________________________________
**Hosting**
The application is hosted using Microsoft Azure.
•	Backend: Azure Web App
•	Frontend: Azure Static Web App
•	Database: SQLite
________________________________________
**CI/CD**
CI/CD pipeline is configured using GitHub Actions to automatically deploy the application when code is pushed to the repository.
________________________________________
**How to Run the Project**
Clone Repository
git clone https://github.com/rajeshwaran-t/tiny-url-app.git
Run Backend
cd Api
dotnet run
UI: https://gray-ocean-022d1410f.2.azurestaticapps.net/
API will start on:
https://tinyurl-api-new-csfkcgdfdhakh5ab.centralindia-01.azurewebsites.net/api/url


**Swagger:**
https://tinyurl-api-new-csfkcgdfdhakh5ab.centralindia-01.azurewebsites.net/swagger/index.html
Run Frontend
cd UI
npm install
npm start
________________________________________
**Repository**
GitHub Repository:
https://github.com/rajeshwaran-t/tiny-url-app

