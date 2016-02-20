mkdir logs

echo "Enter password: "
read -ers passw
clear

export PINT_LOGIN=anime-chan
export PINT_PASSW=$passw

"/C/Program Files/phantomjs-2.0.0/bin/phantomjs.exe" ./gelb-run.js 2>&1 | tee logs/gelb-run.log
 