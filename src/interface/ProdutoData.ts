export interface ProdutoData {
    id?: number,
    nome: string,
    descricao: string,
    preco: number,
    qtde: number,
    [key: string]: string | number | undefined
}