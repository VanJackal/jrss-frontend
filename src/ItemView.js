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
            if (props.articleID && (!article || article._id !== props.articleID)) {
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

    let Enclosure = () => {
        if(!article?.enclosure){
            return <></> 
        } else {
            let type = article.enclosure.type
            if(!type){
                let fileExt = article.enclosure.url.split(/[.]/)
                fileExt = fileExt[fileExt.length - 1]
                switch(fileExt){
                    case "mp3":
                        type = "audio/mpeg"
                        break;
                    default:
                        type = "audio/mpeg"
                }
            }

            switch(type.split("/")[0]){
                case "audio":
                    return(
                        <audio controls style={{width:"80%"}}>
                            <source src={article.enclosure.url} type={type}/>
                        </audio>
                    )
                default:
                    console.log(article.enclosure.type);
                    return <></>
            }
        }
    }

    return (
        <div>
            <h1>
                {article ? (<a href={article?.link}>{article?.title}</a>) : "Loading..."}
            </h1>
            <Enclosure />
            <Description />
        </div>
    )
}

export default ItemView;