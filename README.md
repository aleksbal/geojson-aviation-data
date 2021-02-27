Docker + Spring Boot + MongoDB + NOTAMS
-

Test application uses SpringBoot/MOngoDB and test data from aeronautical domain (NOTAM) to create an repository for aeronautical data. It does following things:
- creates a docker container for aeronautical database
- creates a docker container for a SpringBoot REST application which connects to the database and exposes an API
- loads NOTAM messages downloaded form ICAO web page in the database and exposes minimalistic CRUD API as HATEOAS.

Building and running the project
-

- build the project  - './gradlew build'
- build docker image - ./gradlew bootBuildImage
- start containers   - './docker-compose up'
- go to - 'http://localhost:9091/notam' - it should display list of NOTAMs encoded in JSON

Testing
-

curl -X GET http://localhost:9091/event

curl -X DELETE http://localhost:8080/event/6032c4996c895740f2abb7c1

To test creation and modification of NOTAMs copy (and modify) one of displayed NOTAM document into a new file called new_notam.json in the current folder you are curling from. Try following:

curl -d @new_notam.json -H "Content-Type: application/json" http://localhost:9091/event

curl -d @new_notam.json -H 'Content-Type: application/json' -X PUT http://localhost:9091/notam/6032c4996c895740f2abb7c2


Structure
-

'docker-compose.yml':
- SpringBoot app has internally port '8080' (by 'SERVER_PORT') which is exposed to the host via '9091'
- Mongo has internally port '27017' for 'mongo://' protocol connections. This is exposed to the host via '27017'
