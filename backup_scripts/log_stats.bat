@echo off
set FECHA=%date:~10,4%-%date:~7,2%-%date:~4,2%
set HORA=%time:~0,2%-%time:~3,2%
set OUT=C:\Users\Juame\TrabajoBD-no-funsiona\TrabajoBD-no-funsiona\AquiEstanLosRespaldos\logs\mongostat_%FECHA%_%HORA%.log
set MONGO_URI=mongodb+srv://jm689580:jm689580@cluster0.qcfe2ua.mongodb.net/RentaDeAutos?retryWrites=true&w=majority&appName=Cluster0

mongostat --rowcount 1 --uri=%MONGO_URI% > "%OUT%"
