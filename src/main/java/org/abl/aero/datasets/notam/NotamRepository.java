package org.abl.aero.datasets.notam;

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
public interface NotamRepository extends MongoRepository<NotamItem, String> {

  List<NotamItem> findBySubject(@Param("subject") String subject);
  List<NotamItem> findByLocation(@Param("location") String location);
  List<NotamItem> findByArea(@Param("area") String area);

  @Query("{'message':{'$regex':'?0','$options':'i'}}")
  Page<NotamItem> searchByMessage(String pattern, Pageable page);

  @Query("{'message':{'geoWithin':'?0'}}")
  Page<NotamItem> searchWithin(Polygon polygon, Pageable page);

  List<NotamItem> findByGeometryNear(Point point, Distance distance);
}
