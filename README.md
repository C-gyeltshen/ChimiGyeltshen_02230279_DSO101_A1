# To-Do List Web Application – CI/CD Assignment (DSO101 A1)


## 📘 Assignment Details

- **Course**: Continuous Integration and Continuous Deployment (DSO101)  
- **Program**: Bachelor of Engineering in Software Engineering  
- **Assignment**: A1  
- **Student Name**: Chimi Gyeltshen  
- **Student Number**: 02230279
- **Date of Release**: 16th April  
- **Date of Submission**: 26th April  


## 🎯 Aim

To understand and implement Continuous Integration and Continuous Deployment (CI/CD) practices using Docker and Render by developing, containerizing, and deploying a full-stack to-do list web application.

---

## 🎯 Objectives

- Build a simple to-do list web application with frontend, backend, and database.
- Use environment variables for configuration in both frontend and backend.
- Containerize the application using Docker.
- Push Docker images to Docker Hub.
- Deploy the application on Render using pre-built Docker images.
- Automate the build and deployment process using GitHub and `render.yaml`.

## 🛠 Tech Stack

- **Frontend**: Nextjs and Tailwind CSS 
- **Backend**: Hono with Prisma as ORM 
- **Database**:  Render Postgres instance.  
- **CI/CD Tools**: Docker, Render, GitHub  

---

## 📂 Project Structure

```
todo-app/
│
├── backend/
│ ├── Dockerfile
│ ├── server.js
│ ├── .env
│ └── ...
│
├── frontend/
│ ├── Dockerfile
│ ├── .env
│ └── ...
│
├── render.yaml
└── README.md
```

## Step 0: Build the Application Locally 

## **Setup Backend** 

#### **Prerequisites**
- Node.js and npm installed
- PostgreSQL installed and running

#### Steps 1. Install Hnon

```bash
npm create hono@latest A1_Backend
```

```bash
cd A1_Backend
```
- Under src/index.ts change the port number from 300 to 8080.

#### Steps 2. Install Prisma

- Initialize a **TypeScript project** using npm:

    ```bash
    npm init -y
    npm install typescript tsx @types/node --save-dev
    ```

- Initialize TypeScript:

    ```bash
    npx tsc --init
    ```
-  Install the Prisma CLI as a development dependency in the project:

    ```bash 
    npm install prisma --save-dev
    ```
- Set up Prisma ORM with the init command of the Prisma CLI whinch will creates a new prisma directory with a schema.prisma file and configures SQLite as your database.

    ```bash
    npx prisma init --datasource-provider sqlite --output ../generated/prisma
    ```

- Update the `schema.prisma` file to define your data model and change the provide from sqllite to postgresql. Here is an example schema for a simple to-do list application:

    ```prisma
    generator client {
    provider = "prisma-client-js"
    output = "../generated/prisma_client"
    }

    datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
    }

    model User {
    id         Int      @id @default(autoincrement())
    email      String   @unique
    name       String?
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
    }

    model Todo {
    id          Int      @id @default(autoincrement())
    task String?
    completed   Boolean  @default(false)
    created_at   DateTime @default(now())
    updated_at   DateTime @updatedAt
    }
    ```
- Create a `.env` file in the root of your project and add your PostgreSQL connection string:

    ```plaintext
    DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
    ```
- Replace `username`, `password`, and `mydatabase` with your actual PostgreSQL credentials and database name.

- After updating the schema and .env file, run the following command to generate the Prisma client:

    ```bash
    npx prisma generate
    ```

    ```bash 
    npx prisma migrate dev --name init
    ```
- This command will create a new migration file and apply it to your database, creating the necessary tables based on your schema.

    - Run: 
    ```bash
    npx prisma db push
    ```
    ```bash 
    npx prisma generate 
    ```

- This command will push the schema changes to the database and generate the Prisma client.
- Now, you can use the Prisma client in your application. For example, under `src/index.ts`, you can import and use the Prisma client like this:

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

- You can now use the Prisma client to interact with your PostgreSQL database. 

## **Setup Frontend**

#### Steps 1. Install Next.js
```bash
npx create-next-app@latest A1_Frontend
```
```bash
cd my-next-app
```
#### Steps 2. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Step 3. Create a new `folder`(todo) with `page.tsx `file under `app` directory.

- Add the the todo list code in `page.tsx` file.

- Run the following command to start the Next.js development server:

    ```bash
    npm run dev
    ```

- Open your browser and navigate to `http://localhost:3000` to see your Next.js application running.

    ![1](./image/1.png)

#### Step 4. Using fetch API to connect the frontend with the backend.

- In the `page.tsx` file, you can use the `fetch` API to connect to your backend server.


## **Part A: Deploying a pre-built docker image to docker hub registry.**

### **Step 1: Create Dockerfile for Backend**

```bash
cd A1_Backend
```
```bash
touch Dockerfile
```
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 8080
CMD ["npm", "run", "dev"]
```
- This Dockerfile sets up a Node.js environment, installs dependencies, copies the application code, generates the Prisma client, exposes port 8080, and starts the application.

- Bilding the Docker image for the backend:
    ```bash
    docker build -t gyeltshen23/be-todo:02230279 .
    ```
    ![2](./image/2.png)

- Push the Docker image to Docker Hub:
    ```bash
    docker push gyeltshen23/be-todo:02230279
    ```
    ![]



