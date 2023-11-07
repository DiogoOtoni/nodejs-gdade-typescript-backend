import fs from "fs"
import IJob from "../interfaces/job";

const URLARQUIVOJSON = "src/database/db.json";

function readingJson(){
    const arquivoJSON = fs.readFileSync(URLARQUIVOJSON, 'utf-8');
    const conteudoJSON:IJob[] = JSON.parse(arquivoJSON);
    return conteudoJSON;
}

function writingInJson(conteudoJSON:IJob[]){
    fs.writeFileSync(URLARQUIVOJSON, JSON.stringify(conteudoJSON, null, 4));
}

function attAlterDateTime(id: number, conteudoJSON:IJob[]){
    const indexId = conteudoJSON.findIndex((item) => item.id_job == id );
    const dataEHora = new Date();

    conteudoJSON[indexId].lastUpdatedDay = dataEHora.toLocaleDateString();
    conteudoJSON[indexId].lastUpdatedTime = dataEHora.toLocaleTimeString();

    writingInJson(conteudoJSON);
}

export function createJob(dados: IJob){
    const conteudoJSON = readingJson();

    const id_job: number = conteudoJSON.length + 1; //id AUTOINCREMENT =D
    conteudoJSON.push({id_job, ...dados});

    writingInJson(conteudoJSON);

    return true;
}

export function findAll(){
    return readingJson();
}

export function findById(id: number){
    try{
        const conteudoJSON = readingJson();
        const retorno = conteudoJSON.find((item) =>  item.id_job == id );
        return retorno;
    }catch(error){
        return error;
    }
}

export function deleteById(id: number){
    const conteudoJSON = readingJson();
    const indexId = conteudoJSON.findIndex((item) => item.id_job == id );

    if(indexId != -1) {
        conteudoJSON[indexId].activeStatus = false;
    }else{
        return "Elemento não encontrado!";
    }

    writingInJson(conteudoJSON);
    return "Elemento alterado para inativo";
}

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

export function alteraStatusDescript(id: number, adicionalDescription:string){
    const conteudoJSON = readingJson();
    const indexId = conteudoJSON.findIndex((item) => item.id_job == id );

    if(indexId != -1){
        conteudoJSON[indexId].statusDescription?.push(adicionalDescription);
    }else{
        return "elemento não encontrado";
    }

    attAlterDateTime(id, conteudoJSON);

    return "ok !!";
}

export function alteraJob(id: number, dados: IJob){
    const conteudoJSON = readingJson();

    const indexId = conteudoJSON.findIndex((item) => item.id_job == id);

    conteudoJSON[indexId].jobName = dados.jobName;
    conteudoJSON[indexId].descricao = dados.descricao;
    conteudoJSON[indexId].empresa = dados.empresa;
    conteudoJSON[indexId].link = dados.link;
    conteudoJSON[indexId].empAnun = dados.empAnun;
    conteudoJSON[indexId].linkAnun = dados.linkAnun;
    
    //MUDAR O ALTERA STATUS DESCRIPTION ??



    return true;
}