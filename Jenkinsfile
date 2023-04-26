def gv
pipeline{
    agent any
    stages {

        stage('init'){
            steps{
                script{
                    gv = load "script.groovy"
                }
            }
        }
        stage('build server'){
            steps{
                script{
                    echo 'building the backend server and pushing to dockerhub...'
                    gv.buildServer()
                }
            }
        }

        stage('build frontend'){
            steps{
                script{
                    echo 'building frontend docker image and pushing to dockerhub'
                    gv.buildFrontend()
                }
            }
        }
        stage('build user-portal-frontend'){
            steps{
                script{
                    echo 'building user-portal-frontend docker image and pushing to dockerhub'
                    gv.buildUserPortal()
                }
            }
        }
        stage('deploy'){
            steps{
                script{
                    echo 'deploying the application'
                }
            }
        }
    }

}