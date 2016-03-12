package org.segodin.market.engine.repository;

import org.segodin.market.engine.data.domain.Tag;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TagRepository extends PagingAndSortingRepository<Tag, Long> {
}


