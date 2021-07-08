package com.github.antoinecheron.todomvc.commons;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.antoinecheron.todomvc.restapi.hypermedia.HypermediaRepresentation;
import com.github.antoinecheron.todomvc.restapi.hypermedia.Link;

@Configuration
public class JacksonConfiguration {

  @Bean
  public static ObjectMapper objectMapper() {
    final ObjectMapper objectMapper = new ObjectMapper();

    final SimpleModule applicationSpecificSerializers = new SimpleModule();
    applicationSpecificSerializers.addSerializer(new Link.Serializer());
    applicationSpecificSerializers.addSerializer(new Link.Simple.Serializer());
    applicationSpecificSerializers.addSerializer(new Link.WithParameters.Serializer());
    applicationSpecificSerializers.addSerializer(new HypermediaRepresentation.Serializer());

    objectMapper.registerModule(applicationSpecificSerializers);

    return objectMapper;
  }

}
