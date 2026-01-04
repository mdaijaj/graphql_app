import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      todo
      completed
      created_at
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($todo: String!) {
    createTodo(todo: $todo) {
      id
      todo
      completed
      created_at
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!, $data: Boolean!) {
    toggleComplete(id: $id, data: $data) {
      message
    }
  }
`;