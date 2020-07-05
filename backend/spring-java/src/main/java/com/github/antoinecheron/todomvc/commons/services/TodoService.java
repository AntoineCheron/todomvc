package com.github.antoinecheron.todomvc.commons.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import com.github.antoinecheron.todomvc.commons.models.Status;
import com.github.antoinecheron.todomvc.commons.models.Todo;
import com.github.antoinecheron.todomvc.commons.repositories.TodoRepository;

@Service
public class TodoService {

  private final TodoRepository todoRepository;

  public TodoService(@Autowired TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  public Flux<Todo> list(Status status) {
    return this.todoRepository.findAllWithStatus(status);
  }

  public Mono<Todo> create(String title) {
    final var todo = new Todo(
      UUID.randomUUID().toString(),
      title,
      false
    );

    return this.todoRepository.create(todo);
  }

  public Mono<Todo> update(String id, String title, boolean completed) {
    return this.todoRepository.update(new Todo(id, title, completed));
  }

  public Mono<Void> delete(String id) {
    return this.todoRepository.delete(id);
  }

  public Mono<Void> deleteMany(Status status) {
    return this.todoRepository.deleteByStatus(status);
  }

}
