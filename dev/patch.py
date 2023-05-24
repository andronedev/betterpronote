import frida
import sys

# Use this script to inject CSS into a WebView of an Android application.
# Note: the application should load the WebView with JavaScript enabled.

# Open the CSS file and read its content
with open('style.css', 'r') as file:
    css_content = file.read().replace('\n', '')

js_code = f"""
Java.perform(function () {{
   var WebViewClient = Java.use('android.webkit.WebViewClient');

    WebViewClient.onPageFinished.implementation = function (webView, url) {{
        console.log("WebViewClient.onPageFinished called");
        // Call the original onPageFinished method
        this.onPageFinished(webView, url);
        // Run our JavaScript to inject CSS
        console.log("Running injected JavaScript");
        var cssCode = `{css_content}`;
        webView.evaluateJavascript("var styleElement = document.createElement('style'); styleElement.innerHTML = `" + cssCode + "`; document.head.appendChild(styleElement);", null);
    }};

    Java.choose('android.webkit.WebView', {{
        onMatch: function (instance) {{
            console.log("Found WebView: " + instance);
             // Run our JavaScript asynchronously with Java.scheduleOnMainThread
            Java.scheduleOnMainThread(function () {{
                console.log("Running injected JavaScript");
                var cssCode = `{css_content}`;
                instance.evaluateJavascript("var styleElement = document.createElement('style'); styleElement.innerHTML = `" + cssCode + "`; document.head.appendChild(styleElement);", null);
            }});

            // onLoadFinished re executes our JavaScript after the page has loaded
        }},
        onComplete: function() {{
            console.log("Finished searching for WebView instances");
        }}
    }});
}});
"""
device = frida.get_usb_device()
# You need to replace PRONOTE with the package name of your target application.
session = device.attach("PRONOTE")
script = session.create_script(js_code)
script.load()

# Prevent the script from terminating immediately.
sys.stdin.read()
