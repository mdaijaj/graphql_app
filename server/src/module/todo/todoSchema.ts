const todoSchema = `#graphql

scalar Date  # Custom scalar for Date type

type ResponseType {
    message:String
}

type Todo {
    id:Int!
    todo:String
    completed:Boolean
    created_at:Date
}

type Query {
    todos:[Todo]
    getTodo(id: ID!): Todo
}

type Mutation {
    createTodo(todo:String):Todo
    updateTodo(id:Int ,todo:String):ResponseType
    toggleComplete(id: Int!, data: Boolean!): ResponseType
}
`;

export default todoSchema;