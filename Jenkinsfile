pipeline {
  agent any
  stages {
    stage('npm package') {
      steps {
        sh '''npm install
'''
      }
    }

    stage('Build') {
      steps {
        sh 'ng build'
      }
    }

    stage('Test') {
      steps {
        sh 'ng test'
      }
    }

  }
}