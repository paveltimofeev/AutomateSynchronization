mkdir logs

echo "Enter password: "
read -ers passw
clear

export PINT_LOGIN=animestore@patico.pro
export PINT_PASSW=$passw

"/C/Program Files/phantomjs-2.0.0/bin/phantomjs.exe" /C/Temp/phantomjs-test/pint-run.js 2>&1 | tee logs/pint-run.log
 