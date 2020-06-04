package fr.cheron.antoine.todomvc.commons.repositories;

import fr.cheron.antoine.todomvc.restapi.models.ApiError;
import fr.cheron.antoine.todomvc.commons.models.Status;
import fr.cheron.antoine.todomvc.commons.models.Todo;
import io.r2dbc.spi.ConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.DatabaseClient;
import org.springframework.data.r2dbc.query.Criteria;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public class TodoRepository {

  private final DatabaseClient client;

  public TodoRepository (@Autowired ConnectionFactory connectionFactory) {
    this.client = DatabaseClient.create(connectionFactory);
  }

  public Flux<Todo> findAllWithStatus(Status status) {
    if (status.equals(Status.ALL)) {
      return client.select().from(Todo.class).fetch().all();
    } else {
      final var searchForCompletedTasks = status.equals(Status.COMPLETED);
      return client.select().from(Todo.class)
        .matching(Criteria.where("completed").is(searchForCompletedTasks))
        .fetch()
        .all();
    }
  }

  public Mono<Todo> create(Todo todo) {
    return client.insert()
      .into(Todo.class)
      .using(todo)
      .fetch()
      .first()
      .map(unusedResult -> todo);
  }

  public Mono<Todo> update(Todo todo) {
    return client.update()
      .table(Todo.class)
      .using(todo)
      .fetch()
      .rowsUpdated()
      .flatMap(rowsUpdated -> rowsUpdated == 1
        ? Mono.just(todo)
        : Mono.error(new ApiError("Inconsistent data", 500))
      );
  }

  public Mono<Void> delete(String id) {
    return client.delete().from(Todo.class).matching(Criteria.where("id").is(id))
      .fetch().rowsUpdated().then();
  }

  public Mono<Void> deleteByStatus(Status status) {
    if (status.equals(Status.ALL)) {
      return client.delete().from(Todo.class).fetch().rowsUpdated().then();
    } else {
      final var searchForCompletedTasks = status.equals(Status.COMPLETED);
      return client.delete().from(Todo.class)
        .matching(Criteria.where("completed").is(searchForCompletedTasks))
        .fetch()
        .rowsUpdated()
        .then();
    }
  }

}
