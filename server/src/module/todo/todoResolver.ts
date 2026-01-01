import prisma from "../../config/database.js";
import { GraphQLResolveInfo } from "graphql";

interface GetTodoArgs {
    id: number;
}

interface CreateTodoArgs {
    todo: string;
}

interface UpdateTodoArgs {
    id: number;
    todo: string;
}

interface ToggleTodoArgs {
    id: number;
    data: boolean;
}

const todoResolver = {
    Query: {
        todos: async () => {
            return prisma.todo.findMany({ orderBy: { id: "desc" } });
        },

        getTodo: async (_: unknown, { id }: { id: string }) => {
            return prisma.todo.findUnique({
                where: { id: Number(id) },
            });
        },
    },

    Mutation: {
        createTodo: async (
            _: unknown,
            { todo }: CreateTodoArgs
        ) => {
            return prisma.todo.create({
                data: {
                    todo,
                    completed: false,
                },
            });
        },

        updateTodo: async (
            _: unknown,
            { id, todo }: UpdateTodoArgs
        ) => {
            await prisma.todo.update({
                where: { id },
                data: { todo },
            });

            return { message: "Todo updated successfully!" };
        },

        toggleComplete: async (
            _: unknown,
            { id, data }: ToggleTodoArgs
        ) => {
            await prisma.todo.update({
                where: { id },
                data: { completed: data },
            });

            return { message: "Todo updated successfully!" };
        },
    },
};

export default todoResolver;
