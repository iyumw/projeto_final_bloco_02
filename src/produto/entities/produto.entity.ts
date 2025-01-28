import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { NumericTransformer } from "../../util/numericTransformer";
import { Categoria } from "../../categoria/entities/categoria.entity";


@Entity({name: 'tb_produtos'})

export class Produto {

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

    // @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    //     onDelete: "CASCADE" 
    // })
    // usuario: Usuario

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Column({length: 100, nullable: false}) 
    nome: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Transform(({ value }: TransformFnParams) => parseFloat(value.toFixed(2)))
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    preco: number;
    
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 5000, nullable: true })
    foto: string;

    @IsPositive()
    @Column({ type: "int"})
    estoque: number;

    @CreateDateColumn()
    data_criacao: Date;

    @UpdateDateColumn()
    data_atualizacao: Date;

}