package org.segodin.market.engine.data.domain;

import javax.persistence.*;

/**
 * Base instrument for product separation and grouping
 * */
@Entity
@Table(name = "tag")
@Access(AccessType.FIELD)
public class Tag extends Identifier {

    @Column(nullable = false)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
