import { Button, ButtonGroup } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";

export const TrCategory = ({ name, id }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                <ButtonGroup role="group">
                    <Button variant="outline-secondary" size="sm" title="Show category info">
                        <Eye className='ml-4 mb-1' />
                    </Button>
                    <Button variant="outline-secondary" size="sm" title="Edit category info">
                        <Pencil className='ml-4 mb-1' />
                    </Button>
                    <Button variant="outline-secondary" size="sm" title="Delete category">
                        <Trash className='ml-4 mb-1' />
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
};
