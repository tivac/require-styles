"use strict";

module.exports = function injectLink(href) {
    var head = document.head || document.getElementsByTagName("head")[0],
        link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.setAttribute("href", href);

    head.appendChild(link);
};
