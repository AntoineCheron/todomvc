package fr.cheron.antoine.todomvc.commons.models;

import java.util.Collection;

import lombok.Value;

@Value
public class TodoCollection {

  private final Collection<Todo> todos;

}
