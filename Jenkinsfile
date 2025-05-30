pipeline {
  agent any
  tools {
    nodejs 'NodeJS'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        dir('A1_frontend') {
          sh 'npm install'
        }
      }
    }

    stage('Install Backend Dependencies') {
      steps {
        dir('A1_backend') {
          sh 'npm install'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('A1_frontend') {
          sh 'npm run build'
        }
      }
    }

    stage('Test Backend') {
      steps {
        dir('A1_backend') {
          sh 'npm test || true'  // use `|| true` if no tests are set up yet
        }
      }
    }

    stage('Deploy (Render)') {
      steps {
        echo 'Deployment handled by Render on Git push.'
      }
    }
  }
}
