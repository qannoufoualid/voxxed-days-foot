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
        sh '''gcloud auth activate-service-account --key-file=credentials
gcloud config set project sfeirfootvoxxeddays
gcloud container clusters get-credentials sfeir-voxxed-days --zone=europe-west1-c
docker image build -t eu.gcr.io/sfeirfootvoxxeddays/image-backofficeservice: .
kubectl delete -f backofficeDeployment.yaml
kubectl create -f backofficeDeployment.yaml
kubectl set image deployment backoffice-deployment backoffice=image-backofficeservice'''
      }
    }
  }
}