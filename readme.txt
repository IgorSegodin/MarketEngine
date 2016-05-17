Tested on
Gradle version: 2.13
Database: MySQL 5.6
Java: 1.8
Environment: Windows 7
Browser: Chrome 49

Default database user: root
Default database password: root
Default database name: market_engine
Default port: 8081

For development use gradle task 'bootRun' with variable -Dprofile=dev .
For javascript hot reload you should run separate task 'bundleWatch' with variable -Dprofile=dev. If reloading doesn't happened in IntellijIdea, try to press ctrl + s (save).
Sometimes node and gradle processes are not stopped correctly (known issue in gradle + Idea i guess), it can lead to build errors, so you should kill them manually from time to time.
For use on server run 'build' task, you can use gradle wrapper 'gradlew', then to start application, use cmd command: 'java -jar market-engine-app-0.0.1.jar' .
Jar will be created in build/libs folder.
You can override default port: 'java -jar market-engine-app-0.0.1.jar --server.port=8083'.
Same for all other parameters from application.properties, like 'spring.datasource.url' or 'spring.datasource.username'.