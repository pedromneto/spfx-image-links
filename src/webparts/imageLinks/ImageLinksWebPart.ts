import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';

import styles from './ImageLinksWebPart.module.scss';
import * as strings from 'ImageLinksWebPartStrings';
import { IImageLinksWebPartProps } from './IImageLinksWebPartProps';
import { IList } from './Data/IList';
import { IListService } from './Data/IListService';
import { MockListService } from './Data/MockListService';
import { ListDataService } from './Data/ListDataService';
import { IListItem } from './Data/IListItem';
require("../imageLinks/general.css");


export interface IImageLinksWebPartProps {
  description: string;
}

export default class ImageLinksWebPartWebPart extends BaseClientSideWebPart<IImageLinksWebPartProps> {
  private Ambiente: string = "DEV";
  private dropdownOptions: IPropertyPaneDropdownOption[];
  private linksExibicao: IListItem[];


  //#region Overload Methods
  protected onPropertyPaneConfigurationStart() {
    let service = this.buscaServico();
    let self = this;
    self.dropdownOptions = [];
    service.buscaListas().then((listas: IList[]) => {
      listas.forEach((lista, index) => {
        self.dropdownOptions.push(
          {
            'key': lista.id,
            'text': lista.titulo
          });
      });
      self.context.propertyPane.refresh();
    });
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldTitle
                }),
                PropertyPaneDropdown('list', {
                  label: strings.DescriptionFieldList,
                  options: this.dropdownOptions,

                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onInit():Promise<void>{
    //SPComponentLoader.loadCss("../../Assets/Geral.css");
    return super.onInit();
  }

  //#endregion Overload Methods

  public render(): void {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "");

    if (!this.properties.list) {
      this.context.statusRenderer.renderError(this.domElement, "Nenhuma lista de links foi selecionada.");
    }
    else {
      let self = this;
      let service: IListService = this.buscaServico();
      service.buscarItens(this.properties.list).then((links: IListItem[]) => {
        self.exibeLinks(links).then(() => this.context.statusRenderer.clearLoadingIndicator(this.domElement));
      });
    }
  }

  private buscaServico(): IListService {
    return this.Ambiente === "DEV" ? new MockListService() : new ListDataService(this.context);
  }

  private exibeLinks(itens: IListItem[]): Promise<void> {
    var promise = new Promise<void>((resolve: () => void, reject: (error?: any) => void) => {

      if (itens.length === 0) {
        this.domElement.innerHTML = '';
        resolve();
      }
      let htmlItens = '';
      itens.forEach((item: IListItem, index: number) => {
        htmlItens += `<div class="${styles.itemLink}">
            <a href="${item.link}" target="_blank" aria-label=" ${item.titulo} " tabindex="0">
                <img src="${item.img}"
                  alt="">
                <p class="item-titulo">
                  ${item.titulo}
                </p>
            </a>          
         </div>`;
      });
      this.domElement.innerHTML = `<div class="row"><div class="${styles.imageLinks}">
              ${htmlItens}
              </div>
          </div>`;
          debugger;
    });

    return promise;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }


}
