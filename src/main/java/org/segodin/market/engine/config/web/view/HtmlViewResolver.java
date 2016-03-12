package org.segodin.market.engine.config.web.view;

import org.segodin.market.engine.config.web.resource.ResourceExpressionTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.AbstractUrlBasedView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

@Component
public class HtmlViewResolver extends UrlBasedViewResolver {

    @Autowired
    private ResourceExpressionTransformer resourceExpressionTransformer;

    public HtmlViewResolver() {
        setPrefix("/html/");
        setSuffix(".html");
        setViewClass(HtmlView.class);
        setContentType(MediaType.TEXT_HTML_VALUE);
    }

    @Override
    protected AbstractUrlBasedView buildView(String viewName) throws Exception {
        HtmlView view = (HtmlView) super.buildView(viewName);
        view.setTransformer(resourceExpressionTransformer);
        return view;
    }
}
