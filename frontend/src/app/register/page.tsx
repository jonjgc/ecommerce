'use client'

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import { api } from '@/services/api';
import { AxiosError } from 'axios';

import { Wrapper as InputWrapper } from '@/components/Input/styles';

import * as S from './styles';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('As senhas não conferem!');
      setLoading(false);
      return;
    }

    try {
      await api.post('/users', {
        name,
        email,
        cpf,
        phone,
        password,
      });

      toast.success('Cadastro realizado com sucesso! Faça o login.');
      router.push('/login');

    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error('Não foi possível realizar o cadastro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <S.FormWrapper>
        <h1>Crie sua Conta</h1>
        <form onSubmit={handleSubmit}>
          <Input label="Nome Completo" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <InputWrapper>
            <label>CPF</label>
            <S.StyledIMaskInput
              mask="000.000.000-00"
              value={cpf}
              onAccept={(value: string) => setCpf(value)}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <label>Telefone</label>
            <S.StyledIMaskInput
              mask="(00) 00000-0000"
              value={phone}
              onAccept={(value: string) => setPhone(value)}
              required
            />
          </InputWrapper>
          
          <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Input label="Confirme a Senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>
      </S.FormWrapper>
    </Layout>
  );
}