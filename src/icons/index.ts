import DeleteIcon from './delete.svg';
import EditIcon from './edit.svg'

export {
    DeleteIcon, EditIcon
}

interface IIcon{
    icon: string
    [key: string]: string | undefined
  }

export type {
IIcon
};