import fs from "fs"
import IJob from "../interfaces/job";

const URLARQUIVOJSON = "src/database/db.json";

/**
 * Função que lê o arquivo json como "banco de dados" e retorna como um vetor de objetos do tipo IJob
 * @returns Objeto do arquivo json, type IJob[]
 */
function readingJson(){
    const arquivoJSON = fs.readFileSync(URLARQUIVOJSON, 'utf-8');
    const conteudoJSON:IJob[] = JSON.parse(arquivoJSON);
    return conteudoJSON;
}

/**
 * Faz a escrita no arquivo "banco de dados" do tipo .json
 * @param conteudoJSON vetor de objetos tipo IJob
 */
function writingInJson(conteudoJSON:IJob[]){
    fs.writeFileSync(URLARQUIVOJSON, JSON.stringify(conteudoJSON, null, 4));
}

/**
 * A partir do indice recebido faz a alteração de data e hora das ultimas alterações e chama a função de escrita
 * @param id indice
 * @param conteudoJSON vetor de objetos IJob
 */
function attAlterDateTime(id: number, conteudoJSON:IJob[]){
    const indexId = conteudoJSON.findIndex((item) => item.id_job == id );

    const dataEHora = new Date();
    conteudoJSON[indexId].lastUpdatedDay = dataEHora.toLocaleDateString();
    conteudoJSON[indexId].lastUpdatedTime = dataEHora.toLocaleTimeString();

    writingInJson(conteudoJSON);
}

/**
 * Faz a criação e inserção do objeto no vetor de objetos do tipo IJob
 * @param dados objeto recebido a ser criado
 * @returns verdadeiro se criado
 */
export function createJob(dados: IJob){
    const conteudoJSON = readingJson();

    const id_job: number = conteudoJSON.length + 1; //id AUTOINCREMENT =D
    dados.activeStatus = true;
    
    conteudoJSON.push({id_job, ...dados});

    attAlterDateTime(id_job, conteudoJSON);

    return true;
}

/**
 * função para retornar todo o "banco de dados"
 * @returns todos os objetos contidos no db.json
 */
export function findAll(){
    return readingJson();
}

/**
 * Função que retorna objeto buscado por indice
 * @param id indice a ser procurado
 * @returns retorna objeto, elemento inteiro buscado ou undefined caso nao exista
 */
export function findById(id: number){
    try{
        const conteudoJSON = readingJson();
        const retorno = conteudoJSON.find((item) =>  item.id_job == id );
        return retorno;
    }catch(error){
        return error;
    }
}

/**
 * altera activeStatus para false, tornando o objeto "inativo", como se fosse deletado
 * NÃO ACABADA - DEVERÁ SER TODA MODIFICADA
 * @param id indice a ser deletado - movido para INATIVOS
 * @returns string de instrucoes caso encontrado ou nao
 */
export function deleteById(id: number){
    const conteudoJSON = readingJson();
    const indexId = conteudoJSON.findIndex((item) => item.id_job == id );

    

    if(indexId != -1) {
        conteudoJSON[indexId].activeStatus = false;
    }else{
        return {message: "Elemento não encontrado!"};
    }

    attAlterDateTime(id, conteudoJSON);
    return {message: "Elemento alterado para inativo"};
}


/**
 * FUNÇÃO QUE POSSIVELMENTE VAI PARA O FRONT END A PARTIR DE TODOS OS OBJETOS JÁ BUSCADOS E LISTADOS
 * @param tipoDeBusca 
 * @param valorDeBusca 
 * @returns 
 */
export function findBySearch(tipoDeBusca: string, valorDeBusca:string){
    const conteudoJSON = readingJson();
    const regex = new RegExp(valorDeBusca, "ig");

    return conteudoJSON.filter((item) => {
        if(tipoDeBusca == 'jobName'){
            const myString = item.jobName;
            return myString.match(regex);
        }
        if(tipoDeBusca == 'descricao'){
            const myString = item.descricao;
            return myString.match(regex);
        }
        if(tipoDeBusca == 'empresa'){
            const myString = item.empresa;
            return myString.match(regex);
        }
        if(tipoDeBusca == 'empAnun'){
            const myString = item.empAnun;
            return myString.match(regex);
        }
    })
}


/**
 * função que faz a alteração por completo do objeto do indice
 * @param id indice do elemento
 * @param dados elemento enviado com as alteraçoes
 * @returns true se deu certo
 */
export function alteraJob(id: number, dados: IJob){
    try{
        const conteudoJSON = readingJson();

        if(conteudoJSON == null || conteudoJSON == undefined){
            throw "arquivo vazio";
        }

        const indexId = conteudoJSON.findIndex((item) => item.id_job == id);

        if(indexId == -1){
            throw "índice não existente"
        }

        conteudoJSON[indexId].jobName = dados.jobName;
        conteudoJSON[indexId].descricao = dados.descricao;
        conteudoJSON[indexId].empresa = dados.empresa;
        conteudoJSON[indexId].link = dados.link;
        conteudoJSON[indexId].empAnun = dados.empAnun;
        conteudoJSON[indexId].linkAnun = dados.linkAnun;
        conteudoJSON[indexId].statusDescription = dados.statusDescription;

        attAlterDateTime(id, conteudoJSON);

    }catch(error){

    }
    

    return true;
}