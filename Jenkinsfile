pipeline {
  agent {
    docker {
      image 'google/cloud-sdk:latest'
    }
    
  }
  stages {
    stage('Build Image') {
      agent {
        docker {
          image 'google/cloud-sdk'
        }
        
      }
      steps {
        sh 'docker build -t backoffice:1.1 .'
      }
    }
  }
}