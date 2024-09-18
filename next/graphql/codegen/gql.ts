/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation createTask($input: CreateTaskInput!) {\n  createTask(input: $input) {\n    task {\n      id\n      name\n      description\n      status\n    }\n  }\n}": types.CreateTaskDocument,
    "mutation deleteTask($input: DeleteTaskInput!) {\n  deleteTask(input: $input) {\n    id\n  }\n}": types.DeleteTaskDocument,
    "query getTask($id: ID!) {\n  task(id: $id) {\n    id\n    name\n    description\n    status\n  }\n}": types.GetTaskDocument,
    "query getTasksPagination($page: Int!) {\n  tasksPagination(page: $page) {\n    tasks {\n      id\n      name\n      description\n      status\n    }\n    pagination {\n      current\n      totalPages\n    }\n  }\n}": types.GetTasksPaginationDocument,
    "mutation updateTask($input: UpdateTaskInput!) {\n  updateTask(input: $input) {\n    task {\n      id\n      name\n      description\n      status\n    }\n  }\n}": types.UpdateTaskDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createTask($input: CreateTaskInput!) {\n  createTask(input: $input) {\n    task {\n      id\n      name\n      description\n      status\n    }\n  }\n}"): (typeof documents)["mutation createTask($input: CreateTaskInput!) {\n  createTask(input: $input) {\n    task {\n      id\n      name\n      description\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteTask($input: DeleteTaskInput!) {\n  deleteTask(input: $input) {\n    id\n  }\n}"): (typeof documents)["mutation deleteTask($input: DeleteTaskInput!) {\n  deleteTask(input: $input) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getTask($id: ID!) {\n  task(id: $id) {\n    id\n    name\n    description\n    status\n  }\n}"): (typeof documents)["query getTask($id: ID!) {\n  task(id: $id) {\n    id\n    name\n    description\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getTasksPagination($page: Int!) {\n  tasksPagination(page: $page) {\n    tasks {\n      id\n      name\n      description\n      status\n    }\n    pagination {\n      current\n      totalPages\n    }\n  }\n}"): (typeof documents)["query getTasksPagination($page: Int!) {\n  tasksPagination(page: $page) {\n    tasks {\n      id\n      name\n      description\n      status\n    }\n    pagination {\n      current\n      totalPages\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateTask($input: UpdateTaskInput!) {\n  updateTask(input: $input) {\n    task {\n      id\n      name\n      description\n      status\n    }\n  }\n}"): (typeof documents)["mutation updateTask($input: UpdateTaskInput!) {\n  updateTask(input: $input) {\n    task {\n      id\n      name\n      description\n      status\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;