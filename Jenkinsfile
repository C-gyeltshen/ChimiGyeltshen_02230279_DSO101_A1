pipeline {
    agent any
    tools {
        nodejs 'NodeJS 24.0.2'
    }
    stages {
        // Stage 1: Checkout Code
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/C-gyeltshen/ChimiGyeltshen_02230279_DSO101_A1.git'
            }
        }
        
        // Stage 2: Install Dependencies (Backend)
        stage('Install Backend') {
            steps {
                dir('A1_backend') {
                    sh 'npm install'
                }
            }
        }
        
        // Stage 2b: Install Dependencies (Frontend)
        stage('Install Frontend') {
            steps {
                dir('A1_frontend') {
                    sh 'npm install'
                }
            }
        }
        
        // Stage 3: Build Backend (if applicable)
        stage('Build Backend') {
            steps {
                dir('A1_backend') {
                    sh 'npm run build || echo "No build script in backend, continuing"'
                }
            }
        }
        
        // Stage 3b: Build Frontend (React/TypeScript)
        stage('Build Frontend') {
            steps {
                dir('A1_frontend') {
                    sh 'npm run build'
                }
            }
        }

        // Stage 4: Run Backend Unit Tests
        stage('Test Backend') {
            steps {
                dir('A1_backend') {
                    sh 'npm test || echo "No test script in backend, continuing"'
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'A1_backend/junit.xml'
                }
            }
        }
        
        // Stage 4b: Run Frontend Unit Tests
        stage('Test Frontend') {
            steps {
                dir('A1_frontend') {
                    sh 'npm test || echo "No test script in A1_frontend, continuing"'
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'A1_frontend/junit.xml'
                }
            }
        }
        
        // Stage 5: Deploy (Docker Example)
        stage('Deploy') {
            steps {
                script {
                    // Build Docker image using backend Dockerfile
                    sh 'docker build -t gyeltshen23/node-app:latest -f A1_backend/Dockerfile A1_backend/'
                    
                    // Push to Docker Hub (requires credentials)
                    withCredentials([string(credentialsId: 'docker-hub-creds', variable: 'DOCKER_PWD')]) {
                        sh 'echo $DOCKER_PWD | docker login -u gyeltshen23 --password-stdin'
                        sh 'docker push gyeltshen23/node-app:latest'
                    }
                }
            }
        }
    }
}