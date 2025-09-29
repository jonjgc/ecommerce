'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { api } from '@/services/api';
import { IProduct } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import Link from 'next/link';
import * as S from './page.styles';

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Falha ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Layout>
      <S.PageHeader>
        <h1>Nossos Produtos</h1>
        {user?.isAdmin && (
          <Link href="/products" passHref>
            <Button>Gerenciar Produtos</Button>
          </Link>
        )}
      </S.PageHeader>
      
      {loading ? (
        <S.LoadingMessage>Carregando produtos...</S.LoadingMessage>
      ) : (
        <S.ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </S.ProductGrid>
      )}
    </Layout>
  );
}