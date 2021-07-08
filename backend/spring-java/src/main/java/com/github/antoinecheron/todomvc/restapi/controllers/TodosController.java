package com.github.antoinecheron.todomvc.restapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import com.github.antoinecheron.todomvc.commons.models.Status;
import com.github.antoinecheron.todomvc.commons.services.TodoService;
import com.github.antoinecheron.todomvc.restapi.hypermedia.HypermediaRepresentation;
import com.github.antoinecheron.todomvc.restapi.models.TodoCollectionHypermedia;

@RestController
@RequestMapping("/rest/todos")
public class TodosController {

  private final TodoService todoService;

  public TodosController(@Autowired TodoService todoService) {
    this.todoService = todoService;
  }

  @GetMapping
  public Mono<HypermediaRepresentation<TodoCollectionHypermedia>> list(@RequestParam(value="status", required=false) String status) {
    return Validators.validateStatus(status, Status.ALL)
      .flux()
      .flatMap(this.todoService::list)
      .map(TodoController::addHypermediaControls)
      .collectList()
      .map(TodoCollectionHypermedia::new)
      .map(TodosController::addHypermediaControls);
  }

  @DeleteMapping @ResponseStatus(HttpStatus.NO_CONTENT)
  public Mono<Void> delete(@RequestParam(value="status", required=false) String status) {
    return Validators.validateStatus(status, Status.COMPLETED)
      .flatMap(this.todoService::deleteMany);
  }

  public static HypermediaRepresentation<TodoCollectionHypermedia> addHypermediaControls(TodoCollectionHypermedia todos) {
    return HypermediaRepresentation.Builder.of(todos)
      .withLink("createTodo")
      .withLink("deleteMany")
      .build();
  }

}
