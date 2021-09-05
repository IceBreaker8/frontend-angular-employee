pipeline {
  stage('NPM Install') {
        withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
            sh 'npm install'
        }
    }

    stage('Test') {
        withEnv(["CHROME_BIN=/usr/bin/chromium-browser"]) {
          sh 'ng test --progress=false --watch false'
        }
        junit '**/test-results.xml'
    }

    stage('Lint') {
        sh 'ng lint'
    }

    stage('Build') {
        milestone()
        sh 'ng build --prod --aot --sm --progress=false'
    }

}
