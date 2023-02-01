import Button from "@/components/atoms/button";
import React, { FC, MouseEventHandler } from "react";

type CardItemProps = {
  title: string, 
  handleCheck: MouseEventHandler<HTMLInputElement>, 
  handleDelete: MouseEventHandler<HTMLButtonElement>, 
}

const CardItem:FC<CardItemProps> = ({title, handleCheck, handleDelete}) => {
  return (
    <div className="p-5 w-full flex flex-row items-center">
      <input type="checkbox" onClick={handleCheck}/>
      <h1 className="font-bold text-lg flex-1 px-3">{title}</h1>
      <Button title="Delete" onClick={handleDelete}/>
    </div>
  )
}


export default CardItem;