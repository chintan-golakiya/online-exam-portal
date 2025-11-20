pipeline {
    agent any 
    
    // tools {
    //     nodejs 'NodeJS18'
    // }
    
    stages {
        // stage('Cloning repo') {
        //     steps {
        //         git branch: 'main' , url:'https://github.com/chintan-golakiya/online-exam-portal.git'
        //     }
        // }
        // stage('Checking Node Version') {
        //     steps {
        //         sh 'node -v'
        //         sh 'npm -v'
        //     }
        // }
        // stage('Installing backend Dependencies') {
        //     steps {
        //         sh 'cd backend && npm install'
        //     }
        // }
        // stage('Installing Frontend depend') {
        //     steps {
        //         sh 'cd frontend && npm install'
        //     }
        // }
        // stage('Installing USer-frontend depen') {
        //     steps {
        //         sh 'cd user-portal-frontend && npm instal --legacy-peer-deps'
        //     }
        // }
        // stage('Install nodemon globally') {
        //     steps {
        //         sh 'npm install -g nodemon'
        //     }
        // }

        // stage('Start Backend') {
        //     steps {
        //         // Run backend in background so pipeline can continue
        //         sh 'cd backend && nohup npm start &'
        //     }
        // }

        // stage('Start Frontend') {
        //     steps {
        //         // Run frontend in background
        //         sh 'cd frontend && nohup npm start &'
        //     }
        // }

        stage('Start User-Frontend') {
            steps {
                // Run user-frontend in background
                sh 'cd user-portal-frontend && nohup npm start &'
            }
        }
    }
}
