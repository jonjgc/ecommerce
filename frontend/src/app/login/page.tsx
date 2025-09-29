'use client'

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

import * as S from './styles';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await signIn({ email, password });

      toast.success('Login realizado com sucesso!');
      router.push('/');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('E-mail ou senha inválidos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <S.FormWrapper>
        <h1>Acesse sua Conta</h1>
        <form onSubmit={handleSubmit}>
          <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <S.RegisterLink>
          Ainda não tem uma conta? <Link href="/register">Cadastre-se</Link>
        </S.RegisterLink>
      </S.FormWrapper>
    </Layout>
  );
}