package org.segodin.market.engine.config.web;

import org.segodin.market.engine.config.web.resource.ResourceExpressionTransformer;
import org.segodin.market.engine.config.web.view.HtmlViewResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

    @Value("${application.static.resource.cache.enabled}")
    private boolean staticResourceCacheEnabled = true;

    @Autowired
    private ResourceExpressionTransformer resourceExpressionTransformer;

    @Autowired
    private HtmlViewResolver htmlViewResolver;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // not cached
        registry.addResourceHandler("/dynamic/**")
                .addResourceLocations("classpath:assets/dynamic/")
                .resourceChain(false)
                .addTransformer(resourceExpressionTransformer);

        // cached
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:assets/static/")
                .resourceChain(staticResourceCacheEnabled)
                .addTransformer(resourceExpressionTransformer);

        // cached lib
        registry.addResourceHandler("/lib/**")
                .addResourceLocations("classpath:assets/lib/")
                .resourceChain(true);
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.viewResolver(htmlViewResolver);
    }
}
