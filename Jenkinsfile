pipeline {
  agent any
  stages {
  
    
    
    stage('artifacts to s3') {
      steps{
      sh 'aws s3 sync dist/employeeamangerapp/ s3://employee-front-s3 --delete'
      }
    }

  }
}
