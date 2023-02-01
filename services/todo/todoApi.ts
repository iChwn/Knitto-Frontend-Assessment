import {
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import type { TodoList } from './types'
import { SerializedError } from '@reduxjs/toolkit'

export type TodoApiState<T> = {
	loading: boolean
	data?: T
	error?: FetchBaseQueryError | SerializedError | undefined
}

type GetTodoArgs = {
	start: number
	limit: number
}

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
	reducerPath: 'todoApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com/todos',
	}),
	endpoints: (builder) => ({
		getTodosById: builder.query<TodoList, string>({
			query: (id) => `/${id}`,
		}),
		getTodos: builder.query<TodoList, GetTodoArgs>({
			query: ({ start, limit }) => `?_start=${start}&_limit=${limit}`,
		}),
		addTodo: builder.mutation<TodoList, TodoList>({
			query: (body) => ({ 
        url: '', 
        method: 'POST', 
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
		}),
	}),
})

// Export hooks for usage in functional components, which are
export const { useGetTodosByIdQuery, useGetTodosQuery, useAddTodoMutation } = todoApi

const useTodoApiById = (id: string): TodoApiState<TodoList> => {
	const { data, error } = useGetTodosByIdQuery(id)
	const loading = !error && !data

	return {
		loading,
		data,
		error,
	}
}

const useTodoApiList = <T>(
	startPage: number,
	limitPage: number
): TodoApiState<T> => {
	const { data, error } = useGetTodosQuery({
		start: startPage,
		limit: limitPage,
	})
	const loading = !error && !data

	return {
		loading,
		data: data as T,
		error,
	}
}

export { useTodoApiById, useTodoApiList }
