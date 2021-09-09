pipeline {
  agent any
  stages {
    stage('npm') {
      steps {
        sh 'npm cache clean --force'
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test-headless'
      }
    }

  }
}