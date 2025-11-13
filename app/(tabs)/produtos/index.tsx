import { JSX } from "react"; 
import { 
    ProductListScreen, 
    ProductListScreenProps 
} from "../../../src/screens/Produto/ProductListScreen"; 

export default function ProductRoute (props: ProductListScreenProps): JSX.Element {
    return <ProductListScreen {...props} />;
}