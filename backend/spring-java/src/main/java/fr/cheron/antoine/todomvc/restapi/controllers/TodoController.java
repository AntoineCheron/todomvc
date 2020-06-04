package fr.cheron.antoine.todomvc.restapi.controllers;

import fr.cheron.antoine.todomvc.commons.models.Todo;
import fr.cheron.antoine.todomvc.restapi.models.TodoCreationRequest;
import fr.cheron.antoine.todomvc.restapi.models.TodoUpdateRequest;
import fr.cheron.antoine.todomvc.commons.services.TodoService;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/rest/todo")
public class TodoController {

  private final TodoService todoService;

  public TodoController(@Autowired TodoService todoService) {
    this.todoService = todoService;
  }

  @PostMapping @ResponseStatus(HttpStatus.CREATED)
  public Mono<Todo> createTodo (@RequestBody Publisher<TodoCreationRequest> todoCreationRequestStream) {
    return Mono.fromDirect(todoCreationRequestStream)
      .flatMap(Validators::validateTodoCreationRequest)
      .flatMap(todoCreationRequest -> todoService.create(todoCreationRequest.getTitle()));
  }

  @PutMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
  public Mono<Void> updateTodo(@PathVariable String id, @RequestBody Publisher<TodoUpdateRequest> todoUpdateRequestStream) {
    return Mono.fromDirect(todoUpdateRequestStream)
      .flatMap(Validators::validateTodoUpdateRequest)
      .flatMap(todoUpdateRequest -> todoService.update(id, todoUpdateRequest.getTitle(), todoUpdateRequest.isCompleted()))
      .then();
  }

  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
  public Mono<Void> deleteTodo(@PathVariable String id) {
    return this.todoService.delete(id);
  }

}
