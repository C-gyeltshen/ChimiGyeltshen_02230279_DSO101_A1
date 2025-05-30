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
        // stage('Test Backend') {
        //     steps {
        //         dir('backend') {
        //             sh 'npm test || echo "No test script in backend, continuing"'
        //         }
        //     }
        //     post {
        //         always {
        //             junit allowEmptyResults: true, testResults: 'backend/junit.xml'
        //         }
        //     }
        // }
        
        // Stage 4b: Run Frontend Unit Tests
        // stage('Test Frontend') {
        //     steps {
        //         dir('frontend') {
        //             sh 'npm test || echo "No test script in frontend, continuing"'
        //         }
        //     }
        //     post {
        //         always {
        //             junit allowEmptyResults: true, testResults: 'frontend/junit.xml'
        //         }
        //     }
        // }
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
