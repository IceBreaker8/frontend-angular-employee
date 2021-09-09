pipeline {
  agent any
  stages {
    stage('npm') {
      steps {
        sh 'npm cache clean -f'
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
        sh 'npm test'
      }
    }

  }
}