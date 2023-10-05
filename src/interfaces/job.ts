
export default interface IJob{
    id_job?: number,
    jobName: string,
    descricao: string,
    empresa: string,
    link: string,
    empAnun: string,
    linkAnun: string,
    data: string,
    hora: string,

    activeStatus?: boolean,

    statusDescription?: string[],
    lastUpdatedDay?: string,
    lastUpdatedTime?: string,

}