package com.github.antoinecheron.todomvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.github.antoinecheron.todomvc.restapi.hypermedia.Link;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  @Bean
  public static ObjectMapper getJacksonInstanceConfigured() {
    final ObjectMapper objectMapper = new ObjectMapper();

    final SimpleModule applicationSpecificSerializers = new SimpleModule();
    applicationSpecificSerializers.addSerializer(Link.Simple.class, new Link.Simple.Serializer());
    applicationSpecificSerializers.addSerializer(Link.WithParameters.class, new Link.WithParameters.Serializer());

    objectMapper.registerModule(applicationSpecificSerializers);

    return objectMapper;
  }

}
