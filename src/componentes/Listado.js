import React, { Component } from 'react';
import Post from './Post';


class Listado extends Component {
    mostrarPosts = () => {
        const posts = this.props.posts;

        if (posts.length === 0) return null; //en caso de que el arreglo no tenga ningún regisro, no se desplegará nada
        
        return (
            <React.Fragment>
                {Object.keys(posts).map(post =>(
                    <Post
                        key={post}
                        info={this.props.posts[post]}
                        borrarPost={this.props.borrarPost} //método que se creó en Router.js
                    />
                ) )}
            </React.Fragment>
        )
        //se usa React.Fragment para no incluir HTML
        //lo del return se ejecuta si el arreglo tiene datos. Se pasa cada post al componente Post.js
    }

    render() { 
        return ( 
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Título</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {this.mostrarPosts() }
                </tbody>
            </table>
         );
    }
}
 
export default Listado;