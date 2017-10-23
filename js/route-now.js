(function(){
    'use strict';
    var $Router = {},
        getType = function (genericObject) {return Object.prototype.toString.call(genericObject).replace(/[\[\]]/g,'').split(' ')[1];},
        validatePathToMap = function (pathObj) {
            if (!pathObj.path && !pathObj.otherwise) {
                throw new Error("Please Provide a Path");
            } else if (!pathObj.templateUrl && !pathObj.otherwise) {
                throw new Error("Please Provide a valid Template Url for '"+pathObj.path+"' Path");
            }
        },
        configurePathMap = function (pathToMap) {
            if(!$Router.pathMap){
                $Router.pathMap = {};
            }
            validatePathToMap(pathToMap);
            !pathToMap.otherwise && ($Router.pathMap[pathToMap.path] = pathToMap.templateUrl);
            pathToMap.otherwise && ($Router.otherwiseURL = "#"+pathToMap.otherwise);
        },
        hasRoutingChanged = function(){
            var listOfAnchorElems = document.querySelectorAll(".nav a");
            for(var i =0; i < listOfAnchorElems.length; i++){
                listOfAnchorElems[i].parentElement.setAttribute("class", "nav");
            }
            if (location.hash && $Router.pathMap[location.hash.split('#')[1]]) {
                $Router.go(location.hash);
            } else if ($Router.otherwiseURL) {
                location.hash = $Router.otherwiseURL;
            }
        },
        congigureRouter = function(opts){
            $Router.options = Object.assign({},$Router.options,opts);
            console.log("$router ==> ",$Router);
        };
    $Router.options = {
        customErrorPageUrlSet : false,
        customErrorPageUrl : undefined,
        customErrorPageTemplateSet : false,
        customErrorPageTemplate : undefined,
        showErrorPage : true,
        activateLinks : true,
        activateLinkClass: "active",
        deActivateLinkClass: "",
        beforeRouteChange: undefined,
        afterRouteChange: undefined,
        onRouteChangeError: undefined,
        routerOutletSelector: "router-outlet"
    };
    $Router.go = function (hashPath) {
        document
            .querySelector("a[href='"+hashPath+"']")
            .parentElement
            .setAttribute("class","nav active");
        $Router.route(hashPath);
    };
    $Router.config = function (paths, options) {
        var typeOfObj = getType(paths);
        switch (typeOfObj) {
            case 'Array':
                for (var index=0; index < paths.length; index++) {
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
        hasRoutingChanged();
    };
    $Router.noRouteDefinedTemplate = 
        "<style>"+
            ".errorStatement_routeNow{color:#ff8787;text-align:center;margin-top:100px;}"+
        "</style>"+
        "<div class='errorStatement_routeNow'>"+
            "Sorry this route is not available"+
        "</div>";
    $Router.route = function (hashToRoute) {
        hashToRoute = hashToRoute.split('#')[1];
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4) {
                switch(this.status){
                    case 200:
                        document.querySelector("["+$Router.options.routerOutletSelector+"]").innerHTML = this.responseText;
                        break;
                    case 404:
                        $Router.options.showErrorPage && (document.querySelector("["+$Router.options.routerOutletSelector+"]").innerHTML = $Router.noRouteDefinedTemplate);
                        break;
                }
            }
        };
        xhttp.open("GET",$Router.pathMap[hashToRoute],true);
        xhttp.send();
    };
    window.onhashchange = hasRoutingChanged;
    window.$Router = $Router;
})();
