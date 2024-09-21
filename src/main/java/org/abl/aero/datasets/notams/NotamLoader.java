package org.abl.aero.datasets.notams;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Indexes;
import jakarta.annotation.PostConstruct;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.data.mongodb.core.CollectionCallback;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

/**
 * On startup this service imports a JSON document from the classpath
 */
@Slf4j
@Service
public class NotamLoader {

    @Autowired
    private NotamRepository eventRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Value("${thisapp.file.notams}")
    private String eventFile;

    @Value("${thisapp.db.create}")
    private Boolean shouldCreate;

    @PostConstruct
    public void loadNotams() {
      loadData();
    }
    public void loadData() {

        if(!shouldCreate) {
            log.info("Initial data import not required, exiting import...");
            return;
        }

        log.info("Starting data import using low level db functions...");
        mongoTemplate.dropCollection(Notam.class);
        mongoTemplate.execute(Notam.class, new CollectionCallback<Void>() {

        @Override
        public Void doInCollection(MongoCollection<Document> collection) throws MongoException, DataAccessException {
             try {
                    var reader = Files.newBufferedReader(Paths.get(
                        Objects.requireNonNull(getClass().getClassLoader()
                            .getResource(eventFile)).toURI()));
                    var objectMapper = new ObjectMapper();
                    var parser = objectMapper.readTree(reader);

                    for (var eventItem : parser) {
                            collection.insertOne(Document.parse(
                                    //remove due to date serialization problem
                                    eventItem.toString().replace(".000Z","")
                            )
                        );
                    }
                    // just for test purposes, it should be done by an annotation
                    collection.createIndex(Indexes.geo2dsphere("geometry"));

             } catch (Exception e) {
               throw new RuntimeException("Could not load event dataset!", e);
             }
             return null;
           }
        });

        log.info("Loaded objects: " + mongoTemplate.count(new Query(), Notam.class));
        }
}
