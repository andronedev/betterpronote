Java.perform(function () {{
    console.log("Frida script loaded");
    var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();

    Java.scheduleOnMainThread(function() {
            var toast = Java.use("android.widget.Toast");
            toast.makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.String").$new("BetterPronote V1.0.0"), 1).show();
    });
    

    var WebViewClient = Java.use('android.webkit.WebViewClient');
 
     WebViewClient.onPageFinished.implementation = function (webView, url) {{
         console.log("WebViewClient.onPageFinished called");
         // Call the original onPageFinished method
         this.onPageFinished(webView, url);
         // Run our JavaScript to inject CSS
         console.log("Running injected JavaScript");
         var cssCode = `[CSS]`;
         webView.evaluateJavascript("var styleElement = document.createElement('style'); styleElement.innerHTML = `" + cssCode + "`; document.head.appendChild(styleElement);", null);
     }};
 
     Java.choose('android.webkit.WebView', {
         onMatch: function (instance) {{
             console.log("Found WebView: " + instance);
              // Run our JavaScript asynchronously with Java.scheduleOnMainThread
             Java.scheduleOnMainThread(function () {{
                 console.log("Running injected JavaScript");
                 var cssCode = `" + cssCode + "`;
                 instance.evaluateJavascript("var styleElement = document.createElement('style'); styleElement.innerHTML = `" + cssCode + "`; document.head.appendChild(styleElement);", null);
             }});
 
             // onLoadFinished re executes our JavaScript after the page has loaded
         }},
         onComplete: function() {{
             console.log("Finished searching for WebView instances");
         }}
     });
}});