FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /opt
COPY . .
RUN chmod +x mvnw
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /opt/target/Akenord-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
