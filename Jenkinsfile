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

    stage('Serve') {
      steps {
        sh 'npm serve --open'
      }
    }

  }
}