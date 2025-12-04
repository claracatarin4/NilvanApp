import { CategoryResponse } from "../../../screens/Produto/ProductListScreen"

export interface ProdutoResponse { 
  categoriaResponse: CategoryResponse
  codigoBarras: string
  codigoInterno: string
  descricao: string
  id: number
  imagem: string
  nome: string
}

export interface ProdutoRequest { 
  imagem: string
  nome: string 
  categoriaResponse: CategoryResponse
  codigoBarras: string
  codigoInterno: string
  descricao: string
}

