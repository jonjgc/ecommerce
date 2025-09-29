'use client';

import { useState, useEffect, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { IProduct } from '@/types/product';
import toast from 'react-hot-toast';
import { Pagination } from '@/components/Pagination';
import * as S from './styles';

export default function ProductsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', {
        params: {
          page: currentPage,
          limit: 10,
        },
      });
      setProducts(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Falha ao buscar produtos.');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      toast.error('Acesso negado.');
      router.push('/');
      return;
    }
    fetchProducts();
  }, [isAuthenticated, user, router, fetchProducts]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setDescription('');
    setPrice(0);
    setStock(0);
    setIsModalOpen(true);
  };

  const openEditModal = (product: IProduct) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.delete(`/products/${productId}`);
        toast.success('Produto excluído com sucesso!');
        fetchProducts();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Falha ao excluir o produto.');
      }
    }
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const productData = { name, description, price: Number(price), stock: Number(stock) };

    try {
      if (editingProduct) {
        await api.patch(`/products/${editingProduct.id}`, productData);
        toast.success('Produto atualizado com sucesso!');
      } else {
        await api.post('/products', productData);
        toast.success('Produto criado com sucesso!');
      }
      fetchProducts();
      setIsModalOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Ocorreu um erro.');
    }
  };

  if (loading && products.length === 0) return <Layout><p>Carregando...</p></Layout>;

  return (
    <Layout>
      <S.Container>
        <h1>Gerenciar Produtos</h1>
        <S.TopActions>
          <Button onClick={openCreateModal} fullWidth={false}>Adicionar Novo Produto</Button>
        </S.TopActions>

        <S.ProductTable>
          <thead>
            {/* ... */}
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td data-label="Nome">{product.name}</td>
                <td data-label="Preço">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</td>
                <td data-label="Estoque">{product.stock}</td>
                <td data-label="Ações">
                  <S.ActionButton onClick={() => openEditModal(product)}>✏️</S.ActionButton>
                  <S.ActionButton onClick={() => handleDeleteProduct(product.id)}>🗑️</S.ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </S.ProductTable>
        
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />
      </S.Container>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Editar Produto' : 'Criar Novo Produto'}
      >
        <S.Form onSubmit={handleFormSubmit}>
          <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <Input label="Preço" type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          <Input label="Estoque" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
          <Button type="submit">{editingProduct ? 'Salvar Alterações' : 'Criar Produto'}</Button>
        </S.Form>
      </Modal>
    </Layout>
  );
}