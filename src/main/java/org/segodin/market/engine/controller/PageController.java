package org.segodin.market.engine.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Only for page retrieval
 * */
@Controller
public class PageController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String getIndex() {
        return "index";
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String getAdminPanel() {
        return "admin_panel";
    }

}
