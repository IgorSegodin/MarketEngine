package org.segodin.market.engine.config.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class LocalDateTimeToStringConverter extends AbstractDateConverter implements Converter<LocalDateTime, String> {

    @Override
    public String convert(LocalDateTime source) {
        if (source == null) {
            return null;
        }
        return dateTimeFormatter.format(source);
    }
}