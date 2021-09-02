```bash
docker run -p 13306:3306 --name my-mysql -v /Users/yangqingxian/Documents/www/wwwroot/ER/ER/back/data/mysql/conf:/etc/mysql -v /Users/yangqingxian/Documents/www/wwwroot/ER/ER/back/data/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234qwer -d mysql:5.7.26
```

设置 mysql 可以开启远程访问权限

```bash
grant all privileges on *.* to 'root'@'%' IDENTIFIED BY '1234qwer';
flush privileges;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '1234qwer' WITH GRANT OPTION;
flush privileges;
```

docker-compose.yml

```
version: "2.1"
services:
  mysql:
    image: mysql:5.7.26
    ports:
      - "23306:3306"
    volumes:
      - /Users/yangqingxian/Documents/www/wwwroot/ER/ER/back/data/mysql/conf:/etc/mysql
      - /Users/yangqingxian/Documents/www/wwwroot/ER/ER/back/data/mysql/data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD='1234qwer'
    networks:
      - lnmp-network
networks:
  lnmp-network:

```
