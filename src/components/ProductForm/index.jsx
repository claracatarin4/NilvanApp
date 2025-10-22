import Input from "../Input/index"
import InputRow from "../InputRow/index"
import BarcodeInput from "../BarCodeInput/index"
import TextArea from "../TextArea"

export default function ProductForm({ formData, onUpdateField }) {
  return (
    <div className="p-4">
      <Input
        label="Nome do Produto"
        placeholder="Bolsa Térmica Cooler"
        value={formData.nome}
        onChange={(value) => onUpdateField("nome", value)}
      />

      <InputRow>
        <Input
          label="Preço de Venda"
          placeholder="R$ 250,00"
          value={formData.precoVenda}
          onChange={(value) => onUpdateField("precoVenda", value)}
          className="flex-1"
        />
        <Input
          label="Preço de Custo"
          placeholder="R$ 100,00"
          value={formData.precoCusto}
          onChange={(value) => onUpdateField("precoCusto", value)}
          className="flex-1"
        />
      </InputRow>

      <Input
        label="Categoria"
        placeholder="Bolsas Térmicas"
        value={formData.categoria}
        onChange={(value) => onUpdateField("categoria", value)}
      />

      <Input
        label="Código Interno"
        placeholder="BTC"
        value={formData.codigoInterno}
        onChange={(value) => onUpdateField("codigoInterno", value)}
      />

      <BarcodeInput
        label="Código de Barras"
        value={formData.codigoBarras}
        onChange={(value) => onUpdateField("codigoBarras", value)}
      />

      <TextArea
        label="Descrição"
        placeholder=""
        value={formData.descricao}
        onChange={(value) => onUpdateField("descricao", value)}
      />
    </div>
  )
}
