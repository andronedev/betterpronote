def generate_frida_script():
    # Lire le contenu du fichier CSS
    with open('style.css', 'r') as css_file:
        css_content = css_file.read()

    # Charger le modèle de script Frida
    with open('frida_template.js', 'r') as frida_template_file:
        frida_script = frida_template_file.read()
        

    # Remplacer [CSS] par le contenu du CSS
    frida_script = frida_script.replace('[CSS]', css_content)

    return frida_script


# Exemple d'utilisation
script = generate_frida_script()
print(script)
with open('frida_build.js', 'w') as file:
    file.write(script)

