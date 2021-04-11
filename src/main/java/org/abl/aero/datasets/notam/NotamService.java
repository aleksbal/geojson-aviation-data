package org.abl.aero.datasets.notam;

import org.springframework.beans.factory.annotation.Autowired;
import com.mongodb.client.model.Indexes;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.JsonNode;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.Reader;
import java.util.Scanner;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.bson.Document;
import java.lang.RuntimeException;
import com.mongodb.MongoException;
import org.springframework.dao.DataAccessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.CollectionCallback;
import com.mongodb.client.MongoCollection;
import org.springframework.data.mongodb.core.query.Query;

/**
 * On startup this service imports a JSON document from the classpath
 */
@Slf4j
@Service
public class NotamService {

    @Autowired
    private NotamRepository eventRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Value("${thisapp.file}")
    private String eventFile;

    @Value("${thisapp.db.create}")
    private Boolean shouldCreate;

    public void importEvents() {

    if(!shouldCreate) {
        log.info("Initial data import not required, exiting import...");
        return;
    }

    log.info("Starting data import using low level db functions...");
    mongoTemplate.dropCollection(NotamItem.class);
    mongoTemplate.execute(NotamItem.class, new CollectionCallback<Void>() {

    @Override
    public Void doInCollection(MongoCollection<Document> collection) throws MongoException, DataAccessException {
         Scanner scanner = null;
         try {
                Reader reader = Files.newBufferedReader(Paths.get(getClass().getClassLoader()
                  .getResource(eventFile).toURI()));
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode parser = objectMapper.readTree(reader);
                for (JsonNode eventItem : parser) {
                        collection.insertOne(Document.parse(
                                //remove due to date serialization problem
                                eventItem.toString().replace(".000Z","")
                        )
                    );
                }
                // just for test purposes, it should be done by an annotation
                collection.createIndex(Indexes.geo2dsphere("geometry"));

         } catch (Exception e) {
                if (scanner != null) {
                    scanner.close();
                }
                throw new RuntimeException("Could not load event dataset!", e);
         }
         return null;
       }
    });

    log.info("Loaded objects: " + mongoTemplate.count(new Query(), NotamItem.class));
    }
}
