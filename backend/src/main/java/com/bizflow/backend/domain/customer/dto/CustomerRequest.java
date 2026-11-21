
package com.bizflow.backend.domain.customer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CustomerRequest(

        @NotBlank(message = "고객 이름은 필수입니다.")
        @Size(max = 100, message = "고객 이름은 100자 이하여야 합니다.")
        String name,

        @NotBlank(message = "이메일은 필수입니다.")
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        @Size(max = 255)
        String email,

        @Size(max = 30, message = "전화번호는 30자 이하여야 합니다.")
        String phone,

        @Size(max = 150, message = "회사명은 150자 이하여야 합니다.")
        String company
) {
}
