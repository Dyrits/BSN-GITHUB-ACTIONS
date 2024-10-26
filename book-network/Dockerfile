# Use the official Maven image as the build stage.
FROM maven:3.8.7-openjdk-18 AS build
# Set the working directory.
WORKDIR /build
# Install the dependencies from the pom.xml file.
COPY pom.xml .
RUN mvn dependency:go-offline
# Copy the source code and build the application.
COPY src ./src
RUN mvn clean package -DskipTests

# Use the official Amazon Corretto (which is a distribution of the Open Java Development Kit) image as the runtime stage.
FROM amazoncorretto:17 AS runtime
# Set some arguments default values which can be provided during the build process.
ARG PROFILE=dev
ARG APP_VERSION=1.0.8
ARG MAIL_USERNAME=not_provided
ARG MAIL_PASSWORD=not_provided
ARG POSTGRES_USER=not_provided
ARG POSTGRES_PASSWORD=not_provided

# Set the working directory.
WORKDIR /app
# Copy the JAR file from the build stage to the runtime stage.
COPY --from=build /build/target/book-network-*.jar /app/

# Expose the port that the application will run on.
EXPOSE 5080

# Set the environment variables using the service name of the database container.
ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
ENV MAIL_USERNAME=${MAIL_USERNAME}
ENV MAIL_PASSWORD=${MAIL_PASSWORD}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL}  book-network-${JAR_VERSION}.jar
