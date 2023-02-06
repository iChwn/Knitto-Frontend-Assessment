/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardItem, InputBar } from "@/components";
import { FormEvent, useEffect, useState } from "react";
import _ from "lodash";
import { useAddTodoMutation, useTodoApiList } from "@/services/todo/todoApi";
import { GetServerSideProps } from "next";

type TodoList = {
  id?: number;
  userId?: number;
  title: string;
  completed: boolean;
}

function Home({data} : {data: TodoList[]}) {
  const [todos, setTodo] = useState<TodoList[]>(data)
  const [searchValue, setSearchValue] = useState("")
  const [startPage, setStartPage] = useState(0);
  const [limitPage, setLimitPage] = useState(10);
  const { loading: loadingList, data: todoList, error: errorList } = useTodoApiList(startPage, limitPage);
  const [addTodos, {
    isLoading: isUpdatingProgram,
    error: updateProgramError,
    data: responseData
  }] = useAddTodoMutation();

  useEffect(() => {
    if(todoList) {
      setTodo(todoList as TodoList[])
    }
  }, [todoList])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    addTodos({
      title: searchValue,
      completed: false
    })
    setSearchValue("")
    e.preventDefault()
  }

  useEffect(() => {
    if(responseData) {
      const cloneData = _.cloneDeep(todos)
      cloneData.unshift(responseData)
      setTodo(cloneData)
    }
  }, [responseData])

  const renderStatus = () => {
    if(isUpdatingProgram) {
      return "Loading..."
    } else if((todos.length === 0)) {
      return "Your todo list will appear here"
    }
  }

  const handleCheck = (result:TodoList) => {
    const cloneData = _.cloneDeep(todos)
    let newTodos = cloneData.filter(todo => todo.id === result.id)[0]
    newTodos.completed = !newTodos.completed
    setTodo(cloneData)
  }

  const handleDelete = (result:TodoList) => {
    const cloneData = _.cloneDeep(todos)
    const index = cloneData.findIndex(data => data.id === result.id)
    if (index !== -1) {
        cloneData.splice(index, 1)
    }
    setTodo(cloneData)
  }

  return (
    <div className="w-full h-full overflow-auto">
      <InputBar onSubmit={onSubmit} value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Add TODO Items" />
      {(!isUpdatingProgram && todos.length !== 0) && (
        <div className="flex justify-center items-center max-w-[600px] p-[30px] flex-col m-auto gap-5">
          <div className="grid grid-cols-1 gap-5 w-full">
            {todos.map((result, index) => {
              return (
                <Card key={index}> 
                  <CardItem 
                    title={result.title}
                    isComplete={result.completed}
                    handleCheck={() => handleCheck(result)}
                    handleDelete={() => handleDelete(result)}
                  />
                </Card>
              )
            })}
          </div>
          <div className="w-full flex flex-1 mt-5 justify-between">
            <Button isDisabled={loadingList || startPage === 0} title="Prev" onClick={() => setStartPage(startPage - 1)}/>
            <Button isDisabled={loadingList} title="Next" onClick={() => setStartPage(startPage + 1)}/>
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-center">
        <div className="font-xl text-5xl w-full flex items-center justify-center text-gray-300">
          {renderStatus()}
        </div>
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10`)
  const data = await res.json()
  
  return {
    props: {data},
  };
};

export default Home
