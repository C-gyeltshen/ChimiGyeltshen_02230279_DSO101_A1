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
                    // Method 1: Using withEnv (Recommended)
                    withEnv(["PATH+DOCKER=/usr/local/bin"]) {
                        sh 'docker build -t gyeltshen23/node-app:latest -f backend/Dockerfile backend/'
                        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PWD', usernameVariable: 'DOCKER_USER')]) {
                            sh 'echo $DOCKER_PWD | docker login -u $DOCKER_USER --password-stdin'
                            sh 'docker push gyeltshen23/node-app:latest'
                        }
                    }
                    
                    // Alternative Method 2: Using full paths
                    // sh '/usr/local/bin/docker build -t gyeltshen23/node-app:latest -f backend/Dockerfile backend/'
                    // withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PWD', usernameVariable: 'DOCKER_USER')]) {
                    //     sh 'echo $DOCKER_PWD | /usr/local/bin/docker login -u $DOCKER_USER --password-stdin'
                    //     sh '/usr/local/bin/docker push gyeltshen23/node-app:latest'
                    // }
                    
                    // Alternative Method 3: Single command with PATH
                    // sh '''
                    //     export PATH=$PATH:/usr/local/bin
                    //     docker build -t gyeltshen23/node-app:latest -f backend/Dockerfile backend/
                    // '''
                    // withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PWD', usernameVariable: 'DOCKER_USER')]) {
                    //     sh '''
                    //         export PATH=$PATH:/usr/local/bin
                    //         echo $DOCKER_PWD | docker login -u $DOCKER_USER --password-stdin
                    //         docker push gyeltshen23/node-app:latest
                    //     '''
                    // }
                }
            }
        }
        stage('Deploy Frontend Image') {
            steps {
                script {
                    withEnv(["PATH+DOCKER=/usr/local/bin"]) {
                        sh 'docker build -t gyeltshen23/frontend-app:latest -f frontend/Dockerfile frontend/'
                        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PWD', usernameVariable: 'DOCKER_USER')]) {
                            sh 'echo $DOCKER_PWD | docker login -u $DOCKER_USER --password-stdin'
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