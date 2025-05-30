pipeline {
	agent any
	tools {
    	nodejs 'NodeJS'
	}

	stages {
    	// Stage 1: Checkout Code
    	stage('Checkout') {
        	steps {
            	git branch: 'main',
            	Url: 'https://github.com/C-gyeltshen/ChimiGyeltshen_02230279_DSO101_A1.git'
        	}
    	}

    	// Stage 2: Install Dependencies
    	stage('Install') {
        	steps {
            	sh 'npm install' 
        	}
    	}

    	// Stage 3: Build (if applicable, e.g., for React/TypeScript)
    	stage('Build') {
        	steps {
            	sh 'npm run build' 
        	}
    	}

    	// Stage 4: Run Unit Tests
    	stage('Test') {
        	steps {
            	sh 'npm test'  // Runs "test" script (Jest/Mocha)
        	}
        	post {
            	always {
                	junit 'junit.xml'  // Publish test results
            	}
        	}
    	}

    	// Stage 5: Deploy (Docker Example)
    	stage('Deploy') {
        	steps {
            	script {
                	// Build Docker image
                	docker.build('gyeltshen23/node-app:latest')
               	 
                	// Push to Docker Hub (requires credentials)
                	docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                    	docker.image('gyeltshen23/node-app:latest').push()
                	}
            	}
        	}
    	}
	}
}

