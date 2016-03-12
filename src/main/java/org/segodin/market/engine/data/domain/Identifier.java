package org.segodin.market.engine.data.domain;

import javax.persistence.*;

@MappedSuperclass
public class Identifier {

    @Id
    @GeneratedValue
    @Column(nullable = false, unique = true)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
