pipeline {
  agent any
  stages {
    

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
