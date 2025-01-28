import { Transform, TransformFnParams } from "class-transformer"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Produto } from "../../produto/entities/produto.entity"


@Entity({name: "tb_usuarios"})
export class Usuario {

    // @OneToMany(() => Produto, (produto) => produto.usuario)
    // produto: Produto[]

    @PrimaryGeneratedColumn() 
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha: string

    @Column({length: 5000 }) 
    foto: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({type: 'date', nullable: false}) 
    data_nascimento: Date
}