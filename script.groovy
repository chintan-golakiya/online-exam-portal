def buildServer(){
    withCredentials([
        usernamePassword(credentialsId:'dockerhub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')
    ]){
        // sh 'cd server/'
        sh 'docker build -t anssaeed/my-repo:server1.0 server/Dockerfile'
        sh 'echo $PASS | docker login -u $USER --password-stdin'
        sh 'docker push anssaeed/my-repo:server1.0'
    }

}
def buildFrontend(){
    withCredentials([
        usernamePassword(credentialsId:'dockerhub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')
    ]){
        // sh 'cd frontend/'
        sh 'docker build -t anssaeed/my-repo:frontend1.0 frontend/Dockerfile'
        sh 'echo $PASS | docker login -u $USER --password-stdin'
        sh 'docker push anssaeed/my-repo:frontend1.0'
    }

}
def buildUserPortal(){
    withCredentials([
        usernamePassword(credentialsId:'dockerhub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')
    ]){
        // sh 'cd user-portal-frontend/'
        sh 'docker build -t anssaeed/my-repo:userportal1.0 user-portal-frontend/Dockerfile'
        sh 'echo $PASS | docker login -u $USER --password-stdin'
        sh 'docker push anssaeed/my-repo:userportal1.0'
    }

}

return this