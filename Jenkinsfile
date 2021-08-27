pipeline {
  agent any
  tools {nodejs "node"}
  stages {
    stage('npm') {
      steps {
        bat 'npm install'
      }
    }
  }
}
