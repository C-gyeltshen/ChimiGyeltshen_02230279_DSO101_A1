pipeline {
    agent any
    tools {
        nodejs 'nodejs'
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
        stage('Deploy Backend Image') {
            steps {
                script {
                    // Using Secret text credential
                    withEnv(["PATH+DOCKER=/usr/local/bin"]) {
                        sh 'docker build -t gyeltshen23/node-app:latest -f backend/Dockerfile backend/'
                        withCredentials([string(credentialsId: 'docker-hub-creds', variable: 'DOCKER_PWD')]) {
                            sh 'echo $DOCKER_PWD | docker login -u gyeltshen23 --password-stdin'
                            sh 'docker push gyeltshen23/node-app:latest'
                        }
                    }
                }
            }
        }
        stage('Deploy Frontend Image') {
            steps {
                script {
                    withEnv(["PATH+DOCKER=/usr/local/bin"]) {
                        sh 'docker build -t gyeltshen23/frontend-app:latest -f frontend/Dockerfile frontend/'
                        withCredentials([string(credentialsId: 'docker-hub-creds', variable: 'DOCKER_PWD')]) {
                            sh 'echo $DOCKER_PWD | docker login -u gyeltshen23 --password-stdin'
                            sh 'docker push gyeltshen23/frontend-app:latest'
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            // Clean up Docker images to save space
            script {
                withEnv(["PATH+DOCKER=/usr/local/bin"]) {
                    sh 'docker system prune -f || true'
                }
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}