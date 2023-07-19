import './card.css';

interface CardProps {
    nome: string,
    descricao: string,
    preco: number,
    qtde: number,
    children?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({nome, descricao, preco, qtde, children}) => {

    return(
        <div className="card">
            <h1>{nome}</h1>
            <h2>{descricao}</h2>
            <h3>Preço: R${preco}</h3>
            <h3>Quantidade: {qtde}</h3>
            {children}
        </div>
        )
}