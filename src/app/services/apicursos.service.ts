import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Cursos from 'src/Data/Cursos';

@Injectable({
  providedIn: 'root'
})
export class ApicursosService {

  constructor(
    public firestore: Firestore,
    private afirestore: AngularFirestore
  ) { }

  /* 
    Mostrar Todos los Cursos
  */

  CargarListaDeCursosDisponibles(): Observable<Cursos[]> {
    const datos = collection(this.firestore, 'RegCursos');
    return collectionData(datos, { idField: 'id' }) as Observable<Cursos[]>;
  }

  /* 
    Cargar Curso por Nombre
  */
    buscarCursoPorNombre(nombre: string): Observable<any[]> {
      return this.afirestore.collection('RegCursos', ref => ref.where('nombreCurso', '==', nombre)).valueChanges();
    }

  /* 
    Mostrar Todos los Cursos por Categorias
  */
  CargarListaDeCursosPorCategorias(categoria: any): Observable<any[]> {
    return this.afirestore.collection('RegCursos', ref => ref.where('categoria', '==', categoria)).valueChanges();
  }

  /* 
    Mostrar Todos los Cursos del Estudiante
  */
  CargarLosCursosDelEstudiante(idEstudiante: any) {

  }


  /* 
    Calificar un curso
  */
  CalificaUnCurso() {

  }


  /* 
    
  */
  AgregarCursoAMisCursos(curso:any) {
    return this.afirestore.collection(`MisCursos`).add(curso);
  }

  CargarMisCursos(idUsuario: any): Observable<any[]> {
    return this.afirestore.collection('MisCursos', ref => ref.where('idUsuario', '==', idUsuario)).valueChanges();
  }


}
