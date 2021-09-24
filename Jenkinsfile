pipeline {
  agent any
  stages {
    stage('npm') {
      steps {
        sh 'npm install'
      }
    }

    stage('Eslint'){
      steps{
        sh 'npx eslint src/app'
      }
    }
    
    stage('Jasmine Unit Tests') {
      steps {
        sh 'npm run test-headless'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to S3') {
      steps {
        sh 'aws s3 sync dist/employeeamangerapp/ s3://employee-front-s3'
      }
    }

  }
}