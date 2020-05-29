package fr.cheron.antoine.todomvc.restapi.repositories;

import fr.cheron.antoine.todomvc.restapi.models.Todo;
import io.r2dbc.spi.ConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public class TodoRepository {

  private final DatabaseClient client;

  public TodoRepository (@Autowired ConnectionFactory connectionFactory) {
    this.client = DatabaseClient.create(connectionFactory);
  }

  public Flux<Todo> findAll() {
    return client.select().from(Todo.class).fetch().all();
  }

  public Mono<Todo> create(Todo todo) {
    return client.insert()
      .into(Todo.class)
      .using(todo)
      .fetch()
      .first()
      .map(unusedResult -> todo);
  }

}
