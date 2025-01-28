import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { AuthModule } from "../auth/auth.module";
import { UsuarioController } from "./controllers/usuario.controller";
import { UsuarioService } from "./services/usuario.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        forwardRef(() => AuthModule)
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService],
})

export class UsuarioModule{}