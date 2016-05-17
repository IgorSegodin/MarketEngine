package org.segodin.market.engine.config.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class StringToLocalDateTimeConverter extends AbstractDateConverter implements Converter<String, LocalDateTime> {

    @Override
    public LocalDateTime convert(String source) {
        if (source == null || source.isEmpty()) {
            return null;
        }
        return LocalDateTime.parse(source, dateTimeFormatter);
    }
}