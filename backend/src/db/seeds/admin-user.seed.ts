import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

async function runSeed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    synchronize: false,
  });

  await dataSource.initialize();
  const userRepository = dataSource.getRepository(User);

  const adminEmail = 'admin@loja.com';
  const adminPassword = 'adminpassword';

  // Verifica se o usuário admin já existe
  const adminExists = await userRepository.findOneBy({ email: adminEmail });

  if (adminExists) {
    console.log('Usuário administrador já existe. Seed não executado.');
    await dataSource.destroy();
    return;
  }

  // Cria o novo usuário admin
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const adminUser = userRepository.create({
    name: 'Admin',
    email: adminEmail,
    cpf: '000.000.000-00',
    password: hashedPassword,
    isAdmin: true,
    isActive: true, // Já cria o usuário como ativo
  });

  await userRepository.save(adminUser);
  console.log('Usuário administrador de teste criado com sucesso!');
  console.log(`Email: ${adminEmail}`);
  console.log(`Senha: ${adminPassword}`);

  await dataSource.destroy();
}

runSeed().catch((error) => console.error('Erro ao executar o seed:', error));
