package org.abl.aero.datasets.notams;

import java.util.List;
import org.abl.aero.datasets.notams.model.Notam;
import org.abl.aero.datasets.notams.model.NotamFeature;
import org.springframework.data.geo.Polygon;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.geo.Point;
import org.springframework.data.geo.Distance;

/**
 * Hypermedia as the Engine of Application State (HATEOAS)
 */
@RepositoryRestResource(collectionResourceRel = "notam", path = "notam")
public interface NotamRepository extends MongoRepository<NotamFeature, String> {
  List<NotamFeature> findByPropertiesSubject(@Param("subject") String subject);
  List<NotamFeature> findByPropertiesLocation(@Param("location") String location);
  @Query("{'properties.message':{'$regex':'?0','$options':'i'}}")
  Page<NotamFeature> searchByMessage(String pattern, Pageable page);
  @Query("{'properties.message':{'$geoWithin':'?0'}}")
  Page<NotamFeature> searchWithin(Polygon polygon, Pageable page);
  List<NotamFeature> findByGeometryNear(Point point, Distance distance);
  Page<NotamFeature> findByGeometryNear(Point point, Distance distance, Pageable page);
}
