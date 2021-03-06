package com.github.antoinecheron.todomvc.restapi.controllers;

import java.util.Optional;

import reactor.core.publisher.Mono;

import com.github.antoinecheron.todomvc.restapi.models.ApiError;
import com.github.antoinecheron.todomvc.commons.models.Status;
import com.github.antoinecheron.todomvc.restapi.models.TodoCreationRequest;
import com.github.antoinecheron.todomvc.restapi.models.TodoUpdateRequest;

final class Validators {

  private Validators() {}

  static Mono<TodoCreationRequest> validateTodoCreationRequest (TodoCreationRequest toValidate) {
    if (!toValidate.getTitle().isEmpty() && !toValidate.getTitle().isBlank()) {
      return Mono.just(toValidate);
    } else {
      return Mono.error(new ApiError("Incorrect title, it must not be empty neither blank", 400));
    }
  }

  static Mono<TodoUpdateRequest> validateTodoUpdateRequest (TodoUpdateRequest toValidate) {
    if (isValid(toValidate.getTitle())) {
      return Mono.just(toValidate);
    } else {
      return Mono.error(new ApiError("Incorrect title, it must not be empty neither blank", 400));
    }
  }

  static Mono<Status> validateStatus(String status, Status defaultValue) {
    return Status.of(Optional.ofNullable(status).orElse(defaultValue.name()).toUpperCase())
      .map(Mono::just)
      .orElseGet(() ->
        Mono.error(new ApiError("Incorrect status, it must be \"all\" or \"completed\" or \"active\".", 400)));
  }

  private static boolean isValid(String s) {
    return !s.isBlank() && !s.isEmpty();
  }

}
