import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => { // Para fazer vários testes, se fosse só um seria beforeEach
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: "sqlite",
        database: ":memory:", // salva os dados em memória
        entities: [__dirname + "./../src/**/entities/*.entity.ts"], // importa todas as entidades do projeto
        synchronize: true,
      dropSchema: true
    }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Importa as validações
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  }); // Para anunciar que o teste finaliza depois de rodar todos os testes

  it("01 - Deve cadastrar um novo usuário", async() => {
    const resposta = await request(app.getHttpServer()) // recebe a requisição http
    .post('/usuarios/cadastrar') // envia a requisição para esse endpoint
    .send({
      nome: "Root",
      usuario: "root@root.com",
      senha: "rootroot",
      foto: "-",
      data_nascimento: "2004-08-25"
    })
    .expect(201) // espera retorno 201 - created

    usuarioId = resposta.body.id; // usado pq o id precisa ser guardado no body
  })

  it("02 - Não deve cadastrar um usuário duplicado", async() => {
    return await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: "Root",
      usuario: "root@root.com",
      senha: "rootroot",
      foto: "-"
    })
    .expect(400) // espera retorno 400 - Bad request
  })

  it("03 - Deve autenticar o usuário (Login)", async() => {
    const reposta = await request(app.getHttpServer())
   .post('/usuarios/logar')
   .send({
      usuario: "root@root.com",
      senha: "rootroot"
    })
   .expect(200) // espera retorno 200 - OK

    token = reposta.body.token; // usado pq o token precisa ser guardado no body
  })

  it("04 - Deve listar todos os usuários", async() => {
    return await request(app.getHttpServer())
   .get('/usuarios/all')
   .set("Authorization", `${token}`)
   .expect(200) // espera retorno 200 - OK
  })

  it("05 - Deve atualizar um usuário", async() => {
    return await request(app.getHttpServer())
    .put(`/usuarios/atualizar`)
    .set("Authorization", `${token}`)
    .send({
      id: usuarioId,
      nome: "Atualizado",
      usuario: "atualizado@atualizado.com",
      senha: "atualizadoatualizado",
      foto: "fotobonita.jpg",
      data_nascimento: "2004-08-25"
    })
    .expect(200) // espera retorno 200 - OK
    .then(resposta => {
    expect ("Atualizado").toEqual(resposta.body.nome)
    })
  })

  it("06 - Deve buscar o id do usuário", async() => {
    return await request(app.getHttpServer())
    .get(`/usuarios/${usuarioId}`)
    .set("Authorization", `${token}`)
    .expect(200)
    .then(resposta => {
      expect(usuarioId).toEqual(resposta.body.id)
    })
  })
  
});