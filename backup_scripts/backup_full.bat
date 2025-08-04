@echo off
set FECHA=%date:~10,4%-%date:~7,2%-%date:~4,2%
set OUTDIR=C:\Users\Juame\TrabajoBD-no-funsiona\TrabajoBD-no-funsiona\AquiEstanLosRespaldos\full\%FECHA%
set MONGO_URI=mongodb+srv://jm689580:jm689580@cluster0.qcfe2ua.mongodb.net/RentaDeAutos?retryWrites=true&w=majority&appName=Cluster0

mkdir "%OUTDIR%"
mongodump --uri=%MONGO_URI% --out="%OUTDIR%"

powershell -Command "Compress-Archive -Path '%OUTDIR%\*' -DestinationPath '%OUTDIR%.zip'"
rmdir /s /q "%OUTDIR%"

echo Respaldo completo realizado en %FECHA%
