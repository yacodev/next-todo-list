# development
this steps to release the app

1. Start data base
```
 docker compose up -d
```
2. rename .env.template to .env 
3. replace to variable environment

# prisma commands;
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

