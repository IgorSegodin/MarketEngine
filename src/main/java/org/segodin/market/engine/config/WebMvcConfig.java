package org.segodin.market.engine.config;

import org.segodin.market.engine.config.resource.ResourceExpressionTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Autowired
    private ResourceExpressionTransformer resourceExpressionTransformer;

    @Autowired
    private List<Converter> converterList;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/js/**")
                .addResourceLocations("classpath:assets/js/")
                .resourceChain(false)
                .addTransformer(resourceExpressionTransformer);
    }

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        // TODO configure necessary cross domain requests
//        registry.addMapping("/**");
//    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        if (converterList != null) {
            for (Converter converter : converterList) {
                registry.addConverter(converter);
            }
        }
    }
}
