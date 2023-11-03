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

# Copy the wait-for-it.sh script
COPY wait-for-it.sh /app/wait-for-it.sh

# Make the script executable
RUN chmod +x /app/wait-for-it.sh

# Define the command using wait-for-it.sh before running the application
CMD ["./wait-for-it.sh", "mysql:3306", "--", "java", "-jar", "/app/application.jar"]
