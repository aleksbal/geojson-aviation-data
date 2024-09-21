package org.abl.aero.datasets.notams;

import java.util.List;
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
public interface NotamRepository extends MongoRepository<Notam, String> {

  List<Notam> findBySubject(@Param("subject") String subject);
  List<Notam> findByLocation(@Param("location") String location);
  List<Notam> findByArea(@Param("area") String area);
  @Query("{'message':{'$regex':'?0','$options':'i'}}")
  Page<Notam> searchByMessage(String pattern, Pageable page);
  @Query("{'message':{'$geoWithin':'?0'}}")
  Page<Notam> searchWithin(Polygon polygon, Pageable page);
  List<Notam> findByGeometryNear(Point point, Distance distance);
  Page<Notam> findByGeometryNear(Point point, Distance distance, Pageable page);
}
