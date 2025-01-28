import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt{

    async criptografarSenha(senha: string): Promise<string> {

        let saltos: number = 10; // Quantas vezes vai ser criptografado
        return await bcrypt.hash(senha, saltos)

    }

    async compararSenhas(senhaDigitada: string, senhaBanco: string): Promise<boolean> {
        return await bcrypt.compare(senhaDigitada, senhaBanco);
    }

}