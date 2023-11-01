# Stage 1: Build the application
FROM maven:3.8.1-openjdk-17-slim as BUILDER
ARG VERSION=0.0.1-SNAPSHOT
WORKDIR /build/
COPY pom.xml /build/
COPY src /build/src/

RUN mvn clean package -U -Dmaven.test.failure.ignore=true
RUN mvn clean install -U -Dmaven.test.failure.ignore=true
COPY target/Akenord-${VERSION}.jar target/application.jar

# Stage 2: Run the application
FROM openjdk:17-jdk-slim
WORKDIR /app/

COPY --from=BUILDER /build/target/application.jar /app/
CMD java -jar /app/application.jar
