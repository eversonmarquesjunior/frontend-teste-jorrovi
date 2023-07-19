import { useEffect, useState } from "react"
import { useProdutoDataMutate } from "../../hooks/useProdutoDataMutate";
import { ProdutoData } from "../../interface/ProdutoData";
import "./modal.css"

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface ModalProps {
    closeModal(): void
}

const Input = ({label, value, updateValue}: InputProps) => {
    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({closeModal}: ModalProps){
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [qtde, setQtde] = useState(0);
    const {mutate, isSuccess} = useProdutoDataMutate();

    const submit = () => {
        const produtoData: ProdutoData = {
            nome, 
            descricao,
            preco,
            qtde
        }
        mutate(produtoData)
    }
    
    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo produto:</h2>
                <form className="input-container">
                    <Input label="Nome:" value={nome} updateValue={setNome}/>
                    <Input label="Descrição:" value={descricao} updateValue={setDescricao}/>
                    <Input label="Preço:" value={preco} updateValue={setPreco}/>
                    <Input label="Quantidade:" value={qtde} updateValue={setQtde}/>
                </form>
                <button onClick={submit} className="btn-secondary">Cadastrar</button>
                <button onClick={closeModal} className="btn-secondary">Voltar</button>
            </div>
        </div>
    )
}