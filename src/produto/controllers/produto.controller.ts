import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
import { JwtAuthGuard } from "../../auth/guard/jwat-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('/produtos')
export class ProdutoController {
    constructor(
        private readonly produtoService: ProdutoService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id);
    }

    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param("nome") nome: string): Promise<Produto[]>{
        return this.produtoService.findByNome(nome);
    }

    @Get('maior/:valor')
    @HttpCode(HttpStatus.OK)
    findMaiorValor(@Param("valor", ParseFloatPipe) valor: number): Promise<Produto[]>{
        //const valorArredondado = parseFloat(valor.toFixed(2));
        return this.produtoService.findMaiorValor(valor);
    }

    @Get('menor/:valor')
    @HttpCode(HttpStatus.OK)
    findMenorValor(@Param("valor", ParseFloatPipe) valor: number): Promise<Produto[]>{
        //const valorArredondado = parseFloat(valor.toFixed(2));
        return this.produtoService.findMenorValor(valor);
    }
    
    @Post() //@Body - procura no corpo da requisição
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto);
    }

    @Put() 
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }
}