import React, { Component } from 'react';
import Listado from './Listado';

class Posts extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="col-12 col-md-8">
                <h2 className="text-center">Posts</h2>
                <Listado 
                    posts={this.props.posts} //el state del componente padre (Router.js) el hijo lo recibe como props
                    borrarPost={this.props.borrarPost} //método que se creó en Router.js
                />
            </div>
         );
    }
}
 
export default Posts;