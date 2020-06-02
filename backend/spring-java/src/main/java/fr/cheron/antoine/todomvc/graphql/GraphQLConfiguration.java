package fr.cheron.antoine.todomvc.graphql;

import java.io.File;

import graphql.GraphQL;
import graphql.schema.StaticDataFetcher;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

@Configuration
public class GraphQLConfiguration {

  @Bean
  public GraphQL getGraphQLInstance() {
    final var graphQLSchemaFile = new File(this.getClass().getClassLoader().getResource("schemas.graphqls").getFile());

    final var schemaParser = new SchemaParser();
    final var typeDefinitionRegistry = schemaParser.parse(graphQLSchemaFile);

    final var runtimeWiring = newRuntimeWiring()
      .type("Query", builder -> builder.dataFetcher("hello", new StaticDataFetcher("world")))
      .build();

    final var schemaGenerator = new SchemaGenerator();
    final var schema = schemaGenerator.makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);

    return GraphQL.newGraphQL(schema).build();
  }

}
