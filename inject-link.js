function injectLink(href) {
    "use strict";
    
    var head = document.head || document.getElementsByTagName("head")[0],
        link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.setAttribute("href", href);

    head.appendChild(link);
}
