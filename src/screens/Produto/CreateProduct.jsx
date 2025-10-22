import { useState } from "react"
import Header from "../../components/Header/index"
import TabBar from "../../components/Tabs(NilvanApp)/index"
import ProductForm from "../../components/ProductForm"
import VariantsSection from "../../components/VariantsSection/index"
import Button from "../../components/Button/index"

export default function CadastrarProduto() {

  const [activeTab, setActiveTab] = useState("produto")
  const [formData, setFormData] = useState({

    nome: "",
    precoVenda: "",
    precoCusto: "",
    categoria: "",
    codigoInterno: "",
    codigoBarras: "",
    descricao: "",
    imagem: null,
    
  })

  const handleSubmit = () => {
    console.log("[v0] Criar Produto:", formData)
  }

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBack = () => {
    console.log("[v0] Voltar")
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      <Header title="Cadastrar Produto" onBack={handleBack} />

      <TabBar tabs={["Produto", "Estoque"]} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 overflow-y-auto">
        {activeTab === "produto" ? (
          <>
            {/* <ImageUpload image={formData.imagem} onImageSelect={(img) => updateFormData("imagem", img)} /> */}

            <ProductForm formData={formData} onUpdateField={updateFormData} />

            <VariantsSection />
          </>
        ) : (
          <div className="flex items-center justify-center p-10">
            <p className="text-gray-500">Conteúdo de Estoque</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button title="Criar Produto" onPress={handleSubmit} />
      </div>
    </div>
  )
}