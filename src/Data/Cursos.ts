export default interface Cursos{
    id?: string,
    nombreCurso: string,
    categoria: string,
    descripcionLarga: string,
    descripcionCorta: string,
    numeroSubClases: number,
    imagenCurso: string,
    subClases: {},
    precio:number
}