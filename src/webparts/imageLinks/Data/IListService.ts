import { IList } from './IList';
import {IListItem} from './IListItem';

export interface IListService {
    buscaListas(): Promise<IList[]>;
    buscarItens(listId: string): Promise<IListItem[]>;
}