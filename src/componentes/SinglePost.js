import React, { Component } from 'react';

class SinglePost extends Component {

    mostrarPost = (props) => {
        if (!props.post) return null; //en caso de que el prop no tenga algunos de los campos, que no despliegue nada

        //haciendo destructuring para extraer la info que se va a desplegar
        const {title, body, userId} = this.props.post; //este prop se envía desde Router.js

        return (
            <React.Fragment>
                <h1>{title}</h1>
                <p>Autor: {userId}</p>
                {body}
            </React.Fragment>
        )

    }
    
    
    render() { 
        
        
        return (
            <div className="col-12 col-md-8">
                {this.mostrarPost(this.props)} 
            </div>
        ); //enviando todos los props
    }
}
 
export default SinglePost;