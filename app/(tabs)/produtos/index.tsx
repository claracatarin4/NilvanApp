import { JSX } from "react"; 
import { ProductListScreen } from "../../../src/screens/Produto/ProductListScreen"; 
import { ProductListScreenProps } from "../../../src/screens/Produto/ProductListScreen"; // Ajuste o caminho se seu 'types.ts' estiver em outro lugar.

export default function ProductRoute (props: ProductListScreenProps): JSX.Element {
    return <ProductListScreen {...props} />;
}