
package com.bizflow.backend.domain.customer.dto;

import com.bizflow.backend.domain.customer.entity.Customer;

import java.time.LocalDateTime;

public record CustomerResponse(
        Long id,
        String name,
        String email,
        String phone,
        String company,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static CustomerResponse from(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getCompany(),
                customer.getCreatedAt(),
                customer.getUpdatedAt()
        );
    }
}
