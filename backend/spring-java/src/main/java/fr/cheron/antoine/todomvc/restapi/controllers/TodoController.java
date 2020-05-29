package fr.cheron.antoine.todomvc.restapi.controllers;

import fr.cheron.antoine.todomvc.restapi.models.Todo;
import fr.cheron.antoine.todomvc.restapi.models.TodoCreationRequest;
import fr.cheron.antoine.todomvc.restapi.services.TodoService;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/todo")
public class TodoController {

  private final TodoService todoService;

  public TodoController(@Autowired TodoService todoService) {
    this.todoService = todoService;
  }

  @PostMapping
  public Mono<Todo> createTodo (@RequestBody Publisher<TodoCreationRequest> todoCreationRequestStream) {
    return Mono.fromDirect(todoCreationRequestStream)
      .flatMap(Validators::validateTodoCreationRequest)
      .flatMap(todoCreationRequest -> todoService.create(todoCreationRequest.getTitle()));
  }

}
