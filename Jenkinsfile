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
    stage('artifacts to s3') {
      steps{
      sh 'aws s3 sync dist/frontend-angular-employee s3://employee-front-s3 --delete'
      }
    }

  }
}
