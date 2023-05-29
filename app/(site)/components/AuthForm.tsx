'use client'

import Button from "@/app/components/inputs/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { CircleNotch, GoogleLogo } from "phosphor-react";
import { GithubLogo } from "@phosphor-icons/react";
import { api } from "@/app/libs/axios";
import { useLoad } from "@/app/hooks/useLoader";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react'


type VariantTypes = 'LOGIN' | 'REGISTER'

export default function AuthForm(){

  const [ variant, setVariant] = useState<VariantTypes>('LOGIN')

  const { setLoading, show } = useLoad()

  const toogleVariant = useCallback(() => {
    if(variant === 'LOGIN'){
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])
  
  const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)

    if(variant === 'REGISTER'){
      await api.post('/register', data)
      .then((res) => {
        toast.success('Usuário criado com sucesso')
      }).catch((err) => {
        toast.error('Algo deu errado')
      }).finally(() => {
        setLoading(false)
      })
    }
    
    if(variant === 'LOGIN'){
      signIn('credentials', {
        ...data,
        redirect: false
      }).then((callback) => {
        if(callback?.error){
          toast.error('Credenciais inválidas')
        }

        if(callback?.ok && !callback?.error){
          toast.success('Logou com sucesso')
        }
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  const socialAction = (action: 'github' | 'google') => {
    setLoading(true)

    signIn(action, { redirect: false}).then((callback) => {
      if(callback?.error){
        toast.error('Credenciais inválidas')
      }

      if(callback?.ok && !callback?.error){
        toast.success('Logou com sucesso')
      }
    }).finally(() => {
      setLoading(false)
    })
  }
 
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {
            variant === 'REGISTER' && (
              <Input
                errors={errors}
                register={register}
                id="name"
                label="Nome"
              />
            )
          }
          <Input
            errors={errors}
            register={register}
            id="email"
            label="Seu e-mail"
          />
          <Input
            errors={errors}
            register={register}
            id="password"
            type="password"
            label="Sua senha"
          />
          <div className="">
            <Button fullwidth disabled={show} type="submit">
              {
                show ? <CircleNotch className="animate-spin" size={20} /> : variant === 'REGISTER' ? "Cadastrar" : "Entrar"
              }
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Ou</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={GithubLogo} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={GoogleLogo} onClick={() => socialAction('google')} />
          </div>

        </div>

        <div className="mt-6 text-center text-gray-500 text-sm px-2 underline cursor-pointer" onClick={toogleVariant}>
          {
            variant === 'LOGIN' ? 'Ainda não tem conta?' : 'Já tem uma conta? Faça login'
          }
        </div>
      </div>
    </div>
  );
}