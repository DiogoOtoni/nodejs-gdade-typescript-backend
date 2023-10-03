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