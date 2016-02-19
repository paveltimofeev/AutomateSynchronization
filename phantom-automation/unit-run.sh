echo "Enter email: "
read entered_LOGIN
clear
echo "Enter password: "
read -ers entered_PASSW
clear

export LOGIN=$entered_LOGIN
export PASSW=$entered_PASSW

"/C/Program Files/phantomjs-2.0.0/bin/phantomjs.exe" /C/Temp/phantomjs-test/unit-run.js
 