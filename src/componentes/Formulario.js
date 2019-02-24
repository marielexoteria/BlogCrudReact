import React, { Component } from 'react';

class Formulario extends Component {
    //crear los refs
    tituloRef = React.createRef();
    entradaRef = React.createRef();


    crearPost = (e) => {
        e.preventDefault();

        //leer los refs
        const post = {
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId: 1 //JSONPlaceholder requiere un userId para que se despliegue como el autor del post, así que asignamos un valor al azar mientras tanto
        }
        //console.log(post);

        //enviar por props o petición de axios
        this.props.crearPost(post); //este prop lo recibe desde Router.js

    }


    render() { 
        return ( 
            <form onSubmit={this.crearPost} className="col-md-8">
                <legend className="text-center">Crear Nuevo Post</legend>
                <div className="form-group">
                    <label>Título del Post:</label>
                    <input type="text" ref={this.tituloRef} className="form-control" placeholder="Título del Post" />
                </div>
                <div className="form-group">
                    <label>Contenido:</label>
                    <textarea className="form-control" ref={this.entradaRef} placeholder="Contenido..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
         );
    }
}
 
export default Formulario;