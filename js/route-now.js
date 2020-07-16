'use strict';
var $Router = {},
    errorURLTriedAndFailed = false,
    hitCounter = 0,
    getType = function (genericObject) { return Object.prototype.toString.call(genericObject).replace(/[\[\]]/g, '').split(' ')[1]; },
    validatePathToMap = function (pathObj) {
        if (!pathObj.path && !pathObj.otherwise) {
            throw new Error("Please Provide a Path");
        } else if (!pathObj.templateUrl && !pathObj.otherwise) {
            throw new Error("Please Provide a valid Template Url for '" + pathObj.path + "' Path");
        }
    },
    pushToHistory = (url) => {
        history.pushState({ url }, null, `./${url}`);
        $Router.go(url);
    },
    configurePathMap = function (pathToMap) {
        if (!$Router.pathMap) {
            $Router.pathMap = {};
        }
        validatePathToMap(pathToMap);
        !pathToMap.otherwise && ($Router.pathMap[pathToMap.path] = pathToMap.templateUrl);
        if (pathToMap.otherwise) {
            if ($Router.options.useHashStrategy)
                $Router.otherwiseURL = "#" + pathToMap.otherwise;
            else
                $Router.otherwiseURL = pathToMap.otherwise;
        }
    },
    resetClassForAnchors = () => {
        var listOfAnchorElems = document.querySelectorAll("a." + $Router.options.activateLinkClass);
        for (var i = 0; i < listOfAnchorElems.length; i++) {
            listOfAnchorElems[i].setAttribute("class", $Router.options.defaultLinkClass);
        }
    },
    hasRoutingChanged = function () {
        if ($Router.options.useHashStrategy && location.hash && $Router.pathMap[location.hash.split('#')[1]]) {
            $Router.go(location.hash);
        } else if (!$Router.options.useHashStrategy && location.pathname && $Router.pathMap[location.pathname.split('/')[1]]) {
            $Router.go(location.pathname.split('/')[1]);
        } else if ($Router.otherwiseURL) {
            if ($Router.options.useHashStrategy)
                location.hash = $Router.otherwiseURL;
            else
                pushToHistory($Router.otherwiseURL);
        }
    },
    congigureRouter = function (opts) {
        $Router.options = Object.assign({}, $Router.options, opts);
    },
    routeErrorPage = function () {
        if ($Router.options.customErrorPageUrl && !errorURLTriedAndFailed) {
            $Router.route($Router.options.customErrorPageUrl, true);
        } else if ($Router.options.customErrorPageTemplate) {
            document.querySelector("[" + $Router.options.routerOutletSelector + "]").innerHTML = $Router.options.customErrorPageTemplate;
        } else {
            document.querySelector("[" + $Router.options.routerOutletSelector + "]").innerHTML = $Router.noRouteDefinedTemplate;
        }
    },
    configureForPushStateStrategy = () => {
        let anchorList = Array.from(document.querySelectorAll('a[r-href]'));
        anchorList.forEach(anchor => {
            anchor.addEventListener('click', e => {
                let url = anchor.getAttribute('r-href');
                pushToHistory(url);
            });
        });
    },
    configureForHashStrategy = () => {
        let anchorList = Array.from(document.querySelectorAll('a[r-href]'));
        anchorList.forEach(anchor => {
            let url = anchor.getAttribute('r-href');
            anchor.setAttribute('href', '#' + url);
        });
    };
$Router.options = {
    customErrorPageUrl: undefined,
    customErrorPageTemplate: undefined,
    showErrorPage: true,
    activateLinks: true,
    activateLinkClass: "active",
    defaultLinkClass: "",
    beforeRouteChange: undefined,
    afterRouteChange: undefined,
    onRouteChangeError: undefined,
    routerOutletSelector: "router-outlet",
    useHashStrategy: false,
    maxReRoute: 20
};
$Router.go = function (hashPath) {
    resetClassForAnchors();
    hashPath = hashPath.replace(/#/g, '');
    $Router.options.activateLinks && document
        .querySelector("a[r-href='" + hashPath + "']")
        .setAttribute("class", $Router.options.defaultLinkClass + " " + $Router.options.activateLinkClass);
    $Router.options.beforeRouteChange && $Router.options.beforeRouteChange(hashPath);
    $Router.route(hashPath);
};
$Router.hash = function (hash) {
    if (!hash) {
        throw new Error("Please provide a valid hash route");
    }
    hash = hash.replace(/#/g, '');
    this.options.useHashStrategy && (location.hash = hash);
    !this.options.useHashStrategy && (pushToHistory(hash));
};
$Router.config = function (paths, options) {
    var typeOfObj = getType(paths);
    switch (typeOfObj) {
        case 'Array':
            for (var index = 0; index < paths.length; index++) {
                configurePathMap(paths[index]);
            }
            break;
        case 'Object':
            configurePathMap(paths);
            break;
        default:
            throw new Error("Please provide a valid option for configuring the routes");
            break;
    }
    congigureRouter(options);
    if (this.options.useHashStrategy) {
        configureForHashStrategy();
    } else {
        configureForPushStateStrategy();
    }
    hasRoutingChanged();
};
$Router.noRouteDefinedTemplate =
    "<style>" +
    ".errorStatement_routeNow{color:#ff8787;text-align:center;margin-top:100px;}" +
    "</style>" +
    "<div class='errorStatement_routeNow'>" +
    "Sorry this route is not available" +
    "</div>";
$Router.route = function (hashToRoute, isItCustomURL) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            switch (this.status) {
                case 200:
                    document.querySelector("[" + $Router.options.routerOutletSelector + "]").innerHTML = this.responseText;
                    $Router.options.afterRouteChange && $Router.options.afterRouteChange(hashToRoute);
                    break;
                case 404:
                    isItCustomURL ? (errorURLTriedAndFailed = true) : ($Router.options.onRouteChangeError && $Router.options.onRouteChangeError(hashToRoute));
                    $Router.options.showErrorPage && routeErrorPage();
                    break;
            }
        }
    };
    isItCustomURL ? xhttp.open("GET", hashToRoute, true) : xhttp.open("GET", $Router.pathMap[hashToRoute], true);
    xhttp.send();
};
window.onhashchange = hasRoutingChanged;
window.addEventListener('popstate', e => {
    if (!$Router.options.useHashStrategy) {
        $Router.go(e.state.url);
    }
});
window.$Router = $Router;

//common modules export
if (typeof exports === "object") {
    module.exports = {
        $Router: $Router
    }
}