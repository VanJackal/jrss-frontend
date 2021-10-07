import React from "react";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import config from './config.json';

let updateArticle = async (articleID) => {//change article being viewed
    return await (await axios.get(`${config.API}/articles/${articleID}`)).data
}

function ItemView(props) {
    const [article, setArticle] = React.useState(null);
    React.useEffect(() => {
        async function updateContent() {
            if (!article || article._id !== props.articleID) {
                try {
                    setArticle(await updateArticle(props.articleID));
                } catch (e) {
                    console.log(e);
                }
            }
        }
        updateContent()
    }, [props.articleID, article])

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