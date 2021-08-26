pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''npm install
ng build'''
      }
    }

    stage('Test') {
      steps {
        sh 'ng test'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deployed'
      }
    }

  }
}