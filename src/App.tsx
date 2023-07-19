import { Card } from './components/card/card';
import { useProdutoData } from './hooks/useProdutoData';
import { ChangeEvent, useState } from 'react';
import { CreateModal } from './components/create-modal/create-modal';
import { ProdutoData } from './interface/ProdutoData';
import { BiEditAlt }from 'react-icons/bi';
import './App.css';

function App() {
const {data} = useProdutoData();
const [isModalOpen, setIsModalOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [editingCard, setEditingCard] = useState<number | null>(null);
const [newFilteredData, setFilteredData] = useState<ProdutoData[]>([]);
const [dataEditInput, setData] = useState<ProdutoData[]>([]);

const handleOpenModal = () => {
  setIsModalOpen(prev => !prev)
}

const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value)
}

const filteredData = data?.filter((produtoData) =>
  produtoData.nome.toLowerCase().includes(searchTerm.toLowerCase())
) ?? []

const handleEditCard = (index: number) => {
  setEditingCard(index)
}

const handleEditInputChange = (event: ChangeEvent<HTMLInputElement>, index: number, property: string) => {
  const { value } = event.target
  const updatedData = [...filteredData]
  updatedData[index][property] = value
  setFilteredData(updatedData)
  setData(updatedData)
}

const handleSaveChanges = () => {
  const updatedData = [...filteredData]
  setData(updatedData)
  setEditingCard(null)
}

  return (
    <>
      <div className='container'>
        <h1 id='p'>Lista de Produtos</h1>
          <input className='input-search'
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Pesquisar...'
          />
        <div className='card-grid'>
          {filteredData?.length > 0 ? (
            filteredData.map((produtoData, index) => (
              <Card
                key={index}
                nome={produtoData.nome} 
                descricao={produtoData.descricao} 
                preco={produtoData.preco}
                qtde={produtoData.qtde}
              >
                {editingCard === index ? (
                  <>
                    <input
                      type="text"
                      value={produtoData.nome}
                      onChange={(event) => handleEditInputChange(event, index, 'nome')}
                    />
                    <input
                      type="text"
                      value={produtoData.descricao}
                      onChange={(event) => handleEditInputChange(event, index, 'descricao')}
                    />
                    <input
                      type="number"
                      value={produtoData.preco}
                      onChange={(event) => handleEditInputChange(event, index, 'preco')}
                    />
                    <input
                      type="number"
                      value={produtoData.qtde}
                      onChange={(event) => handleEditInputChange(event, index, 'qtde')}
                    />
                    <button onClick={handleSaveChanges} id='btn-save'>Salvar</button>
                 </>
              ) : (
                  <>
                    <button onClick={() => handleEditCard(index)} id='btn-edit'><BiEditAlt /></button>
                  </>
                )}
                
              </Card>
            ))
          ) : (
            <p id='txt-erro'>NENHUM RESULTADO ENCONTRADO</p>
          )}
        </div>
        {isModalOpen && <CreateModal closeModal = {handleOpenModal}/>}
        <button onClick={handleOpenModal} id='btn-product'>Adicionar Produto</button>
      </div>
    </>
  )
}

export default App
