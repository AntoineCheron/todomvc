package fr.cheron.antoine.todomvc.restapi.models;

import lombok.Value;

@Value
public class TodoCreationRequest {

  private final String title;

}
