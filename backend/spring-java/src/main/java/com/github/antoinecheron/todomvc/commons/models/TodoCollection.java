package com.github.antoinecheron.todomvc.commons.models;

import java.util.Collection;

import lombok.Value;

@Value
public class TodoCollection {

  private final Collection<Todo> todos;

}
