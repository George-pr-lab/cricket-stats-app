FROM openjdk:11-jre
WORKDIR /usr/app/
COPY target/favouriteservice-2.6.2.jar app.jar
EXPOSE 9007
ENV MYSQL_HOST=mysql_db
ENV MYSQL_DATABASE=cricketstore
ENV MYSQL_PORT=3306
ENV MYSQL_USERNAME=root
ENV MYSQL_PASSWORD=root
ENTRYPOINT ["java", "-jar", "app.jar"]