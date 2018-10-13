import {
    Link
} from "react-router-dom";
import React, {
    Component
} from 'react';
import API from "../../utils/API";
import Search from "../../search/"
import {
    Input,
    Button
} from "../../form";
import {
    List,
    ListItem
} from "../../list";
import axios from "axios";
import "./articles.css";


class Articles extends Component {
    state = {
        query: "",
        startDate: "",
        endDate: "",
        articles: [],
        searchResults: [],
    
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
        const {
            name,
            value
        } = event.target;
        this.setState({
            [name]: value
        });
    };

    requestArticles = (event) => {
        event.preventDefault();
        console.log("button was clicked");
        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=cca7f97c1a174056a680cad28fb81d54&q=
        ${this.state.query}&begin_date=${this.state.startDate}&end_date=${this.state.endDate}&sort=newest`)
            .then(res => {
                const searchResults = res.data.response.docs;
                this.setState({
                    searchResults: searchResults,
                    startDate: "",
                    endDate: "",
                    query: ""
                });
                console.log(searchResults)
            })
    }

    handleSaveArticle = event => {
        event.preventDefault();
         console.log('saved was clicked');
          API.saveArticle({
            title: event.target.getAttribute('data-title'),
            author: event.target.getAttribute('data-author'),
            url: event.target.getAttribute('data-url')
          })
            .then(res => this.loadArticles())
            .catch(err => console.log(err));

      };

render() {
return (
<div className="container-all">

    {/* =================SITE TITLE STARTS================= */}
    <div className="jumbo-container">
        <h1> New York Times Search </h1>

    </div>

    {/* =================SEARCH COMPONENT STARTS================= */}
    <Search />
    <form>
        <Input value={this.state.query} onChange={this.handleInputChange} name="query" placeholder="Search Term (optional)" />
        <Input value={this.state.startDate} onChange={this.handleInputChange} name="startDate" placeholder="Start Date (YYYYMMDD) (required)" />
        <Input value={this.state.endDate} onChange={this.handleInputChange} name="endDate" placeholder="End Date (YYYYMMDD) (required)" />
        <Button onClick={this.requestArticles}> Search </Button>
    </form>
    {/* =================SEARCH RESULTS COMPONENT STARTS================= */}
 
      {this.state.searchResults.length > 0 ?   <h3 id="results-title"> Results </h3> : null}
      <List>
      {this.state.searchResults.map(result => (
        <ListItem key={result._id}>
           <a target="_blank" href={result.web_url}> {result.headline.main} {result.byline.original}</a>
           <Button onClick={this.handleSaveArticle} data-author={result.byline.original} data-title={result.headline.main} data-url={result.web_url}> save </Button>
        </ListItem>
        ))}
      </List>
 
    {/* ================= RENDER THE DATABASE =================== */}
    <div className="saved-container">
    <h3 > Saved Articles </h3>
    <List>
        {this.state.articles.map(article => (
        <ListItem key={article._id}>
           <a target="_blank" href={article.url}> {article.title} by {article.author}</a>
        </ListItem>
        ))}
    </List>
    </div>
</div>
)}
}


export default Articles;