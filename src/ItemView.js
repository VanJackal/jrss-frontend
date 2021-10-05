import React from "react";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import config from './config.json';

function ItemView(props) {
    const [article, setArticle] = React.useState(null);
    React.useEffect(updateContent)

    function updateContent() {
        if (!article || article._id !== props.articleID) {
            (
                async () => {
                    try {
                        setArticle(await updateArticle());
                    } catch (e) {
                        console.log(e);
                    }
                }
            )();
        }
    }

    let updateArticle = async () => {//change article being viewed
        return await (await axios.get(`${config.API}/articles/${props.articleID}`)).data
    }

    let Description = () => {
        if (article?.description) {
            let options = { allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']), allowedAttributes: { a: ['href', 'name', 'target'], img: ['src', 'title', 'alt'] } };
            let clean = sanitizeHtml(article.description, options);
            return (<div dangerouslySetInnerHTML={{ __html: clean }}></div>);
        } else {
            return (
                <p>Loading...</p>
            )
        }
    }

    return (
        <div>
            <h1>
                {article?.title || "Loading..."}
            </h1>
            <Description />
        </div>
    )
}

export default ItemView;