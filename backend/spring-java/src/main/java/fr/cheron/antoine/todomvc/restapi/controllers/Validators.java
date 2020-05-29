package fr.cheron.antoine.todomvc.restapi.controllers;

import fr.cheron.antoine.todomvc.restapi.models.ApiError;
import fr.cheron.antoine.todomvc.restapi.models.TodoCreationRequest;
import reactor.core.publisher.Mono;

public final class Validators {

  private Validators() {}

  public static Mono<TodoCreationRequest> validateTodoCreationRequest (TodoCreationRequest toValidate) {
    if (!toValidate.getTitle().isEmpty() && !toValidate.getTitle().isBlank()) {
      return Mono.just(toValidate);
    } else {
      return Mono.error(new ApiError("Incorrect title, it must not be empty neither blank", 400));
    }
  }
}
