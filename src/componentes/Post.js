import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class Post extends Component {
    confirmarEliminacion = () => {
        //haciendo el destructuring de lo que se mandó vía props y sacando el ID del post que se quiere borrar
        const {id} = this.props.info;

        //desplegando el modal para confirmar si se borra el post o no
        Swal.fire({
                title: '¿Estás seguro?',
                text: "¡Esta acción no se puede deshacer!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar',
                cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                this.props.borrarPost(id)
                Swal.fire(
                    '¡Eliminiado!',
                    'El post ha sido eliminado.',
                    'success'
                )
            }
          })

    }


    render() { 
        //haciendo el destructuring de lo que se mandó vía props y sacando lo que se quiere desplegar
        const {id, title} = this.props.info;

        return ( 
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                    <Link to={`/post/${id}`} className="btn btn-primary">Ver</Link>
                    <Link to={`/editar/${id}`} className="btn btn-warning">Editar</Link>
                    <button onClick={this.confirmarEliminacion} type="button" className="btn btn-danger">Borrar</button>
                </td>
            </tr>
         );
    }
}
 
export default Post;