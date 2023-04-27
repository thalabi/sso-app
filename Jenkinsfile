pipeline {
    agent any
     tools { 
        maven 'Maven-3.8.4' 
        jdk 'jdk-17' 
    }

    // environment {
    //     HANGAR_IOT_TARGET_HOSTNAME = credentials('HANGAR_IOT_TARGET_HOSTNAME')
    // }

    stages {

        stage ('Initialize') {
            steps {
                echo "Branch is ${BRANCH_NAME} ..."
                sh '''
                echo "PATH = ${PATH}"
                echo "BRANCH_NAME = ${BRANCH_NAME}"
                java -version
                '''
            }
        }

        stage ('Build') {
            steps {
                sh '''
                cd src/environments
                ls -l
                cat *
                NOW=$(date -u +"%F %H:%M UTC")
                echo $NOW
                cat environment.prod.ts
                sed -i -e "s/@buildVersion@/${BRANCH_NAME}/" \
                    -e "s/@buildTimestamp@/${NOW}/" \
                    environment.prod.ts
                cat environment.prod.ts
                ls -l
                cat *
                pwd
                cd ../..
                pwd

                export PATH=/var/lib/jenkins/nodejs/node-v18.16.0-linux-x64/bin/:$PATH
                npm install && node_modules/.bin/ng build
                '''
            }
		}
		
        stage ('Package') {
			when {
			    not {
			        branch 'master'
			    }
			}
            steps {
                sh '''
                jar -cvf sso-app-${BRANCH_NAME}.jar dist
                '''
            }
		}

        stage ('Deploy') {
			when {
			    not {
			        branch 'master'
			    }
			}
			steps {
                sh '''
                REPOSITORY="maven-releases"
                if [[ $BRANCH_NAME == *"SNAPSHOT"* ]]; then
                    REPOSITORY="maven-snapshots"
                fi
                echo "REPOSITORY = ${REPOSITORY}"

                mvn deploy:deploy-file -DgroupId=com.kerneldc -DartifactId=sso-app -Dversion=${BRANCH_NAME} -DgeneratePom=true -Dpackaging=jar -DrepositoryId=kerneldc-nexus -Durl=http://localhost:8081/repository/${REPOSITORY} -Dfile=sso-app-${BRANCH_NAME}.jar
                '''
            }
        }
    }
}