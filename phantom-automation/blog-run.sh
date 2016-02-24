mkdir logs

echo "Enter password: "
read -ers passw
clear

export BLOG_LOGIN=animestore.blogger@patico.pro
export BLOG_PASSW=$passw

"/C/Program Files/phantomjs-2.0.0/bin/phantomjs.exe" ./blog-run.js 2>&1 | tee logs/blog-run.log
 