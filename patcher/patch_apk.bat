set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Android\Sdk\build-tools\30.0.3
@REM download apktool https://raw.githubusercontent.com/iBotPeaches/Apktool/master/scripts/windows/apktool.bat to ../utils/apktool.bat
curl -o ../utils/apktool.bat https://raw.githubusercontent.com/iBotPeaches/Apktool/master/scripts/windows/apktool.bat -L
curl -o ../utils/apktool.jar https://bitbucket.org/iBotPeaches/apktool/downloads/apktool_2.7.0.jar -L 
set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Android\Sdk\platform-tools
set PATH=%PATH%;%~dp0\..\utils
echo "Patching APK"
objection.exe patchapk --source ../PRONOTE_0_1_59.apk -c gadget-config.json -l frida_build.js
echo "Done"
