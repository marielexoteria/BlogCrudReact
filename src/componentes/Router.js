import React, { Component } from 'react';

//importando las dependencias que se instalaron
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

//importando los componentes
import Header from './Header';
import Navegacion from './Navegacion';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Formulario from './Formulario';
import EditarPost from './EditarPost';

class Router extends Component {
    state = {  
        posts: []
    }

    componentDidMount() {
        this.obtenerPost();
    }

    obtenerPost = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
             .then( res => {
                 this.setState({
                     posts: res.data //data es donde se encuentran los posts en el fake api "JSONPlaceholder"
                 }) 
             })
    }

    borrarPost = (id) => {
        //console.log(id);
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => {
            if (res.status === 200) {
                const posts = [...this.state.posts]; //usando el spread operator para hacer una copia del state
                let resultado = posts.filter(post => (
                    post.id != id //creando un filtro que retornará todos los posts del state MENOS el que se borró
                ));
                this.setState({
                    posts: resultado
                })
            } 
        })
    }

    crearPost = (post) => {
        axios.post(`https://jsonplaceholder.typicode.com/posts`, {post}) //{post} = al post que se lee del formulario y que está en este método entre ()
             .then(res => {
                 if (res.status === 201) {
                    //agregando un modal que confirma la creación del post
                    Swal.fire(
                        'Post Creado',
                        'Se creó correctamente.',
                        'success'
                    )
                    
                    let postId = {id: res.data.id}; //el ID del post que se ha creado
                    const nuevoPost = Object.assign({}, res.data.post, postId) //como el ID del post se genera fuera del arreglo "post" en JSONPlaceholder, para poder agregar todo se usa Object.assign() para crear un objeto que une la info que está fuera de "post" con la de "post"
                    //console.log(nuevoPost);

                    //haciendo copia del state actual con prevState y concatenando el post nuevo
                    this.setState(prevState => ({
                        posts: [...prevState.posts, nuevoPost]
                    }))
                 }
             })
    }

    editarPost = (postActualizado) => {
        //console.log(postActualizado);

        //haciendo destructuring para sacar el ID del post a actualizar
        const {id} = postActualizado;

        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {postActualizado}) //{postActualizado} = al post que se lee del formulario y que está en este método entre ()
             .then(res => {
                 if (res.status === 200) {
                    Swal.fire(
                        'Post Actualizado',
                        'Los cambios se guardaron correctamente.',
                        'success'
                    )

                    let postId = res.data.id; //el ID del post que se está editando

                    //haciendo copia del state
                    const posts = [...this.state.posts];

                    //buscando la posición del post a editar en el arreglo, para editar la correcta (por ej. posición del post = 0 pero post ID = 12)
                    const postEditar = posts.findIndex(post => postId === post.id)

                    //reemplazando el post del state con el actualizado
                    posts[postEditar] = postActualizado;
                    this.setState({
                        posts
                    })

                    //console.log(posts[postEditar]); //devuelve el post que se va a editar, tal cual como está en el state
                    //console.log(postActualizado); //devuelve el post con los cambios ya hechos
                 }
             })
    }

    render() { 
        return (  
            <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header />
                        <Navegacion />
                        <Switch>
                            <Route exact path="/" render={ () => {
                                return(
                                    <Posts 
                                        posts={this.state.posts}
                                        borrarPost={this.borrarPost}
                                    />
                                );
                            }} />

                            <Route exact path="/post/:postId" render={ (props) => {
                                let idPost = props.location.pathname.replace('/post/', '') //para que solamente quede el id del post según el fake API y de esa forma se pueda enlazar al post correspondiente cuando se le dé click al botón "Ver"

                                const posts=this.state.posts;
                                let filtro;
                                filtro = posts.filter(post => (
                                    post.id === Number(idPost)
                                ))

                                
                                return(
                                    <SinglePost 
                                        post={filtro[0]} 
                                    />
                                )
                            }} />

                            <Route exact path="/crear" render={() => {
                                return(
                                    <Formulario 
                                        crearPost={this.crearPost}
                                    />
                                );
                            }}
                            />

                            <Route exact path="/editar/:postId" render={ (props) => {
                                let idPost = props.location.pathname.replace('/editar/', '') //para que solamente quede el id del post según el fake API y de esa forma se pueda enlazar al post correspondiente cuando se le dé click al botón "Ver"

                                const posts=this.state.posts;
                                let filtro;
                                filtro = posts.filter(post => (
                                    post.id === Number(idPost)
                                ))

                                
                                return(
                                    <EditarPost
                                        post={filtro[0]} 
                                        editarPost={this.editarPost}
                                    />
                                )
                            }} />
                        </Switch>
                    </div>
                </div>
            
            </BrowserRouter>
        );
    }
}
 
export default Router;

