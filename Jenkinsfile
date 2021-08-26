pipeline {
  agent any
  stages {
    stage('npm package') {
      steps {
        bat 'npm install'
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
  environment {
    nodejs = 'node'
  }
}