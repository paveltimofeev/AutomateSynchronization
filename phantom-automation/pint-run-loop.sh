mkdir logs

echo "Enter password: "
read -ers passw
clear

export PINT_LOGIN=animestore@patico.pro
export PINT_PASSW=$passw

# 3600 - 1H
# 1800 - 30 min
#   60 -  1 min
EVERY=600;
while true; 
do

"/C/Program Files/phantomjs-2.0.0/bin/phantomjs.exe" ./pint-run.js 2>&1 | tee logs/pint-run.log

echo wait for $EVERY sec, till $(date --d="now + $EVERY seconds")
sleep $EVERY; 

done
