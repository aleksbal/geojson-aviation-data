# Getting Started

This simple application is created to demonstrate a microservice architecture based on MongoDB/SpringBoot solution stack. The RESTful services provide via their endpoints different types of aviation data (NOTAMs, airports, NAVAIDs etc.) encoded in GeoJSON.

Currently only several test NOTAMs have geometries. 

Once the application is up and running locally the Swagger API description will be available at http://localhost:9091/swagger-ui/

and NOTAM geospatial example can be queried for testing using this URL:
http://localhost:9091/notamsarea?lon=-2.181943&lat=47.943889&d=1

### Reference Documentation
For further reference, please consider the following sections:

* [Official Gradle documentation](https://docs.gradle.org)
* [Spring Boot Gradle Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.4.3/gradle-plugin/reference/html/)
* [Spring Data MongoDB](https://docs.spring.io/spring-boot/docs/2.4.3/reference/htmlsingle/#boot-features-mongodb)
* [Rest Repositories](https://docs.spring.io/spring-boot/docs/2.4.3/reference/htmlsingle/#howto-use-exposing-spring-data-repositories-rest-endpoint)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)
* [Accessing Data with MongoDB](https://spring.io/guides/gs/accessing-data-mongodb/)
* [Accessing MongoDB Data with REST](https://spring.io/guides/gs/accessing-mongodb-data-rest/)

### Additional Links
These additional references should also help you:

* [Gradle Build Scans – insights for your project's build](https://scans.gradle.com#gradle)
