import { Request, Response } from "express";
import fs from "fs"
import IJob from "../interfaces/job";

const URLARQUIVOJSON = "src/database/db.json";

export function findAllJobs(request:Request, response: Response) {

    const arquivoJSON = fs.readFileSync(URLARQUIVOJSON, 'utf-8');
    
    response.status(200).send(arquivoJSON);
}


export function registerJob(request:Request, response: Response) {
    
    const dados = request.body;
    
    const arquivoJSON = fs.readFileSync(URLARQUIVOJSON, 'utf-8');
    const conteudoJSON:IJob[] = JSON.parse(arquivoJSON);


    conteudoJSON.push(dados);
    fs.writeFileSync(URLARQUIVOJSON, JSON.stringify(conteudoJSON, null, 4));

    response.status(200).send({message: "Cadastrado!"});
}

export function searchJobs(request: Request, response: Response){

 
    const {typeSearch, dataSearch} = request.query;
 
    
    const arquivoJSON = fs.readFileSync(URLARQUIVOJSON, 'utf-8');
    const conteudoJSON:IJob[] = JSON.parse(arquivoJSON);

    const tipoDeBusca = String(typeSearch);
    const valorDeBusca = String(dataSearch);

    const regex = new RegExp(valorDeBusca, "ig");

    const result = conteudoJSON.filter((item) => {
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
    response.status(200).send(result)
}