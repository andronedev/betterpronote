def generate_frida_script():
    # Lire le contenu du fichier CSS
    with open('style.css', 'r') as css_file:
        css_content = css_file.read()

    # Charger le modèle de script Frida
    with open('frida_template.js', 'r') as frida_template_file:
        frida_script = frida_template_file.read()
    frida_script = """
    Java.perform(function () {
        var WebViewClient = Java.use('android.webkit.WebViewClient');

        WebViewClient.onPageFinished.implementation = function (webView, url) {
            console.log("WebViewClient.onPageFinished called");
            // Call the original onPageFinished method
            this.onPageFinished(webView, url);
            // Run our JavaScript to inject CSS
            console.log("Running injected JavaScript");
            var cssCode = `[CSS]`;
            webView.evaluateJavascript("var styleElement = document.createElement('style'); styleElement.innerHTML = `" + cssCode + "`; document.head.appendChild(styleElement);", null);
        };

        Java.choose('android.webkit.WebView', {
            onMatch: function (instance) {
                console.log("Found WebView: " + instance);
                // Run our JavaScript asynchronously with Java.scheduleOnMainThread
                Java.scheduleOnMainThread(function () {
                    console.log("Running injected JavaScript");
                    var cssCode = `[CSS]`;
                    instance.evaluateJavascript("var styleElement = document.createElement('style'); styleElement.innerHTML = `" + cssCode + "`; document.head.appendChild(styleElement);", null);
                });

                // onLoadFinished re-executes our JavaScript after the page has loaded
            },
            onComplete: function() {
                console.log("Finished searching for WebView instances");
            }
        });
    });
    """

    # Remplacer [CSS] par le contenu du CSS
    frida_script = frida_script.replace('[CSS]', css_content)

    return frida_script


# Exemple d'utilisation
script = generate_frida_script()
print(script)
with open('frida_build.js', 'w') as file:
    file.write(script)

