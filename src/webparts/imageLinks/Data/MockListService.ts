import { IList } from './IList';
import { IListItem } from './IListItem';
import { IListService } from "./IListService";

export class MockListService implements IListService {
    public buscaListas(): Promise<IList[]> {
        let promise = new Promise<IList[]>(
            (resolve: (dados: IList[]) => void, reject: (erro: any) => void) => {
                var itens: IList[] = [];
                itens.push({
                    id: '1',
                    titulo: 'Primeiro',
                    url: 'http://www.google.com.br'
                });

                itens.push({
                    id: '2',
                    titulo: 'Segundo',
                    url: 'http://www.terra.com.br'
                });

                itens.push({
                    id: '3',
                    titulo: 'Terceiro',
                    url: 'http://www.em.com.br'
                });
                resolve(itens);
            });
        return promise;
    }

    public buscarItens(): Promise<IListItem[]> {
        let promise = new Promise<IListItem[]>(
            (resolve: (dados: IListItem[]) => void, reject: (erro: any) => void) => {
                var itens: IListItem[] = [];
                itens.push({
                    img: 'http://findicons.com/files/icons/2711/free_icons_for_windows8_metro/128/installing_updates.png',
                    titulo: 'Engrenagem',
                    link: 'http://findicons.com/icon/557951/installing_updates'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/2711/free_icons_for_windows8_metro/128/manager.png',
                    titulo: 'Gerente',
                    link: 'http://findicons.com/icon/557828/manager'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/1681/siena/128/key.png',
                    titulo: 'Chaves',
                    link: 'http://findicons.com/icon/177303/key'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/1681/siena/128/key.png',
                    titulo: 'Kiko',
                    link: 'http://findicons.com/icon/177303/key'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/1681/siena/128/key.png',
                    titulo: 'Chiquinha',
                    link: 'http://findicons.com/icon/177303/key'
                });
                itens.push({
                    img: 'http://findicons.com/files/icons/2711/free_icons_for_windows8_metro/128/installing_updates.png',
                    titulo: 'Engrenagem',
                    link: 'http://findicons.com/icon/557951/installing_updates'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/2711/free_icons_for_windows8_metro/128/manager.png',
                    titulo: 'Gerente',
                    link: 'http://findicons.com/icon/557828/manager'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/1681/siena/128/key.png',
                    titulo: 'Chaves',
                    link: 'http://findicons.com/icon/177303/key'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/1681/siena/128/key.png',
                    titulo: 'Kiko',
                    link: 'http://findicons.com/icon/177303/key'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/1681/siena/128/key.png',
                    titulo: 'Chiquinha',
                    link: 'http://findicons.com/icon/177303/key'
                });
                itens.push({
                    img: 'http://findicons.com/files/icons/1681/siena/128/key.png',
                    titulo: 'Chiquinha',
                    link: 'http://findicons.com/icon/177303/key'
                });
                itens.push({
                    img: 'http://findicons.com/files/icons/2711/free_icons_for_windows8_metro/128/installing_updates.png',
                    titulo: 'Engrenagem',
                    link: 'http://findicons.com/icon/557951/installing_updates'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/2711/free_icons_for_windows8_metro/128/manager.png',
                    titulo: 'Gerente',
                    link: 'http://findicons.com/icon/557828/manager'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/1681/siena/128/key.png',
                    titulo: 'Chaves',
                    link: 'http://findicons.com/icon/177303/key'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/1681/siena/128/key.png',
                    titulo: 'Kiko',
                    link: 'http://findicons.com/icon/177303/key'
                });

                itens.push({
                    img: 'http://findicons.com/files/icons/1681/siena/128/key.png',
                    titulo: 'Chiquinha',
                    link: 'http://findicons.com/icon/177303/key'
                });
                resolve(itens);
            });
        return promise;
    }
}