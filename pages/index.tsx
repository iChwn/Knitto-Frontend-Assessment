import { Button, Card, CardItem, SearchBar } from "@/components";
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
  const [movie, setTodo] = useState<TodoList[]>(data)
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [isLoadingDetail, setLoadingDetail] = useState(false)
  const [isTodoEmpty, setTodoEmpty] = useState(false)
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
    console.log("submit")
    e.preventDefault()
  }

  const renderStatus = () => {
    if(isLoading) {
      return "Loading..."
    } else if((!isTodoEmpty && !isLoading && movie.length === 0)) {
      return "Your todo list will appear here"
    }
  }

  const handleCheck = (result:TodoList) => {
    console.log("Checked", result)
  }

  const handlePagination = () => {

  }

  const checkRedux = () => {
    // dispatch(increaseCounter())
  }

  return (
    <div className="w-full h-full overflow-auto">
      <button onClick={checkRedux}>wkwkwkkwk</button>
      <SearchBar onSubmit={onSubmit} value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Add TODO Items" />
      {!isLoading && (
        <div className="flex justify-center items-center max-w-[600px] p-[30px] flex-col m-auto gap-5">
          <div className="grid grid-cols-1 gap-5 w-full">
            {movie.map((result, index) => {
              return (
                <Card key={index}> 
                  <CardItem 
                    title={result.title}
                    handleCheck={() => handleCheck(result)}
                    handleDelete={() => console.log("Wewewe")}
                  />
                </Card>
              )
            })}
          </div>
          <div className="w-full flex flex-1 mt-5 justify-between">
            <Button title="Prev" onClick={() => setStartPage(startPage - 1)}/>
            <Button title="Next" onClick={() => setStartPage(startPage + 1)}/>
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
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5`)
  const data = await res.json()
  
  return {
    props: {data},
  };
};

export default Home
