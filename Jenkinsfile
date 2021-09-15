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
        sh 'npm run build'
      }
    }

    stage('Chrome Unit Tests') {
      steps {
        sh 'npm run test-headless'
      }
    }

  }
}