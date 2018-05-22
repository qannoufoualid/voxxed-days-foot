#!/usr/bin/env bash


start=`date +%s`

display_usage() {
    echo "Usage : ./deployments.sh [\"create\" | \"update\"] [tag] [\"all\" | firstService secondService...]"
    }

if [ $# == 0 ]
then
    display_usage
    exit 0
fi

if [ $1 != "create" ] && [ $1 != "update" ]
then
    display_usage
    exit 0
fi

eval "docker image build -f nginx-deployment/Dockerfile -t eu.gcr.io/sfeirfootvoxxeddays/image-backoffice:$2 ."

eval "docker image push eu.gcr.io/sfeirfootvoxxeddays/image-backoffice:$2"

if [ $1 = "update" ]
then
    eval "kubectl set image deployment backoffice-deployment backoffice\=eu.gcr.io/sfeirfootvoxxeddays/image-backoffice:$2"
fi

if [ $1 = "create" ]
then
    kubectl delete -f "nginx-deployment/backofficeDeployment.yaml"
    kubectl create -f "nginx-deployment/backofficeDeployment.yaml"
    eval "kubectl set image deployment backoffice-deployment backoffice\=eu.gcr.io/sfeirfootvoxxeddays/image-backoffice:$2"
fi
