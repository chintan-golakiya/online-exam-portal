def buildServer(){
    withCredentials([
        usernamePassword(credentialsId:'dockerhub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')
    ]){
        // sh 'cd server/'
        sh 'docker build -t anssaeed/my-repo:server1.0  /var/jenkins_home/workspace/online-exam-portal-pipeline/server/Dockerfile'
        sh 'echo $PASS | docker login -u $USER --password-stdin'
        sh 'docker push anssaeed/my-repo:server1.0'
    }

}
def buildFrontend(){
    withCredentials([
        usernamePassword(credentialsId:'dockerhub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')
    ]){
        // sh 'cd frontend/'
        sh 'docker build -t anssaeed/my-repo:frontend1.0  /var/jenkins_home/workspace/online-exam-portal-pipeline/frontend/Dockerfile'
        sh 'echo $PASS | docker login -u $USER --password-stdin'
        sh 'docker push anssaeed/my-repo:frontend1.0'
    }

}
def buildUserPortal(){
    withCredentials([
        usernamePassword(credentialsId:'dockerhub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')
    ]){
        // sh 'cd user-portal-frontend/'
        sh 'docker build -t anssaeed/my-repo:userportal1.0  /var/jenkins_home/workspace/online-exam-portal-pipeline/user-portal-frontend/Dockerfile'
        sh 'echo $PASS | docker login -u $USER --password-stdin'
        sh 'docker push anssaeed/my-repo:userportal1.0'
    }

}

return this