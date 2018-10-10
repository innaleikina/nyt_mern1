import {Link} from "react-router-dom";
import React, {Component} from 'react';
import API from "../../utils/API";
import Search from "../../search/"



class Articles extends Component {
    state = {
        topic: "",
        startYear: "",
        endYear: "",
        articles:[]
    }

    componentDidMount() {
        this.loadArticles();
      }

    loadArticles = () => {
        API.getArticles()
            .then(res =>
                this.setState({
                    articles: res.data,
                    title: "",
                    author: "",
                    synopsis: ""
                })
            )
            .catch(err => console.log(err));
    };

    render() {
        return ( <div>
            <ul>
                {this.state.articles.map(article => (
                  <li key={article._id}>
                    <Link to={"/srticles/" + article._id}>
                      <strong>
                        {article.title} by {article.url}
                      </strong>
                    </Link>
                   </li>
                ))}
              </ul>
   
               <Search />
            </div>
        )
    }

}


export default Articles;