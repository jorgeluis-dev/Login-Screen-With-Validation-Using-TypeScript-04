import { useForm } from "react-hook-form";
import { useState} from 'react'
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";

//validação with yup
const schema = yup
  .object({
    email: yup
      .string().email("E-mail inválido")
      .required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "No minimo 6 caracteres")
      .required("Campo obrigatório"),
  })
  .required();

const Login = () => {
  const {
    control,
    watch,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  //console.log(isValid)
  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      // Lógica para enviar o formulário
      alert("O formulário foi preenchido corretamente");
    } else {
      setShowErrorMessage(true);
    }
  });
      
  
  //test view text in console form
  // const form = watch();
  // console.log(form)

  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing />
          <Input
            name="email"
            placeholder="Email"
            control={control}
            errorMessage={errors?.email?.message}
          />
          <Spacing />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            control={control}
            errorMessage={errors?.password?.message}
          />
          <Spacing />
          {showErrorMessage && <p>Preencha o formulário corretamente</p>}
          <Button title="Entrar" disabled={!isValid} onClick={onSubmit} />

        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;
