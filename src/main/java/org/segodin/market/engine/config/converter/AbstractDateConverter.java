package org.segodin.market.engine.config.converter;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;

import java.time.format.DateTimeFormatter;

public abstract class AbstractDateConverter implements InitializingBean {

    @Value("${application.dateTime.format}")
    protected String dateTimeFormatterPattern;

    protected DateTimeFormatter dateTimeFormatter;

    @Override
    public void afterPropertiesSet() throws Exception {
        dateTimeFormatter = DateTimeFormatter.ofPattern(dateTimeFormatterPattern);
    }
}
