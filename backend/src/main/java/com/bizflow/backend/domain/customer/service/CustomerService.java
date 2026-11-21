
package com.bizflow.backend.domain.customer.service;

import com.bizflow.backend.domain.customer.dto.CustomerRequest;
import com.bizflow.backend.domain.customer.dto.CustomerResponse;
import com.bizflow.backend.domain.customer.entity.Customer;
import com.bizflow.backend.domain.customer.repository.CustomerRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // 고객 등록
    @Transactional
    public CustomerResponse create(CustomerRequest request) {
        String email = request.email().trim();

        if (customerRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }

        Customer customer = new Customer(
                request.name().trim(),
                email,
                request.phone(),
                request.company()
        );

        try {
            return CustomerResponse.from(
                    customerRepository.saveAndFlush(customer)
            );
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException(
                    "이미 등록된 이메일이거나 데이터 제약조건을 위반했습니다.", e
            );
        }
    }

    // 고객 전체 조회
    public List<CustomerResponse> findAll() {
        return customerRepository.findAll()
                .stream()
                .map(CustomerResponse::from)
                .toList();
    }

    // 고객 상세 조회
    public CustomerResponse findById(Long id) {
        Customer customer = getCustomer(id);
        return CustomerResponse.from(customer);
    }

    // 고객 정보 수정
    @Transactional
    public CustomerResponse update(Long id, CustomerRequest request) {
        Customer customer = getCustomer(id);
        String email = request.email().trim();

        customerRepository.findByEmail(email)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new IllegalArgumentException(
                            "이미 등록된 이메일입니다."
                    );
                });

        customer.update(
                request.name().trim(),
                email,
                request.phone(),
                request.company()
        );

        try {
            customerRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException(
                    "이미 등록된 이메일이거나 데이터 제약조건을 위반했습니다.", e
            );
        }

        return CustomerResponse.from(customer);
    }

    // 고객 삭제
    @Transactional
    public void delete(Long id) {
        Customer customer = getCustomer(id);
        customerRepository.delete(customer);
    }

    // 공통 고객 조회
    private Customer getCustomer(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "고객을 찾을 수 없습니다. ID: " + id
                        )
                );
    }
}
