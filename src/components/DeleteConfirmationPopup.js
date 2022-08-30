import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteConfirmationPopup ({onClose, isOpen, deletedCard, onDeletedCard, isRequesting}) {

  function handleSubmit(e) {
    e.preventDefault();
    console.log(deletedCard._id)
    onDeletedCard(deletedCard)
  }

  return (
    <PopupWithForm
    name="delete"
    title="Вы уверены?"
    buttonText="Да"
    buttonActiveText='Удаление...'
    onClose={onClose}
    isOpen={isOpen}
    onSubmit={handleSubmit}
    isRequesting={isRequesting}
    children=""/>
  )
}