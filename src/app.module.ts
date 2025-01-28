import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_farmacia_goal', // Cadastrar o nome do BD
    entities: [Categoria], // Cadastrar as Classes Entities, para que o TypeORM possa gerar as tabelas correspondentes no BD
    synchronize: true,
    logging: true
  }),
  CategoriaModule// Inserir nome da classe module de cada entidade (ex.: PostagemModule)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
