import React, { Component } from 'react';

class EditarPost extends Component {
    //crear los refs
    tituloRef = React.createRef();
    entradaRef = React.createRef();


    editarPost = (e) => {
        e.preventDefault();

        //leer los refs
        const post = {
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId: 1, //JSONPlaceholder requiere un userId para que se despliegue como el autor del post, así que asignamos un valor al azar mientras tanto
            id: this.props.post.id //para que se pueda editar el post correcto
        }
        //console.log(post);

        //enviar por props o petición de axios
        this.props.editarPost(post); //este prop lo recibe desde Router.js
    }

    cargarFormulario = () => {
        if (!this.props.post) return null; //en caso de que se cargue un formulario vacío

        //haciendo destructuring para que cuando el formulario cargue ya tenga el contenido del post. El prop lo recibe desde Router.js
        const {title, body} = this.props.post;

        return (
            <form onSubmit={this.editarPost} className="col-md-8">
                <legend className="text-center">Editar Post</legend>
                <div className="form-group">
                    <label>Título del Post:</label>
                    <input type="text" ref={this.tituloRef} className="form-control" defaultValue={title} />
                </div>
                <div className="form-group">
                    <label>Contenido:</label>
                    <textarea className="form-control" ref={this.entradaRef} defaultValue={body}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        );
    }


    render() { 
        

        return ( 
            <React.Fragment>
                {this.cargarFormulario()}
            </React.Fragment>
            
         );
    }
}
 
export default EditarPost;