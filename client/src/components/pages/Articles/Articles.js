import {Link} from "react-router-dom";
import React, {Component} from 'react';
import API from "../../utils/API";
import Search from "../../search/"
import { Input, Button } from "../../form";
import { List, ListItem } from "../../list";
import axios from "axios";
import  "./articles.css";


class Articles extends Component {
    state = {
        query: "",
        startDate: "",
        endDate: "",
        articles:[],
        searchResults:[]
    }

    componentDidMount() {
        this.loadArticles();
      }

    loadArticles = () => {
        API.getArticles()
            .then(res =>
                this.setState({
                    articles: res.data,
                })
            )
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    requestArticles = (event) => {
        event.preventDefault();
        console.log("button was clicked");
        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=cca7f97c1a174056a680cad28fb81d54&q= ${this.state.query}&begin_date=${this.state.startDate}&end_date=${this.state.endDate}&sort=newest` )
        .then(res => {
          const searchResults = res.data.response.docs;
          this.setState({ 
              searchResults:searchResults,
              startDate:"",
              endDate:"",
              query:""
         });
          console.log(searchResults)
        })

    }

    render() {
        return (
        <div class="container-all">
            <ul>
                {this.state.articles.map(article => (
                  <li key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.headline.print_headline} by {article.byline.original}
                      </strong>
                    </Link>
                   </li>
                ))}
              </ul>
   {/* =================SITE TITLE STARTS================= */}
               <div class="jumbo-container">
                  <h1> New York Times Search </h1>
               
               </div>

   {/* =================SEARCH COMPONENT STARTS================= */}
               <Search />
               <form>
                   <Input 
                   value={this.state.query}
                   onChange={this.handleInputChange}
                   name="query"
                   placeholder="Search Term (optional)"/>
                   <Input 
                   value={this.state.startDate}
                   onChange={this.handleInputChange}
                   name="startDate"
                   placeholder="Start Date (YYYYMMDD) (required)"/>
                   <Input
                   value={this.state.endDate}
                   onChange={this.handleInputChange}
                   name="endDate"
                   placeholder="End Date (YYYYMMDD) (required)"/>
                   <Button onClick={this.requestArticles}> Search </Button>
               </form>
{/* =================SEARCH  RESULTS COMPONENT STARTS================= */}
               <List>
                {this.state.searchResults.map(result => (
                  <ListItem key={result._id}>
                     <strong>{result.headline.main} </strong> {result.byline.original}
                  </ListItem>
                ))}
              </List>
            </div>
        )
    }

}


export default Articles;