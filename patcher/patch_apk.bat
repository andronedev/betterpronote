set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Android\Sdk\build-tools\30.0.3

@REM Vérifier si apktool.bat existe dans le répertoire ../utils
if not exist "../utils/apktool.bat" (
    curl -o "../utils/apktool.bat" "https://raw.githubusercontent.com/iBotPeaches/Apktool/master/scripts/windows/apktool.bat" -L
)

@REM Télécharger apktool.jar uniquement s'il n'existe pas déjà dans le répertoire ../utils
if not exist "../utils/apktool.jar" (
    curl -o "../utils/apktool.jar" "https://bitbucket.org/iBotPeaches/apktool/downloads/apktool_2.7.0.jar" -L
)

set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Android\Sdk\platform-tools
set PATH=%PATH%;%~dp0\..\utils

cd ../dev
rm -rf frida_build.js
python build.py
@REM Vérifier si frida_build.js existe dans le répertoire ../dev
if not exist "frida_build.js" (
    echo "frida_build.js not found"
    exit /b 1
)
cd ../patcher
copy /y "..\dev\frida_build.js" "frida_build.js"

echo "delete old apk"
del /f /q "..\*.objection.apk"

echo "Patching APK"
objection.exe patchapk --source ../PRONOTE_0_1_59.apk -c ./gadget-config.json -l ./frida_build.js

echo "Done"
