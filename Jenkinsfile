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
        sh 'ng test --watch=false --progress=false --browsers=ChromeHeadless --code-coverage --source-map=false'
      }
    }

  }
}