
package com.bizflow.backend.domain.customer.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(length = 30)
    private String phone;

    @Column(length = 150)
    private String company;

    @Column(name = "created_at", nullable = false,
            insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    protected Customer() {
    }

    public Customer(String name, String email,
                    String phone, String company) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.company = company;
    }

    public void update(String name, String email,
                       String phone, String company) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.company = company;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getCompany() {
        return company;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
