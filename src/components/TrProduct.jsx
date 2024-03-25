import { Button, ButtonGroup } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";

export const TrProduct = ({ product, handleShowProductInfo, handleShowProductEdit, handleShowProductDelete }) => {
    return (
        <tr>
            <td>{ product.name }</td>
            <td>{ product.category_name }</td>
            <td>
                <ButtonGroup role="group">
                    <Button variant="outline-secondary" onClick={() => handleShowProductInfo(product)} size="sm" title="Show product info">
                        <Eye className='ml-4 mb-1' />
                    </Button>
                    <Button variant="outline-secondary" onClick={() => handleShowProductEdit(product)} size="sm" title="Edit product info">
                        <Pencil className='ml-4 mb-1' />
                    </Button>
                    <Button variant="outline-secondary" onClick={() => handleShowProductDelete(product)} size="sm" title="Delete product">
                        <Trash className='ml-4 mb-1' />
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
};
