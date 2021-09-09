pipeline {
  agent any
  stages {
    stage('npm') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test-headless'
      }
    }

    stage('Prod') {
      steps {
        sh 'ng build --prod'
      }
    }

  }
}