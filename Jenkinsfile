pipeline {
  agent any
  stages {
  
    stage('npm'){
      steps{
        sh 'npm install'
      }
    }
    stage('build'){
      steps{
        sh 'npm run build'
      }
    }


    
    stage('artifacts to s3') {
      steps{
      sh 'aws s3 sync dist/employeeamangerapp/ s3://employee-front-s3 --delete'
      }
    }

  }
}
