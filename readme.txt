Gradle version: 2.9

For development use gradle task 'bootRun', javascript won't be minified
When need to update resource without restarting, then run task 'copyNotOptimizedCompiledAssetsToResources' while boot is running

For use on server run 'build' task, then to start application, use cmd command: 'java -jar market-engine-0.0.1.jar' .
Jar will be created in build/libs folder.
You can override default port: 'java -jar market-engine-0.0.1.jar --server.port=8083'.
Same for all other parameters from application.properties, like 'spring.datasource.url' or 'spring.datasource.username'.


-----------Folder structure-----------------

-- src
    -- main
        -- java
        -- resources
            -- assets // all web resources, libraries, react components and page javascript
                -- dynamic // without cache, can use SPEL expressions. Folder for resources, which can change for each request, like data about current user etc.
                -- lib // libraries resources
                -- static // cached, can use SPEL expressions. Folder for resources, that need to be executed only once and then cached.
            -- html // folder for pages html
            -- liquibase // liquibase config
                -- changelogs // liquibase scripts
            -- requireJsOptimizer  // folder for requireJsOptimizer and it's build config




