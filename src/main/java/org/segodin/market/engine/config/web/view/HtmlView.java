package org.segodin.market.engine.config.web.view;

import org.segodin.market.engine.config.web.resource.ResourceExpressionTransformer;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.StreamUtils;
import org.springframework.web.servlet.view.AbstractUrlBasedView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.Map;

public class HtmlView extends AbstractUrlBasedView {

    private ResourceExpressionTransformer transformer;

    @Override
    protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Resource resource = transformer.transform(request, new ClassPathResource(getUrl(), this.getClass().getClassLoader()), null);

        response.setContentType(getContentType());

        try (InputStream in = resource.getInputStream()) {
            StreamUtils.copy(in, response.getOutputStream());
        }
    }

    public void setTransformer(ResourceExpressionTransformer transformer) {
        this.transformer = transformer;
    }
}