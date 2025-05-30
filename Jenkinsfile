pipeline {
    agent any
    tools {
        nodejs 'NodeJS 24.1.0'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/C-gyeltshen/ChimiGyeltshen_02230279_DSO101_A1.git'
            }
        }
        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm run build || echo "No build script in backend"'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build || echo "No build script in frontend"'
                }
            }
        }
        stage('Test Backend') {
            steps {
                echo 'No backend tests available, skipping...'
            }
        }
        stage('Test Frontend') {
            steps {
                echo 'No frontend tests available, skipping...'
            }
        }
        stage('Deploy Backend Image') {
            steps {
                script {
                    sh 'docker build -t gyeltshen23/node-app:latest -f backend/Dockerfile backend/'
                    withCredentials([string(credentialsId: 'docker-hub-creds', variable: 'DOCKER_PWD')]) {
                        sh 'echo $DOCKER_PWD | docker login -u gyeltshen23 --password-stdin'
                        sh 'docker push gyeltshen23/node-app:latest'
                    }
                }
            }
        }
    }
}
