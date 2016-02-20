@echo off

for /f "skip=1" %%x in ('wmic os get localdatetime') do if not defined MyDate set MyDate=%%x
set today=%MyDate:~0,4%-%MyDate:~4,2%-%MyDate:~6,2%
echo "publish update at %today%"

git status
set /p comment=Add comment to commit:
echo.
echo Commit will commented with: 
echo "publish update at %today%: %comment%"
echo.
rem echo %today% > _includes/updated.md
pause

git add --all
git status
git commit -m "publish update at %today%: %comment%"
pause

git push origin gh-pages
pause
