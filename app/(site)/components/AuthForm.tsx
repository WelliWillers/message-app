'use client'

import Button from "@/app/components/inputs/Button";
import Input from "@/app/components/inputs/Input";
import { useLoad } from "@/hooks/useLoader";
import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { CircleNotch, GoogleLogo } from "phosphor-react";

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true)

    if(variant === 'REGISTER'){
      
    }
    
    if(variant === 'LOGIN'){
      
    }
  }

  const socialAction = (action: string) => {
    setLoading(true)

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
            <AuthSocialButton icon={GoogleLogo} onClick={() => {}} />
            {/* <AuthSocialButton /> */}
          </div>

        </div>
      </div>
    </div>
  );
}