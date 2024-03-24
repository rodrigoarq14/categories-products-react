import { Button, ButtonGroup } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";

export const TrCategory = ({ category, handleShowCategoryInfo, handleShowEditModal, handleShowDeleteModal }) => {
    return (
        <tr>
            <td>{category.name}</td>
            <td>
                <ButtonGroup role="group">
                    <Button variant="outline-secondary" onClick={() => handleShowCategoryInfo(category)} size="sm" title="Show category info">
                        <Eye className='ml-4 mb-1' />
                    </Button>
                    <Button variant="outline-secondary" onClick={() => handleShowEditModal(category)} size="sm" title="Edit category info">
                        <Pencil className='ml-4 mb-1' />
                    </Button>
                    <Button variant="outline-secondary" onClick={() => handleShowDeleteModal(category)} size="sm" title="Delete category">
                        <Trash className='ml-4 mb-1' />
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
};
