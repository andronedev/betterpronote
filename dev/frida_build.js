Java.perform(function () {
    console.log("Frida script loaded");
    var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();

    Java.scheduleOnMainThread(function() {
        var toast = Java.use("android.widget.Toast");
        toast.makeText(context, Java.use("java.lang.String").$new("BetterPronote V1.0.0"), 1).show();
    });

    var WebViewClient = Java.use('android.webkit.WebViewClient');
    var cssCode = `#GInterface\.Instances\[2\] .header-droit::before {
    color:#965A44;
}
.nav-wrapper.design-2021::before {
    color:orange;
}
.nav-wrapper.design-2021 {
    background: lightyellow;
    border-radius: 20px;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}

#GInterface\.Instances\[2\] > nav > div > div.header-gauche > div {
    border: 2px solid orangered;
}

#GInterface\.Instances\[0\] #GInterface\.Instances\[0\]\.Instances\[0\] #GInterface\.Instances\[0\]\.Instances\[0\]_ecranPrincipal {
    background-color: lightyellow;
}

.widget  {
    border-radius: 5px !important;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;

}

.ie-chips{
    border-radius: 20px !important;

    
}
.ie-chips::after {
    background: transparent !important;
    content: "" !important;
    width:0 !important;
    border: none !important;
    
}
.ie-chips.tag-style {
    background: orangered !important;
    padding-left: 0.8rem;    
    padding-right: 0.8rem;

}
.bloc-date-conteneur {
    background-color: darkorange;
    color: white;
}

.sidenav  {
    border-radius: 20px 0 0 20px ;
}
.menu-container {
        background-color: #965A44 !important;
}
.user-container {
            background-color: lightyellow ;
        color:black;

}
.btn-commands-container {
    background-color: orange;
}
.btnImage::before {
    color: black
}
.btnImage::after {
    color: black;
    font-weight: bold !important;

}
.icon_menu_burger {
    color: black;

}
div.as-info.fixed-mobile {
    border-radius: 50px;
    background-color: darkorange !important;
    color: white !important
}

footer {
    display: none !important;
}

.widget header .cta-conteneur .as-button {
    border-radius: 50px;
    width: 100px !important;
}

.widget header .cta-conteneur .as-button::after {
    content: "Ouvrir";
    margin-left: 10px;
    font-weight: bold;
    font-family: "Montserrat", Arial, Verdana, Geneva, Helvetica, sans-serif;
    
}
.menu-tabs .tab-item .tab-content::after {
    background-color: darkorange !important;
    border-radius: 10px;
    margin-bottom: 2px
}
#GInterface\.Instances\[0\] #GInterface\.Instances\[0\]\.Instances\[2\] .with-action > div {
    border-radius: 10px;
}

#GInterface\.Instances\[0\]\.Instances\[2\] > ul > li > div {
    border-left-width: 20px !important;
    border-left-style: groove !important;
    padding-left: 10px !important;
}

.Gras {
    color: black;
    font-weight: 800
}

.ie-chips .text {
    color: white
}

.ThemePronote {
      --theme-claire: orange;
  --theme-claire-rgb: 255, 165, 0;
  --theme-claire-scaleMoins50: #FF7F00;
  --theme-claire-scaleMoins40: #FF8C00;
  --theme-claire-scaleMoins20: #FFA500;
  --theme-claire-scaleMoins10: #FFB732;
  --theme-claire-scaleMoins2: #FFC85C;
  --theme-claire-scalePlus10: #FFD27F;
  --theme-claire-scalePlus20: #FFDEA3;
  --theme-claire-scalePlus60: #FFF2D5;
  --theme-claire-scalePlus80: #FFF8ED;
  --theme-moyen1: orangered;
  --theme-moyen1-rgb: 255, 69, 0;
  --theme-moyen1-scaleMoins50: #B24400;
  --theme-moyen1-scaleMoins40: #C25300;
  --theme-moyen1-scaleMoins20: #D96900;
  --theme-moyen1-scaleMoins10: #E27E00;
  --theme-moyen1-scaleMoins2: #E98F00;
  --theme-moyen1-scalePlus10: #F7A929;
  --theme-moyen1-scalePlus20: #FFC052;
  --theme-moyen1-scalePlus60: #FFEECB;
  --theme-moyen1-scalePlus80: #FFF7E8;
  --theme-foncee: darkorange;
  --theme-foncee-rgb: 255, 140, 0;
  --theme-foncee-scaleMoins50: #B34D00;
  --theme-foncee-scaleMoins40: #C55900;
  --theme-foncee-scaleMoins20: #DA6B00;
  --theme-foncee-scaleMoins10: #E07A00;
  --theme-foncee-scaleMoins2: #E68500;
  --theme-foncee-scalePlus10: #F19C00;
  --theme-foncee-scalePlus20: #FFB218;
  --theme-foncee-scalePlus60: #FFE3A6;
  --theme-foncee-scalePlus80: #FFF0D6;
  --theme-sombre: #965A44;
  --theme-sombre-rgb: 150, 90, 68;
  --theme-sombre-scaleMoins50: #5B3728;
  --theme-sombre-scaleMoins40: #6B4331;
  --theme-sombre-scaleMoins20: #805033;
  --theme-sombre-scaleMoins10: #8D5C39;
  --theme-sombre-scaleMoins2: #976439;
  --theme-sombre-scalePlus10: #A97341;
  --theme-sombre-scalePlus20: #BB8652;
  --theme-sombre-scalePlus60: #EAC2A2;
  --theme-sombre-scalePlus80: #F5E0D6;
}


`;

    WebViewClient.onPageFinished.implementation = function (webView, url) {
        console.log("WebViewClient.onPageFinished called");
        // Call the original onPageFinished method
        this.onPageFinished(webView, url);

        webView.evaluateJavascript("javascript:(function() { " +
            "window.onload = function() { " +
            "console.log('Running injected JavaScript');" +
            "var styleElement = document.createElement('style');" +
            "styleElement.innerHTML = `" + cssCode + "`;" +
            "document.head.appendChild(styleElement);" +
            "};" +
            "})()", null);
    };

    Java.choose('android.webkit.WebView', {
        onMatch: function (instance) {
            console.log("Found WebView: " + instance);
            // Run our JavaScript asynchronously with Java.scheduleOnMainThread
            Java.scheduleOnMainThread(function () {
                console.log("Running injected JavaScript");
                instance.evaluateJavascript("javascript:(function() { " +
                    "window.onload = function() { " +
                    "console.log('Running injected JavaScript');" +
                    "var styleElement = document.createElement('style');" +
                    "styleElement.innerHTML = `" + cssCode + "`;" +
                    "document.head.appendChild(styleElement);" +
                    "};" +
                    "})()", null);
            });

            // onLoadFinished re-executes our JavaScript after the page has loaded
        },
        onComplete: function() {
            console.log("Finished searching for WebView instances");
        }
    });
});
