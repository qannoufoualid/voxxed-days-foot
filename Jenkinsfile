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
        sh '''gcloud auth activate-service-account --key-file=sfeirFootVoxxedDays-460bbf8171ec.json
gcloud config set project sfeirfootvoxxeddays
gcloud container clusters get-credentials sfeir-voxxed-days --zone=europe-west1-c
docker image build -t eu.gcr.io/sfeirfootvoxxeddays/image-authenticationservice: .
kubectl delete -f authenticationServiceDeployment.yaml
kubectl create -f authenticationServiceDeployment.yaml
kubectl set image deployment authenticationservice-deployment authenticationservice=image-authenticationservice'''
      }
    }
  }
}