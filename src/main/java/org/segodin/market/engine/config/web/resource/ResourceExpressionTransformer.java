package org.segodin.market.engine.config.web.resource;

import org.springframework.core.io.Resource;
import org.springframework.expression.EvaluationContext;
import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.resource.ResourceTransformer;
import org.springframework.web.servlet.resource.ResourceTransformerChain;
import org.springframework.web.servlet.resource.TransformedResource;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Replaces EL expressions in resources like javascript or css.
 * Expression should be enclosed with #{...}
 */
@Component
public class ResourceExpressionTransformer implements ResourceTransformer {

    /**
     * Has 2 groups, first - expression with curly braces, second - is expressions itself
     * */
    protected Pattern expressionPattern = Pattern.compile("(?:#\\{([^\\{\\}]+)\\})");
    /**
     * Second group, with expression itself
     * */
    protected int expressionPatternGroup = 1;

    protected ExpressionParser parser = new SpelExpressionParser();

    @Override
    public Resource transform(HttpServletRequest request, Resource resource, ResourceTransformerChain transformerChain) throws IOException {
        String originalResourceString = new String(FileCopyUtils.copyToByteArray(resource.getInputStream()));

        EvaluationContext ctx = new StandardEvaluationContext();
        ctx.setVariable("request", request);

        Matcher matcher = expressionPattern.matcher(originalResourceString);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            Expression expression = parser.parseExpression(matcher.group(expressionPatternGroup));
            Object value = expression.getValue(ctx);
            if (value != null) {
                matcher.appendReplacement(sb, value.toString());
            } else {
                matcher.appendReplacement(sb, matcher.group());
            }
        }
        matcher.appendTail(sb);

        return new TransformedResource(resource, sb.toString().getBytes());
    }
}
