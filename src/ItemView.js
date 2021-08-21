import React from "react";
import axios from "axios";
const config = require("./config.json");

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

    updateArticle = async () => {
        return await (await axios.get(`${config.API}/articles/${this.props.articleID}`)).data
    }

    updateID = (id) => {
        this.setState({ articleID: id })
    }

    render = () => {
        return (
            <div>
                <h1>
                    {this.state.article?.title || "Loading..."}
                </h1>
                <p>{this.state.article?.description || "Loading.."}</p>
            </div>
        )
    }
}

export default ItemView;