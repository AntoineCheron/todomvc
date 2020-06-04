package fr.cheron.antoine.todomvc.graphql;

import java.io.File;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import fr.cheron.antoine.todomvc.commons.models.Status;
import fr.cheron.antoine.todomvc.commons.models.Todo;
import fr.cheron.antoine.todomvc.commons.services.TodoService;
import graphql.GraphQL;
import graphql.schema.DataFetchingEnvironment;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static fr.cheron.antoine.todomvc.graphql.Ok.OK;
import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

@Configuration
public class GraphQLConfiguration {

  private final TodoService todoService;

  public GraphQLConfiguration(@Autowired TodoService todoService) {
    this.todoService = todoService;
  }

  @Bean
  public GraphQL getGraphQLInstance() {
    final var graphQLSchemaFile = new File(this.getClass().getClassLoader().getResource("schemas.graphqls").getFile());

    final var schemaParser = new SchemaParser();
    final var typeDefinitionRegistry = schemaParser.parse(graphQLSchemaFile);

    final var runtimeWiring = this.buildRuntimeWiring();

    final var schemaGenerator = new SchemaGenerator();
    final var schema = schemaGenerator.makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);

    return GraphQL.newGraphQL(schema).build();
  }

  private RuntimeWiring buildRuntimeWiring() {
    return newRuntimeWiring()
      .scalar(Ok.OK_GRAPH_QL_SCALAR)
      .type("Query", builder -> builder
        .dataFetcher("todos", this::todosDataFetcher))
      .type("Mutation", builder -> builder
        .dataFetcher("createTodo", this::createTodoDataFetcher)
        .dataFetcher("updateTodo", this::updateTodoDataFetcher)
        .dataFetcher("deleteTodo", this::deleteTodoDataFetcher)
        .dataFetcher("deleteTodos", this::deleteTodosDataFetcher)
      )
      .build();
  }

  private CompletableFuture<List<Todo>> todosDataFetcher (DataFetchingEnvironment environment) {
    final var status = Status.of(environment.<String>getArgument("status").toUpperCase()).orElseThrow();

    return this.todoService.list(status).collectList().toFuture();
  }

  private CompletableFuture<Todo> createTodoDataFetcher (DataFetchingEnvironment environment) {
    final String title = environment.getArgument("title");

    return this.todoService.create(title).toFuture();
  }

  private CompletableFuture<Todo> updateTodoDataFetcher (DataFetchingEnvironment environment) {
    final String id = environment.getArgument("id");
    final String title = environment.getArgument("title");
    final boolean completed = environment.getArgument("completed");

    return this.todoService.update(id, title, completed).toFuture();
  }

  private CompletableFuture<Ok> deleteTodoDataFetcher (DataFetchingEnvironment environment) {
    final String id = environment.getArgument("id");

    return this.todoService.delete(id).map(unused -> OK).toFuture();
  }

  private CompletableFuture<Ok> deleteTodosDataFetcher (DataFetchingEnvironment environment) {
    final var status = Status.of(environment.<String>getArgument("status").toUpperCase()).orElseThrow();

    return this.todoService.deleteMany(status).map(unused -> OK).toFuture();
  }

}
