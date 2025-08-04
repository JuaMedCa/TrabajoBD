@echo off
set FECHA=%date:~10,4%-%date:~7,2%-%date:~4,2%
set OUT=C:\Users\Juame\TrabajoBD-no-funsiona\TrabajoBD-no-funsiona\AquiEstanLosRespaldos\diff\clientes_diff_%FECHA%.json
set MONGO_URI=mongodb+srv://jm689580:jm689580@cluster0.qcfe2ua.mongodb.net/RentaDeAutos?retryWrites=true&w=majority&appName=Cluster0

for /f %%i in ('powershell -command "(Get-Date).AddDays(-1).ToString('yyyy-MM-ddT00:00:00Z')"') do set AYER=%%i

mongoexport --uri=%MONGO_URI% --collection=clientes --db=RentaDeAutos --query="{\"updatedAt\":{\"$gte\":{\"$date\":\"%AYER%\"}}}" --out="%OUT%"
