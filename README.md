# PASOS CREAR PROYECTO - ANGULAR 18
1. ng new quantum.frontend --create-application=false 
2. ng g application shell-host --prefix shell-host
3. ng g application seguridad-module --prefix seguridad-module
4. ng g application maestra-module --prefix maestra-module
5. npm i -D @angular-architects/native-federation
6. ng g @angular-architects/native-federation:init --project shell-host --port 4200 --type dynamic-host
7. ng g @angular-architects/native-federation:init --project seguridad-module --port 4201 --type remote
8. ng g @angular-architects/native-federation:init --project maestra-module --port 4202 --type remote