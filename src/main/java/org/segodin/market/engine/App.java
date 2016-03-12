package org.segodin.market.engine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

/**
 * Redundant {@link ComponentScan} need this for IDEA to properly highlight autowired beans, without any errors
 * */
@ComponentScan(basePackages = "org.segodin.market.engine")
@SpringBootApplication
public class App {

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(App.class, args);
    }
}
