import { Button, ButtonGroup } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";

export const TrProduct = ({name, category}) => {
    return (
        <tr>
            <td>{ name }</td>
            <td>{ category }</td>
            <td>
                <ButtonGroup role="group">
                    <Button variant="outline-secondary" size="sm" title="Show product info">
                        <Eye className='ml-4 mb-1' />
                    </Button>
                    <Button variant="outline-secondary" size="sm" title="Edit product info">
                        <Pencil className='ml-4 mb-1' />
                    </Button>
                    <Button variant="outline-secondary" size="sm" title="Delete product">
                        <Trash className='ml-4 mb-1' />
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
};
