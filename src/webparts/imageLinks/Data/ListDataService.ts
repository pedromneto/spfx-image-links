import { IList } from './IList';
import { IListService } from './IListService';
import { IListItem } from './IListItem';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient, SPHttpClient, GraphHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, HttpClientConfiguration, IHttpClientOptions } from '@microsoft/sp-http';
export class ListDataService implements IListService {
    private context: WebPartContext;
    constructor(context: WebPartContext) {
        this.context = context;
    }

    public buscaListas(): Promise<IList[]> {
        let self = this;
        let promise = new Promise((resolve: (dados: IList[]) => void, reject: (error: any) => void) => {
            const urlBase = this.context.pageContext.web.absoluteUrl;
            const urlRequest = urlBase + "/_api/Lists?$filter=(BaseTemplate eq 109)&$select=Title,Id,DefaultView";

            this.context.spHttpClient.get(urlRequest, SPHttpClient.configurations.v1)
                .then((resultado: SPHttpClientResponse) => {
                    resultado.json().then((valor: any) => {
                        if (valor.hasOwnProperty("value")) {
                            let dados = valor.value as Array<any>;
                            let retorno: IList[];
                            retorno = dados.map((item: any, index: number) => {
                                return {
                                    id: item.Id,
                                    url: this.context.pageContext.web.absoluteUrl + "/_api/Web/Lists(guid'" + item.Id + "')",
                                    titulo: item.Title,
                                };
                            });
                            resolve(retorno);
                        }
                        debugger;
                    }).catch((erro: any) => {
                        reject(erro);
                        debugger;
                    });
                }).catch((erroBuscar: any) => {
                    reject(erroBuscar);
                    debugger;
                });
        });
        return promise;
    }

    public buscarItens(listId: string): Promise<IListItem[]> {
        let promise = new Promise((resolve: (itens: IListItem[]) => void, reject: (error: any) => void) => {
            const urlRequest = this.context.pageContext.web.absoluteUrl + "/_api/Web/Lists(guid'" + listId + "')/Items?$select=Title,LinkDestino,FileRef&$orderby=Title";
            this.context.spHttpClient.get(urlRequest, SPHttpClient.configurations.v1)
                .then((resultado: SPHttpClientResponse) => {
                    resultado.json().then((valor: any) => {
                        let dados = valor.value as Array<any>;
                        let retorno = dados.map((itemList, index) => {
                            return {
                                img: itemList.FileRef,
                                titulo: itemList.Title,
                                link: itemList.LinkDestino.Url
                            };
                        });

                        debugger;
                        resolve(retorno);
                    });
                });
        });
        return promise;
    }
}
