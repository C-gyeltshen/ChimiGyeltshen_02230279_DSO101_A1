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

## Deploy Backend to Render

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

### **Step2: Bilding the Docker image for the backend:**
```bash
docker build -t gyeltshen23/be-todo:02230279 .
```
![2](./image/3.png)
![4](./image/4.png)

### **Step3: Push the Docker image to Docker Hub:**
```bash
docker push gyeltshen23/be-todo:02230279
```
![5](./image/5.png)

### **Step 4: Deploy the existing Docker image to Render**

#### **Error : The provided image URL points to an image with an invalid platform. Images must be built with the platform linux/amd64.**
- I am using a MacBook with Apple Silicon (M1 chip), which uses the `linux/arm64` architecture by default. To resolve this, I need to build the Docker image for the `linux/amd64` platform.

    ![6](./image/6.png)

### **Step 5: Build the Docker image for the backend with the `linux/amd64` platform**
```bash
docker build --platform linux/amd64 -t gyeltshen23/be-todo:02230279 .
```
```bash
docker push gyeltshen23/be-todo:02230279
```
![7](./image/7.png)

### **Step 6: Deploy the Docker image to Render**

- Go to the Render dashboard and click on "New" > "Web Service".
- Select "Docker" as the deployment method.
- In the "Docker Image" field, enter the image URL: `gyeltshen23/be-todo:02230279`.
- Set environment variable : 
    ![8](./image/8.png)
- Set the "Instance Type" to "Starter".
- Click on "Create Web Service" to deploy the backend service.
    ![9](./image/9.png)

#### [Backend URl](https://be-todo-02230279.onrender.com)


### * Change all the fetch API URL in the `page.tsx` file to point to the Render backend URL.
```typescript
const response = await fetch('https://be-todo-02230279.onrender.com/todos');
```
![10](./image/10.png)

![11](./image/11.png)


## Deploy Frontend to Render
### **Step 1: Create Dockerfile for Frontend**

```bash
cd A1_Frontend
```
```bash
touch Dockerfile
```
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

### **Step 2: Build the Docker image for the frontend**
```bash
docker build -t gyeltshen23/fe-todo:02230279 .
```
![12](./image/12.png)
![13](./image/13.png)

#### **Step 3: Push the Docker image to Docker Hub**
```bash
docker push gyeltshen23/fe-todo:02230279
```
![14](./image/14.png)
### **Step 4: Deploy the Docker image to Render**
- Go to the Render dashboard and click on "New" > "Web Service".
- Select "Docker" as the deployment method.
- In the "Docker Image" field, enter the image URL: `gyeltshen23/fe-todo:02230279`.

### Error: The provided image URL points to an image with an invalid platform. Images must be built with the platform linux/amd64.
- I am using a MacBook with Apple Silicon (M1 chip), which uses the `linux/arm64` architecture by default. To resolve this, I need to build the Docker image for the `linux/amd64` platform.
### **Step 5: Build the Docker image for the frontend with the `linux/amd64` platform**
```bash
docker build --platform linux/amd64 -t gyeltshen23/fe-todo:02230279 .
```
![15](./image/15.png)

#### **Step 6: Push the Docker image to Docker Hub**
```bash
docker push gyeltshen23/fe-todo:02230279
```
![16](./image/16.png)
### **Step 7: Deploy the Docker image to Render**
- Go to the Render dashboard and click on "New" > "Web Service".
- Select "Docker" as the deployment method.
- In the "Docker Image" field, enter the image URL: `gyeltshen23/fe-todo:02230279`.
- Deploy : 

#### **Error : Out of memory (used over 512Mi)**
![17](./image/17.png)
- The error indicates that the Render service is running out of memory. 

### ***Solution: Use next `start` instead of `next dev`***

- Update the `Dockerfile` to use `next start` instead of `next dev` for production builds.

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```
- Rebuild and push the Docker image to Docker Hub:
```bash
docker build --platform linux/amd64 -t gyeltshen23/fe-todo:02230279 .
```
![18](./image/18.png)
```bash
docker push gyeltshen23/fe-todo:02230279
```
![19](./image/19.png)
- Deploy the Docker image to Render again.
- Go to the Render dashboard and click on "New" > "Web Service".
- In the "Docker Image" field, enter the image URL: `gyeltshen23/fe-todo:02230279`.
- Set the environment variable for the backend URL:
    ![20](./image/20.png)
- Set the "Instance Type" to "Starter".
- Click on "Create Web Service" to deploy the frontend service.
![21](./image/21.png)
#### [Frontend URl](https://fe-todo-02230279-3.onrender.com)

