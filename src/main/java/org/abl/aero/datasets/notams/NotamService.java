package org.abl.aero.datasets.notams;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Indexes;
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
public class NotamService {

    @Autowired
    private NotamRepository eventRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Value("${thisapp.file.notams}")
    private String eventFile;

    @Value("${thisapp.db.create}")
    private Boolean shouldCreate;
}
