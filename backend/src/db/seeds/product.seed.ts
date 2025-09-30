import { DataSource } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import 'dotenv/config';

async function runSeed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Product],
    synchronize: false,
  });

  await dataSource.initialize();
  const productRepository = dataSource.getRepository(Product);

  const productCount = await productRepository.count();
  if (productCount > 0) {
    console.log('Tabela de produtos já populada. Seed não executado.');
    await dataSource.destroy();
    return;
  }

  const sampleProducts = [
    {
      name: 'Notebook Gamer Pro',
      description:
        'Notebook com 16GB RAM, SSD 512GB e placa de vídeo dedicada.',
      price: 4999.99,
      stock: 15,
    },
    {
      name: 'Smartphone Galaxy S25 Ultra',
      description: 'O mais novo lançamento com câmera de 200MP e tela AMOLED.',
      price: 6250.75,
      stock: 30,
    },
    {
      name: 'Mouse Sem Fio Ergonômico',
      description: 'Mouse vertical para maior conforto e prevenção de lesões.',
      price: 180.0,
      stock: 100,
    },
    {
      name: 'Teclado Mecânico RGB',
      description: 'Teclado com switches blue e iluminação customizável.',
      price: 350.5,
      stock: 50,
    },
    {
      name: 'Monitor Gamer Curvo 27"',
      description: 'Monitor com 144Hz de taxa de atualização e resolução QHD.',
      price: 1899.9,
      stock: 25,
    },
    {
      name: 'Cadeira Gamer Ergonômica',
      description: 'Cadeira com suporte lombar e braços ajustáveis.',
      price: 1200.0,
      stock: 40,
    },
    {
      name: 'Headset Gamer 7.1 Surround',
      description:
        'Fone de ouvido com áudio imersivo e microfone com cancelamento de ruído.',
      price: 450.0,
      stock: 60,
    },
    {
      name: 'SSD NVMe 1TB',
      description:
        'Armazenamento ultra-rápido para jogos e aplicações pesadas.',
      price: 550.0,
      stock: 80,
    },
    {
      name: 'Placa de Vídeo RTX 5070',
      description: 'Placa de vídeo de última geração para rodar tudo no ultra.',
      price: 3500.0,
      stock: 10,
    },
    {
      name: 'Fonte de Alimentação 750W Gold',
      description:
        'Fonte modular com certificação 80 Plus Gold para maior eficiência.',
      price: 650.0,
      stock: 35,
    },
  ];

  const products = productRepository.create(sampleProducts);
  await productRepository.save(products);

  console.log(
    `${sampleProducts.length} produtos de exemplo criados com sucesso!`,
  );

  await dataSource.destroy();
}

runSeed().catch((error) =>
  console.error('Erro ao executar o seed de produtos:', error),
);
