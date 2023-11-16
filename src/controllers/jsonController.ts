import { Request, Response } from "express";
import {
    alteraJob, 
    createJob, 
    deleteById, 
    findAll, 
    findById, 
    findBySearch
} from "../services/jsonService"

/**
 * Retorna todos os "jobs"
 * @param request sem request
 * @param response statusCode and data - array of objects of type iJob[]
 */
export function findAllJobs(request:Request, response: Response) {
    const retorno = findAll();
    response.status(200).send(retorno);
}


export function registerJob(request:Request, response: Response) {
    const dados = request.body;
    const retorno = createJob(dados);
    response.status(200).send({message: "Cadastrado!"});
}

export function searchJobs(request: Request, response: Response){
    const { typeSearch, dataSearch } = request.query;
    const retorno = findBySearch(String(typeSearch), String(dataSearch));
    response.status(200).send(retorno);
}

export function findJobById(request: Request, response: Response){
    const { id } = request.params;
    const retorno = findById(Number(id));
    response.status(200).send(retorno);
}

export function deleteMoveToInactive(request: Request, response: Response){
    const { id } = request.params;
    const retorno = deleteById(Number(id));
    response.status(200).send(retorno);
}

export function alteraCompleteJob(request: Request, response: Response){
    const { id } = request.params;
    const data = request.body;

    const retorno = alteraJob(Number(id), data);

    response.status(200).send(retorno);
}