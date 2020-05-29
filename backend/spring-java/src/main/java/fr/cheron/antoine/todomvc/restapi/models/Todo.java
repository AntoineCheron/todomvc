package fr.cheron.antoine.todomvc.restapi.models;

import lombok.Value;
import org.springframework.data.annotation.Id;

@Value
public class Todo {

  @Id
  private final String id;
  private final String title;
  private final boolean completed;

}
