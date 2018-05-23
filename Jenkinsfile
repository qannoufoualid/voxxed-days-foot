pipeline {
  agent {
    docker {
      image 'google/cloud-sdk:latest'
    }
    
  }
  stages {
    stage('Build & Deploy BackOffice') {
      agent any
      steps {
        sh '''gcloud auth activate-service-account --key-file=credentials
gcloud config set project sfeirfootvoxxeddays
gcloud container clusters get-credentials sfeir-voxxed-days --zone=europe-west1-c
echo "Y" | gcloud auth configure-docker
rev=$(git rev-parse HEAD)
docker image build -t eu.gcr.io/sfeirfootvoxxeddays/image-backoffice:$rev .
docker image push eu.gcr.io/sfeirfootvoxxeddays/image-backoffice:$rev
docker image rm -f eu.gcr.io/sfeirfootvoxxeddays/image-backoffice:$rev
kubectl apply -f backofficeDeployment.yaml
kubectl set image deployment backoffice-deployment backoffice=image-backoffice:$rev'''
      }
    }
  }
}