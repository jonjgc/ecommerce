'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { api } from '@/services/api';
import { IProduct } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Pagination } from '@/components/Pagination';
import { useDebounce } from '@/hooks/useDebounce';
import * as S from './page.styles';

const PageHeader = S.PageHeader;

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await api.get('/products', {
          params: {
            page: currentPage,
            limit: 6,
            name: debouncedSearchTerm,
          },
        });
        
        setProducts(response.data.data);
        setTotalPages(response.data.meta.totalPages);

      } catch (error) {
        console.error('Falha ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [currentPage, debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm]);

  return (
    <Layout>
      <PageHeader>
        <h1>Nossos Produtos</h1>
        {user?.isAdmin && (
          <Link href="/products" passHref>
            <Button>Gerenciar Produtos</Button>
          </Link>
        )}
      </PageHeader>

      <S.SearchContainer>
        <Input
          label=""
          placeholder="Buscar por nome do produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </S.SearchContainer>
      
      {loading ? (
        <S.LoadingMessage>Carregando produtos...</S.LoadingMessage>
      ) : (
        <>
          <S.ProductGrid>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </S.ProductGrid>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Layout>
  );
}