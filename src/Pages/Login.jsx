import { useRef } from 'react';
import Layout from '../Components/Layout';
import credenciais from '../../dados.json';
import '../SCSS/Login.scss';
import '../SCSS/Layout.scss';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const getUser = sessionStorage.getItem('userData');


  const handleSubmit = (event) => {
    event.preventDefault();

    const emailDigitado = email.current.value;
    const senhaDigitada = password.current.value;

    const usuarioEncontrado = credenciais.usuarios.find(
      (user) => user.email === emailDigitado && user.senha === senhaDigitada
    );

    if (usuarioEncontrado) {
      let token =  Math.random().toString(16).substring(2) +
                   Math.random().toString(16).substring(2);

      // Armazena o usuário encontrado na sessionStorage com a senha como token
      sessionStorage.setItem('userData', JSON.stringify({
        ...usuarioEncontrado,
        senha: token,
      }));
      window.location.reload();
    } else {
      alert('E-mail ou senha inválidos!');
    }
  };

  return (
    <section>
        
      {getUser ? (
        <Layout />
      ) : (
        <div className='body'>
        <header className='header'>
            <h1 className='titulo'>Melhorando o atendimento e gestão de exames online com API</h1>
            <p>Global Solution 2023 - Engenharia de Software <br/> Gabriel Oliveira Rodrigues RM98565</p>
        </header>
            <form onSubmit={handleSubmit} className='form'>
            <h1>Login</h1>
            <p>
                E-MAIL:<br />
                <input type="email" ref={email} className='input' />
            </p>
            <p>
                SENHA:<br />
                <input type="password" ref={password} className='input' />
            </p>
            <input type="submit" value="Login >>" className='botaoSubmit' />
            </form>
        </div>
      )}
    </section>
  );
}
