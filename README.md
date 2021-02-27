Docker + Spring Boot + MongoDB + NOTAMS
-

A test SpringBoot application using data from aeronautical domain:
- creates a docker container for database
- creates a docker container for a SpringBoot REST application which connects to the database
- loads several thousand NOTAM messages downloaded form ICAO web page in the database and exposes minimalistic CRUD API as Hypermedia as the Engine of Application State (HATEOAS)

Building and running the project
-

- build the project - './gradlew build'
- ./gradlew bootBuildImage
- build the images - './docker-compose build'
- start containers - './docker-compose up'
- go to - 'http://localhost:9091/notam' - it should display list of events in JSON

Structure
-

'docker-compose.yml':
- SpringBoot app has internally port '8080' (by 'SERVER_PORT') which is exposed to the host via '9091'
- Mongo has internally port '27017' for 'mongo://' protocol connections. This is exposed to the host via '27017'
