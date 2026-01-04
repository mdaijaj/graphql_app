import "./index.css";
import { CREATE_TODO, GET_TODOS, TOGGLE_TODO } from "./queries/todoQueries";
import { Todo, TodoType } from "./type";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";


export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const { data, loading, error } = useQuery<TodoType>(GET_TODOS);
  const [createTodo, { data: newTodo, error: cErr, loading: cLoading }] = useMutation(CREATE_TODO);
  const [toggleComplete] = useMutation(TOGGLE_TODO);

  const handleSubmit = (event: React.FormEvent) => {
    console.log("event", event);
    event.preventDefault();
    createTodo({ variables: { todo: todo } });
    if (cErr) alert(cErr.message);
    setTodo(""); handleToggle
  };

  const handleToggle = async (completed: boolean, id: number) => {
    try {
      let res = await toggleComplete({
        variables: { id, data: completed },
      });
      console.log("res", res);
      setTodos((prev) => prev.map((item) => item.id === id ? { ...item, completed } : item));
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (data?.todos) setTodos(data?.todos);
  }, [data]);

  useEffect(() => {
    if (newTodo?.createTodo) {
      setTodos((prev) => [newTodo.createTodo, ...prev]);
    }
  }, [newTodo]);

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="w-full px-2 md:w-[600px] rounded-md bg-blue-100 h-[60vh]">
        <h1 className="text-xl font-bold my-2">What's you are doing today ?</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full h-10 p-2 outline-none rounded-md"
            placeholder="Enter your todo here..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            disabled={cLoading}
          />
        </form>

        <div className="h-[50vh] mt-4">
          {loading && <p>Loading ...</p>}
          {error && <p className="text-red-300">{error.message}</p>}

          {todos &&
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex justify-between items-center bg-blue-400 rounded-md p-1 px-4 mb-2"
              >
                <p className={`${todo.completed ? "line-through" : ""}`}>
                  {todo.todo}
                </p>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => {
                    handleToggle(e.target.checked, todo.id);
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}