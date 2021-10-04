import React from "react";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import config from './config.json';

class ItemView extends React.Component {
    constructor(props) {
        super(props);

        this.state = { article: null };
    }

    componentDidMount() {
        this.updateContent();
    }

    componentDidUpdate() {
        this.updateContent();
    }

    updateContent() {
        if (this.props.articleID && (!this.state.article || this.state.article._id !== this.props.articleID)) {
            (
                async () => {
                    try {
                        this.setState({ article: await this.updateArticle() })
                    } catch (e) {
                        console.log(e);
                    }
                }
            )();
        }
    }

    updateArticle = async () => {//change article being viewed
        return await (await axios.get(`${config.API}/articles/${this.props.articleID}`)).data
    }

    updateID = (id) => {
        this.setState({ articleID: id })
    }

    Description = () =>{
        if(this.state.article?.description){
            let options = {allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),allowedAttributes: {a:['href', 'name', 'target'],img:['src','title','alt']}};
            let clean = sanitizeHtml(this.state.article.description,options);
            return(<div dangerouslySetInnerHTML={{__html:clean}}></div>);
        } else {
            return (
                <p>Loading...</p>
            )
        }
    }

    render = () => {
        return (
            <div>
                <h1>
                    {this.state.article?.title || "Loading..."}
                </h1>
                <this.Description/>
            </div>
        )
    }
}

export default ItemView;