package fr.cheron.antoine.todomvc.restapi.models;

import lombok.Value;

@Value
public class TodoUpdateRequest {

  private final String title;
  private final boolean completed;

}
