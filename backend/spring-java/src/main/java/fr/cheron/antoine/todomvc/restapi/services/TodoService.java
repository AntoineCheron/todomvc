package fr.cheron.antoine.todomvc.restapi.services;

import java.util.UUID;

import fr.cheron.antoine.todomvc.restapi.models.Todo;
import fr.cheron.antoine.todomvc.restapi.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TodoService {

  private final TodoRepository todoRepository;

  public TodoService(@Autowired TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  public Flux<Todo> list() {
    return this.todoRepository.findAll();
  }

  public Mono<Todo> create(String title) {
    final var todo = new Todo(
      UUID.randomUUID().toString(),
      title,
      false
    );

    return this.todoRepository.create(todo);
  }

}
