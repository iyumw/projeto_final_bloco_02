import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_farmacia_goal', 
    autoLoadEntities: true, // Cadastrar as Classes Entities, para que o TypeORM possa gerar as tabelas correspondentes no BD
    synchronize: true,
    logging: true
  }),
  CategoriaModule, ProdutoModule, UsuarioModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
