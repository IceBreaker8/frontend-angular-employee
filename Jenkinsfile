pipeline {
  agent any
  stages {
    stage('npm') {
      steps {
        sh 'npm install'
      }
    }

    stage('Unit Tests') {
      steps {
        echo 'hi'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to S3') {
      steps {
        sh 'aws s3 sync dist/employeeamangerapp/ s3://employee-front-s3 --delete'
      }
    }

  }
}