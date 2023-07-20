import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './styles/FormUser.css'

const FormUsers = ({ createNewUser, updateInfo, updateUsers, setUpdateInfo , closeForm , setCloseForm}) => {

    //React hook form libreria de forms
    //Retorna un objeto que contiene todas las caract necesarias para hacer la captura de toda la informacion
    //devuelve un objeto y es una funcion
    const { register, reset, handleSubmit } = useForm()

    

    useEffect(() => {
        reset(updateInfo)
    }, [updateInfo])


    //*1.Creamos una funcion que usaremos para nuestra libreria
    const submit = (data) => {
        if (updateInfo) {
            //actualizar info
            updateUsers('/users', updateInfo.id, data)
            setUpdateInfo()
        } else {
            createNewUser('/users', data)
            //Create 
        }
        //*
        reset({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            birthday: ''
        })
    }
const handleCloseForm=()=>{
    setCloseForm(true)
}
    return (
        <div onClick={handleCloseForm} className={`formuser-container ${closeForm && 'close-form'}`}>

            <form onClick={e => e.stopPropagation()} className='formuser' onSubmit={handleSubmit(submit)} >
                <h2 className='formuser__title'>{updateInfo ? 'Update' : 'New User'}</h2>
                <div onClick={handleCloseForm} className='formuser__close'>X</div>
                <div className='formuser__group'>
                    <label className='formuser__label' htmlFor="first_name">First Name</label>
                    <input className='formuser__input' {...register('first_name')} type="text" id="first_name" />
                </div>
                <div className='formuser__group'>
                    <label className='formuser__label' htmlFor="last_name">Last Name</label>
                    <input className='formuser__input' {...register('last_name')} type="text" id="last_name" />
                </div>
                <div className='formuser__group'>
                    <label className='formuser__label' htmlFor="email">Email</label>
                    <input className='formuser__input' {...register('email')} type="email" id="email" />
                </div>
                <div className='formuser__group'>
                    <label className='formuser__label' htmlFor="password">Password</label>
                    <input className='formuser__input'  {...register('password')} type="password" id="password" />
                </div>
                <div className='formuser__group'>
                    <label className='formuser__label' htmlFor="birthday">Birthday</label>
                    <input className='formuser__input' {...register('birthday')} type="date" id="birthday" />
                </div>
                <button className='formuser__btn'>{updateInfo ? 'Update User' : 'Add New User'}</button>
            </form>
        </div>
    )
}

export default FormUsers