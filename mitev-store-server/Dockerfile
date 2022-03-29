FROM maven:3.8.4-jdk-8

COPY . /home/app/server
RUN mvn clean install -f /home/app/server/pom.xml

#ENV MYSQL_HOST mitev-store_mitev-store-db_1

EXPOSE 8080
ENTRYPOINT ["mvn", "spring-boot:run", "-f", "/home/app/server/pom.xml"]